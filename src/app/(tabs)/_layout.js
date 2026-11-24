import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '../../constants/colors';

const icons = { home: 'home', map: 'map', incidents: 'warning', requests: 'chatbubbles', profile: 'person-circle' };
export default function TabLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerStyle: { backgroundColor: colors.primary }, headerTintColor: colors.white,
      headerTitleStyle: { fontWeight: '700' },
      tabBarActiveTintColor: colors.emergency, tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.border, height: 64, paddingTop: 6, paddingBottom: 8 },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
    })}>
      <Tabs.Screen name="home" options={{ title: 'RESQNET Dashboard', tabBarLabel: 'Home' }} />
      <Tabs.Screen name="map" options={{ title: 'Live Map', tabBarLabel: 'Live Map' }} />
      <Tabs.Screen name="incidents" options={{ title: 'Incidents' }} />
      <Tabs.Screen name="requests" options={{ title: 'Requests' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
