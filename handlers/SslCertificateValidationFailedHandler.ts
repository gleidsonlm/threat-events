/**
 * SSL Certificate Validation Failed Handler
 * 
 * Handles threats related to SSL certificate validation failures
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class SslCertificateValidationFailedHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.SSL_CERTIFICATE_VALIDATION_FAILED;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.HIGH;
  }

  getTitle(): string {
    return "SSL Certificate Validation Failed";
  }

  getDescription(): string {
    return "SSL certificate validation has failed, indicating a potential man-in-the-middle attack or compromised connection.";
  }

  getUserGuidance(): string {
    return "A secure connection could not be established. Your data may be at risk. Please check your network connection and try again on a trusted network.";
  }

  getRecommendedActions(): string[] {
    return [
      "Disconnect from current network",
      "Connect to a trusted network",
      "Avoid entering sensitive information",
      "Contact IT support if on corporate network",
      "Check for proxy or VPN interference"
    ];
  }
}