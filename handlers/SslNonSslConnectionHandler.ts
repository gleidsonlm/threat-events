/**
 * SSL Non-SSL Connection Handler
 * 
 * Handles threats related to unencrypted network connections
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class SslNonSslConnectionHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.SSL_NON_SSL_CONNECTION;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.HIGH;
  }

  getTitle(): string {
    return "Unencrypted Connection Detected";
  }

  getDescription(): string {
    return "An unencrypted (non-SSL/TLS) connection has been detected. Data transmitted over this connection is vulnerable to interception.";
  }

  getUserGuidance(): string {
    return "Your data is being transmitted without encryption and could be intercepted. Please ensure you're using a secure connection.";
  }

  getRecommendedActions(): string[] {
    return [
      "Ensure HTTPS/SSL is enabled",
      "Check network configuration",
      "Avoid transmitting sensitive data",
      "Use VPN if on public network",
      "Contact support if issue persists"
    ];
  }
}