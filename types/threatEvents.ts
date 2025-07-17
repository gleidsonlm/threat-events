/**
 * Threat Event Type Definitions
 * 
 * This module defines the types and interfaces for handling mobile security threat events
 * from the Appdome SDK. Each threat type has specific characteristics and payload data.
 */

/**
 * Enum defining all supported threat event types
 */
export enum ThreatEventType {
  ROOTED_DEVICE = "RootedDevice",
  UNKNOWN_SOURCES_ENABLED = "UnknownSourcesEnabled", 
  SSL_CERTIFICATE_VALIDATION_FAILED = "SslCertificateValidationFailed",
  SSL_NON_SSL_CONNECTION = "SslNonSslConnection",
  SSL_INCOMPATIBLE_VERSION = "SslIncompatibleVersion", 
  NETWORK_PROXY_CONFIGURED = "NetworkProxyConfigured",
  DEBUGGER_THREAT_DETECTED = "DebuggerThreatDetected",
  APP_IS_DEBUGGABLE = "AppIsDebuggable",
  APP_INTEGRITY_ERROR = "AppIntegrityError",
  EMULATOR_FOUND = "EmulatorFound",
  GOOGLE_EMULATOR_DETECTED = "GoogleEmulatorDetected",
}

/**
 * Threat severity levels for categorizing the security impact
 */
export enum ThreatSeverity {
  LOW = "low",
  MEDIUM = "medium", 
  HIGH = "high",
  CRITICAL = "critical",
}

/**
 * Base threat event payload interface based on existing Appdome SDK structure
 */
export interface ThreatEventPayload {
  readonly reasonCode: string;
  readonly deviceID: string;
  readonly kernelInfo: string;
  readonly sdkVersion: string;
  readonly deviceModel: string;
  readonly externalID: string;
  readonly fusedAppToken: string;
  readonly isProcReadable: string;
  readonly reasonData: string;
  readonly buildHost: string;
  readonly UUID: string;
  readonly carrierPlmn: string;
  readonly Arch: string;
  readonly isAAB: string;
  readonly UID: string;
  readonly deviceManufacturer: string;
  readonly threatCode: string;
  readonly sandboxPath: string;
  readonly osVersion: string;
  readonly buildNumber: string;
  readonly message: string;
  readonly buildUser: string;
  readonly isSandboxPathWritable: string;
  readonly defaultMessage: string;
  readonly deviceBoard: string;
  readonly basebandVersion: string;
  readonly deviceBrand: string;
  readonly timestamp: string;
}

/**
 * Rooted Device Threat - Detects if device has been rooted/jailbroken
 * Security Impact: HIGH - Rooted devices bypass OS security controls
 */
export interface RootedDevicePayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.ROOTED_DEVICE;
  readonly rootingMethod?: string;
  readonly rootIndicators?: string[];
}

/**
 * Unknown Sources Enabled - Detects when "Install from Unknown Sources" is enabled
 * Security Impact: MEDIUM - Allows installation of potentially malicious apps
 */
export interface UnknownSourcesEnabledPayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.UNKNOWN_SOURCES_ENABLED;
  readonly settingValue?: string;
}

/**
 * SSL Certificate Validation Failed - Detects invalid SSL certificates
 * Security Impact: HIGH - Man-in-the-middle attack protection compromised
 */
export interface SslCertificateValidationFailedPayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.SSL_CERTIFICATE_VALIDATION_FAILED;
  readonly certificateChain?: string;
  readonly validationError?: string;
  readonly serverHost?: string;
}

/**
 * SSL Non-SSL Connection - Detects unencrypted network connections
 * Security Impact: HIGH - Data transmitted in clear text
 */
export interface SslNonSslConnectionPayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.SSL_NON_SSL_CONNECTION;
  readonly connectionType?: string;
  readonly destinationHost?: string;
  readonly port?: string;
}

/**
 * SSL Incompatible Version - Detects outdated SSL/TLS versions
 * Security Impact: MEDIUM - Vulnerable to known SSL/TLS exploits
 */
export interface SslIncompatibleVersionPayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.SSL_INCOMPATIBLE_VERSION;
  readonly sslVersion?: string;
  readonly minimumRequired?: string;
}

/**
 * Network Proxy Configured - Detects network proxy configuration
 * Security Impact: MEDIUM - Potential traffic interception
 */
export interface NetworkProxyConfiguredPayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.NETWORK_PROXY_CONFIGURED;
  readonly proxyHost?: string;
  readonly proxyPort?: string;
  readonly proxyType?: string;
}

/**
 * Debugger Threat Detected - Detects attached debuggers
 * Security Impact: HIGH - Code analysis and manipulation possible
 */
export interface DebuggerThreatDetectedPayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.DEBUGGER_THREAT_DETECTED;
  readonly debuggerType?: string;
  readonly processName?: string;
}

/**
 * App Is Debuggable - Detects if app is in debuggable state
 * Security Impact: MEDIUM - Debugging capabilities exposed
 */
export interface AppIsDebuggablePayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.APP_IS_DEBUGGABLE;
  readonly debugFlag?: string;
}

/**
 * App Integrity Error - Detects app binary modification
 * Security Impact: CRITICAL - App has been tampered with
 */
export interface AppIntegrityErrorPayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.APP_INTEGRITY_ERROR;
  readonly integrityCheck?: string;
  readonly expectedHash?: string;
  readonly actualHash?: string;
}

/**
 * Emulator Found - Detects if app is running in emulator
 * Security Impact: LOW - Testing environment detected
 */
export interface EmulatorFoundPayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.EMULATOR_FOUND;
  readonly emulatorType?: string;
  readonly emulatorIndicators?: string[];
}

/**
 * Google Emulator Detected - Specifically detects Google's emulator
 * Security Impact: LOW - Google development environment detected
 */
export interface GoogleEmulatorDetectedPayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.GOOGLE_EMULATOR_DETECTED;
  readonly googleEmulatorVersion?: string;
}

/**
 * Union type for all specific threat payloads
 */
export type SpecificThreatEventPayload = 
  | RootedDevicePayload
  | UnknownSourcesEnabledPayload
  | SslCertificateValidationFailedPayload
  | SslNonSslConnectionPayload
  | SslIncompatibleVersionPayload
  | NetworkProxyConfiguredPayload
  | DebuggerThreatDetectedPayload
  | AppIsDebuggablePayload
  | AppIntegrityErrorPayload
  | EmulatorFoundPayload
  | GoogleEmulatorDetectedPayload;