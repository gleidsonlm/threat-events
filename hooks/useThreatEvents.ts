/**
 * React Hook for Appdome Threat Events
 * 
 * This hook provides a React-friendly interface to the Appdome SDK,
 * managing threat event listening, state management, and cleanup.
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import AppdomeSDKBridge, { ThreatEventListener } from '@/services/AppdomeSDKBridge';
import { ThreatEventPayload } from '@/types';
import { threatHandlerRegistry } from '@/handlers';

export interface ThreatEventState {
  /** Current threat event being displayed */
  currentThreat: ThreatEventPayload | null;
  /** Whether the Appdome SDK is protected and active */
  isProtected: boolean;
  /** Whether the SDK is currently initializing */
  isInitializing: boolean;
  /** Initialization error if any */
  initError: Error | null;
  /** All threat events received (for debugging/history) */
  threatHistory: ThreatEventPayload[];
}

export interface ThreatEventActions {
  /** Dismiss the current threat alert */
  dismissCurrentThreat: () => void;
  /** Clear all threat history */
  clearThreatHistory: () => void;
  /** Manually trigger threat check (for testing) */
  triggerThreatCheck: () => Promise<void>;
  /** Re-initialize the SDK */
  reinitialize: () => Promise<void>;
}

export interface UseThreatEventsResult extends ThreatEventState, ThreatEventActions {}

/**
 * Hook for managing Appdome threat events
 */
export function useThreatEvents(): UseThreatEventsResult {
  const [state, setState] = useState<ThreatEventState>({
    currentThreat: null,
    isProtected: false,
    isInitializing: true,
    initError: null,
    threatHistory: [],
  });

  const unsubscribeRef = useRef<(() => void) | null>(null);

  /**
   * Handle incoming threat events from the SDK
   */
  const handleThreatEvent: ThreatEventListener = useCallback((payload: ThreatEventPayload) => {
    console.log('Threat event received:', payload);
    
    setState(prevState => ({
      ...prevState,
      currentThreat: payload,
      threatHistory: [payload, ...prevState.threatHistory.slice(0, 99)], // Keep last 100 events
    }));

    // Log threat event for monitoring
    const handler = threatHandlerRegistry.createHandler(payload);
    const severity = handler.getSeverity();
    console.warn(`[THREAT DETECTED] ${payload.externalID} - Severity: ${severity}`, {
      threatCode: payload.threatCode,
      message: payload.message,
      deviceID: payload.deviceID,
    });
  }, []);

  /**
   * Initialize the Appdome SDK
   */
  const initializeSDK = useCallback(async () => {
    try {
      setState(prevState => ({
        ...prevState,
        isInitializing: true,
        initError: null,
      }));

      const isProtected = await AppdomeSDKBridge.initialize();
      
      // Setup threat event listening
      unsubscribeRef.current = AppdomeSDKBridge.addThreatListener(handleThreatEvent);
      
      setState(prevState => ({
        ...prevState,
        isProtected,
        isInitializing: false,
        initError: null,
      }));

      if (isProtected) {
        console.log('Appdome threat detection is active');
      } else {
        console.warn('Appdome protection not active - threat events will not be received');
      }
    } catch (error) {
      console.error('Failed to initialize Appdome SDK:', error);
      setState(prevState => ({
        ...prevState,
        isProtected: false,
        isInitializing: false,
        initError: error instanceof Error ? error : new Error('Unknown initialization error'),
      }));
    }
  }, [handleThreatEvent]);

  /**
   * Dismiss the current threat alert
   */
  const dismissCurrentThreat = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      currentThreat: null,
    }));
  }, []);

  /**
   * Clear threat history
   */
  const clearThreatHistory = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      threatHistory: [],
    }));
  }, []);

  /**
   * Trigger manual threat check
   */
  const triggerThreatCheck = useCallback(async () => {
    try {
      await AppdomeSDKBridge.triggerThreatCheck();
    } catch (error) {
      console.error('Failed to trigger threat check:', error);
    }
  }, []);

  /**
   * Re-initialize the SDK
   */
  const reinitialize = useCallback(async () => {
    // Cleanup existing listener
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    
    // Re-initialize
    await initializeSDK();
  }, [initializeSDK]);

  // Initialize SDK on mount
  useEffect(() => {
    initializeSDK();
    
    // Cleanup on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [initializeSDK]);

  return {
    // State
    currentThreat: state.currentThreat,
    isProtected: state.isProtected,
    isInitializing: state.isInitializing,
    initError: state.initError,
    threatHistory: state.threatHistory,
    
    // Actions
    dismissCurrentThreat,
    clearThreatHistory,
    triggerThreatCheck,
    reinitialize,
  };
}

/**
 * Hook for just listening to threat events without state management
 */
export function useThreatEventListener(listener: ThreatEventListener): void {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;

  useEffect(() => {
    const wrappedListener: ThreatEventListener = (payload) => {
      listenerRef.current(payload);
    };

    const unsubscribe = AppdomeSDKBridge.addThreatListener(wrappedListener);
    
    return unsubscribe;
  }, []);
}

/**
 * Hook to get current Appdome protection status
 */
export function useAppdomeStatus() {
  const [isProtected, setIsProtected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setIsChecking(true);
        const isProtectedValue = AppdomeSDKBridge.isProtected();
        setIsProtected(isProtectedValue);
      } catch (error) {
        console.error('Failed to check Appdome status:', error);
        setIsProtected(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkStatus();
  }, []);

  return { isProtected, isChecking };
}