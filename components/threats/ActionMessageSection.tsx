import React from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThreatMessages } from '@/types/threatEvent';
import { ThreatEventProcessor } from '@/services/ThreatEventProcessor';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ActionMessageSectionProps {
  /** Threat messages to display */
  messages: ThreatMessages;
  /** Application name for message formatting */
  appName: string;
  /** Whether the section is expanded */
  isExpanded: boolean;
  /** Function to toggle section expansion */
  onToggle: () => void;
  /** Function to copy data to clipboard */
  onCopy: (data: string, label: string) => Promise<void>;
}

/**
 * Component for displaying user-facing messages and action guidance
 * Shows formatted messages with action suggestions and copy functionality
 */
export const ActionMessageSection: React.FC<ActionMessageSectionProps> = ({
  messages,
  appName,
  isExpanded,
  onToggle,
  onCopy,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const formattedMessage = ThreatEventProcessor.formatUserMessage(messages.message, appName);
  const formattedDefaultMessage = ThreatEventProcessor.formatUserMessage(messages.defaultMessage, appName);

  const copyMessages = () => {
    const messageData = JSON.stringify({ 
      formattedMessage, 
      formattedDefaultMessage,
      originalMessage: messages.message,
      originalDefaultMessage: messages.defaultMessage 
    }, null, 2);
    onCopy(messageData, 'All Messages');
  };

  const showActionGuidance = () => {
    Alert.alert(
      'Action Required',
      formattedMessage,
      [
        { text: 'Copy Message', onPress: () => onCopy(formattedMessage, 'Action Message') },
        { text: 'OK', style: 'default' }
      ]
    );
  };

  const extractSupportRef = (message: string): string | null => {
    const match = message.match(/Support REF:\s*(\d+)/i);
    return match ? match[1] : null;
  };

  const supportRef = extractSupportRef(formattedMessage);

  return (
    <ThemedView style={[styles.section, { borderColor: '#ffc107' }]}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Action Required
        </ThemedText>
        <ThemedView style={styles.headerRight}>
          <ThemedView style={styles.priorityBadge}>
            <ThemedText style={styles.priorityText}>HIGH</ThemedText>
          </ThemedView>
          <ThemedText style={[styles.expandIcon, { color: colors.tint }]}>
            {isExpanded ? '−' : '+'}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>

      {isExpanded && (
        <ThemedView style={styles.sectionContent}>
          {/* Primary Action Message */}
          <ThemedView style={styles.messageContainer}>
            <ThemedText style={styles.messageTitle}>User Guidance:</ThemedText>
            <TouchableOpacity 
              style={styles.messageBox}
              onPress={() => onCopy(formattedMessage, 'Action Message')}
            >
              <ThemedText style={styles.messageText}>{formattedMessage}</ThemedText>
            </TouchableOpacity>
            
            {supportRef && (
              <ThemedView style={styles.supportRefContainer}>
                <ThemedText style={styles.supportRefLabel}>Support Reference:</ThemedText>
                <TouchableOpacity onPress={() => onCopy(supportRef, 'Support Reference')}>
                  <ThemedText style={[styles.supportRefText, { color: colors.tint }]}>
                    {supportRef}
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}
          </ThemedView>

          {/* Action Buttons */}
          <ThemedView style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.primaryButton]}
              onPress={showActionGuidance}
            >
              <ThemedText style={styles.primaryButtonText}>View Action</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton, { borderColor: colors.tint }]}
              onPress={() => onCopy(formattedMessage, 'Action Message')}
            >
              <ThemedText style={[styles.secondaryButtonText, { color: colors.tint }]}>
                Copy Message
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* Default Message (if different) */}
          {formattedDefaultMessage !== formattedMessage && (
            <ThemedView style={styles.defaultMessageContainer}>
              <ThemedText style={styles.defaultMessageTitle}>Default Message:</ThemedText>
              <TouchableOpacity 
                style={styles.defaultMessageBox}
                onPress={() => onCopy(formattedDefaultMessage, 'Default Message')}
              >
                <ThemedText style={styles.defaultMessageText}>
                  {formattedDefaultMessage}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}

          {/* Copy All Messages Button */}
          <TouchableOpacity style={styles.copyAllButton} onPress={copyMessages}>
            <ThemedText style={[styles.copyAllButtonText, { color: colors.tint }]}>
              Copy All Messages
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
    borderWidth: 2,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  sectionTitle: {
    flex: 1,
    color: '#d68910',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priorityBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
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
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  messageBox: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffc107',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#856404',
  },
  supportRefContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  supportRefLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  supportRefText: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#dc3545',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  defaultMessageContainer: {
    marginBottom: 16,
  },
  defaultMessageTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  defaultMessageBox: {
    backgroundColor: '#f8f9fa',
    borderColor: '#dee2e6',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
  defaultMessageText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6c757d',
  },
  copyAllButton: {
    alignSelf: 'center',
    marginTop: 8,
  },
  copyAllButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});