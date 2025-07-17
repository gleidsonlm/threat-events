/**
 * Base Threat Alert Component
 * 
 * Reusable base component for displaying threat information
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThreatHandler, ThreatEventPayload, ThreatSeverity } from '@/types';

interface BaseThreatAlertProps {
  payload: ThreatEventPayload;
  handler: ThreatHandler;
  children?: React.ReactNode;
}

/**
 * Base threat alert component with common styling and structure
 */
export const BaseThreatAlert: React.FC<BaseThreatAlertProps> = ({ 
  payload, 
  handler, 
  children 
}) => {
  const severity = handler.getSeverity();
  const severityColors = getSeverityColors(severity);

  return (
    <ThemedView style={[styles.container, { borderLeftColor: severityColors.border }]}>
      <View style={[styles.severityBadge, { backgroundColor: severityColors.background }]}>
        <Text style={[styles.severityText, { color: severityColors.text }]}>
          {severity.toUpperCase()}
        </Text>
      </View>
      
      <ThemedText type="subtitle" style={styles.title}>
        {handler.getTitle()}
      </ThemedText>
      
      <ThemedText style={styles.description}>
        {handler.getDescription()}
      </ThemedText>
      
      <ThemedText style={styles.guidance}>
        {handler.getUserGuidance()}
      </ThemedText>

      {children}

      <View style={styles.actionsContainer}>
        <ThemedText type="defaultSemiBold" style={styles.actionsTitle}>
          Recommended Actions:
        </ThemedText>
        {handler.getRecommendedActions().map((action, index) => (
          <ThemedText key={index} style={styles.actionItem}>
            • {action}
          </ThemedText>
        ))}
      </View>

      <View style={styles.metadataContainer}>
        <ThemedText style={styles.metadata}>
          Threat Code: {payload.threatCode} | Device: {payload.deviceManufacturer} {payload.deviceModel}
        </ThemedText>
        <ThemedText style={styles.metadata}>
          Detected: {new Date(parseInt(payload.timestamp) * 1000).toLocaleString()}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

/**
 * Get colors based on threat severity
 */
function getSeverityColors(severity: ThreatSeverity) {
  switch (severity) {
    case ThreatSeverity.CRITICAL:
      return {
        background: '#ffebee',
        border: '#d32f2f',
        text: '#b71c1c'
      };
    case ThreatSeverity.HIGH:
      return {
        background: '#fff3e0',
        border: '#f57c00',
        text: '#e65100'
      };
    case ThreatSeverity.MEDIUM:
      return {
        background: '#fff8e1',
        border: '#fbc02d',
        text: '#f57f17'
      };
    case ThreatSeverity.LOW:
      return {
        background: '#e8f5e8',
        border: '#4caf50',
        text: '#2e7d32'
      };
    default:
      return {
        background: '#f5f5f5',
        border: '#9e9e9e',
        text: '#424242'
      };
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    borderLeftWidth: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  severityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 12,
    lineHeight: 20,
  },
  guidance: {
    marginBottom: 16,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  actionsContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  actionsTitle: {
    marginBottom: 8,
  },
  actionItem: {
    marginLeft: 8,
    marginBottom: 4,
    lineHeight: 18,
  },
  metadataContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  metadata: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
});