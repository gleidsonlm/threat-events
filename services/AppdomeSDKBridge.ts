/**
 * Appdome SDK Bridge
 * 
 * This module provides the bridge between the native Appdome SDK and React Native,
 * enabling real-time threat event detection and handling.
 * 
 * The Appdome SDK works by injecting threat detection capabilities directly into
 * the app during the build process. When threats are detected, events are fired
 * that can be captured through native bridge methods.
 */

import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { ThreatEventPayload } from '@/types';

/**
 * Interface for the native Appdome module
 * This would be implemented in native code (Java/Kotlin for Android, Swift/ObjC for iOS)
 */
interface AppdomeNativeModule {
  /**
   * Initialize the Appdome threat detection system
   */
  initializeThreatDetection(): Promise<boolean>;
  
  /**
   * Get the current Appdome configuration
   */
  getAppdomeConfig(): Promise<{
    isProtected: boolean;
    version: string;
    enabledFeatures: string[];
  }>;
  
  /**
   * Manually trigger threat detection check (for testing)
   */
  triggerThreatCheck(): Promise<void>;
}

/**
 * Native module bridge - connects to the actual Appdome SDK
 * This module is automatically injected by Appdome when the app is protected
 */
const AppdomeNativeModule: AppdomeNativeModule = NativeModules.AppdomeSDK;

/**
 * Event emitter for Appdome threat events
 */
const appdomeEventEmitter = Platform.OS !== 'web' 
  ? new NativeEventEmitter(NativeModules.AppdomeSDK)
  : null;

/**
 * Threat event listener callback type
 */
export type ThreatEventListener = (payload: ThreatEventPayload) => void;

/**
 * Appdome SDK Bridge Class
 * 
 * This class provides a React Native interface to the Appdome SDK,
 * handling initialization, event listening, and threat detection management.
 */
export class AppdomeSDKBridge {
  private static instance: AppdomeSDKBridge;
  private isInitialized = false;
  private threatListeners: Set<ThreatEventListener> = new Set();
  private eventSubscription: any = null;

  private constructor() {
    this.setupEventListening();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): AppdomeSDKBridge {
    if (!AppdomeSDKBridge.instance) {
      AppdomeSDKBridge.instance = new AppdomeSDKBridge();
    }
    return AppdomeSDKBridge.instance;
  }

  /**
   * Initialize the Appdome SDK integration
   */
  public async initialize(): Promise<boolean> {
    try {
      console.log('Initializing Appdome SDK bridge...');
      
      // Check if Appdome native module is available
      if (!AppdomeNativeModule) {
        console.warn('Appdome SDK not found - app is not protected');
        this.isInitialized = false;
        return false;
      }
      
      const isProtected = await AppdomeNativeModule.initializeThreatDetection();
      this.isInitialized = isProtected;
      
      if (isProtected) {
        console.log('Appdome protection is active - threat detection enabled');
        const config = await AppdomeNativeModule.getAppdomeConfig();
        console.log('Appdome config:', config);
      } else {
        console.warn('Appdome protection not active');
      }
      
      return isProtected;
    } catch (error) {
      console.error('Failed to initialize Appdome SDK:', error);
      this.isInitialized = false;
      return false;
    }
  }

  /**
   * Check if SDK is initialized and protected
   */
  public isProtected(): boolean {
    return this.isInitialized && AppdomeNativeModule !== null;
  }

  /**
   * Add a threat event listener
   */
  public addThreatListener(listener: ThreatEventListener): () => void {
    this.threatListeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.threatListeners.delete(listener);
    };
  }

  /**
   * Remove a threat event listener
   */
  public removeThreatListener(listener: ThreatEventListener): void {
    this.threatListeners.delete(listener);
  }

  /**
   * Setup native event listening
   */
  private setupEventListening(): void {
    if (!appdomeEventEmitter) {
      console.warn('Native event emitter not available - web platform or native module missing');
      return;
    }

    // Listen for threat events from the native Appdome SDK
    // Appdome typically uses 'ThreatEvent' as the event name
    this.eventSubscription = appdomeEventEmitter.addListener(
      'ThreatEvent',
      (threatEventData: any) => {
        console.log('Received Appdome threat event:', threatEventData);
        this.handleNativeThreatEvent(threatEventData);
      }
    );

    console.log('Appdome threat event listening setup complete');
  }

  /**
   * Handle threat events received from native SDK
   */
  private handleNativeThreatEvent(nativeData: any): void {
    try {
      // Transform native event data to our ThreatEventPayload format
      const payload: ThreatEventPayload = this.transformNativeEventData(nativeData);
      
      // Notify all registered listeners
      this.threatListeners.forEach(listener => {
        try {
          listener(payload);
        } catch (error) {
          console.error('Error in threat event listener:', error);
        }
      });
    } catch (error) {
      console.error('Failed to handle native threat event:', error);
    }
  }

  /**
   * Transform native event data to our standardized format
   */
  private transformNativeEventData(nativeData: any): ThreatEventPayload {
    // The native data structure may vary, so we need to transform it
    // to match our ThreatEventPayload interface
    
    return {
      reasonCode: nativeData.reasonCode || 'UNKNOWN',
      deviceID: nativeData.deviceID || 'UNKNOWN',
      kernelInfo: nativeData.kernelInfo || '',
      sdkVersion: nativeData.sdkVersion || '',
      deviceModel: nativeData.deviceModel || '',
      externalID: nativeData.externalID || nativeData.threatType || 'UNKNOWN',
      fusedAppToken: nativeData.fusedAppToken || '',
      isProcReadable: nativeData.isProcReadable || 'false',
      reasonData: nativeData.reasonData || '',
      buildHost: nativeData.buildHost || '',
      UUID: nativeData.UUID || '',
      carrierPlmn: nativeData.carrierPlmn || 'no data',
      Arch: nativeData.Arch || '',
      isAAB: nativeData.isAAB || 'false',
      UID: nativeData.UID || '',
      deviceManufacturer: nativeData.deviceManufacturer || '',
      threatCode: nativeData.threatCode || '',
      sandboxPath: nativeData.sandboxPath || '',
      osVersion: nativeData.osVersion || '',
      buildNumber: nativeData.buildNumber || '',
      message: nativeData.message || nativeData.defaultMessage || 'Threat detected',
      buildUser: nativeData.buildUser || '',
      isSandboxPathWritable: nativeData.isSandboxPathWritable || 'false',
      defaultMessage: nativeData.defaultMessage || 'Security threat detected',
      deviceBoard: nativeData.deviceBoard || '',
      basebandVersion: nativeData.basebandVersion || '',
      deviceBrand: nativeData.deviceBrand || '',
      timestamp: nativeData.timestamp || String(Math.floor(Date.now() / 1000)),
      
      // Include any additional threat-specific data
      ...nativeData,
    };
  }

  /**
   * Trigger a manual threat check (only if Appdome is available)
   */
  public async triggerThreatCheck(): Promise<void> {
    if (!AppdomeNativeModule) {
      console.warn('Appdome SDK not available for threat check');
      return;
    }
    
    try {
      await AppdomeNativeModule.triggerThreatCheck();
    } catch (error) {
      console.error('Failed to trigger threat check:', error);
    }
  }

  /**
   * Cleanup and destroy the bridge
   */
  public destroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.remove();
      this.eventSubscription = null;
    }
    
    this.threatListeners.clear();
    this.isInitialized = false;
    
    console.log('Appdome SDK bridge destroyed');
  }
}

/**
 * Default export - singleton instance
 */
export default AppdomeSDKBridge.getInstance();