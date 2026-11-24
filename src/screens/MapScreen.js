import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Rescue Map</Text>
      <Text style={styles.subtitle}>
        Coming in the next step. This tab is wired so you can test bottom
        navigation now.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 22,
  },
});
