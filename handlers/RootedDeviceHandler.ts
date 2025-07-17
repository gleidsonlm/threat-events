/**
 * Rooted Device Handler
 * 
 * Handles threats related to rooted/jailbroken devices
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class RootedDeviceHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.ROOTED_DEVICE;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.HIGH;
  }

  getTitle(): string {
    return "Rooted Device Detected";
  }

  getDescription(): string {
    return "A rooted device bypasses normal Android security controls, potentially exposing sensitive data and allowing unauthorized modifications.";
  }

  getUserGuidance(): string {
    return "For security reasons, this app cannot run on rooted devices. Please use a non-rooted device to access the application.";
  }

  getRecommendedActions(): string[] {
    return [
      "Exit the application immediately",
      "Use a non-rooted device",
      "Contact support if this appears to be an error",
      "Log security incident for review"
    ];
  }
}