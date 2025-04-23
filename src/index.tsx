// Niveles y tipos
export { LogLevel } from './core/logger-types';

// Core Logger
export { Logger } from './core/logger';

// Hooks
export { usePerformance } from './hooks/usePerformance';
export { useLogger } from './hooks/useLogger';

// Performance
export { Perf } from './performance/performance';
export { measureAsync } from './performance/measureAsync';

// Middlewares
export { MiddlewareLogger } from './core/middleware-logger';

// Integraciones (opcionales, tree-shakable)
export { initSentryLogger } from './integrations/sentry';
export { initCrashlyticsLogger } from './integrations/crashlytics';
export { initRemoteLogger } from './integrations/remote';
