# Appdome SDK Native Module Integration Guide

This document provides instructions for implementing the native module bridge required for real Appdome threat event integration.

## Overview

The React Native app is now ready to receive threat events from the Appdome SDK, but requires a native module bridge to be implemented in the native Android/iOS code. This bridge will capture threat events from the Appdome SDK and forward them to the React Native layer.

## Required Native Implementation

### Android Implementation (Java/Kotlin)

Create `android/app/src/main/java/com/threatevents/AppdomeSDKModule.java`:

```java
package com.threatevents;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class AppdomeSDKModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;

    public AppdomeSDKModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AppdomeSDK";
    }

    @ReactMethod
    public void initializeThreatDetection(Promise promise) {
        try {
            // Initialize Appdome threat detection
            // This will be replaced with actual Appdome SDK initialization
            boolean isProtected = checkAppdomeProtection();
            
            if (isProtected) {
                setupThreatEventListeners();
            }
            
            promise.resolve(isProtected);
        } catch (Exception e) {
            promise.reject("INIT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getAppdomeConfig(Promise promise) {
        try {
            WritableMap config = Arguments.createMap();
            config.putBoolean("isProtected", checkAppdomeProtection());
            config.putString("version", getAppdomeVersion());
            // Add more config details as needed
            
            promise.resolve(config);
        } catch (Exception e) {
            promise.reject("CONFIG_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void triggerThreatCheck(Promise promise) {
        try {
            // Trigger manual threat check for testing
            // This would call Appdome SDK methods
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("THREAT_CHECK_ERROR", e.getMessage());
        }
    }

    private boolean checkAppdomeProtection() {
        // Check if Appdome protections are active
        // This will be replaced with actual Appdome SDK calls
        return false; // Return true when Appdome is integrated
    }

    private String getAppdomeVersion() {
        // Get Appdome SDK version
        return "1.0.0";
    }

    private void setupThreatEventListeners() {
        // Setup listeners for Appdome threat events
        // When a threat is detected by Appdome, call sendThreatEvent()
    }

    private void sendThreatEvent(WritableMap threatData) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("AppdomeThreaEvent", threatData);
    }
}
```

### iOS Implementation (Swift/Objective-C)

Create `ios/ThreatEvents/AppdomeSDKModule.swift`:

```swift
import Foundation
import React

@objc(AppdomeSDKModule)
class AppdomeSDKModule: RCTEventEmitter {
    
    override func supportedEvents() -> [String]! {
        return ["AppdomeThreaEvent"]
    }
    
    @objc
    func initializeThreatDetection(_ resolve: @escaping RCTPromiseResolveBlock, 
                                  rejecter reject: @escaping RCTPromiseRejectBlock) {
        do {
            let isProtected = checkAppdomeProtection()
            
            if isProtected {
                setupThreatEventListeners()
            }
            
            resolve(isProtected)
        } catch {
            reject("INIT_ERROR", error.localizedDescription, error)
        }
    }
    
    @objc
    func getAppdomeConfig(_ resolve: @escaping RCTPromiseResolveBlock, 
                         rejecter reject: @escaping RCTPromiseRejectBlock) {
        let config: [String: Any] = [
            "isProtected": checkAppdomeProtection(),
            "version": getAppdomeVersion()
        ]
        resolve(config)
    }
    
    @objc
    func triggerThreatCheck(_ resolve: @escaping RCTPromiseResolveBlock, 
                           rejecter reject: @escaping RCTPromiseRejectBlock) {
        // Trigger manual threat check
        resolve(nil)
    }
    
    private func checkAppdomeProtection() -> Bool {
        // Check if Appdome protections are active
        return false // Return true when Appdome is integrated
    }
    
    private func getAppdomeVersion() -> String {
        return "1.0.0"
    }
    
    private func setupThreatEventListeners() {
        // Setup listeners for Appdome threat events
    }
    
    private func sendThreatEvent(_ threatData: [String: Any]) {
        sendEvent(withName: "AppdomeThreaEvent", body: threatData)
    }
}
```

### Module Registration

#### Android
Add to `android/app/src/main/java/com/threatevents/MainApplication.java`:

```java
import com.threatevents.AppdomeSDKModule;

// In the getPackages() method:
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        // Add the Appdome SDK module
        new ReactPackage() {
            @Override
            public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
                return Arrays.<NativeModule>asList(new AppdomeSDKModule(reactContext));
            }
            
            @Override
            public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
                return Collections.emptyList();
            }
        }
    );
}
```

#### iOS
Add to `ios/ThreatEvents/ThreatEvents-Bridging-Header.h`:

```objc
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
```

## Appdome Integration Steps

### 1. Apply Appdome Protections
- Upload your app to the Appdome platform
- Configure the desired security features:
  - Anti-Tampering
  - Root/Jailbreak Detection  
  - SSL Pinning
  - Debugger Detection
  - etc.
- Download the protected app

### 2. Configure Threat Events
In the Appdome platform, enable "Threat Events" feature:
- Select "In-App Detection" method
- Configure which threats should trigger events
- Set up event data format

### 3. Implement Native Handlers
Replace the stub methods in the native modules with actual Appdome SDK calls:

```java
// Android - Example of real Appdome integration
private void setupThreatEventListeners() {
    // Appdome SDK integration would look something like:
    AppdomeSDK.setThreatEventListener(new ThreatEventListener() {
        @Override
        public void onThreatDetected(ThreatEvent event) {
            WritableMap threatData = convertThreatEventToMap(event);
            sendThreatEvent(threatData);
        }
    });
}
```

### 4. Test Integration
1. Build the app with Appdome protections
2. Install on a test device
3. Trigger threat conditions (e.g., run on rooted device)
4. Verify threat events appear in the React Native app

## Event Data Format

The threat events should be converted to this format before sending to React Native:

```javascript
{
  reasonCode: "5001",
  deviceID: "device-identifier",
  externalID: "RootedDevice", // Threat type
  message: "Device root access detected",
  threatCode: "RT001",
  timestamp: "1640995200",
  // ... other Appdome SDK fields
}
```

## Testing Without Appdome

For development/testing without Appdome protections:
- The app will show "Appdome protection not active" status
- The demo system remains available for UI testing
- In debug mode, you can trigger mock threat events

## Troubleshooting

### Common Issues:
1. **Events not received**: Check native module registration
2. **App crashes**: Verify Appdome SDK integration
3. **Wrong event format**: Check data transformation in native code

### Debug Steps:
1. Check native module logs
2. Verify React Native bridge communication
3. Test threat event emission from native side
4. Validate JSON data structure

## Security Considerations

- Never log sensitive threat data in production
- Implement proper error handling for all threat scenarios
- Ensure threat events are processed securely
- Consider threat event persistence and recovery

---

## Next Steps

1. Implement the native modules as described above
2. Integrate with actual Appdome SDK in native code
3. Test with real threat scenarios
4. Deploy protected app to production