import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThreatDetails, ThreatIdentifiers, ThreatSeverity } from '@/types/threatEvent';
import { ThreatEventProcessor } from '@/services/ThreatEventProcessor';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ThreatDetailsSectionProps {
  /** Threat details to display */
  threatDetails: ThreatDetails;
  /** Threat identifiers to display */
  identifiers: ThreatIdentifiers;
  /** Computed threat severity */
  severity: ThreatSeverity;
  /** Detection timestamp */
  detectedAt: Date;
  /** Whether the section is expanded */
  isExpanded: boolean;
  /** Function to toggle section expansion */
  onToggle: () => void;
  /** Function to copy data to clipboard */
  onCopy: (data: string, label: string) => Promise<void>;
}

/**
 * Component for displaying threat identification and classification details
 * Shows threat codes, severity, timing, and identification information
 */
export const ThreatDetailsSection: React.FC<ThreatDetailsSectionProps> = ({
  threatDetails,
  identifiers,
  severity,
  detectedAt,
  isExpanded,
  onToggle,
  onCopy,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const copyThreatDetails = () => {
    const threatData = JSON.stringify({ 
      threatDetails, 
      identifiers, 
      severity, 
      detectedAt: detectedAt.toISOString() 
    }, null, 2);
    onCopy(threatData, 'Threat Details');
  };

  const InfoRow: React.FC<{ label: string; value: string; onPress?: () => void; highlight?: boolean }> = ({ 
    label, 
    value, 
    onPress,
    highlight = false
  }) => (
    <TouchableOpacity 
      style={[styles.infoRow, highlight && styles.highlightRow]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <ThemedText style={[styles.infoLabel, highlight && styles.highlightLabel]}>
        {label}:
      </ThemedText>
      <ThemedText style={[styles.infoValue, highlight && styles.highlightValue]} numberOfLines={3}>
        {value}
      </ThemedText>
    </TouchableOpacity>
  );

  const severityColor = ThreatEventProcessor.getSeverityColor(severity);
  const threatDescription = ThreatEventProcessor.getThreatDescription(threatDetails.externalID);

  return (
    <ThemedView style={[styles.section, { borderColor: colors.icon }]}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Threat Details
        </ThemedText>
        <ThemedView style={styles.headerRight}>
          <ThemedView style={[styles.severityBadge, { backgroundColor: severityColor }]}>
            <ThemedText style={styles.severityText}>
              {ThreatEventProcessor.getSeverityText(severity)}
            </ThemedText>
          </ThemedView>
          <ThemedText style={[styles.expandIcon, { color: colors.tint }]}>
            {isExpanded ? '−' : '+'}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>

      {isExpanded && (
        <ThemedView style={styles.sectionContent}>
          {/* Primary Threat Information */}
          <ThemedView style={styles.subsection}>
            <ThemedText style={styles.subsectionTitle}>Threat Classification</ThemedText>
            
            <InfoRow 
              label="Type" 
              value={threatDescription}
              highlight={true}
              onPress={() => onCopy(threatDescription, 'Threat Type')}
            />
            
            <InfoRow 
              label="Reason" 
              value={threatDetails.reasonData}
              highlight={true}
              onPress={() => onCopy(threatDetails.reasonData, 'Threat Reason')}
            />
            
            <InfoRow 
              label="Severity" 
              value={ThreatEventProcessor.getSeverityText(severity)}
              onPress={() => onCopy(severity, 'Severity')}
            />
            
            <InfoRow 
              label="External ID" 
              value={threatDetails.externalID}
              onPress={() => onCopy(threatDetails.externalID, 'External ID')}
            />
            
            <InfoRow 
              label="Threat Code" 
              value={threatDetails.threatCode}
              onPress={() => onCopy(threatDetails.threatCode, 'Threat Code')}
            />
            
            <InfoRow 
              label="Reason Code" 
              value={threatDetails.reasonCode}
              onPress={() => onCopy(threatDetails.reasonCode, 'Reason Code')}
            />
          </ThemedView>

          {/* Timing and Identification */}
          <ThemedView style={styles.subsection}>
            <ThemedText style={styles.subsectionTitle}>Event Information</ThemedText>
            
            <InfoRow 
              label="Detected At" 
              value={detectedAt.toLocaleString()}
              onPress={() => onCopy(detectedAt.toISOString(), 'Detection Time')}
            />
            
            <InfoRow 
              label="Event UUID" 
              value={identifiers.UUID}
              onPress={() => onCopy(identifiers.UUID, 'Event UUID')}
            />
            
            <InfoRow 
              label="App Token" 
              value={identifiers.fusedAppToken}
              onPress={() => onCopy(identifiers.fusedAppToken, 'App Token')}
            />
            
            <InfoRow 
              label="Raw Timestamp" 
              value={identifiers.timestamp}
              onPress={() => onCopy(identifiers.timestamp, 'Raw Timestamp')}
            />
          </ThemedView>

          {/* Copy All Button */}
          <TouchableOpacity style={styles.copyButton} onPress={copyThreatDetails}>
            <ThemedText style={[styles.copyButtonText, { color: colors.tint }]}>
              Copy All Threat Details
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#fff',
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
  highlightRow: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    paddingHorizontal: 8,
    marginHorizontal: -8,
    borderRadius: 4,
  },
  infoLabel: {
    fontWeight: '500',
    width: 100,
    flexShrink: 0,
  },
  highlightLabel: {
    fontWeight: '600',
  },
  infoValue: {
    flex: 1,
    marginLeft: 12,
  },
  highlightValue: {
    fontWeight: '500',
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