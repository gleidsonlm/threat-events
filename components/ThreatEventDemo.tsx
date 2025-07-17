/**
 * Threat Event Demo Component
 * 
 * Demonstrates the threat event handling system with example payloads
 */

import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThreatAlertFactory } from '@/components/threats';
import { threatHandlerRegistry } from '@/handlers';
import { ThreatEventType, ThreatEventPayload } from '@/types';

// Sample threat payloads for demonstration
const samplePayloads: Record<string, ThreatEventPayload> = {
  [ThreatEventType.ROOTED_DEVICE]: {
    reasonCode: "5001",
    deviceID: "demo-device-001",
    kernelInfo: "Linux/localhost/5.15.153-android13-8-30958972-abX000XXXX000000/#1 SMP PREEMPT Tue Jun 3 14:32:57 UTC 2025/aarch64",
    sdkVersion: "35",
    deviceModel: "SM-G999X",
    externalID: ThreatEventType.ROOTED_DEVICE,
    fusedAppToken: "12345678-1234-1234-1234-123456789012",
    isProcReadable: "true",
    reasonData: "Root access detected on device",
    buildHost: "BUILDHOST01",
    UUID: "12345678901234567890123456789012",
    carrierPlmn: "no data",
    Arch: "arm64",
    isAAB: "false",
    UID: "10000",
    deviceManufacturer: "Samsung",
    threatCode: "RT001",
    sandboxPath: "/data/user/0/com.example.threateventstest",
    osVersion: "13",
    buildNumber: "AP3A.240101.000.A1.G999XXXX000000",
    message: "Device root access detected. Application cannot continue.",
    buildUser: "build",
    isSandboxPathWritable: "true",
    defaultMessage: "Security threat detected: Rooted device",
    deviceBoard: "kalama",
    basebandVersion: "G999XXXX000000,G999XXXX000000",
    deviceBrand: "samsung",
    timestamp: String(Math.floor(Date.now() / 1000)),
    rootingMethod: "SuperSU",
    rootIndicators: ["su binary", "Superuser.apk", "busybox"]
  } as any,

  [ThreatEventType.SSL_CERTIFICATE_VALIDATION_FAILED]: {
    reasonCode: "6001",
    deviceID: "demo-device-002",
    kernelInfo: "Linux/localhost/5.15.153-android13-8-30958972-abX000XXXX000000/#1 SMP PREEMPT Tue Jun 3 14:32:57 UTC 2025/aarch64",
    sdkVersion: "35",
    deviceModel: "SM-G999X",
    externalID: ThreatEventType.SSL_CERTIFICATE_VALIDATION_FAILED,
    fusedAppToken: "12345678-1234-1234-1234-123456789012",
    isProcReadable: "true",
    reasonData: "SSL certificate validation failed",
    buildHost: "BUILDHOST01",
    UUID: "12345678901234567890123456789012",
    carrierPlmn: "no data",
    Arch: "arm64",
    isAAB: "false",
    UID: "10000",
    deviceManufacturer: "Samsung",
    threatCode: "SSL001",
    sandboxPath: "/data/user/0/com.example.threateventstest",
    osVersion: "13",
    buildNumber: "AP3A.240101.000.A1.G999XXXX000000",
    message: "SSL certificate validation failed - potential MITM attack",
    buildUser: "build",
    isSandboxPathWritable: "true",
    defaultMessage: "Secure connection could not be established",
    deviceBoard: "kalama",
    basebandVersion: "G999XXXX000000,G999XXXX000000",
    deviceBrand: "samsung",
    timestamp: String(Math.floor(Date.now() / 1000)),
    serverHost: "api.example.com",
    validationError: "Certificate expired",
    certificateChain: "CN=api.example.com, O=Example Corp, C=US"
  } as any,

  [ThreatEventType.APP_INTEGRITY_ERROR]: {
    reasonCode: "7001",
    deviceID: "demo-device-003",
    kernelInfo: "Linux/localhost/5.15.153-android13-8-30958972-abX000XXXX000000/#1 SMP PREEMPT Tue Jun 3 14:32:57 UTC 2025/aarch64",
    sdkVersion: "35",
    deviceModel: "SM-G999X",
    externalID: ThreatEventType.APP_INTEGRITY_ERROR,
    fusedAppToken: "12345678-1234-1234-1234-123456789012",
    isProcReadable: "true",
    reasonData: "Application binary has been modified",
    buildHost: "BUILDHOST01",
    UUID: "12345678901234567890123456789012",
    carrierPlmn: "no data",
    Arch: "arm64",
    isAAB: "false",
    UID: "10000",
    deviceManufacturer: "Samsung",
    threatCode: "INT001",
    sandboxPath: "/data/user/0/com.example.threateventstest",
    osVersion: "13",
    buildNumber: "AP3A.240101.000.A1.G999XXXX000000",
    message: "CRITICAL: Application integrity compromised",
    buildUser: "build",
    isSandboxPathWritable: "true",
    defaultMessage: "App has been tampered with",
    deviceBoard: "kalama",
    basebandVersion: "G999XXXX000000,G999XXXX000000",
    deviceBrand: "samsung",
    timestamp: String(Math.floor(Date.now() / 1000)),
    integrityCheck: "SHA-256 Hash",
    expectedHash: "a1b2c3d4e5f6...",
    actualHash: "f6e5d4c3b2a1..."
  } as any,

  [ThreatEventType.UNKNOWN_SOURCES_ENABLED]: {
    reasonCode: "5385",
    deviceID: "demo-device-004",
    kernelInfo: "Linux/localhost/5.15.153-android13-8-30958972-abX000XXXX000000/#1 SMP PREEMPT Tue Jun 3 14:32:57 UTC 2025/aarch64",
    sdkVersion: "35",
    deviceModel: "SM-G999X",
    externalID: ThreatEventType.UNKNOWN_SOURCES_ENABLED,
    fusedAppToken: "12345678-1234-1234-1234-123456789012",
    isProcReadable: "true",
    reasonData: "Unknown sources installation is enabled",
    buildHost: "BUILDHOST01",
    UUID: "12345678901234567890123456789012",
    carrierPlmn: "no data",
    Arch: "arm64",
    isAAB: "false",
    UID: "10000",
    deviceManufacturer: "Samsung",
    threatCode: "UNK001",
    sandboxPath: "/data/user/0/com.example.threateventstest",
    osVersion: "13",
    buildNumber: "AP3A.240101.000.A1.G999XXXX000000",
    message: "Unknown sources installation enabled - security risk",
    buildUser: "build",
    isSandboxPathWritable: "true",
    defaultMessage: "Install from unknown sources is enabled",
    deviceBoard: "kalama",
    basebandVersion: "G999XXXX000000,G999XXXX000000",
    deviceBrand: "samsung",
    timestamp: String(Math.floor(Date.now() / 1000)),
  },
};

