/**
 * Base Threat Handler
 * 
 * Abstract base class implementing common functionality for all threat handlers
 */

import { ThreatHandler, ThreatEventPayload, ThreatSeverity } from '@/types';

/**
 * Abstract base class for threat handlers
 */
export abstract class BaseThreatHandler implements ThreatHandler {
  abstract canHandle(event: ThreatEventPayload): boolean;
  abstract getSeverity(): ThreatSeverity;
  abstract getRecommendedActions(): string[];
  abstract getTitle(): string;
  abstract getDescription(): string;
  abstract getUserGuidance(): string;

  /**
   * Default event processing - logs the event
   */
  processEvent(event: ThreatEventPayload): void {
    // In a real implementation, this would send to analytics/logging service
    console.log(`Processing threat event: ${event.externalID}`, {
      threatCode: event.threatCode,
      timestamp: event.timestamp,
      deviceID: event.deviceID
    });
  }

  /**
   * Helper to format timestamp for display
   */
  protected formatTimestamp(timestamp: string): string {
    return new Date(parseInt(timestamp) * 1000).toLocaleString();
  }

  /**
   * Helper to get device info summary
   */
  protected getDeviceInfo(event: ThreatEventPayload): string {
    return `${event.deviceManufacturer} ${event.deviceModel} (Android ${event.osVersion})`;
  }
}