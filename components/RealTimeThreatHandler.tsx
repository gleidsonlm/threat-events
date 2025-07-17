/**
 * Real-Time Threat Event Handler Component
 * 
 * This component handles real threat events from the Appdome SDK,
 * displaying alerts and managing user responses to actual security threats.
 */

import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useThreatEvents } from '@/hooks/useThreatEvents';
import { ThreatAlertFactory } from '@/components/threats';
import { threatHandlerRegistry } from '@/handlers';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThreatSeverity } from '@/types';

export interface RealTimeThreatHandlerProps {
  /** Whether to show initialization status */
  showStatus?: boolean;
  /** Whether to auto-dismiss low severity threats after a delay */
  autoDismissLowThreats?: boolean;
  /** Auto-dismiss delay in milliseconds (default: 10000ms) */
  autoDismissDelay?: number;
  /** Custom callback when threat is detected */
  onThreatDetected?: (payload: any) => void;
}

export default function RealTimeThreatHandler({
  showStatus = true,
  autoDismissLowThreats = true,
  autoDismissDelay = 10000,
  onThreatDetected,
}: RealTimeThreatHandlerProps) {
  const {
    currentThreat,
    isProtected,
    isInitializing,
    initError,
    dismissCurrentThreat,
    triggerThreatCheck,
  } = useThreatEvents();

  // Handle threat detection callback
  React.useEffect(() => {
    if (currentThreat && onThreatDetected) {
      onThreatDetected(currentThreat);
    }
  }, [currentThreat, onThreatDetected]);

  // Auto-dismiss low severity threats
  React.useEffect(() => {
    if (!autoDismissLowThreats || !currentThreat) return;

    const handler = threatHandlerRegistry.createHandler(currentThreat);
    const severity = handler.getSeverity();

    if (severity === ThreatSeverity.LOW) {
      const timer = setTimeout(() => {
        dismissCurrentThreat();
      }, autoDismissDelay);

      return () => clearTimeout(timer);
    }
  }, [currentThreat, autoDismissLowThreats, autoDismissDelay, dismissCurrentThreat]);

  // Handle critical threats with system alerts
  React.useEffect(() => {
    if (!currentThreat) return;

    const handler = threatHandlerRegistry.createHandler(currentThreat);
    const severity = handler.getSeverity();

    if (severity === ThreatSeverity.CRITICAL) {
      // Show system alert for critical threats
      Alert.alert(
        '🚨 Critical Security Threat',
        handler.getMessage(),
        [
          {
            text: 'Acknowledge',
            style: 'default',
            onPress: () => {
              // Keep the threat alert visible for critical threats
              console.warn('Critical threat acknowledged by user');
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [currentThreat]);

  if (isInitializing) {
    return showStatus ? (
      <ThemedView style={styles.statusContainer}>
        <ThemedText style={styles.statusText}>
          🔄 Initializing threat detection...
        </ThemedText>
      </ThemedView>
    ) : null;
  }

  if (initError) {
    return showStatus ? (
      <ThemedView style={styles.statusContainer}>
        <ThemedText style={[styles.statusText, styles.errorText]}>
          ⚠️ Threat detection initialization failed
        </ThemedText>
        <ThemedText style={styles.errorDetails}>
          {initError.message}
        </ThemedText>
      </ThemedView>
    ) : null;
  }

  if (!isProtected && showStatus) {
    return (
      <ThemedView style={styles.statusContainer}>
        <ThemedText style={[styles.statusText, styles.warningText]}>
          🛡️ Appdome protection not active
        </ThemedText>
        <ThemedText style={styles.statusSubtext}>
          Threat events will not be received. This app needs to be built with Appdome protections.
        </ThemedText>
      </ThemedView>
    );
  }

  // Display current threat alert
  if (currentThreat) {
    const handler = threatHandlerRegistry.createHandler(currentThreat);
    
    return (
      <View style={styles.threatContainer}>
        <ThreatAlertFactory
          payload={currentThreat}
          handler={handler}
          onDismiss={dismissCurrentThreat}
          showDismissButton={true}
        />
      </View>
    );
  }

  // Show protected status when no threats
  if (isProtected && showStatus) {
    return (
      <ThemedView style={styles.statusContainer}>
        <ThemedText style={[styles.statusText, styles.protectedText]}>
          🛡️ Threat detection active
        </ThemedText>
        <ThemedText style={styles.statusSubtext}>
          Your app is protected and monitoring for security threats.
        </ThemedText>
      </ThemedView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  statusContainer: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  statusSubtext: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  errorText: {
    color: '#d32f2f',
  },
  errorDetails: {
    fontSize: 12,
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.8,
  },
  warningText: {
    color: '#f57c00',
  },
  protectedText: {
    color: '#388e3c',
  },
  debugText: {
    fontSize: 12,
    color: '#1976d2',
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  threatContainer: {
    flex: 1,
  },
});