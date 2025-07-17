/**
 * Threat Handler Registry
 * 
 * Implements Factory and Registry patterns for threat handler management
 */

import { 
  ThreatHandler,
  ThreatHandlerConstructor,
  IThreatHandlerRegistry,
  ThreatEventPayload,
  ThreatEventType
} from '@/types';

import { DefaultThreatHandler } from './DefaultThreatHandler';
import { RootedDeviceHandler } from './RootedDeviceHandler';
import { UnknownSourcesEnabledHandler } from './UnknownSourcesEnabledHandler';
import { SslCertificateValidationFailedHandler } from './SslCertificateValidationFailedHandler';
import { SslNonSslConnectionHandler } from './SslNonSslConnectionHandler';
import { SslIncompatibleVersionHandler } from './SslIncompatibleVersionHandler';
import { NetworkProxyConfiguredHandler } from './NetworkProxyConfiguredHandler';
import { DebuggerThreatDetectedHandler } from './DebuggerThreatDetectedHandler';
import { AppIsDebuggableHandler } from './AppIsDebuggableHandler';
import { AppIntegrityErrorHandler } from './AppIntegrityErrorHandler';
import { EmulatorFoundHandler } from './EmulatorFoundHandler';
import { GoogleEmulatorDetectedHandler } from './GoogleEmulatorDetectedHandler';

/**
 * Registry class for managing threat handlers using Factory pattern
 */
export class ThreatHandlerRegistry implements IThreatHandlerRegistry {
  private handlers: Map<string, ThreatHandlerConstructor> = new Map();

  constructor() {
    this.registerDefaultHandlers();
  }

  /**
   * Register all default threat handlers
   */
  private registerDefaultHandlers(): void {
    this.register(ThreatEventType.ROOTED_DEVICE, RootedDeviceHandler);
    this.register(ThreatEventType.UNKNOWN_SOURCES_ENABLED, UnknownSourcesEnabledHandler);
    this.register(ThreatEventType.SSL_CERTIFICATE_VALIDATION_FAILED, SslCertificateValidationFailedHandler);
    this.register(ThreatEventType.SSL_NON_SSL_CONNECTION, SslNonSslConnectionHandler);
    this.register(ThreatEventType.SSL_INCOMPATIBLE_VERSION, SslIncompatibleVersionHandler);
    this.register(ThreatEventType.NETWORK_PROXY_CONFIGURED, NetworkProxyConfiguredHandler);
    this.register(ThreatEventType.DEBUGGER_THREAT_DETECTED, DebuggerThreatDetectedHandler);
    this.register(ThreatEventType.APP_IS_DEBUGGABLE, AppIsDebuggableHandler);
    this.register(ThreatEventType.APP_INTEGRITY_ERROR, AppIntegrityErrorHandler);
    this.register(ThreatEventType.EMULATOR_FOUND, EmulatorFoundHandler);
    this.register(ThreatEventType.GOOGLE_EMULATOR_DETECTED, GoogleEmulatorDetectedHandler);
  }

  /**
   * Register a threat handler for a specific threat type
   */
  register(threatType: ThreatEventType, handlerConstructor: ThreatHandlerConstructor): void {
    this.handlers.set(threatType, handlerConstructor);
  }

  /**
   * Create appropriate handler for the given payload using Factory pattern
   */
  createHandler(payload: ThreatEventPayload): ThreatHandler {
    const handlerConstructor = this.handlers.get(payload.externalID as ThreatEventType);
    
    if (handlerConstructor) {
      return new handlerConstructor();
    }
    
    // Fallback to default handler for unknown threat types
    return new DefaultThreatHandler();
  }

  /**
   * Get list of all supported threat types
   */
  getSupportedTypes(): ThreatEventType[] {
    return Array.from(this.handlers.keys()) as ThreatEventType[];
  }

  /**
   * Check if a threat type is supported
   */
  isSupported(threatType: string): boolean {
    return this.handlers.has(threatType);
  }

  /**
   * Get handler class for a specific threat type (for testing/introspection)
   */
  getHandlerConstructor(threatType: ThreatEventType): ThreatHandlerConstructor | undefined {
    return this.handlers.get(threatType);
  }
}

// Export singleton instance
export const threatHandlerRegistry = new ThreatHandlerRegistry();