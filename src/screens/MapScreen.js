import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export default function MapScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>RESQNET NETWORK</Text>
        <Text style={styles.title}>LIVE RESCUE MAP</Text>
      </View>

      <View style={styles.placeholder}>
        <View style={styles.iconCircle}>
          <Ionicons name="map-outline" size={54} color={colors.emergency} />
        </View>
        <View style={styles.badge}><View style={styles.badgeDot} /><Text style={styles.badgeText}>COMING SOON</Text></View>
        <Text style={styles.message}>MAP WILL BE HERE</Text>
        <Text style={styles.description}>
          A centralized map showing the locations of registered rescue and relief agencies will be integrated in a future version.
        </Text>
        <View style={styles.decorativeLine} />
        <Text style={styles.footer}>Connecting agencies. Strengthening response.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  header: { marginBottom: 20 },
  eyebrow: { color: colors.emergency, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 6 },
  title: { color: colors.primary, fontSize: 25, fontWeight: '800', letterSpacing: 0.4 },
  placeholder: { backgroundColor: colors.primary, borderRadius: 24, paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center', overflow: 'hidden' },
  iconCircle: { width: 112, height: 112, borderRadius: 56, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#263F59', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20 },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.emergency },
  badgeText: { color: '#F7FAFC', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
  message: { color: colors.white, fontSize: 24, fontWeight: '800', textAlign: 'center', marginTop: 20, letterSpacing: 0.3 },
  description: { color: '#D7E1EC', fontSize: 15, lineHeight: 23, textAlign: 'center', marginTop: 12 },
  decorativeLine: { width: 42, height: 3, borderRadius: 2, backgroundColor: colors.emergency, marginTop: 24 },
  footer: { color: '#AFC0D1', textAlign: 'center', fontSize: 12, fontWeight: '600', marginTop: 15 },
});