export default function ThreatEventDemo() {
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);

  const supportedTypes = Object.keys(samplePayloads);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Threat Event System Demo
      </ThemedText>
      
      <ThemedText style={styles.description}>
        This demonstrates the threat event handling system. Select a threat type below to see how it would be displayed:
      </ThemedText>

      <ScrollView style={styles.buttonContainer}>
        {supportedTypes.map((threatType) => (
          <Pressable
            key={threatType}
            style={[
              styles.threatButton,
              selectedThreat === threatType && styles.selectedButton
            ]}
            onPress={() => setSelectedThreat(threatType)}
          >
            <ThemedText style={[
              styles.buttonText,
              selectedThreat === threatType && styles.selectedButtonText
            ]}>
              {threatType.replace(/([A-Z])/g, ' $1').trim()}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      {selectedThreat && (
        <ScrollView style={styles.alertContainer}>
          <ThreatAlertFactory
            payload={samplePayloads[selectedThreat]}
            handler={threatHandlerRegistry.createHandler(samplePayloads[selectedThreat])}
          />
        </ScrollView>
      )}

      {!selectedThreat && (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>
            Select a threat type above to see the alert display
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    maxHeight: 200,
    marginBottom: 20,
  },
  threatButton: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#0056b3',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alertContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
  },
});