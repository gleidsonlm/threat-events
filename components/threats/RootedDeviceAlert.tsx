/**
 * Rooted Device Alert Component
 * 
 * Specialized display for rooted device threats
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { BaseThreatAlert } from './BaseThreatAlert';
import { RootedDevicePayload, ThreatHandler } from '@/types';

interface RootedDeviceAlertProps {
  payload: RootedDevicePayload;
  handler: ThreatHandler;
}

export const RootedDeviceAlert: React.FC<RootedDeviceAlertProps> = ({ 
  payload, 
  handler 
}) => {
  return (
    <BaseThreatAlert payload={payload} handler={handler}>
      <View style={styles.specializedContent}>
        <ThemedText type="defaultSemiBold" style={styles.warningTitle}>
          ⚠️ Security Risk: Device Compromised
        </ThemedText>
        <ThemedText style={styles.warningText}>
          Rooted devices have administrative privileges that bypass Android&apos;s security model. 
          This makes your device vulnerable to malware and unauthorized access to sensitive data.
        </ThemedText>
        
        {payload.rootingMethod && (
          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Detected Method:</ThemedText>
            <ThemedText style={styles.detailValue}>{payload.rootingMethod}</ThemedText>
          </View>
        )}
        
        {payload.rootIndicators && payload.rootIndicators.length > 0 && (
          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Root Indicators:</ThemedText>
            {payload.rootIndicators.map((indicator, index) => (
              <ThemedText key={index} style={styles.indicatorItem}>
                • {indicator}
              </ThemedText>
            ))}
          </View>
        )}
      </View>
    </BaseThreatAlert>
  );
};

const styles = StyleSheet.create({
  specializedContent: {
    marginVertical: 12,
    padding: 12,
    backgroundColor: '#ffebee',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#d32f2f',
  },
  warningTitle: {
    color: '#b71c1c',
    marginBottom: 8,
  },
  warningText: {
    color: '#c62828',
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
  indicatorItem: {
    marginLeft: 16,
    color: '#d32f2f',
    fontSize: 12,
  },
});