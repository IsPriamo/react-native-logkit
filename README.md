
---

# 📝 React Native LogKit

[![npm version](https://img.shields.io/npm/v/react-native-logkit.svg)](https://www.npmjs.com/package/react-native-logkit)
[![license](https://img.shields.io/github/license/IsPriamo/react-native-logkit.svg)](LICENSE)

A flexible, modular, and extensible logging system for **React Native** apps — with built-in support for performance monitoring, visual error overlays, and integrations like **Sentry** and **Crashlytics**.

---

## ✨ Features

- 📊 **Multiple log levels**: `DEBUG`, `INFO`, `WARN`, `ERROR`, `PERF`, `MID`
- 🎨 **Color-coded logs** in the console
- ⚙️ **Configurable output and behavior**
- 🧩 **Optional integrations**: Sentry, Firebase Crashlytics, custom remotes
- 🧵 **Tag-based logging** for better categorization
- 🧪 **Performance tracking** with hooks and utility methods
- ⚡ **Lightweight core**, with modular opt-in extensions

---

## 📦 Installation

```bash
npm install react-native-logkit
# o
yarn add react-native-logkit
```

### 📦 Optional dependencies

If you want to use additional integrations:

```bash
# For Sentry
npm install @sentry/react-native

# For Crashlytics (Firebase)
npm install @react-native-firebase/crashlytics
```

---

## 🔰 Basic Usage

```ts
import { Logger } from 'react-native-logkit';

Logger.debug('Auth', 'Login started');
Logger.info('User', 'User logged in', { id: '123' });
Logger.warn('API', 'Slow response time');
Logger.error('Network', 'Connection failed');
```

---

## 🔌 Integrations

### ✅ Enable Sentry

```ts
import { initSentryLogger } from 'react-native-logkit/integrations';

initSentryLogger();
```

- Logs at `ERROR` level will be sent to Sentry
- Logs at `DEBUG`, `INFO`, and `WARN` will be added as breadcrumbs

---

### ✅ Enable Crashlytics

```ts
import { initCrashlyticsLogger } from 'react-native-logkit/integrations';

initCrashlyticsLogger();
```

---

## ⏱️ Performance Tracking

### With React Components

```ts
import { usePerformance } from 'react-native-logkit';

const MyComponent = () => {
  const perf = usePerformance('MyComponent');

  useEffect(() => {
    perf.start('fetchData');

    fetchData().then(() => {
      perf.end('fetchData');
    });
  }, []);

  return <Text>Hello</Text>;
};
```

### As a Utility (non-component)

```ts
import { Perf } from 'react-native-logkit';

Perf.start('fetchData');

// Your logic...

Perf.end('fetchData');
```

---

## 🪝 useLogger (React Hook)

```ts
import { useLogger } from 'react-native-logkit';

const MyComponent = () => {
  const log = useLogger('MyComponent');

  useEffect(() => {
    log.info('Mounted');
  }, []);

  return <Text>...</Text>;
};
```

---

## 📚 API Reference

### Logger Methods

```ts
Logger.debug(tag: string, ...args: any[]): void
Logger.info(tag: string, ...args: any[]): void
Logger.warn(tag: string, ...args: any[]): void
Logger.error(tag: string, ...args: any[]): void
```

### Configuration

```ts
Logger.setLevel(LogLevel.INFO);
Logger.getLevel(); // returns current level
Logger.reset(); // resets to default
```

---

## 🔌 Custom Adapters

You can register adapters to handle logs in custom ways:

```ts
Logger.registerAdapter({
  key: 'customAdapter',
  log: (level, tag, message) => {
    console.log('🔄 Forwarded log:', level, tag, message);
  },
});
```

To avoid duplicates, adapters must have a unique `key`.

---

## 🧪 Log Levels

| Level   | Description              |
|---------|--------------------------|
| DEBUG   | Detailed debug info      |
| INFO    | Informational messages   |
| WARN    | Warning conditions       |
| ERROR   | Error conditions         |
| SILENT  | Disable all logging      |
| PERF    | Performance tracking     |
| MID     | Middleware logging       |

---

## 🧼 Reset / Clean Logs

```ts
Logger.reset(); // Clears adapters and resets config
```

---

## 📄 License

MIT © [IsPriamo](https://github.com/IsPriamo)

---
