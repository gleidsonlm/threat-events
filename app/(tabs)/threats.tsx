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

      // Sample payload data (in a real app, this would come from the Appdome SDK)
      const samplePayload: ThreatEventPayload = {
        "reasonCode": "5385",
        "deviceID": "18c092fc8ff5fe7b",
        "kernelInfo": "Linux/localhost/5.15.153-android13-8-30958972-abS911BXXS8DYF2/#1 SMP PREEMPT Tue Jun 3 14:32:57 UTC 2025/aarch64",
        "sdkVersion": "35",
        "deviceModel": "SM-S911B",
        "externalID": "DeveloperOptionsEnabled",
        "fusedAppToken": "dbcf3c20-6276-11f0-9940-b1611e4e5454",
        "isProcReadable": "true",
        "reasonData": "Developer Options is enabled on this device",
        "buildHost": "21DKGA24",
        "UUID": "E08B8328A889455E8102ED1F8F366D38",
        "carrierPlmn": "no data",
        "Arch": "arm64",
        "isAAB": "false",
        "UID": "10384",
        "deviceManufacturer": "samsung",
        "threatCode": "A7QJ3W",
        "sandboxPath": "/data/user/0/com.example.threateventstest",
        "osVersion": "15",
        "buildNumber": "AP3A.240905.015.A2.S911BXXS8DYF2",
        "message": "{app_display_name} detected the use of 'Developer Options' on this device. Please go to Settings, turn off Developer Options. Support REF: 6702",
        "buildUser": "dpi",
        "isSandboxPathWritable": "true",
        "defaultMessage": "{app_display_name} detected the use of 'Developer Options' on this device. Please go to Settings, turn off Developer Options. Support REF: 6702",
        "deviceBoard": "kalama",
        "basebandVersion": "S911BXXS8DYF1,S911BXXS8DYF1",
        "deviceBrand": "samsung",
        "timestamp": "1752700739"
      };
      
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