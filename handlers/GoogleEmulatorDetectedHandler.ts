/**
 * Google Emulator Detected Handler
 * 
 * Handles threats related to Google emulator detection
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class GoogleEmulatorDetectedHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.GOOGLE_EMULATOR_DETECTED;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.LOW;
  }

  getTitle(): string {
    return "Google Emulator Detected";
  }

  getDescription(): string {
    return "The application is running on Google's Android emulator, which is typically used for development and testing purposes.";
  }

  getUserGuidance(): string {
    return "This app is running on Google's emulator. For the best experience and security, please use a physical device.";
  }

  getRecommendedActions(): string[] {
    return [
      "Switch to a physical Android device",
      "Download the production app from Google Play Store",
      "Contact support if needed for development access",
      "Use device for testing purposes only",
      "Avoid production data on emulated devices"
    ];
  }
}