/**
 * SSL Incompatible Version Handler
 * 
 * Handles threats related to incompatible SSL/TLS versions
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class SslIncompatibleVersionHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.SSL_INCOMPATIBLE_VERSION;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.MEDIUM;
  }

  getTitle(): string {
    return "Incompatible SSL Version";
  }

  getDescription(): string {
    return "An incompatible or outdated SSL/TLS version has been detected, which may be vulnerable to known security exploits.";
  }

  getUserGuidance(): string {
    return "Your connection is using an outdated encryption method that may not be secure. Please update your device or contact support.";
  }

  getRecommendedActions(): string[] {
    return [
      "Update your device's operating system",
      "Check for app updates",
      "Use a different network if possible",
      "Contact support for assistance",
      "Avoid sensitive transactions until resolved"
    ];
  }
}