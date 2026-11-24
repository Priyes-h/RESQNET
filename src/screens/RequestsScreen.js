import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export default function RequestsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assistance Requests</Text>
      <Text style={styles.subtitle}>
        Coming soon. This placeholder keeps the Requests tab functional for
        navigation testing.
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
