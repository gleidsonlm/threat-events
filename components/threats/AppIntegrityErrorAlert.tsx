/**
 * App Integrity Error Alert Component
 * 
 * Specialized display for app integrity threats (highest severity)
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { BaseThreatAlert } from './BaseThreatAlert';
import { AppIntegrityErrorPayload, ThreatHandler } from '@/types';

interface AppIntegrityErrorAlertProps {
  payload: AppIntegrityErrorPayload;
  handler: ThreatHandler;
  onDismiss?: () => void;
  showDismissButton?: boolean;
}

export const AppIntegrityErrorAlert: React.FC<AppIntegrityErrorAlertProps> = ({ 
  payload, 
  handler,
  onDismiss,
  showDismissButton,
}) => {
  return (
    <BaseThreatAlert 
      payload={payload} 
      handler={handler}
      onDismiss={onDismiss}
      showDismissButton={showDismissButton}
    >
      <View style={styles.criticalWarning}>
        <ThemedText type="subtitle" style={styles.criticalTitle}>
          🚨 CRITICAL SECURITY ALERT 🚨
        </ThemedText>
        <ThemedText style={styles.criticalText}>
          This application has been tampered with and is potentially malicious. 
          <ThemedText type="defaultSemiBold"> DO NOT PROCEED.</ThemedText>
        </ThemedText>
      </View>

      <View style={styles.specializedContent}>
        <ThemedText type="defaultSemiBold" style={styles.detailTitle}>
          🔍 Integrity Check Details:
        </ThemedText>
        
        {payload.integrityCheck && (
          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Check Type:</ThemedText>
            <ThemedText style={styles.detailValue}>{payload.integrityCheck}</ThemedText>
          </View>
        )}
        
        {payload.expectedHash && (
          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Expected Hash:</ThemedText>
            <ThemedText style={styles.hashValue}>{payload.expectedHash}</ThemedText>
          </View>
        )}
        
        {payload.actualHash && (
          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Actual Hash:</ThemedText>
            <ThemedText style={styles.hashValue}>{payload.actualHash}</ThemedText>
          </View>
        )}
        
        <View style={styles.emergencyActions}>
          <ThemedText type="defaultSemiBold" style={styles.emergencyTitle}>
            🚨 IMMEDIATE ACTIONS REQUIRED:
          </ThemedText>
          <ThemedText style={styles.emergencyText}>
            1. Exit this app immediately{'\n'}
            2. Uninstall the app from your device{'\n'}
            3. Scan your device for malware{'\n'}
            4. Change any passwords used with this app{'\n'}
            5. Download only from official app stores
          </ThemedText>
        </View>
      </View>
    </BaseThreatAlert>
  );
};

const styles = StyleSheet.create({
  criticalWarning: {
    marginVertical: 12,
    padding: 16,
    backgroundColor: '#ffcdd2',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  criticalTitle: {
    color: '#b71c1c',
    textAlign: 'center',
    marginBottom: 8,
  },
  criticalText: {
    color: '#d32f2f',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 16,
  },
  specializedContent: {
    marginVertical: 12,
    padding: 12,
    backgroundColor: '#ffebee',
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  detailTitle: {
    color: '#b71c1c',
    marginBottom: 12,
  },
  detailItem: {
    marginBottom: 8,
  },
  detailValue: {
    marginLeft: 8,
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 4,
    borderRadius: 3,
  },
  hashValue: {
    marginLeft: 8,
    fontFamily: 'monospace',
    backgroundColor: '#ffebee',
    padding: 6,
    borderRadius: 3,
    fontSize: 10,
    color: '#d32f2f',
  },
  emergencyActions: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#d32f2f',
    borderRadius: 6,
  },
  emergencyTitle: {
    color: '#fff',
    marginBottom: 8,
  },
  emergencyText: {
    color: '#fff',
    lineHeight: 18,
    fontWeight: '500',
  },
});