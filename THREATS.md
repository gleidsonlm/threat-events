# Threat Events Documentation

This document provides detailed information about the supported threat types in the Threat Events mobile security application.

## Overview

The Threat Events system is designed to detect, categorize, and respond to various mobile security threats. Each threat type has specific characteristics, severity levels, and recommended responses to ensure optimal security posture.

## Supported Threat Types

### 1. RootedDevice
**Security Impact:** HIGH  
**Description:** Detects if a device has been rooted/jailbroken, which bypasses normal Android security controls.

**What it means:**
- Device has administrative privileges that circumvent Android's security model
- Potential for unauthorized access to sensitive data
- Increased vulnerability to malware and attacks

**Detection indicators:**
- Presence of `su` binary
- Root management apps (SuperSU, Magisk, etc.)
- Modified system partitions
- Custom recovery systems

**Recommended Actions:**
- Exit the application immediately
- Use a non-rooted device
- Contact support if this appears to be an error
- Log security incident for review

---

### 2. UnknownSourcesEnabled
**Security Impact:** MEDIUM  
**Description:** Detects when "Install from Unknown Sources" setting is enabled on the device.

**What it means:**
- Device allows installation of apps from outside Google Play Store
- Increased risk of malware installation
- Potential for installing tampered or malicious applications

**Detection indicators:**
- Android security setting "Unknown Sources" is enabled
- Third-party app installation is permitted

**Recommended Actions:**
- Go to Settings > Security
- Disable "Unknown Sources" or "Install unknown apps"
- Only install apps from trusted sources like Google Play Store
- Review recently installed apps

---

### 3. DeveloperOptionsEnabled
**Security Impact:** MEDIUM  
**Description:** Detects when Android Developer Options are enabled on the device.

**What it means:**
- Developer Options expose debugging and development features
- USB debugging capabilities are accessible
- Increased attack surface for malicious applications
- Potential for unauthorized access via ADB (Android Debug Bridge)

**Detection indicators:**
- Developer Options menu is accessible in Settings
- USB Debugging may be enabled
- Developer features are exposed

**Recommended Actions:**
- Go to Settings > About Phone and stop tapping "Build Number"
- If Developer Options are visible, go to Settings > Developer Options
- Toggle "Developer Options" to OFF
- Disable "USB Debugging" if enabled
- Restart device to ensure changes take effect
- Only enable when actively developing applications

---

### 4. SslCertificateValidationFailed
**Security Impact:** HIGH  
**Description:** Detects SSL certificate validation failures, indicating potential man-in-the-middle attacks.

**What it means:**
- Secure connection cannot be established
- Certificate chain validation has failed
- Potential interception of network traffic
- Risk of data exposure during transmission

**Detection indicators:**
- Expired certificates
- Invalid certificate chains
- Certificate authority mismatch
- Self-signed certificates in production

**Recommended Actions:**
- Disconnect from current network
- Connect to a trusted network
- Avoid entering sensitive information
- Contact IT support if on corporate network
- Check for proxy or VPN interference

---

### 5. SslNonSslConnection
**Security Impact:** HIGH  
**Description:** Detects unencrypted network connections where SSL/TLS should be used.

**What it means:**
- Data is transmitted without encryption
- Network traffic is vulnerable to interception
- Sensitive information may be exposed
- Communication is not secure

**Detection indicators:**
- HTTP instead of HTTPS connections
- Unencrypted data transmission
- Missing SSL/TLS layer

**Recommended Actions:**
- Ensure HTTPS/SSL is enabled
- Check network configuration
- Avoid transmitting sensitive data
- Use VPN if on public network
- Contact support if issue persists

---

### 6. SslIncompatibleVersion
**Security Impact:** MEDIUM  
**Description:** Detects outdated or incompatible SSL/TLS versions vulnerable to known exploits.

**What it means:**
- Using deprecated encryption protocols
- Vulnerability to known SSL/TLS attacks
- Insufficient encryption strength
- Compatibility issues with secure connections

**Detection indicators:**
- SSL 2.0/3.0 usage
- TLS 1.0/1.1 in contexts requiring higher versions
- Weak cipher suites
- Outdated protocol negotiations

**Recommended Actions:**
- Update device's operating system
- Check for app updates
- Use a different network if possible
- Contact support for assistance
- Avoid sensitive transactions until resolved

---

### 7. NetworkProxyConfigured
**Security Impact:** MEDIUM  
**Description:** Detects network proxy configuration that could intercept traffic.

**What it means:**
- Network traffic is being routed through a proxy
- Potential for traffic monitoring or manipulation
- Possible corporate or malicious proxy
- Network configuration may compromise privacy

**Detection indicators:**
- HTTP/HTTPS proxy settings
- SOCKS proxy configuration
- Transparent proxy detection
- Corporate network proxies

**Recommended Actions:**
- Review proxy settings in device configuration
- Disable proxy if not intentionally configured
- Check for unauthorized network configuration changes
- Use direct connection when possible
- Contact IT support if on corporate network

---

