/**
 * App Integrity Error Handler
 * 
 * Handles threats related to app binary modification
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class AppIntegrityErrorHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.APP_INTEGRITY_ERROR;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.CRITICAL;
  }

  getTitle(): string {
    return "App Integrity Compromised";
  }

  getDescription(): string {
    return "The application binary has been modified or tampered with, indicating a potential security breach or malware infection.";
  }

  getUserGuidance(): string {
    return "CRITICAL SECURITY WARNING: This app has been tampered with and cannot be trusted. Do not proceed with using this application.";
  }

  getRecommendedActions(): string[] {
    return [
      "IMMEDIATELY exit the application",
      "Uninstall the compromised app",
      "Download from official app store only",
      "Scan device for malware",
      "Change any passwords used with this app",
      "Report incident to security team"
    ];
  }
}