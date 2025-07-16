import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { DeviceInfo, BuildInfo, SecurityInfo } from '@/types/threatEvent';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface DeviceInfoSectionProps {
  /** Device information to display */
  deviceInfo: DeviceInfo;
  /** Build information to display */
  buildInfo: BuildInfo;
  /** Security information to display */
  securityInfo: SecurityInfo;
  /** Whether the section is expanded */
  isExpanded: boolean;
  /** Function to toggle section expansion */
  onToggle: () => void;
  /** Function to copy data to clipboard */
  onCopy: (data: string, label: string) => Promise<void>;
}

/**
 * Component for displaying device, build, and security information
 * Shows organized device details with expandable sections
 */
export const DeviceInfoSection: React.FC<DeviceInfoSectionProps> = ({
  deviceInfo,
  buildInfo,
  securityInfo,
  isExpanded,
  onToggle,
  onCopy,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const copyDeviceInfo = () => {
    const deviceData = JSON.stringify({ deviceInfo, buildInfo, securityInfo }, null, 2);
    onCopy(deviceData, 'Device Information');
  };

  const InfoRow: React.FC<{ label: string; value: string; onPress?: () => void }> = ({ 
    label, 
    value, 
    onPress 
  }) => (
    <TouchableOpacity 
      style={styles.infoRow} 
      onPress={onPress}
      disabled={!onPress}
    >
      <ThemedText style={styles.infoLabel}>{label}:</ThemedText>
      <ThemedText style={styles.infoValue} numberOfLines={2}>
        {value}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={[styles.section, { borderColor: colors.icon }]}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Device Information
        </ThemedText>
        <ThemedText style={[styles.expandIcon, { color: colors.tint }]}>
          {isExpanded ? '−' : '+'}
        </ThemedText>
      </TouchableOpacity>

      {isExpanded && (
        <ThemedView style={styles.sectionContent}>
          {/* Device Details */}
          <ThemedView style={styles.subsection}>
            <ThemedText style={styles.subsectionTitle}>Device Details</ThemedText>
            <InfoRow 
              label="Model" 
              value={deviceInfo.deviceModel}
              onPress={() => onCopy(deviceInfo.deviceModel, 'Device Model')}
            />
            <InfoRow 
              label="Manufacturer" 
              value={deviceInfo.deviceManufacturer}
              onPress={() => onCopy(deviceInfo.deviceManufacturer, 'Manufacturer')}
            />
            <InfoRow 
              label="Brand" 
              value={deviceInfo.deviceBrand}
              onPress={() => onCopy(deviceInfo.deviceBrand, 'Brand')}
            />
            <InfoRow 
              label="Board" 
              value={deviceInfo.deviceBoard}
              onPress={() => onCopy(deviceInfo.deviceBoard, 'Board')}
            />
            <InfoRow 
              label="Device ID" 
              value={deviceInfo.deviceID}
              onPress={() => onCopy(deviceInfo.deviceID, 'Device ID')}
            />
            <InfoRow 
              label="OS Version" 
              value={deviceInfo.osVersion}
              onPress={() => onCopy(deviceInfo.osVersion, 'OS Version')}
            />
            <InfoRow 
              label="Architecture" 
              value={deviceInfo.Arch}
              onPress={() => onCopy(deviceInfo.Arch, 'Architecture')}
            />
            <InfoRow 
              label="Baseband Version" 
              value={deviceInfo.basebandVersion}
              onPress={() => onCopy(deviceInfo.basebandVersion, 'Baseband Version')}
            />
            <InfoRow 
              label="Carrier PLMN" 
              value={deviceInfo.carrierPlmn}
              onPress={() => onCopy(deviceInfo.carrierPlmn, 'Carrier PLMN')}
            />
          </ThemedView>

          {/* Build Information */}
          <ThemedView style={styles.subsection}>
            <ThemedText style={styles.subsectionTitle}>Build Information</ThemedText>
            <InfoRow 
              label="Build Number" 
              value={buildInfo.buildNumber}
              onPress={() => onCopy(buildInfo.buildNumber, 'Build Number')}
            />
            <InfoRow 
              label="Build Host" 
              value={buildInfo.buildHost}
              onPress={() => onCopy(buildInfo.buildHost, 'Build Host')}
            />
            <InfoRow 
              label="Build User" 
              value={buildInfo.buildUser}
              onPress={() => onCopy(buildInfo.buildUser, 'Build User')}
            />
            <InfoRow 
              label="SDK Version" 
              value={buildInfo.sdkVersion}
              onPress={() => onCopy(buildInfo.sdkVersion, 'SDK Version')}
            />
            <InfoRow 
              label="Is AAB" 
              value={buildInfo.isAAB}
              onPress={() => onCopy(buildInfo.isAAB, 'Is AAB')}
            />
            <InfoRow 
              label="Kernel Info" 
              value={buildInfo.kernelInfo}
              onPress={() => onCopy(buildInfo.kernelInfo, 'Kernel Info')}
            />
          </ThemedView>

          {/* Security Information */}
          <ThemedView style={styles.subsection}>
            <ThemedText style={styles.subsectionTitle}>Security Information</ThemedText>
            <InfoRow 
              label="UID" 
              value={securityInfo.UID}
              onPress={() => onCopy(securityInfo.UID, 'UID')}
            />
            <InfoRow 
              label="Sandbox Path" 
              value={securityInfo.sandboxPath}
              onPress={() => onCopy(securityInfo.sandboxPath, 'Sandbox Path')}
            />
            <InfoRow 
              label="Sandbox Writable" 
              value={securityInfo.isSandboxPathWritable}
              onPress={() => onCopy(securityInfo.isSandboxPathWritable, 'Sandbox Writable')}
            />
            <InfoRow 
              label="Proc Readable" 
              value={securityInfo.isProcReadable}
              onPress={() => onCopy(securityInfo.isProcReadable, 'Proc Readable')}
            />
          </ThemedView>

          {/* Copy All Button */}
          <TouchableOpacity style={styles.copyButton} onPress={copyDeviceInfo}>
            <ThemedText style={[styles.copyButtonText, { color: colors.tint }]}>
              Copy All Device Info
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionTitle: {
    flex: 1,
  },
  expandIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 24,
    textAlign: 'center',
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
  },
  subsection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textDecorationLine: 'underline',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    fontWeight: '500',
    width: 120,
    flexShrink: 0,
  },
  infoValue: {
    flex: 1,
    marginLeft: 12,
  },
  copyButton: {
    alignSelf: 'center',
    marginTop: 8,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});