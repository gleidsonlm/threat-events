/**
 * Threat Handler Types and Interfaces
 * 
 * This module defines the handler system for processing threat events
 * using Strategy and Factory patterns.
 */

import { ThreatEventPayload, ThreatSeverity, ThreatEventType } from './threatEvents';

/**
 * Interface for threat event handlers using Strategy pattern
 */
export interface ThreatHandler {
  /**
   * Determines if this handler can process the given event
   */
  canHandle(event: ThreatEventPayload): boolean;
  
  /**
   * Gets the severity level for this threat type
   */
  getSeverity(): ThreatSeverity;
  
  /**
   * Gets recommended actions for this threat
   */
  getRecommendedActions(): string[];
  
  /**
   * Gets a human-readable title for this threat
   */
  getTitle(): string;
  
  /**
   * Gets a detailed description of this threat
   */
  getDescription(): string;
  
  /**
   * Gets user-friendly explanation of the threat
   */
  getUserGuidance(): string;
  
  /**
   * Process the threat event (for logging, analytics, etc.)
   */
  processEvent(event: ThreatEventPayload): void;
}

/**
 * Constructor type for threat handlers
 */
export interface ThreatHandlerConstructor {
  new (): ThreatHandler;
}

/**
 * Registry interface for managing threat handlers
 */
export interface IThreatHandlerRegistry {
  register(threatType: ThreatEventType, handlerConstructor: ThreatHandlerConstructor): void;
  createHandler(payload: ThreatEventPayload): ThreatHandler;
  getSupportedTypes(): ThreatEventType[];
}