/**
 * Developer Options Enabled Handler
 * 
 * Handles threats related to Android Developer Options being enabled
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class DeveloperOptionsEnabledHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.DEVELOPER_OPTIONS_ENABLED;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.MEDIUM;
  }

  getTitle(): string {
    return "Developer Options Enabled";
  }

  getDescription(): string {
    return "Android Developer Options are enabled on this device, which exposes debugging capabilities and development features that could be exploited by malicious applications or attackers.";
  }

  getUserGuidance(): string {
    return "Please disable Developer Options in your device settings to improve security unless you are actively developing applications.";
  }

  getRecommendedActions(): string[] {
    return [
      "Go to Settings > About Phone",
      "Stop tapping 'Build Number' to keep Developer Options hidden",
      "If Developer Options are visible, go to Settings > Developer Options",
      "Toggle 'Developer Options' to OFF",
      "Disable 'USB Debugging' if it's enabled",
      "Restart your device to ensure changes take effect"
    ];
  }
}