import { Logger, LogLevel } from 'react-native-logkit';
import { Text, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';

Logger.configure({
  level: LogLevel.DEBUG,
  enableConsoleLogs: true,
  enablePerformanceLogs: true,
  enableMiddlewareLogs: true,
  formatTimestamp: true,
  errorsToCapture: [0, 1, 2, 3],
});

export default function App() {
  // Example usage of the logger
  useEffect(() => {
    Logger.debug('App', 'Debug message');
    Logger.info('App', 'Info message');
    Logger.warn('App', 'Warning message');
    Logger.error('App', 'Error message');
  }, []);

  return (
    <View style={styles.container}>
      <Text> React Native Logger Example </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
