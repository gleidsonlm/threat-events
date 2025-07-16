import {
  ThreatEventPayload,
  ProcessedThreatEvent,
  ThreatSeverity,
  DeviceInfo,
  BuildInfo,
  SecurityInfo,
  ThreatDetails,
  ThreatMessages,
  ThreatIdentifiers,
  THREAT_SEVERITY_MAP,
  THREAT_TYPE_DESCRIPTIONS,
} from '../types/threatEvent';

/**
 * Service class for processing and validating threat event payloads from Appdome SDK
 * Provides utilities for data transformation, validation, and insight extraction
 */
export class ThreatEventProcessor {
  /**
   * Validates the structure of a threat event payload
   * @param payload - Raw payload object to validate
   * @returns True if payload has required fields, false otherwise
   */
  static validatePayload(payload: any): payload is ThreatEventPayload {
    const requiredFields = [
      'reasonCode',
      'threatCode',
      'externalID',
      'deviceID',
      'deviceModel',
      'timestamp',
      'UUID',
      'message',
    ];

    return requiredFields.every(field => 
      typeof payload === 'object' && 
      payload !== null && 
      field in payload && 
      payload[field] !== undefined
    );
  }

  /**
   * Converts Unix timestamp to JavaScript Date object
   * @param timestamp - Unix timestamp string
   * @returns Date object or current date if invalid
   */
  static parseTimestamp(timestamp: string): Date {
    const unixTime = parseInt(timestamp, 10);
    if (isNaN(unixTime)) {
      console.warn('Invalid timestamp provided, using current date');
      return new Date();
    }
    return new Date(unixTime * 1000);
  }

  /**
   * Determines threat severity based on threat code
   * @param threatCode - Alphanumeric threat code from payload
   * @returns Severity level (defaults to 'medium' if unknown)
   */
  static determineSeverity(threatCode: string): ThreatSeverity {
    return THREAT_SEVERITY_MAP[threatCode] || 'medium';
  }

  /**
   * Extracts organized device information from payload
   * @param payload - Raw threat event payload
   * @returns Structured device information
   */
  static extractDeviceInfo(payload: ThreatEventPayload): DeviceInfo {
    return {
      deviceID: payload.deviceID,
      deviceModel: payload.deviceModel,
      deviceManufacturer: payload.deviceManufacturer,
      deviceBrand: payload.deviceBrand,
      deviceBoard: payload.deviceBoard,
      osVersion: payload.osVersion,
      Arch: payload.Arch,
      basebandVersion: payload.basebandVersion,
      carrierPlmn: payload.carrierPlmn,
    };
  }

  /**
   * Extracts build and system information from payload
   * @param payload - Raw threat event payload
   * @returns Structured build information
   */
  static extractBuildInfo(payload: ThreatEventPayload): BuildInfo {
    return {
      buildNumber: payload.buildNumber,
      buildHost: payload.buildHost,
      buildUser: payload.buildUser,
      kernelInfo: payload.kernelInfo,
      sdkVersion: payload.sdkVersion,
      isAAB: payload.isAAB,
    };
  }

  /**
   * Extracts security-related information from payload
   * @param payload - Raw threat event payload
   * @returns Structured security information
   */
  static extractSecurityInfo(payload: ThreatEventPayload): SecurityInfo {
    return {
      sandboxPath: payload.sandboxPath,
      isSandboxPathWritable: payload.isSandboxPathWritable,
      isProcReadable: payload.isProcReadable,
      UID: payload.UID,
    };
  }

  /**
   * Extracts threat details and classification from payload
   * @param payload - Raw threat event payload
   * @returns Structured threat details
   */
  static extractThreatDetails(payload: ThreatEventPayload): ThreatDetails {
    return {
      reasonCode: payload.reasonCode,
      threatCode: payload.threatCode,
      externalID: payload.externalID,
      reasonData: payload.reasonData,
    };
  }

