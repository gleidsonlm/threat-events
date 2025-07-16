import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThreatEventDisplay } from '@/components/threats/ThreatEventDisplay';
import { ThreatEventProcessor } from '@/services/ThreatEventProcessor';
import { ThreatEventPayload, ProcessedThreatEvent } from '@/types/threatEvent';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * Screen for displaying threat event payload information
 * Loads sample data and renders the threat event display components
 */
export default function ThreatEventScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [processedEvent, setProcessedEvent] = useState<ProcessedThreatEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadThreatEventData();
  }, []);

  const loadThreatEventData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load the sample payload from the JSON file
      // In a real app, this would come from the Appdome SDK
      const samplePayload: ThreatEventPayload = require('../payload.json');
      
      // Process the payload using our processor
      const processed = ThreatEventProcessor.processPayload(
        samplePayload,
        'Threat Events Demo'
      );
      
      setProcessedEvent(processed);
    } catch (err) {
      console.error('Error loading threat event data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load threat event data');
      Alert.alert(
        'Error',
        'Failed to load threat event data. Please check the payload format.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedView style={styles.centerContent}>
          <ThemedText type="title">Loading...</ThemedText>
          <ThemedText style={styles.loadingText}>
            Processing threat event data...
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  if (error || !processedEvent) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedView style={styles.centerContent}>
          <ThemedText type="title" style={styles.errorTitle}>
            Error
          </ThemedText>
          <ThemedText style={styles.errorText}>
            {error || 'No threat event data available'}
          </ThemedText>
          <ThemedText 
            style={[styles.retryButton, { color: colors.tint }]}
            onPress={loadThreatEventData}
          >
            Retry
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThreatEventDisplay 
        event={processedEvent} 
        appName="Threat Events Demo"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  errorTitle: {
    color: '#dc3545',
    marginBottom: 16,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  retryButton: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
    padding: 12,
  },
});