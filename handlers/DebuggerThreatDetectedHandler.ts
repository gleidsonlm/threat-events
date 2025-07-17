/**
 * Debugger Threat Detected Handler
 * 
 * Handles threats related to attached debuggers
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class DebuggerThreatDetectedHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.DEBUGGER_THREAT_DETECTED;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.HIGH;
  }

  getTitle(): string {
    return "Debugger Attached";
  }

  getDescription(): string {
    return "A debugger has been attached to the application, which could be used for reverse engineering or code manipulation.";
  }

  getUserGuidance(): string {
    return "A debugging tool has been detected. For security reasons, the application cannot run while debugging tools are active.";
  }

  getRecommendedActions(): string[] {
    return [
      "Close any debugging or development tools",
      "Restart the application",
      "Use the production version of the app",
      "Contact support if this appears incorrectly",
      "Scan device for potentially unwanted programs"
    ];
  }
}