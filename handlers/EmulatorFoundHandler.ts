/**
 * Emulator Found Handler
 * 
 * Handles threats related to emulator detection
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class EmulatorFoundHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.EMULATOR_FOUND;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.LOW;
  }

  getTitle(): string {
    return "Emulator Environment Detected";
  }

  getDescription(): string {
    return "The application is running in an emulated environment rather than on a physical device.";
  }

  getUserGuidance(): string {
    return "This app is designed to run on physical devices only. Please install and run on an actual mobile device.";
  }

  getRecommendedActions(): string[] {
    return [
      "Use a physical Android device",
      "Install the app from Google Play Store",
      "Contact support if you believe this is an error",
      "Check if device passes Google SafetyNet",
      "Avoid sensitive operations on emulated devices"
    ];
  }
}