### 8. DebuggerThreatDetected
**Security Impact:** HIGH  
**Description:** Detects attached debuggers that could be used for reverse engineering.

**What it means:**
- Debugging tools are actively attached to the app
- Potential for code analysis and manipulation
- Risk of intellectual property theft
- Vulnerability to runtime attacks

**Detection indicators:**
- GDB or similar debuggers attached
- Development tools connected
- Runtime analysis tools active
- Process debugging enabled

**Recommended Actions:**
- Close any debugging or development tools
- Restart the application
- Use the production version of the app
- Contact support if this appears incorrectly
- Scan device for potentially unwanted programs

---

### 9. AppIsDebuggable
**Security Impact:** MEDIUM  
**Description:** Detects if the application is running in a debuggable state.

**What it means:**
- App was built with debug flags enabled
- Additional attack vectors are exposed
- Debugging capabilities are available
- Not intended for production use

**Detection indicators:**
- Android manifest debuggable flag set to true
- Debug build configuration
- Development version installed
- Testing/beta application

**Recommended Actions:**
- Download the production version from official app store
- Avoid entering sensitive information
- Contact support for the correct app version
- Remove any development/beta versions
- Check app installation source

---

### 10. AppIntegrityError
**Security Impact:** CRITICAL  
**Description:** Detects application binary modification or tampering.

**What it means:**
- **CRITICAL SECURITY BREACH**
- Application has been tampered with
- Binary integrity has been compromised
- Potential malware infection
- App cannot be trusted

**Detection indicators:**
- Hash verification failures
- Code signature mismatches
- Binary modification detected
- Unauthorized app modifications

**Recommended Actions:**
- **IMMEDIATELY exit the application**
- Uninstall the compromised app
- Download from official app store only
- Scan device for malware
- Change any passwords used with this app
- Report incident to security team

---

### 11. EmulatorFound
**Security Impact:** LOW  
**Description:** Detects if the application is running in an emulated environment.

**What it means:**
- App is running on virtual/emulated hardware
- Not running on physical device
- Testing or development environment
- Potential for easier analysis

**Detection indicators:**
- Virtual machine characteristics
- Emulator-specific system properties
- Missing hardware features
- Development environment markers

**Recommended Actions:**
- Use a physical Android device
- Install the app from Google Play Store
- Contact support if you believe this is an error
- Check if device passes Google SafetyNet
- Avoid sensitive operations on emulated devices

---

### 12. GoogleEmulatorDetected
**Security Impact:** LOW  
**Description:** Specifically detects Google's Android emulator environment.

**What it means:**
- Running on Google's official Android emulator
- Development/testing environment
- Not a physical device
- Intended for development purposes

**Detection indicators:**
- Google emulator system properties
- Specific emulator characteristics
- Development SDK environment
- Virtual device configuration

**Recommended Actions:**
- Switch to a physical Android device
- Download the production app from Google Play Store
- Contact support if needed for development access
- Use device for testing purposes only
- Avoid production data on emulated devices

## Severity Levels

### CRITICAL
- Immediate security breach
- Application integrity compromised
- Immediate action required
- **Do not proceed with app usage**

### HIGH
- Significant security risk
- Device or connection compromised
- Strong action recommended
- Avoid sensitive operations

### MEDIUM
- Moderate security concern
- Increased risk environment
- Caution advised
- Monitor and consider remediation

### LOW
- Minor security note
- Development or testing environment
- Informational warning
- Generally safe to proceed with caution

## Integration Guidelines

### For Developers
1. **Handler Registration**: All threat types are automatically registered in the `ThreatHandlerRegistry`
2. **Custom Handlers**: Extend `BaseThreatHandler` to create custom threat handlers
3. **Display Components**: Use `ThreatAlertFactory` to get appropriate display components
4. **Type Safety**: All interfaces use TypeScript for compile-time safety

### For Security Teams
1. **Monitoring**: All threat events are logged for security analysis
2. **Response**: Each threat type includes specific response recommendations
3. **Escalation**: Critical threats (App Integrity) require immediate escalation
4. **Documentation**: Each threat includes detailed security implications

## Example Usage

```typescript
// Create handler for a threat event
const handler = threatHandlerRegistry.createHandler(payload);

// Get threat information
const severity = handler.getSeverity();
const actions = handler.getRecommendedActions();

// Display the threat alert
<ThreatAlertFactory payload={payload} handler={handler} />
```

## Security Considerations

1. **Never ignore CRITICAL threats** - App Integrity errors indicate tampering
2. **Network threats** - SSL issues may indicate active attacks
3. **Device threats** - Rooted devices compromise the security model
4. **Environment threats** - Emulators may be used for analysis
5. **Configuration threats** - Proxies and debug states increase risk

## Support and Contact

For questions about threat detection or false positives:
- Review the threat-specific guidance above
- Check device and network configuration
- Contact technical support with threat code and device information
- For critical threats, contact security team immediately

---

*This documentation is maintained alongside the threat detection system. Updates to threat types or handlers should include corresponding documentation updates.*