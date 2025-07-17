/**
 * Default Threat Handler
 * 
 * Fallback handler for unknown or unsupported threat types
 */

import { ThreatEventPayload, ThreatSeverity } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class DefaultThreatHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return true; // Always handles as fallback
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.MEDIUM;
  }

  getTitle(): string {
    return "Security Threat Detected";
  }

  getDescription(): string {
    return "A security threat has been detected on your device. The specific threat type may not be recognized by this version of the app.";
  }

  getUserGuidance(): string {
    return "A security issue has been identified. Please follow the recommended actions and consider updating the app if available.";
  }

  getRecommendedActions(): string[] {
    return [
      "Update the app to the latest version",
      "Review device security settings",
      "Contact support for assistance",
      "Avoid sensitive operations until resolved",
      "Consider restarting the device"
    ];
  }
}