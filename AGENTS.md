# AI Coding Agents for Threat-Events Mobile App

## Introduction

This document outlines the role and responsibilities of AI coding agents in developing our Threat-Events mobile application. Our project implements Appdome's "Threat-Events" functionality using the "In-App Detection" method, providing real-time mobile security threat detection and response capabilities.

AI agents will collaborate with human developers to accelerate development while maintaining high code quality standards. Each agent specializes in specific aspects of our mobile application architecture, ensuring comprehensive coverage from UI components to security integrations.

### Project Context
We're building a React Native mobile application using Expo that integrates with Appdome's threat detection capabilities. The application will provide users with real-time visibility into security threats and enable appropriate responses through a clean, intuitive interface.

## Agents

### 1. Frontend Architecture Agent
**Role**: React Native UI/UX Development
**Responsibilities**:
- Implement UI components using Expo Router and TypeScript
- Build compound components following our design system
- Integrate Expo-specific APIs (haptics, system UI, etc.)
- Implement responsive layouts for iOS and Android
- Handle navigation and routing using Expo Router

**Architecture Focus**: 
- `/app` directory structure with file-based routing
- `/components` organization with reusable UI elements
- Theme-aware components using our color scheme system

### 2. State Management Agent
**Role**: Application State and Data Flow
**Responsibilities**:
- Implement React Query for server state management
- Design and build React Context providers for global state
- Handle caching strategies for threat detection data
- Implement optimistic updates for real-time threat responses
- Manage loading, error, and success states

**Architecture Focus**:
- Query invalidation strategies for real-time data
- Context composition patterns
- Type-safe state management with TypeScript

### 3. Security Integration Agent
**Role**: Appdome Threat-Events Integration
**Responsibilities**:
- Integrate Appdome SDK for threat detection
- Implement threat event listeners and handlers
- Build secure communication channels for threat data
- Handle threat response workflows
- Implement proper error handling for security operations

**Architecture Focus**:
- Native module integration with React Native
- Secure data transmission and storage
- Real-time event processing

### 4. Testing & Quality Agent
**Role**: Test Implementation and Code Quality
**Responsibilities**:
- Write unit tests for all business logic
- Implement integration tests for threat detection flows
- Create component tests for UI elements
- Set up end-to-end testing for critical user journeys
- Maintain test coverage and quality metrics

**Architecture Focus**:
- Jest and React Native Testing Library setup
- Mock strategies for Appdome SDK
- Test-driven development practices

### 5. DevOps & Build Agent
**Role**: Build Pipeline and Deployment
**Responsibilities**:
- Configure Expo build processes for iOS and Android
- Set up development and production environments
- Implement continuous integration workflows
- Handle app store deployment processes
- Manage environment-specific configurations

**Architecture Focus**:
- Expo Application Services (EAS) configuration
- Build optimization and bundle analysis
- Environment variable management

## Workflow

### Interacting with Agents

#### Issue Creation Guidelines
When creating issues for AI agents, follow these patterns:

**Good Issue Structure**:
```markdown
## Agent: [Specific Agent Name]
## Component/Feature: [Clear scope]
## User Story: As a [user type], I want [functionality] so that [benefit]

### Technical Requirements:
- [ ] Specific technical criteria
- [ ] Performance requirements
- [ ] Security considerations

### Acceptance Criteria:
- [ ] Testable outcomes
- [ ] UI/UX requirements
- [ ] Integration points

### Architecture Notes:
- Clean Architecture layer this affects
- Related components or services
- State management considerations
```

#### Communication Patterns
1. **Scope Definition**: Clearly define which architectural layer(s) the work affects
2. **Context Sharing**: Reference related components, hooks, or services
3. **Testing Requirements**: Specify test coverage expectations
4. **Integration Points**: Identify dependencies with other agents' work

#### Code Review Process
- All agent contributions must pass TypeScript compilation
- ESLint rules must be satisfied
- Test coverage must meet project standards
- Security-related changes require additional review

