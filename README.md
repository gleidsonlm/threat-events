# Threat-Events Mobile App

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/gleidsonlm/threat-events)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/gleidsonlm/threat-events)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/gleidsonlm/threat-events)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~53.0.17-black.svg)](https://expo.dev/)

A React Native mobile application that implements Appdome's **Threat-Events** functionality using the **"In-App Detection"** method, providing real-time mobile security threat detection and response capabilities.

## 🚀 New Features

### Comprehensive Threat Event System
This application now includes a complete threat event handling system with:

- **11 Specific Threat Types** - Ready to handle all major mobile security threats
- **Severity-Based Classification** - Critical, High, Medium, and Low threat levels
- **Specialized Display Components** - Custom UI for each threat type
- **Handler Registry Pattern** - Extensible architecture for custom threat handlers
- **Type-Safe Implementation** - Full TypeScript support with discriminated unions

### Supported Threat Types

| Threat Type | Severity | Description |
|-------------|----------|-------------|
| `RootedDevice` | HIGH | Detects rooted/jailbroken devices |
| `UnknownSourcesEnabled` | MEDIUM | Install from unknown sources enabled |
| `SslCertificateValidationFailed` | HIGH | SSL certificate validation failures |
| `SslNonSslConnection` | HIGH | Unencrypted network connections |
| `SslIncompatibleVersion` | MEDIUM | Outdated SSL/TLS versions |
| `NetworkProxyConfigured` | MEDIUM | Network proxy detection |
| `DebuggerThreatDetected` | HIGH | Debugger attachment detection |
| `AppIsDebuggable` | MEDIUM | Debug-enabled application state |
| `AppIntegrityError` | **CRITICAL** | Application tampering detected |
| `EmulatorFound` | LOW | Emulator environment detection |
| `GoogleEmulatorDetected` | LOW | Google emulator specific detection |

## 🏗️ Architecture

### Threat Event Handling System

```
┌─────────────────────────────────────────────────────────────┐
│                   Threat Event Flow                         │
├─────────────────────────────────────────────────────────────┤
│  1. Threat Detection (Appdome SDK)                         │
│                    ↓                                        │
│  2. Event Processing (Handler Registry)                    │
│                    ↓                                        │
│  3. Specialized Handlers (Strategy Pattern)                │
│                    ↓                                        │
│  4. Display Components (Factory Pattern)                   │
│                    ↓                                        │
│  5. User Response & Actions                                 │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

#### 🎯 **Threat Handler Registry**
Central registry managing specialized handlers for each threat type using Factory pattern:

```typescript
const handler = threatHandlerRegistry.createHandler(payload);
const severity = handler.getSeverity();
const actions = handler.getRecommendedActions();
```

#### 🎨 **Specialized Display Components**
Custom UI components for different threat types:

- `RootedDeviceAlert` - Shows rooting method and security implications
- `SslCertificateValidationFailedAlert` - Displays certificate chain and validation errors  
- `AppIntegrityErrorAlert` - Critical security warnings for tampered apps
- `GenericThreatAlert` - Fallback for standard threats

#### 🛡️ **Type-Safe Event System**
Discriminated unions and interfaces ensure compile-time safety:

```typescript
export interface RootedDevicePayload extends ThreatEventPayload {
  readonly externalID: ThreatEventType.ROOTED_DEVICE;
  readonly rootingMethod?: string;
  readonly rootIndicators?: string[];
}
```

## 📱 Demo & Usage

The app includes an interactive demo showcasing all threat types. You can:

1. **Select any threat type** from the list
2. **View specialized alerts** with threat-specific information
3. **See recommended actions** for each security issue
4. **Experience the actual UI** users would see during real threats

### Running the Demo

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS or Android
npm run ios
npm run android
```

## 🔧 Integration Guide

### Basic Integration

```typescript
import { threatHandlerRegistry } from '@/handlers';
import { ThreatAlertFactory } from '@/components/threats';

// Handle incoming threat events
const handleThreatEvent = (payload: ThreatEventPayload) => {
  const handler = threatHandlerRegistry.createHandler(payload);
  
  // Get threat information
  const severity = handler.getSeverity();
  const title = handler.getTitle();
  const actions = handler.getRecommendedActions();
  
  // Display appropriate alert
  return <ThreatAlertFactory payload={payload} handler={handler} />;
};
```

### Custom Threat Handlers

```typescript
import { BaseThreatHandler } from '@/handlers';

class CustomThreatHandler extends BaseThreatHandler {
  canHandle(event: ThreatEventPayload): boolean {
    return event.externalID === 'MyCustomThreat';
  }
  
  getSeverity(): ThreatSeverity {
    return ThreatSeverity.HIGH;
  }
  
  // Implement other required methods...
}

// Register custom handler
threatHandlerRegistry.register('MyCustomThreat', CustomThreatHandler);
```

## 📚 Documentation

- **[THREATS.md](./THREATS.md)** - Detailed documentation of all supported threat types
- **[Architecture Guide](#architecture)** - System design and patterns used
- **[API Reference](#api-reference)** - Complete TypeScript interface documentation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/gleidsonlm/threat-events.git
cd threat-events

# Install dependencies
npm install

# Start development server
npm start
```

## 🧪 Testing

The threat system includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Lint code
npm run lint
```

## 🛡️ Security Features

### Threat Severity Classification
- **CRITICAL** - Immediate security breach (App Integrity)
- **HIGH** - Significant security risk (Root, SSL issues)
- **MEDIUM** - Moderate security concern (Debug states, Proxies)
- **LOW** - Minor security note (Emulators)

### Specialized Threat Responses
Each threat type includes:
- ✅ **Threat-specific guidance** for users
- ✅ **Recommended remediation actions**
- ✅ **Security impact explanation**
- ✅ **Visual severity indicators**

### Type Safety
- 🔒 **Discriminated unions** for type-safe threat handling
- 🔒 **Compile-time validation** of threat event structures
- 🔒 **Interface-based design** for extensibility

## 🎨 Design System

The threat alerts follow a consistent design language:

- **Color coding** by severity level
- **Progressive disclosure** of technical details
- **Accessible design** with proper ARIA labels
- **Responsive layout** for different screen sizes

## 🔄 Coming Soon

- **Real Appdome SDK Integration** - Connect to live threat detection
- **Threat Analytics Dashboard** - Historical threat data and trends
- **Custom Response Workflows** - Configurable threat response actions
- **Push Notifications** - Real-time threat alerts
- **Threat Export** - Data export for security analysis

## 📖 Learn More

- [Appdome Threat-Events Documentation](https://www.appdome.com/how-to/advanced-threat-intelligence-android-ios/threat-events-ux-ui-control/threat-events-in-app-threat-intelligence-in-react-native-apps/)
- [React Native Security Best Practices](https://reactnative.dev/docs/security)
- [OWASP Mobile Security Testing Guide](https://owasp.org/www-project-mobile-security-testing-guide/)

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ for mobile security professionals and developers implementing comprehensive threat detection systems.*

## Table of Contents

- [Introduction](#introduction)
- [Architecture Overview](#architecture-overview)
- [Installation & Setup](#installation--setup)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Resources](#resources)

## Introduction

### What are Threat-Events?

Threat-Events are real-time security notifications generated by Appdome's threat detection engine when security threats are detected within your mobile application. These events allow your app to respond immediately to security risks such as:

- **Runtime Application Self-Protection (RASP)** threats
- **Anti-tampering** violations
- **Anti-debugging** attempts
- **Root/Jailbreak** detection
- **Anti-malware** findings
- **Data exfiltration** attempts

### Purpose of This Application

This application demonstrates how to integrate Appdome's Threat-Events using the **"In-App Detection"** method in React Native applications. It provides:

- **Real-time threat detection** and notification
- **Customizable threat response** workflows
- **Clean, intuitive user interface** for threat management
- **Best practices implementation** following clean architecture principles
- **Cross-platform support** for iOS and Android

### Key Features

- 🛡️ **Real-time Security Monitoring** - Immediate threat detection and alerts
- 📱 **Cross-Platform Support** - Native iOS and Android implementation
- 🎨 **Modern UI/UX** - Clean, responsive design with dark/light mode support
- 🏗️ **Clean Architecture** - Separation of concerns and testable code structure
- 🔧 **Customizable Responses** - Flexible threat response configuration
- 📊 **Threat Analytics** - Comprehensive threat tracking and reporting

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Native App                         │
├─────────────────────────────────────────────────────────────┤
│  Presentation Layer                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Home Screen   │  │  Threat Screen  │  │ Settings UI  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Business Logic Layer                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ Threat Handlers │  │  Event Manager  │  │ Config Mgmt  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Data Layer                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ Local Storage   │  │   API Client    │  │ Cache Layer  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Appdome Integration Layer                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  Native Bridge  │  │ Event Listeners │  │ SDK Wrapper  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    Appdome SDK                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ Threat Detector │  │  Event Engine   │  │ Policy Mgmt  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Event Flow Architecture

```
Threat Detection → Event Generation → Event Processing → User Response
       ↓                 ↓                 ↓                ↓
   [Appdome SDK]    [Native Bridge]   [Event Manager]   [UI Response]
       ↓                 ↓                 ↓                ↓
   Monitors App     Forwards Events    Processes Logic   Shows Alert
   Runtime State    to React Native    & Updates State   & Actions
```

### Clean Architecture Principles

Our implementation follows clean architecture principles with clear separation of concerns:

#### 1. **Dependency Rule**
- Inner layers (domain) are independent of outer layers (UI, external services)
- Dependencies point inward, never outward
- Business logic remains framework-agnostic

#### 2. **Layer Responsibilities**

**Presentation Layer (`/app`, `/components`)**
- User interface components
- Screen navigation and routing
- User interaction handling

**Business Logic Layer (`/hooks`, `/services`)**
- Threat event processing logic
- Application use cases
- State management

**Data Layer (`/api`, `/data`)**
- External API communication
- Local data persistence
- Caching strategies

**Integration Layer (`/native`)**
- Appdome SDK integration
- Native module bridges
- Platform-specific implementations

#### 3. **Interface-Based Design**

```typescript
// Domain interfaces (framework-agnostic)
interface ThreatEventRepository {
  getEvents(): Promise<ThreatEvent[]>;
  saveEvent(event: ThreatEvent): Promise<void>;
}

interface ThreatDetectionService {
  startMonitoring(): void;
  stopMonitoring(): void;
  onThreatDetected(callback: ThreatEventHandler): void;
}

// Implementation details are in outer layers
class AppdomeService implements ThreatDetectionService {
  // Appdome-specific implementation
}
```

## Installation & Setup

### Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **iOS Simulator** (for iOS development)
- **Android Studio** with Android SDK (for Android development)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/gleidsonlm/threat-events.git
cd threat-events

# Install dependencies
npm install

# Install iOS dependencies (if on macOS)
cd ios && pod install && cd ..
```

### Step 2: Appdome Configuration

#### 2.1 Appdome Account Setup

1. Sign up for an [Appdome account](https://www.appdome.com/)
2. Create a new project for your mobile app
3. Configure threat detection policies
4. Download the Appdome SDK integration files

#### 2.2 SDK Integration

**For iOS:**
```bash
# Add Appdome SDK to iOS project
cd ios
# Follow Appdome's iOS integration guide
# Add the generated frameworks to your Xcode project
```

**For Android:**
```bash
# Add Appdome SDK to Android project
cd android
# Follow Appdome's Android integration guide
# Add the generated AAR files to your Android project
```

### Step 3: Environment Configuration

Create environment configuration files:

```bash
# Create environment file
cp .env.example .env.local
```

Update `.env.local` with your Appdome configuration:

```env
# Appdome Configuration
APPDOME_API_KEY=your_api_key_here
APPDOME_PROJECT_ID=your_project_id_here
APPDOME_ENVIRONMENT=development # or production

# App Configuration
APP_NAME=Threat-Events
APP_VERSION=1.0.0
```

### Step 4: Platform-Specific Setup

#### iOS Configuration

1. **Xcode Project Setup:**
   ```bash
   cd ios
   open ThreatEvents.xcworkspace
   ```

2. **Info.plist Configuration:**
   ```xml
   <key>AppdomeEnabled</key>
   <true/>
   <key>AppdomeProjectId</key>
   <string>$(APPDOME_PROJECT_ID)</string>
   ```

3. **Build Settings:**
   - Add Appdome frameworks to "Frameworks, Libraries, and Embedded Content"
   - Configure signing certificates for threat detection features

#### Android Configuration

1. **Gradle Configuration (`android/app/build.gradle`):**
   ```gradle
   dependencies {
       implementation 'com.appdome:threat-events:latest-version'
       // Other dependencies
   }
   ```

2. **Manifest Configuration (`android/app/src/main/AndroidManifest.xml`):**
   ```xml
   <application>
       <meta-data
           android:name="appdome.project.id"
           android:value="@string/appdome_project_id" />
       <meta-data
           android:name="appdome.enabled"
           android:value="true" />
   </application>
   ```

### Step 5: Verify Installation

```bash
# Run the app on iOS
npm run ios

# Run the app on Android
npm run android

# Run on web (for development)
npm run web
```

## Usage Examples

### Basic Implementation

#### 1. Initialize Threat Detection

```typescript
// hooks/useThreatDetection.ts
import { useEffect, useCallback } from 'react';
import { ThreatEventService } from '@/services/ThreatEventService';

export const useThreatDetection = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [threats, setThreats] = useState<ThreatEvent[]>([]);

  const startMonitoring = useCallback(async () => {
    try {
      await ThreatEventService.initialize();
      ThreatEventService.onThreatDetected(handleThreatDetected);
      setIsMonitoring(true);
    } catch (error) {
      console.error('Failed to start threat monitoring:', error);
    }
  }, []);

  const handleThreatDetected = useCallback((event: ThreatEvent) => {
    setThreats(prev => [event, ...prev]);
    // Handle threat response based on severity
    handleThreatResponse(event);
  }, []);

  const handleThreatResponse = useCallback((event: ThreatEvent) => {
    switch (event.severity) {
      case 'critical':
        // Immediate app termination or security lockdown
        ThreatEventService.triggerSecurityLockdown();
        break;
      case 'high':
        // Show warning and limit functionality
        showSecurityWarning(event);
        break;
      case 'medium':
        // Log and notify user
        logThreatEvent(event);
        break;
      default:
        // Silent logging
        logThreatEvent(event);
    }
  }, []);

  return {
    isMonitoring,
    threats,
    startMonitoring,
    stopMonitoring: ThreatEventService.stopMonitoring
  };
};
```

#### 2. Threat Event Component

```typescript
// components/threats/ThreatEventCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThreatEvent } from '@/types/threat';

interface ThreatEventCardProps {
  threat: ThreatEvent;
  onResolve: (threatId: string) => Promise<void>;
  compact?: boolean;
}

export const ThreatEventCard: React.FC<ThreatEventCardProps> = ({
  threat,
  onResolve,
  compact = false,
}) => {
  const getSeverityColor = (severity: ThreatSeverity) => {
    const colors = {
      critical: '#FF0000',
      high: '#FF6600',
      medium: '#FFAA00',
      low: '#00AA00',
    };
    return colors[severity] || '#666666';
  };

  const handleResolve = async () => {
    try {
      await onResolve(threat.id);
    } catch (error) {
      console.error('Failed to resolve threat:', error);
    }
  };

  return (
    <View style={[styles.container, { borderLeftColor: getSeverityColor(threat.severity) }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{threat.type}</Text>
        <Text style={[styles.severity, { color: getSeverityColor(threat.severity) }]}>
          {threat.severity.toUpperCase()}
        </Text>
      </View>
      
      {!compact && (
        <Text style={styles.description}>{threat.description}</Text>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {new Date(threat.detectedAt).toLocaleString()}
        </Text>
        
        {!threat.resolved && (
          <TouchableOpacity style={styles.resolveButton} onPress={handleResolve}>
            <Text style={styles.resolveButtonText}>Resolve</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
```

#### 3. Threat Dashboard Screen

```typescript
// app/(tabs)/threats/index.tsx
import React from 'react';
import { FlatList } from 'react-native';
import { useThreatEvents } from '@/hooks/useThreatEvents';
import { ThreatEventCard } from '@/components/threats/ThreatEventCard';
import { ThemedView } from '@/components/ThemedView';

export default function ThreatDashboard() {
  const { 
    data: threats, 
    isLoading, 
    error,
    refetch 
  } = useThreatEvents();

  const { resolveThreat } = useThreatActions();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={threats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThreatEventCard
            threat={item}
            onResolve={resolveThreat}
          />
        )}
        refreshing={isLoading}
        onRefresh={refetch}
        ListEmptyComponent={<EmptyThreatList />}
      />
    </ThemedView>
  );
}
```

### Advanced Usage Patterns

#### 1. Custom Threat Response Configuration

```typescript
// services/ThreatResponseService.ts
interface ThreatResponseConfig {
  severity: ThreatSeverity;
  actions: ThreatAction[];
  userNotification?: NotificationConfig;
  automaticResponse?: boolean;
}

export class ThreatResponseService {
  private config: Map<string, ThreatResponseConfig> = new Map();

  configure(threatType: string, config: ThreatResponseConfig) {
    this.config.set(threatType, config);
  }

  async handleThreat(event: ThreatEvent): Promise<ThreatResponse> {
    const config = this.config.get(event.type);
    
    if (!config) {
      return this.handleUnknownThreat(event);
    }

    const response: ThreatResponse = {
      event,
      actions: [],
      timestamp: new Date(),
    };

    // Execute configured actions
    for (const action of config.actions) {
      try {
        await this.executeAction(action, event);
        response.actions.push({ ...action, status: 'success' });
      } catch (error) {
        response.actions.push({ ...action, status: 'failed', error });
      }
    }

    // Send user notification if configured
    if (config.userNotification) {
      await this.sendNotification(event, config.userNotification);
    }

    return response;
  }
}
```

#### 2. Real-time Threat Monitoring with React Query

```typescript
// hooks/useThreatEvents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useThreatEvents = (filters?: ThreatFilters) => {
  return useQuery({
    queryKey: ['threatEvents', filters],
    queryFn: () => ThreatEventService.getEvents(filters),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute for real-time updates
    onError: (error) => {
      console.error('Failed to fetch threat events:', error);
    },
  });
};

export const useThreatActions = () => {
  const queryClient = useQueryClient();

  const resolveThreat = useMutation({
    mutationFn: (threatId: string) => ThreatEventService.resolve(threatId),
    onSuccess: () => {
      // Invalidate and refetch threat events
      queryClient.invalidateQueries({ queryKey: ['threatEvents'] });
    },
    onError: (error) => {
      console.error('Failed to resolve threat:', error);
    },
  });

  return { resolveThreat: resolveThreat.mutate };
};
```

## API Reference

### Core Interfaces

#### ThreatEvent

```typescript
interface ThreatEvent {
  readonly id: string;
  readonly type: ThreatType;
  readonly severity: ThreatSeverity;
  readonly description: string;
  readonly detectedAt: Date;
  readonly resolved: boolean;
  readonly metadata?: ThreatMetadata;
}

type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

type ThreatType = 
  | 'runtime_protection'
  | 'anti_tampering'
  | 'anti_debugging'
  | 'root_detection'
  | 'jailbreak_detection'
  | 'anti_malware'
  | 'data_exfiltration';
```

#### ThreatEventService

```typescript
interface ThreatEventService {
  /**
   * Initialize the threat detection service
   */
  initialize(config?: ThreatDetectionConfig): Promise<void>;

  /**
   * Start monitoring for threats
   */
  startMonitoring(): Promise<void>;

  /**
   * Stop threat monitoring
   */
  stopMonitoring(): Promise<void>;

  /**
   * Register a threat event handler
   */
  onThreatDetected(handler: ThreatEventHandler): void;

  /**
   * Get all detected threat events
   */
  getEvents(filters?: ThreatFilters): Promise<ThreatEvent[]>;

  /**
   * Resolve a specific threat
   */
  resolve(threatId: string): Promise<void>;

  /**
   * Get service status
   */
  getStatus(): ThreatServiceStatus;
}
```

#### Configuration Options

```typescript
interface ThreatDetectionConfig {
  // Enable/disable specific threat types
  threatTypes: {
    runtimeProtection: boolean;
    antiTampering: boolean;
    antiDebugging: boolean;
    rootDetection: boolean;
    jailbreakDetection: boolean;
    antiMalware: boolean;
    dataExfiltration: boolean;
  };

  // Response configuration
  response: {
    autoResolve: boolean;
    notificationEnabled: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };

  // Performance settings
  performance: {
    monitoringInterval: number; // milliseconds
    maxEventHistory: number;
    enableCaching: boolean;
  };
}
```

### Event Handlers

#### ThreatEventHandler

```typescript
type ThreatEventHandler = (event: ThreatEvent) => void | Promise<void>;

// Example usage
const handleThreat: ThreatEventHandler = async (event) => {
  console.log('Threat detected:', event);
  
  // Custom logic based on threat type
  switch (event.type) {
    case 'root_detection':
      await handleRootDetection(event);
      break;
    case 'anti_tampering':
      await handleTamperingAttempt(event);
      break;
    default:
      await handleGenericThreat(event);
  }
};
```

### Utility Functions

```typescript
/**
 * Format threat event for display
 */
export const formatThreatEvent = (event: ThreatEvent): string => {
  return `[${event.severity.toUpperCase()}] ${event.type}: ${event.description}`;
};

/**
 * Check if threat requires immediate action
 */
export const requiresImmediateAction = (event: ThreatEvent): boolean => {
  return event.severity === 'critical' || event.severity === 'high';
};

/**
 * Get threat severity color
 */
export const getThreatSeverityColor = (severity: ThreatSeverity): string => {
  const colors = {
    critical: '#FF0000',
    high: '#FF6600',
    medium: '#FFAA00',
    low: '#00AA00',
  };
  return colors[severity] || '#666666';
};
```

## Best Practices

### Security Considerations

#### 1. **Data Protection**
```typescript
// ✅ Good: Encrypt sensitive threat data
const encryptThreatData = (data: ThreatEvent): string => {
  return CryptoService.encrypt(JSON.stringify(data));
};

// ❌ Bad: Store sensitive data in plain text
localStorage.setItem('threats', JSON.stringify(threats));
```

#### 2. **Input Validation**
```typescript
// ✅ Good: Validate threat event data
const validateThreatEvent = (event: unknown): event is ThreatEvent => {
  return (
    typeof event === 'object' &&
    event !== null &&
    'id' in event &&
    'type' in event &&
    'severity' in event &&
    typeof event.id === 'string' &&
    VALID_THREAT_TYPES.includes(event.type as ThreatType)
  );
};
```

#### 3. **Secure Communication**
```typescript
// ✅ Good: Use secure HTTPS endpoints
const API_BASE_URL = 'https://secure-api.example.com';

// ✅ Good: Implement certificate pinning
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  httpsAgent: new https.Agent({
    // Certificate pinning configuration
  }),
});
```

### Performance Optimization

#### 1. **Efficient State Management**
```typescript
// ✅ Good: Use React.memo for expensive components
export const ThreatEventCard = React.memo<ThreatEventCardProps>(({
  threat,
  onResolve,
}) => {
  // Component implementation
});

// ✅ Good: Optimize list rendering
const keyExtractor = useCallback((item: ThreatEvent) => item.id, []);
const renderThreatItem = useCallback(({ item }: { item: ThreatEvent }) => (
  <ThreatEventCard threat={item} onResolve={resolveThreat} />
), [resolveThreat]);
```

#### 2. **Intelligent Caching**
```typescript
// ✅ Good: Implement smart caching strategy
export const useThreatEvents = (filters?: ThreatFilters) => {
  return useQuery({
    queryKey: ['threatEvents', filters],
    queryFn: () => ThreatEventService.getEvents(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};
```

#### 3. **Background Processing**
```typescript
// ✅ Good: Process threats in background
const processThreatInBackground = async (event: ThreatEvent) => {
  // Use setTimeout to avoid blocking UI
  setTimeout(async () => {
    await ThreatAnalyticsService.analyze(event);
    await ThreatStorageService.persist(event);
  }, 0);
};
```

### UX Recommendations

#### 1. **Progressive Disclosure**
```typescript
// ✅ Good: Show threat summary first, details on demand
export const ThreatEventCard = ({ threat, compact = false }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <ThreatSummary threat={threat} />
      {(expanded || !compact) && (
        <ThreatDetails threat={threat} />
      )}
      {compact && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text>View Details</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
```

#### 2. **Clear Visual Hierarchy**
```typescript
// ✅ Good: Use consistent styling for threat severity
const getThreatStyles = (severity: ThreatSeverity) => ({
  container: {
    borderLeftWidth: 4,
    borderLeftColor: getThreatSeverityColor(severity),
    backgroundColor: severity === 'critical' ? '#FFF5F5' : '#FFFFFF',
  },
  title: {
    fontWeight: severity === 'critical' ? 'bold' : 'normal',
    color: severity === 'critical' ? '#C53030' : '#2D3748',
  },
});
```

#### 3. **Accessible Design**
```typescript
// ✅ Good: Include accessibility features
<TouchableOpacity
  accessible={true}
  accessibilityLabel={`Threat: ${threat.type}, Severity: ${threat.severity}`}
  accessibilityHint="Double tap to view threat details"
  accessibilityRole="button"
>
  <ThreatEventCard threat={threat} />
</TouchableOpacity>
```

### Testing Recommendations

#### 1. **Unit Testing**
```typescript
// __tests__/services/ThreatEventService.test.ts
describe('ThreatEventService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default configuration', async () => {
    await ThreatEventService.initialize();
    expect(ThreatEventService.getStatus().initialized).toBe(true);
  });

  it('should handle threat detection correctly', async () => {
    const mockHandler = jest.fn();
    ThreatEventService.onThreatDetected(mockHandler);
    
    const mockThreat: ThreatEvent = {
      id: 'test-1',
      type: 'root_detection',
      severity: 'high',
      description: 'Root access detected',
      detectedAt: new Date(),
      resolved: false,
    };

    // Simulate threat detection
    await ThreatEventService.simulateThreat(mockThreat);
    
    expect(mockHandler).toHaveBeenCalledWith(mockThreat);
  });
});
```

#### 2. **Integration Testing**
```typescript
// __tests__/hooks/useThreatDetection.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useThreatDetection } from '@/hooks/useThreatDetection';

describe('useThreatDetection', () => {
  it('should start monitoring and detect threats', async () => {
    const { result } = renderHook(() => useThreatDetection());

    await act(async () => {
      await result.current.startMonitoring();
    });

    expect(result.current.isMonitoring).toBe(true);
    expect(result.current.threats).toEqual([]);
  });
});
```

#### 3. **Mock Appdome SDK**
```typescript
// __mocks__/AppdomeSDK.ts
export const mockAppdomeSDK = {
  initialize: jest.fn(),
  startMonitoring: jest.fn(),
  stopMonitoring: jest.fn(),
  onThreatDetected: jest.fn(),
  simulateThreat: jest.fn(),
};

// Setup in test files
jest.mock('@/services/AppdomeSDK', () => mockAppdomeSDK);
```

## Troubleshooting

### Common Issues and Solutions

#### 1. **Threat Detection Not Working**

**Symptoms:**
- No threat events are generated
- `ThreatEventService` initialization fails
- Monitoring status remains false

**Solutions:**
```typescript
// Check initialization status
const status = ThreatEventService.getStatus();
console.log('Service Status:', status);

// Verify configuration
const config = await ThreatEventService.getConfiguration();
console.log('Current Config:', config);

// Test with simulated threat
await ThreatEventService.simulateThreat({
  id: 'test-threat',
  type: 'anti_debugging',
  severity: 'medium',
  description: 'Test threat for debugging',
  detectedAt: new Date(),
  resolved: false,
});
```

**Common Causes:**
- Incorrect Appdome SDK configuration
- Missing native module linking
- Insufficient permissions on device
- Development build vs. production build differences

#### 2. **Performance Issues**

**Symptoms:**
- App becomes slow when threat monitoring is active
- High memory usage
- Battery drain on device

**Solutions:**
```typescript
// Optimize monitoring interval
const optimizedConfig: ThreatDetectionConfig = {
  // ... other config
  performance: {
    monitoringInterval: 5000, // Increase from 1000ms to 5000ms
    maxEventHistory: 100, // Limit event history
    enableCaching: true, // Enable caching
  },
};

// Implement event throttling
const throttledHandler = useMemo(
  () => throttle(handleThreatDetected, 1000),
  [handleThreatDetected]
);
```

#### 3. **Platform-Specific Issues**

**iOS Issues:**
```bash
# Common iOS troubleshooting steps
cd ios
pod install --repo-update
cd ..

# Clean build
npx react-native clean
npm run ios
```

**Android Issues:**
```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Rebuild
npm run android
```

### Debugging Tips

#### 1. **Enable Debug Logging**
```typescript
// Enable detailed logging
ThreatEventService.setLogLevel('debug');

// Monitor service events
ThreatEventService.onServiceEvent((event) => {
  console.log('Service Event:', event);
});
```

#### 2. **Use Development Tools**
```typescript
// Add debugging utilities in development
if (__DEV__) {
  // Global access to threat service for debugging
  (global as any).ThreatEventService = ThreatEventService;
  
  // Debug panel for testing
  import('./DevTools/ThreatDebugPanel').then((module) => {
    module.showDebugPanel();
  });
}
```

#### 3. **Network Debugging**
```typescript
// Monitor API calls
import { setupInterceptors } from '@/utils/apiInterceptors';

if (__DEV__) {
  setupInterceptors({
    onRequest: (config) => console.log('API Request:', config),
    onResponse: (response) => console.log('API Response:', response),
    onError: (error) => console.log('API Error:', error),
  });
}
```

### How to Report Issues

#### 1. **Gather Information**
Before reporting an issue, collect:

- App version and build number
- Device information (OS version, model)
- Threat detection configuration
- Steps to reproduce the issue
- Console logs and error messages

#### 2. **Create a Minimal Reproduction**
```typescript
// Example minimal reproduction case
const reproductionCase = {
  configuration: {
    threatTypes: { rootDetection: true },
    response: { autoResolve: false },
  },
  steps: [
    '1. Initialize threat detection service',
    '2. Start monitoring',
    '3. Trigger root detection test',
    '4. Observe: No event is generated',
  ],
  expectedBehavior: 'Threat event should be generated',
  actualBehavior: 'No event generated, no errors in console',
};
```

#### 3. **Issue Template**
```markdown
## Bug Report

### Description
Brief description of the issue

### Environment
- App Version: 1.0.0
- React Native Version: 0.79.5
- Platform: iOS 17.0 / Android 14
- Device: iPhone 15 Pro / Pixel 8

### Configuration
```typescript
// Your threat detection configuration
```

### Steps to Reproduce
1. Step one
2. Step two
3. Step three

### Expected Behavior
What should happen

### Actual Behavior
What actually happens

### Console Output
```
Paste console logs here
```

### Additional Context
Any other relevant information
```

## Contributing

We welcome contributions to the Threat-Events Mobile App! This section will guide you through the process.

### Development Setup

#### 1. **Fork and Clone**
```bash
# Fork the repository on GitHub
git clone https://github.com/YOUR_USERNAME/threat-events.git
cd threat-events

# Add upstream remote
git remote add upstream https://github.com/gleidsonlm/threat-events.git
```

#### 2. **Install Dependencies**
```bash
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

#### 3. **Development Environment**
```bash
# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### Coding Standards

#### 1. **TypeScript Guidelines**
- Use strict TypeScript configuration
- Provide explicit return types for functions
- Avoid `any` type; use `unknown` when necessary
- Use proper generic constraints

```typescript
// ✅ Good
interface ThreatHandler<T extends ThreatEvent> {
  handle(event: T): Promise<ThreatResponse>;
}

// ❌ Bad
interface ThreatHandler {
  handle(event: any): any;
}
```

#### 2. **React Native Best Practices**
- Use functional components with hooks
- Implement proper prop typing
- Use React.memo for performance optimization
- Follow clean component structure

```typescript
// ✅ Good component structure
interface Props {
  threat: ThreatEvent;
  onAction: (action: ThreatAction) => void;
}

export const ThreatCard: React.FC<Props> = React.memo(({ threat, onAction }) => {
  // Component implementation
});
```

#### 3. **Clean Architecture**
- Separate business logic from UI components
- Use dependency injection for services
- Implement proper error boundaries
- Follow the dependency rule

### Testing Requirements

#### 1. **Test Coverage**
- Minimum 80% code coverage for new features
- Unit tests for all business logic
- Component tests for UI elements
- Integration tests for critical flows

#### 2. **Testing Guidelines**
```typescript
// Unit test example
describe('ThreatEventService', () => {
  it('should process threat events correctly', async () => {
    const mockEvent = createMockThreatEvent();
    const result = await ThreatEventService.process(mockEvent);
    expect(result.status).toBe('processed');
  });
});

// Component test example
describe('ThreatEventCard', () => {
  it('should display threat information correctly', () => {
    const mockThreat = createMockThreat();
    render(<ThreatEventCard threat={mockThreat} onAction={jest.fn()} />);
    expect(screen.getByText(mockThreat.type)).toBeTruthy();
  });
});
```

#### 3. **Running Tests**
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Pull Request Process

#### 1. **Before Creating a PR**
- [ ] Run tests and ensure they pass
- [ ] Run linter and fix any issues
- [ ] Update documentation if necessary
- [ ] Add/update tests for new functionality

#### 2. **PR Checklist**
```markdown
- [ ] Code follows the project coding standards
- [ ] Tests pass and coverage is maintained
- [ ] Documentation is updated
- [ ] Changes are backward compatible
- [ ] Security implications are considered
- [ ] Performance impact is evaluated
```

#### 3. **PR Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Security Considerations
Describe any security implications

## Performance Impact
Describe any performance implications
```

### Code Review Guidelines

#### 1. **For Authors**
- Write clear, descriptive commit messages
- Keep PRs focused and reasonably sized
- Respond to feedback promptly
- Update PRs based on review comments

#### 2. **For Reviewers**
- Review for correctness, security, and performance
- Check adherence to coding standards
- Verify test coverage and quality
- Provide constructive feedback

### Release Process

#### 1. **Version Management**
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

#### 2. **Release Steps**
```bash
# Update version
npm version patch|minor|major

# Generate changelog
npm run changelog

# Create release PR
git push origin release/v1.x.x
```

## Resources

### Official Documentation
- [Threat-Events In-App Threat Intelligence in React Native Apps](https://www.appdome.com/how-to/advanced-threat-intelligence-android-ios/threat-events-ux-ui-control/threat-events-in-app-threat-intelligence-in-react-native-apps/)
- [Threat-Events in Android & iOS Apps Explained](https://www.appdome.com/how-to/advanced-threat-intelligence-android-ios/threat-events-ux-ui-control/threat-events-in-android-ios-apps-explained/)
- [Threat-Events Best Practices](https://www.appdome.com/how-to/advanced-threat-intelligence-android-ios/threat-events-ux-ui-control/hreat-events-best-practices/)

### Technical Resources
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Query Documentation](https://tanstack.com/query/latest)

### Security Resources
- [OWASP Mobile Security Testing Guide](https://owasp.org/www-project-mobile-security-testing-guide/)
- [React Native Security Best Practices](https://reactnative.dev/docs/security)
- [Mobile App Security Checklist](https://github.com/OWASP/owasp-mstg/tree/master/Checklists)

### Community
- [GitHub Issues](https://github.com/gleidsonlm/threat-events/issues)
- [GitHub Discussions](https://github.com/gleidsonlm/threat-events/discussions)
- [Appdome Community](https://www.appdome.com/community/)

### Support
- **Documentation Issues**: [Report here](https://github.com/gleidsonlm/threat-events/issues/new?template=documentation.md)
- **Bug Reports**: [Report here](https://github.com/gleidsonlm/threat-events/issues/new?template=bug_report.md)
- **Feature Requests**: [Request here](https://github.com/gleidsonlm/threat-events/issues/new?template=feature_request.md)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Appdome](https://www.appdome.com/) for providing the threat detection SDK and documentation
- [Expo](https://expo.dev/) for the excellent React Native development platform
- The React Native community for continuous support and contributions

---

*For more information about implementing threat detection in your mobile applications, visit the [Appdome Documentation](https://www.appdome.com/docs/).*