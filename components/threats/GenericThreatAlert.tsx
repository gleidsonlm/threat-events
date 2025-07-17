/**
 * Generic Threat Alert Component
 * 
 * Default display for all other threat types
 */

import React from 'react';
import { BaseThreatAlert } from './BaseThreatAlert';
import { ThreatEventPayload, ThreatHandler } from '@/types';

interface GenericThreatAlertProps {
  payload: ThreatEventPayload;
  handler: ThreatHandler;
  onDismiss?: () => void;
  showDismissButton?: boolean;
}

export const GenericThreatAlert: React.FC<GenericThreatAlertProps> = ({ 
  payload, 
  handler,
  onDismiss,
  showDismissButton,
}) => {
  return (
    <BaseThreatAlert 
      payload={payload} 
      handler={handler}
      onDismiss={onDismiss}
      showDismissButton={showDismissButton}
    />
  );
};