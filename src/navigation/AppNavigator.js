import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import IncidentsScreen from '../screens/IncidentsScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RequestsScreen from '../screens/RequestsScreen';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home: 'home',
  Map: 'map',
  Incidents: 'warning',
  Requests: 'chatbubbles',
  Profile: 'person-circle',
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: colors.emergency,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'RESQNET Dashboard' }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ title: 'Live Map', tabBarLabel: 'Live Map' }}
      />
      <Tab.Screen
        name="Incidents"
        component={IncidentsScreen}
        options={{ title: 'Incidents' }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{ title: 'Requests' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
