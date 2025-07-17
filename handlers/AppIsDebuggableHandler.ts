/**
 * App Is Debuggable Handler
 * 
 * Handles threats related to debuggable app state
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class AppIsDebuggableHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.APP_IS_DEBUGGABLE;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.MEDIUM;
  }

  getTitle(): string {
    return "App in Debuggable State";
  }

  getDescription(): string {
    return "The application is running in a debuggable state, which exposes additional attack vectors and debugging capabilities.";
  }

  getUserGuidance(): string {
    return "This app version has debugging enabled, which may pose security risks. Please use the production version of the app.";
  }

  getRecommendedActions(): string[] {
    return [
      "Download the production version from official app store",
      "Avoid entering sensitive information",
      "Contact support for the correct app version",
      "Remove any development/beta versions",
      "Check app installation source"
    ];
  }
}