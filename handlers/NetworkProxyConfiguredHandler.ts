/**
 * Network Proxy Configured Handler
 * 
 * Handles threats related to network proxy configuration
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from '@/types';
import { BaseThreatHandler } from './BaseThreatHandler';

export class NetworkProxyConfiguredHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === ThreatEventType.NETWORK_PROXY_CONFIGURED;
  }

  getSeverity(): ThreatSeverity {
    return ThreatSeverity.MEDIUM;
  }

  getTitle(): string {
    return "Network Proxy Detected";
  }

  getDescription(): string {
    return "A network proxy has been configured on this device, which could potentially intercept or monitor network traffic.";
  }

  getUserGuidance(): string {
    return "A network proxy is configured on your device. If you didn't set this up intentionally, it could be a security risk.";
  }

  getRecommendedActions(): string[] {
    return [
      "Review proxy settings in device configuration",
      "Disable proxy if not intentionally configured",
      "Check for unauthorized network configuration changes",
      "Use direct connection when possible",
      "Contact IT support if on corporate network"
    ];
  }
}