### Development Flow
1. **Planning Phase**: Define feature requirements and architecture impact
2. **Implementation Phase**: Agents work on specific components/features
3. **Integration Phase**: Combine agent contributions with integration testing
4. **Review Phase**: Code review focusing on architecture adherence
5. **Deployment Phase**: Build and deploy through established pipelines

## Best Practices

### Test-Driven Development (TDD)
- **Red-Green-Refactor**: Write failing tests, implement minimum code, refactor
- **Unit Testing**: Test business logic in isolation using Jest
- **Component Testing**: Test React components with React Native Testing Library
- **Integration Testing**: Test feature flows end-to-end
- **Mock Strategy**: Mock external dependencies (Appdome SDK, network calls)

**Example Test Structure**:
```typescript
// __tests__/components/ThreatEventCard.test.tsx
import { render, screen } from '@testing-library/react-native';
import { ThreatEventCard } from '@/components/ThreatEventCard';

describe('ThreatEventCard', () => {
  it('displays threat severity correctly', () => {
    const mockThreat = { severity: 'high', type: 'malware' };
    render(<ThreatEventCard threat={mockThreat} />);
    expect(screen.getByText('HIGH')).toBeTruthy();
  });
});
```

### Feature-Based Architecture
Organize code by features rather than file types:

```
app/
├── (tabs)/
│   ├── threats/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── [id].tsx
│   └── dashboard/
components/
├── threats/
│   ├── ThreatEventCard.tsx
│   ├── ThreatActionButton.tsx
│   └── ThreatFilterPanel.tsx
├── dashboard/
│   ├── DashboardStats.tsx
│   └── QuickActions.tsx
└── ui/
    ├── Button.tsx
    └── Card.tsx
```

### Clean Architecture Principles

#### Layer Separation
1. **Presentation Layer**: React components and screens (`/app`, `/components`)
2. **Business Logic Layer**: Hooks and services (`/hooks`, `/services`)
3. **Data Layer**: API clients and data sources (`/api`, `/data`)

#### Dependency Rule
- Inner layers should not depend on outer layers
- Use dependency injection for external services
- Keep business logic framework-agnostic

**Example Clean Architecture Structure**:
```typescript
// Domain layer (business logic)
export interface ThreatEvent {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  timestamp: Date;
  resolved: boolean;
}

// Use case layer
export const useThreatEvents = () => {
  return useQuery({
    queryKey: ['threatEvents'],
    queryFn: fetchThreatEvents,
  });
};

// Presentation layer
export const ThreatEventsList = () => {
  const { data: threats } = useThreatEvents();
  return threats?.map(threat => 
    <ThreatEventCard key={threat.id} threat={threat} />
  );
};
```

### TypeScript Typing Practices

#### Strict Type Safety
- Enable strict mode in `tsconfig.json`
- Use explicit return types for functions
- Avoid `any` type; use `unknown` when necessary
- Implement proper generic constraints

#### Type Organization
```typescript
// types/threat.ts - Domain types
export interface ThreatEvent {
  readonly id: string;
  readonly severity: ThreatSeverity;
  readonly detectedAt: Date;
}

export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

// types/api.ts - API types
export interface ThreatEventResponse {
  events: ThreatEvent[];
  total: number;
  hasMore: boolean;
}

// types/components.ts - Component prop types
export interface ThreatEventCardProps {
  threat: ThreatEvent;
  onResolve: (threatId: string) => Promise<void>;
  compact?: boolean;
}
```

#### React Query Integration
```typescript
// hooks/useThreatEvents.ts
export const useThreatEvents = (filters?: ThreatFilters) => {
  return useQuery({
    queryKey: ['threatEvents', filters],
    queryFn: () => threatService.getEvents(filters),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute for real-time updates
  });
};
```

### Error Handling Patterns

#### Graceful Degradation
- Always provide fallback UI states
- Handle network failures gracefully
- Log security-related errors appropriately