  /**
   * Extracts user-facing messages from payload
   * @param payload - Raw threat event payload
   * @returns Structured message information
   */
  static extractMessages(payload: ThreatEventPayload): ThreatMessages {
    return {
      message: payload.message,
      defaultMessage: payload.defaultMessage,
    };
  }

  /**
   * Extracts identifiers and timing information from payload
   * @param payload - Raw threat event payload
   * @returns Structured identifier information
   */
  static extractIdentifiers(payload: ThreatEventPayload): ThreatIdentifiers {
    return {
      UUID: payload.UUID,
      fusedAppToken: payload.fusedAppToken,
      timestamp: payload.timestamp,
    };
  }

  /**
   * Gets a human-readable description for a threat type
   * @param externalID - External identifier from the payload
   * @returns Description string or the ID itself if not found
   */
  static getThreatDescription(externalID: string): string {
    return THREAT_TYPE_DESCRIPTIONS[externalID] || externalID;
  }

  /**
   * Formats the user message by replacing template variables
   * @param message - Message template from payload
   * @param appName - Application display name
   * @returns Formatted message with variables replaced
   */
  static formatUserMessage(message: string, appName: string = 'This app'): string {
    return message.replace(/{app_display_name}/g, appName);
  }

  /**
   * Main processing method to convert raw payload into structured data
   * @param payload - Raw threat event payload from Appdome SDK
   * @param appName - Optional application name for message formatting
   * @returns Processed threat event with organized data and computed fields
   * @throws Error if payload is invalid
   */
  static processPayload(
    payload: ThreatEventPayload,
    appName?: string
  ): ProcessedThreatEvent {
    if (!this.validatePayload(payload)) {
      throw new Error('Invalid threat event payload structure');
    }

    const deviceInfo = this.extractDeviceInfo(payload);
    const buildInfo = this.extractBuildInfo(payload);
    const securityInfo = this.extractSecurityInfo(payload);
    const threatDetails = this.extractThreatDetails(payload);
    const messages = this.extractMessages(payload);
    const identifiers = this.extractIdentifiers(payload);

    const severity = this.determineSeverity(payload.threatCode);
    const detectedAt = this.parseTimestamp(payload.timestamp);

    // Format the user message if app name is provided
    if (appName) {
      messages.message = this.formatUserMessage(messages.message, appName);
      messages.defaultMessage = this.formatUserMessage(messages.defaultMessage, appName);
    }

    return {
      payload,
      deviceInfo,
      buildInfo,
      securityInfo,
      threatDetails,
      messages,
      identifiers,
      severity,
      detectedAt,
      resolved: false, // Default to unresolved
    };
  }

  /**
   * Utility method to get severity color for UI display
   * @param severity - Threat severity level
   * @returns Color string for the severity level
   */
  static getSeverityColor(severity: ThreatSeverity): string {
    const colors = {
      low: '#28a745',      // Green
      medium: '#ffc107',   // Yellow
      high: '#fd7e14',     // Orange
      critical: '#dc3545', // Red
    };
    return colors[severity];
  }

  /**
   * Utility method to get severity display text
   * @param severity - Threat severity level
   * @returns Capitalized severity text
   */
  static getSeverityText(severity: ThreatSeverity): string {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  }

  /**
   * Creates a summary of the threat event for quick display
   * @param processedEvent - Processed threat event data
   * @returns Object with summary information
   */
  static createSummary(processedEvent: ProcessedThreatEvent): {
    title: string;
    description: string;
    severity: ThreatSeverity;
    timestamp: string;
    deviceInfo: string;
  } {
    const { threatDetails, deviceInfo, severity, detectedAt } = processedEvent;
    
    return {
      title: this.getThreatDescription(threatDetails.externalID),
      description: threatDetails.reasonData,
      severity,
      timestamp: detectedAt.toLocaleString(),
      deviceInfo: `${deviceInfo.deviceManufacturer} ${deviceInfo.deviceModel}`,
    };
  }
}