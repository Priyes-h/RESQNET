import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'resqnet-demo-v1';
const initialData = {
  incidents: [],
  requests: [],
  profile: {
    name: 'Coastal Rescue Unit', email: 'coordinator@resqnet.demo',
    phone: '+91 90000 11111', type: 'Water Rescue', registration: 'DEMO-MH-042',
    headquarters: 'Marine Drive, Mumbai', status: 'Available',
    resources: [
      { name: 'Ambulances', quantity: 2, available: true },
      { name: 'Rescue personnel', quantity: 18, available: true },
      { name: 'Rescue boats', quantity: 3, available: true },
      { name: 'Medical kits', quantity: 24, available: true },
      { name: 'Food packages', quantity: 60, available: true },
      { name: 'Other equipment', quantity: 5, available: true },
    ],
  },
};

const DataContext = createContext(null);
export function AppDataProvider({ children }) {
  const [data, setData] = useState(initialData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => { if (saved) setData({ ...initialData, ...JSON.parse(saved) }); })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch(() => {});
  }, [data, ready]);

  const value = useMemo(() => ({
    ...data,
    ready,
    addIncident: (incident) => setData((current) => ({ ...current, incidents: [{ ...incident, id: `incident-${Date.now()}`, createdAt: new Date().toISOString() }, ...current.incidents] })),
    addRequest: (request) => setData((current) => ({ ...current, requests: [{ ...request, id: `request-${Date.now()}`, status: 'Pending', createdAt: new Date().toISOString() }, ...current.requests] })),
    updateRequest: (id, status) => setData((current) => ({ ...current, requests: current.requests.map((item) => item.id === id ? { ...item, status } : item) })),
    updateProfile: (profile) => setData((current) => ({ ...current, profile: { ...current.profile, ...profile } })),
    updateResource: (index, changes) => setData((current) => ({ ...current, profile: { ...current.profile, resources: current.profile.resources.map((resource, i) => i === index ? { ...resource, ...changes } : resource) } })),
  }), [data, ready]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export function useAppData() {
  const value = useContext(DataContext);
  if (!value) throw new Error('useAppData must be used inside AppDataProvider');
  return value;
}
