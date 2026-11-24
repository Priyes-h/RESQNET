import { useEffect, useRef, useState } from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { colors } from '../constants/colors';
import { DEMO_AGENCIES, DEMO_MAP_REGION } from '../data/demoAgencies';
import { Choice } from '../components/ui';

export default function MapScreen() {
  // selectedAgency stores the marker the user tapped
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const agencyTypes = ['All', ...new Set(DEMO_AGENCIES.map((agency) => agency.type))];
  const agencyStatuses = ['All', 'available', 'busy', 'offline'];
  const filteredAgencies = DEMO_AGENCIES.filter((agency) =>
    (typeFilter === 'All' || agency.type === typeFilter) &&
    (statusFilter === 'All' || agency.status === statusFilter)
  );

  // showUserDot turns on the map's built-in blue location dot
  const [showUserDot, setShowUserDot] = useState(false);

  // mapRef lets us move the camera when the user taps "Show my location"
  const mapRef = useRef(null);

  // locationMessage tells the user if GPS permission was given
  const [locationMessage, setLocationMessage] = useState(
    'Demo pins are in Mumbai. The blue dot is your device, which is often somewhere else on the simulator.'
  );

  // useEffect runs once when this screen opens (empty [] means "run once")
  useEffect(() => {
    async function askLocationPermission() {
      try {
        // We only ask permission. We do NOT call getCurrentPositionAsync.
        // That GPS call crashes the iOS Simulator when no fake location is set.
        const permission = await Location.requestForegroundPermissionsAsync();

        if (permission.status !== 'granted') {
          setShowUserDot(false);
          setLocationMessage(
            'Location permission denied. Demo agency pins are still shown.'
          );
          return;
        }

        setShowUserDot(true);
        setLocationMessage(
          'Permission granted. Tap Show my location. Demo pins stay in Mumbai.'
        );
      } catch (_error) {
        setShowUserDot(false);
        setLocationMessage('Location is unavailable. Demo agency pins are still shown.');
      }
    }

    askLocationPermission();
  }, []);

  // Moves the map to the phone/simulator location so the blue dot is on screen.
  async function showMyLocation() {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert(
          'Location permission needed',
          'Allow location to show the blue device dot.'
        );
        return;
      }

      setShowUserDot(true);

      // Last known location is safer than a fresh GPS request on the simulator
      let position = await Location.getLastKnownPositionAsync();

      if (!position) {
        position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Lowest,
        });
      }

      const myRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      if (mapRef.current) {
        mapRef.current.animateToRegion(myRegion, 800);
      }

      setLocationMessage(
        'Map moved to your device. Demo agency pins may be off-screen in Mumbai.'
      );
    } catch (_error) {
      Alert.alert(
        'No GPS on this simulator',
        'The iOS Simulator has no real GPS.\n\n1. Simulator menu: Features > Location\n2. Choose Custom Location\n3. Use latitude 19.076 and longitude 72.8478 to appear near the demo pins\n4. Tap Show my location again.'
      );
    }
  }

  // This tries to open the phone dialer.
  // The iOS Simulator cannot make calls, so we show an alert instead of crashing.
  async function callAgency(phone) {
    // Remove spaces so the tel: link is valid
    const cleanPhone = phone.replace(/ /g, '');
    const callUrl = 'tel:' + cleanPhone;

    try {
      const canCall = await Linking.canOpenURL(callUrl);

      if (!canCall) {
        Alert.alert(
          'Call not available here',
          'This is a sample number for the demo: ' + phone + '. The iOS Simulator cannot place phone calls. Try this on a real phone later.'
        );
        return;
      }

      await Linking.openURL(callUrl);
    } catch (_error) {
      Alert.alert(
        'Call not available here',
        'This is a sample number for the demo: ' + phone + '. It is not a real emergency contact.'
      );
    }
  }

  return (
    <View style={styles.screen}>
      {/* Banner so testers know this is not live tracking */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Demonstration map</Text>
        <Text style={styles.bannerText}>{locationMessage}</Text>
        <Text style={styles.bannerText}>Sample agency pins only · no live tracking</Text>
        <Pressable style={styles.locationButton} onPress={showMyLocation}>
          <Text style={styles.locationButtonText}>Show my location</Text>
        </Pressable>
      </View>

      <View style={styles.filters}>
        <Choice label="Agency type" options={agencyTypes} value={typeFilter} onChange={setTypeFilter} />
        <Choice label="Availability" options={agencyStatuses} value={statusFilter} onChange={setStatusFilter} />
      </View>

      {/* The map itself. showsUserLocation draws the native blue dot. */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={DEMO_MAP_REGION}
        showsUserLocation={showUserDot}
      >
        {/* Loop through demo agencies and draw one pin for each */}
        {filteredAgencies.map(function (agency) {
          return (
            <Marker
              key={agency.id}
              coordinate={{
                latitude: agency.latitude,
                longitude: agency.longitude,
              }}
              title={agency.name}
              description={agency.type + ' · ' + agency.status}
              pinColor={agency.pinColor}
              onPress={function () {
                setSelectedAgency(agency);
              }}
            />
          );
        })}

      </MapView>

      {/* Colour key for the pins */}
      <View style={styles.legend}>
        <Text style={styles.legendItem}>Green = available</Text>
        <Text style={styles.legendItem}>Orange = busy</Text>
        <Text style={styles.legendItem}>Gray = offline</Text>
        <Text style={styles.legendItem}>Blue = your device</Text>
      </View>

      {/* Details card. It only appears after a demo pin is tapped. */}
      {selectedAgency ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selectedAgency.name}</Text>
          <Text style={styles.cardLine}>Type: {selectedAgency.type}</Text>
          <Text style={styles.cardLine}>Status: {selectedAgency.status}</Text>
          <Text style={styles.cardLine}>Location: {selectedAgency.locationLabel}</Text>
          <Text style={styles.cardLine}>Contact: {selectedAgency.phone}</Text>

          <View style={styles.cardButtons}>
            <Pressable
              style={styles.callButton}
              onPress={function () {
                callAgency(selectedAgency.phone);
              }}
            >
              <Text style={styles.buttonText}>Call (sample number)</Text>
            </Pressable>

            <Pressable
              style={styles.closeButton}
              onPress={function () {
                setSelectedAgency(null);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  banner: {
    backgroundColor: '#E8EEF6',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  filters: { backgroundColor: colors.white, paddingHorizontal: 12, paddingTop: 10, flexDirection: 'row', gap: 10 },
  bannerTitle: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  bannerText: {
    color: colors.secondary,
    fontSize: 12,
    marginTop: 4,
  },
  locationButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  locationButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 12,
  },
  map: {
    flex: 1,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  legendItem: {
    width: '50%',
    fontSize: 12,
    color: colors.muted,
    paddingVertical: 2,
  },
  card: {
    backgroundColor: colors.white,
    padding: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
  },
  cardLine: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 4,
  },
  cardButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  callButton: {
    flex: 1,
    backgroundColor: colors.emergency,
    borderRadius: 10,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: 'center',
  },
  closeButton: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },
  closeButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
