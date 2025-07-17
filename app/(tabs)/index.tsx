import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThreatEventDemo from '@/components/ThreatEventDemo';
import RealTimeThreatHandler from '@/components/RealTimeThreatHandler';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Threat Events</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Mobile Security Threat Detection</ThemedText>
        <ThemedText>
          This app demonstrates the threat event handling system for mobile security threats.
          The system can detect and respond to various security issues including rooted devices,
          SSL certificate problems, app integrity violations, and more.
        </ThemedText>
      </ThemedView>

      {/* Real-time threat detection */}
      <ThemedView style={styles.stepContainer}>
        <RealTimeThreatHandler
          showStatus={true}
          autoDismissLowThreats={true}
          onThreatDetected={(payload) => {
            console.log('Real threat detected:', payload);
          }}
        />
      </ThemedView>

      {/* Demo system for testing */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Demo System (Testing Only)</ThemedText>
        <ThemedText style={styles.demoNote}>
          The demo below shows mock threat events for development and testing purposes.
          When Appdome protections are active, real threats will be displayed above.
        </ThemedText>
        <ThreatEventDemo />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  demoNote: {
    fontSize: 13,
    fontStyle: 'italic',
    opacity: 0.7,
    marginBottom: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
