import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ProcessedThreatEvent } from '@/types/threatEvent';
import { ThreatEventProcessor } from '@/services/ThreatEventProcessor';
import { DeviceInfoSection } from './DeviceInfoSection';
import { ThreatDetailsSection } from './ThreatDetailsSection';
import { ActionMessageSection } from './ActionMessageSection';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ThreatEventDisplayProps {
  /** Processed threat event data to display */
  event: ProcessedThreatEvent;
  /** Optional application name for message formatting */
  appName?: string;
}

/**
 * Main component for displaying threat event payload information
 * Renders organized sections with collapsible content and copy functionality
 */
export const ThreatEventDisplay: React.FC<ThreatEventDisplayProps> = ({
  event,
  appName = 'Threat Events App',
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['threat', 'message']) // Expand important sections by default
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const copyToClipboard = async (data: string, label: string) => {
    try {
      await Clipboard.setStringAsync(data);
      Alert.alert('Copied', `${label} copied to clipboard`);
    } catch {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const copyFullPayload = async () => {
    try {
      const payloadString = JSON.stringify(event.payload, null, 2);
      await Clipboard.setStringAsync(payloadString);
      Alert.alert('Copied', 'Full threat event payload copied to clipboard');
    } catch {
      Alert.alert('Error', 'Failed to copy payload to clipboard');
    }
  };

  const summary = ThreatEventProcessor.createSummary(event);
  const severityColor = ThreatEventProcessor.getSeverityColor(event.severity);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.content}>
        {/* Header Section */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Threat Event Details
          </ThemedText>
          <ThemedView style={[styles.severityBadge, { backgroundColor: severityColor }]}>
            <ThemedText style={[styles.severityText, { color: '#fff' }]}>
              {ThreatEventProcessor.getSeverityText(event.severity)}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Summary Section */}
        <ThemedView style={styles.summarySection}>
          <ThemedText type="subtitle" style={styles.summaryTitle}>
            {summary.title}
          </ThemedText>
          <ThemedText style={styles.summaryDescription}>
            {summary.description}
          </ThemedText>
          <ThemedView style={styles.summaryDetails}>
            <ThemedText style={styles.summaryText}>
              <ThemedText style={styles.label}>Detected:</ThemedText> {summary.timestamp}
            </ThemedText>
            <ThemedText style={styles.summaryText}>
              <ThemedText style={styles.label}>Device:</ThemedText> {summary.deviceInfo}
            </ThemedText>
            <ThemedText style={styles.summaryText}>
              <ThemedText style={styles.label}>ID:</ThemedText> {event.identifiers.UUID}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Action Message Section */}
        <ActionMessageSection
          messages={event.messages}
          appName={appName}
          isExpanded={expandedSections.has('message')}
          onToggle={() => toggleSection('message')}
          onCopy={copyToClipboard}
        />

        {/* Threat Details Section */}
        <ThreatDetailsSection
          threatDetails={event.threatDetails}
          identifiers={event.identifiers}
          severity={event.severity}
          detectedAt={event.detectedAt}
          isExpanded={expandedSections.has('threat')}
          onToggle={() => toggleSection('threat')}
          onCopy={copyToClipboard}
        />

        {/* Device Information Section */}
        <DeviceInfoSection
          deviceInfo={event.deviceInfo}
          buildInfo={event.buildInfo}
          securityInfo={event.securityInfo}
          isExpanded={expandedSections.has('device')}
          onToggle={() => toggleSection('device')}
          onCopy={copyToClipboard}
        />

        {/* Copy Full Payload Button */}
        <ThemedView style={styles.actionSection}>
          <ThemedText 
            style={[styles.copyButton, { color: colors.tint }]} 
            onPress={copyFullPayload}
          >
            Copy Full Payload
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summarySection: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  summaryTitle: {
    marginBottom: 8,
  },
  summaryDescription: {
    marginBottom: 12,
    fontStyle: 'italic',
  },
  summaryDetails: {
    gap: 4,
  },
  summaryText: {
    fontSize: 14,
  },
  label: {
    fontWeight: '600',
  },
  actionSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  copyButton: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
    padding: 12,
  },
});