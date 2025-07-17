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
}

export const GenericThreatAlert: React.FC<GenericThreatAlertProps> = ({ 
  payload, 
  handler 
}) => {
  return <BaseThreatAlert payload={payload} handler={handler} />;
};