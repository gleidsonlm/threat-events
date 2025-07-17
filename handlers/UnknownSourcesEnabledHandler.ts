/**
 * Unknown Sources Enabled Handler
 * 
 * Handles threats related to "Install from Unknown Sources" being enabled
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class UnknownSourcesEnabledHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.UNKNOWN_SOURCES_ENABLED;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.MEDIUM;
  }

  getTitle(): string {
    return "Unknown Sources Installation Enabled";
  }

  getDescription(): string {
    return "The 'Install from Unknown Sources' setting is enabled, which allows installation of apps from outside the Google Play Store, potentially including malicious applications.";
  }

  getUserGuidance(): string {
    return "Please disable 'Install from Unknown Sources' in your device settings to improve security.";
  }

  getRecommendedActions(): string[] {
    return [
      "Go to Settings > Security",
      "Disable 'Unknown Sources' or 'Install unknown apps'",
      "Only install apps from trusted sources like Google Play Store",
      "Review recently installed apps"
    ];
  }
}