import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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
          This app monitors for mobile security threats using Appdome's protection system.
          When threats are detected, you'll receive real-time alerts with appropriate guidance.
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