#### Error Boundaries
```typescript
// components/ui/ErrorBoundary.tsx
export class ThreatEventErrorBoundary extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log security-related errors to monitoring service
    securityLogger.error('Threat detection error', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <ThreatErrorFallback onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
```

#### Async Error Handling
```typescript
// hooks/useThreatAction.ts
export const useThreatAction = () => {
  return useMutation({
    mutationFn: async (action: ThreatAction) => {
      try {
        return await threatService.performAction(action);
      } catch (error) {
        if (error instanceof SecurityError) {
          // Handle security-specific errors
          throw new Error('Security action failed. Please contact administrator.');
        }
        throw error;
      }
    },
    onError: (error) => {
      // Toast notification for user feedback
      showErrorToast(error.message);
    },
  });
};
```

### Documentation Standards

#### Component Documentation
```typescript
/**
 * ThreatEventCard displays a single threat event with action buttons.
 * 
 * @component
 * @example
 * ```tsx
 * <ThreatEventCard 
 *   threat={threatEvent} 
 *   onResolve={handleResolve}
 *   compact={false}
 * />
 * ```
 */
export const ThreatEventCard: React.FC<ThreatEventCardProps> = ({
  threat,
  onResolve,
  compact = false,
}) => {
  // Component implementation
};
```

#### Hook Documentation
```typescript
/**
 * Custom hook for managing threat event data with real-time updates.
 * 
 * @param filters - Optional filters to apply to threat events
 * @returns Query object with threat events data and loading states
 * 
 * @example
 * ```tsx
 * const { data: threats, isLoading, error } = useThreatEvents({
 *   severity: 'high',
 *   resolved: false
 * });
 * ```
 */
export const useThreatEvents = (filters?: ThreatFilters) => {
  // Hook implementation
};
```

#### API Documentation
- Document all service methods with JSDoc
- Include request/response examples
- Document error scenarios and status codes
- Provide integration examples

### Security Considerations

#### Data Handling
- Never log sensitive threat data in production
- Implement proper data encryption for stored threat information
- Use secure communication channels for API calls
- Follow OWASP guidelines for mobile security

#### Code Security
- Validate all user inputs
- Sanitize data before displaying
- Implement proper authentication checks
- Regular security dependency updates

### Performance Guidelines

#### React Native Optimization
- Use `React.memo` for expensive components
- Implement proper list virtualization for large datasets
- Optimize image loading and caching
- Monitor bundle size and performance metrics

#### State Management Optimization
- Implement proper query invalidation strategies
- Use optimistic updates for better UX
- Cache frequently accessed data
- Implement proper loading states

## Learning Resources

### Core Technologies
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Query Documentation](https://tanstack.com/query/latest)

### Architecture & Patterns
- [Clean Architecture by Robert Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Native Clean Architecture](https://github.com/eduardomoroni/react-native-clean-architecture)
- [Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)

### Security & Integration
- [Appdome Threat-Events Documentation](https://www.appdome.com/how-to/advanced-threat-intelligence-android-ios/threat-events-ux-ui-control/threat-events-in-app-threat-intelligence-in-react-native-apps/)
- [React Native Security Best Practices](https://reactnative.dev/docs/security)
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security-testing-guide/)

### Testing
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Expo Apps](https://docs.expo.dev/develop/unit-testing/)

---

## Getting Started

For junior developers new to this project:

1. **Environment Setup**: Follow the README.md instructions to set up your development environment
2. **Architecture Review**: Study the clean architecture principles and understand our layer separation
3. **Code Exploration**: Start by examining existing components in `/components` and screens in `/app`
4. **First Contribution**: Look for issues labeled "good first issue" that match your assigned agent role
5. **Testing**: Write tests for any new code following our TDD approach
6. **Security Awareness**: Familiarize yourself with Appdome's threat detection concepts

Remember: When in doubt, ask questions! This project involves security-critical functionality, so clarity and correctness are paramount.