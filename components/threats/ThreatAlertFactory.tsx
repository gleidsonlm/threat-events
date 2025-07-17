/**
 * Threat Alert Factory
 * 
 * Factory component that creates the appropriate alert display based on threat type
 */

import React from 'react';
import { ThreatEventPayload, ThreatEventType, ThreatHandler } from '@/types';
import { RootedDeviceAlert } from './RootedDeviceAlert';
import { SslCertificateValidationFailedAlert } from './SslCertificateValidationFailedAlert';
import { AppIntegrityErrorAlert } from './AppIntegrityErrorAlert';
import { GenericThreatAlert } from './GenericThreatAlert';

interface ThreatAlertFactoryProps {
  payload: ThreatEventPayload;
  handler: ThreatHandler;
}

/**
 * Factory component that returns the appropriate specialized alert component
 * based on the threat type
 */
export const ThreatAlertFactory: React.FC<ThreatAlertFactoryProps> = ({ 
  payload, 
  handler 
}) => {
  switch (payload.externalID as ThreatEventType) {
    case ThreatEventType.ROOTED_DEVICE:
      return <RootedDeviceAlert payload={payload as any} handler={handler} />;
      
    case ThreatEventType.SSL_CERTIFICATE_VALIDATION_FAILED:
      return <SslCertificateValidationFailedAlert payload={payload as any} handler={handler} />;
      
    case ThreatEventType.APP_INTEGRITY_ERROR:
      return <AppIntegrityErrorAlert payload={payload as any} handler={handler} />;
      
    // For all other threat types, use the generic alert with base styling
    case ThreatEventType.UNKNOWN_SOURCES_ENABLED:
    case ThreatEventType.SSL_NON_SSL_CONNECTION:
    case ThreatEventType.SSL_INCOMPATIBLE_VERSION:
    case ThreatEventType.NETWORK_PROXY_CONFIGURED:
    case ThreatEventType.DEBUGGER_THREAT_DETECTED:
    case ThreatEventType.APP_IS_DEBUGGABLE:
    case ThreatEventType.EMULATOR_FOUND:
    case ThreatEventType.GOOGLE_EMULATOR_DETECTED:
    default:
      return <GenericThreatAlert payload={payload} handler={handler} />;
  }
};