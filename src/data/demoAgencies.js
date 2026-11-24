// DEMO DATA ONLY
// These agencies are sample locations for the prototype map.
// They are not real rescue units and are not tracked in real time.

export const DEMO_MAP_REGION = {
  latitude: 19.076,
  longitude: 72.8478,
  latitudeDelta: 0.18,
  longitudeDelta: 0.18,
};

// pinColor is used by react-native-maps Marker
// available = green, busy = orange, offline = gray
export const DEMO_AGENCIES = [
  {
    id: 'agency-1',
    name: 'Coastal Rescue Unit (Demo)',
    type: 'Water Rescue',
    status: 'available',
    pinColor: 'green',
    phone: '+91 90000 11111',
    locationLabel: 'Marine Drive, Mumbai (sample)',
    latitude: 19.076,
    longitude: 72.8777,
  },
  {
    id: 'agency-2',
    name: 'Metro Fire Brigade (Demo)',
    type: 'Fire & Rescue',
    status: 'busy',
    pinColor: 'orange',
    phone: '+91 90000 22222',
    locationLabel: 'Bandra West (sample)',
    latitude: 19.0596,
    longitude: 72.8295,
  },
  {
    id: 'agency-3',
    name: 'Hill District Rescue (Demo)',
    type: 'Search & Rescue',
    status: 'offline',
    pinColor: 'gray',
    phone: '+91 90000 33333',
    locationLabel: 'Powai (sample)',
    latitude: 19.1197,
    longitude: 72.9051,
  },
  {
    id: 'agency-4',
    name: 'City Medical Response (Demo)',
    type: 'Medical',
    status: 'available',
    pinColor: 'green',
    phone: '+91 90000 44444',
    locationLabel: 'Dadar (sample)',
    latitude: 19.0178,
    longitude: 72.8478,
  },
];
