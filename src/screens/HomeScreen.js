import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { DEMO_ACTIVITY, DEMO_STATS } from '../data/demoDashboard';
import { useRouter } from 'expo-router';
import { useAppData } from '../state/AppDataContext';

// HomeScreen is the Dashboard tab.
// navigation is passed in by React Navigation so we can switch tabs.

function StatCard({ icon, label, value, accent }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconWrap, { backgroundColor: accent }]}>
        <Ionicons name={icon} size={18} color={colors.white} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { agencies, incidents, requests } = useAppData();
  const stats = {
    totalAgencies: DEMO_STATS.totalAgencies,
    availableAgencies: agencies.filter((agency) => agency.status === 'available').length,
    activeIncidents: DEMO_STATS.activeIncidents + incidents.length,
    pendingRequests: requests.filter((request) => request.status === 'Pending').length,
  };
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.demoBanner}>
        <Ionicons name="information-circle" size={18} color={colors.secondary} />
        <Text style={styles.demoBannerText}>
          Demonstration dashboard. Counts and activity below are sample data, not
          live emergency feeds.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Operations snapshot</Text>
      <View style={styles.statsGrid}>
        <StatCard
          icon="people"
          label="Registered agencies"
          value={stats.totalAgencies}
          accent={colors.primary}
        />
        <StatCard
          icon="checkmark-circle"
          label="Available rescue units"
          value={stats.availableAgencies}
          accent={colors.success}
        />
        <StatCard
          icon="warning"
          label="Active incidents"
          value={stats.activeIncidents}
          accent={colors.emergency}
        />
        <StatCard
          icon="hand-left"
          label="Pending requests"
          value={stats.pendingRequests}
          accent={colors.secondary}
        />
      </View>

      <Text style={styles.sectionTitle}>Quick actions</Text>
      <View style={styles.actionsRow}>
        <Pressable
          style={styles.actionButton}
          onPress={() => router.navigate('/(tabs)/incidents')}
        >
          <Ionicons name="add-circle" size={20} color={colors.white} />
          <Text style={styles.actionText}>Report incident</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.actionButtonSecondary]}
          onPress={() => router.navigate('/(tabs)/map')}
        >
          <Ionicons name="map" size={20} color={colors.white} />
          <Text style={styles.actionText}>Open live map</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Recent emergency activity</Text>
      {DEMO_ACTIVITY.map((item) => (
        <View key={item.id} style={styles.activityCard}>
          <View style={styles.activityDot} />
          <View style={styles.activityBody}>
            <Text style={styles.activityTitle}>{item.title}</Text>
            <Text style={styles.activityDetail}>{item.detail}</Text>
            <Text style={styles.activityTime}>{item.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#E8EEF6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  demoBannerText: {
    flex: 1,
    color: colors.secondary,
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: colors.muted,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.emergency,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  actionButtonSecondary: {
    backgroundColor: colors.secondary,
  },
  actionText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 13,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emergency,
    marginTop: 6,
    marginRight: 12,
  },
  activityBody: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  activityDetail: {
    marginTop: 4,
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
  activityTime: {
    marginTop: 6,
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
});
