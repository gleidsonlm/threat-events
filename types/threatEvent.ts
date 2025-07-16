/**
 * TypeScript interfaces for Appdome Threat Event payloads
 * These types represent the structure of threat detection data received from the Appdome SDK
 */

/**
 * Threat severity levels based on threat codes
 */
export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Device information extracted from the threat event payload
 */
export interface DeviceInfo {
  /** Unique device identifier */
  deviceID: string;
  /** Device model (e.g., "SM-S911B") */
  deviceModel: string;
  /** Device manufacturer (e.g., "samsung") */
  deviceManufacturer: string;
  /** Device brand (e.g., "samsung") */
  deviceBrand: string;
  /** Device board identifier */
  deviceBoard: string;
  /** Operating system version */
  osVersion: string;
  /** Device architecture (e.g., "arm64") */
  Arch: string;
  /** Baseband version information */
  basebandVersion: string;
  /** Carrier PLMN information */
  carrierPlmn: string;
}

/**
 * Build and system information from the threat event
 */
export interface BuildInfo {
  /** Build number identifier */
  buildNumber: string;
  /** Build host machine identifier */
  buildHost: string;
  /** Build user information */
  buildUser: string;
  /** Kernel information string */
  kernelInfo: string;
  /** SDK version used */
  sdkVersion: string;
  /** Whether the app is an Android App Bundle */
  isAAB: string;
}

/**
 * Application sandbox and security information
 */
export interface SecurityInfo {
  /** Application sandbox path */
  sandboxPath: string;
  /** Whether sandbox path is writable */
  isSandboxPathWritable: string;
  /** Whether /proc is readable */
  isProcReadable: string;
  /** Application UID */
  UID: string;
}

/**
 * Threat identification and classification information
 */
export interface ThreatDetails {
  /** Numeric reason code for the threat */
  reasonCode: string;
  /** Alphanumeric threat code identifier */
  threatCode: string;
  /** External identifier for the threat type */
  externalID: string;
  /** Human-readable explanation of the threat */
  reasonData: string;
}

/**
 * User-facing messages and guidance
 */
export interface ThreatMessages {
  /** Customized message for the user */
  message: string;
  /** Default message template */
  defaultMessage: string;
}

/**
 * Identifiers and tokens for the threat event
 */
export interface ThreatIdentifiers {
  /** Unique identifier for this threat event */
  UUID: string;
  /** Fused app token for identification */
  fusedAppToken: string;
  /** Unix timestamp when the threat was detected */
  timestamp: string;
}

/**
 * Complete threat event payload structure from Appdome SDK
 * Represents all data received when a threat is detected
 */
export interface ThreatEventPayload {
  // Threat identification
  reasonCode: string;
  threatCode: string;
  externalID: string;
  reasonData: string;
  
  // Device information
  deviceID: string;
  deviceModel: string;
  deviceManufacturer: string;
  deviceBrand: string;
  deviceBoard: string;
  osVersion: string;
  Arch: string;
  basebandVersion: string;
  carrierPlmn: string;
  
  // Build and system info
  buildNumber: string;
  buildHost: string;
  buildUser: string;
  kernelInfo: string;
  sdkVersion: string;
  isAAB: string;
  
  // Security and sandbox info
  sandboxPath: string;
  isSandboxPathWritable: string;
  isProcReadable: string;
  UID: string;
  
  // Messages
  message: string;
  defaultMessage: string;
  
  // Identifiers and timing
  UUID: string;
  fusedAppToken: string;
  timestamp: string;
}

/**
 * Processed threat event with computed fields and organized data
 */
export interface ProcessedThreatEvent {
  /** Original payload data */
  payload: ThreatEventPayload;
  /** Organized device information */
  deviceInfo: DeviceInfo;
  /** Build and system information */
  buildInfo: BuildInfo;
  /** Security-related information */
  securityInfo: SecurityInfo;
  /** Threat details and classification */
  threatDetails: ThreatDetails;
  /** User messages and guidance */
  messages: ThreatMessages;
  /** Event identifiers and timing */
  identifiers: ThreatIdentifiers;
  /** Computed threat severity level */
  severity: ThreatSeverity;
  /** Formatted timestamp as Date object */
  detectedAt: Date;
  /** Whether the threat has been resolved */
  resolved: boolean;
}

/**
 * Known threat codes and their severity mappings
 * This can be expanded as more threat types are identified
 */
export const THREAT_SEVERITY_MAP: Record<string, ThreatSeverity> = {
  // Developer/Debug threats (typically lower severity)
  'A7QJ3W': 'medium', // Developer Options Enabled
  
  // Add more mappings as needed based on Appdome documentation
};

/**
 * Known external IDs for common threat types
 */
export const THREAT_TYPE_DESCRIPTIONS: Record<string, string> = {
  'DeveloperOptionsEnabled': 'Developer options are enabled on the device',
  // Add more descriptions as needed
};