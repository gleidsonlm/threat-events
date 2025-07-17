/**
 * SSL Certificate Validation Failed Alert Component
 * 
 * Specialized display for SSL certificate validation failures
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { BaseThreatAlert } from './BaseThreatAlert';
import { SslCertificateValidationFailedPayload, ThreatHandler } from '@/types';

interface SslCertificateValidationFailedAlertProps {
  payload: SslCertificateValidationFailedPayload;
  handler: ThreatHandler;
  onDismiss?: () => void;
  showDismissButton?: boolean;
}

export const SslCertificateValidationFailedAlert: React.FC<SslCertificateValidationFailedAlertProps> = ({ 
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
      <View style={styles.specializedContent}>
        <ThemedText type="defaultSemiBold" style={styles.warningTitle}>
          🔒 Connection Security Compromised
        </ThemedText>
        <ThemedText style={styles.warningText}>
          The SSL certificate could not be validated, which means your connection may be intercepted 
          by a malicious party (man-in-the-middle attack).
        </ThemedText>
        
        {payload.serverHost && (
          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Server:</ThemedText>
            <ThemedText style={styles.detailValue}>{payload.serverHost}</ThemedText>
          </View>
        )}
        
        {payload.validationError && (
          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Validation Error:</ThemedText>
            <ThemedText style={styles.errorText}>{payload.validationError}</ThemedText>
          </View>
        )}
        
        {payload.certificateChain && (
          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Certificate Information:</ThemedText>
            <ThemedText style={styles.certText}>{payload.certificateChain}</ThemedText>
          </View>
        )}
        
        <View style={styles.securityTip}>
          <ThemedText type="defaultSemiBold" style={styles.tipTitle}>💡 Security Tip:</ThemedText>
          <ThemedText style={styles.tipText}>
            Never enter passwords or sensitive information when certificate validation fails. 
            This could indicate a network attack.
          </ThemedText>
        </View>
      </View>
    </BaseThreatAlert>
  );
};

const styles = StyleSheet.create({
  specializedContent: {
    marginVertical: 12,
    padding: 12,
    backgroundColor: '#fff3e0',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#f57c00',
  },
  warningTitle: {
    color: '#e65100',
    marginBottom: 8,
  },
  warningText: {
    color: '#f57c00',
    lineHeight: 18,
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
  errorText: {
    marginLeft: 8,
    color: '#d32f2f',
    backgroundColor: '#ffebee',
    padding: 6,
    borderRadius: 3,
    fontSize: 12,
  },
  certText: {
    marginLeft: 8,
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 6,
    borderRadius: 3,
    fontSize: 10,
    maxHeight: 100,
  },
  securityTip: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
  },
  tipTitle: {
    color: '#1976d2',
    marginBottom: 4,
  },
  tipText: {
    color: '#1565c0',
    fontSize: 12,
    lineHeight: 16,
  },
});