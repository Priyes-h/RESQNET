import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { useAppData } from '../state/AppDataContext';
import { Button, Card, Choice, Field, FormModal, Page, SectionTitle } from '../components/ui';

const resources = ['Ambulance', 'Personnel', 'Rescue boat', 'Medical kits', 'Food packages', 'Other'];
export default function RequestsScreen() {
  const { requests, addRequest, updateRequest } = useAppData();
  const [visible, setVisible] = useState(false); const [resource, setResource] = useState(resources[0]);
  const [quantity, setQuantity] = useState(''); const [location, setLocation] = useState(''); const [details, setDetails] = useState('');
  function submit() {
    const count = Number(quantity);
    if (!Number.isInteger(count) || count < 1 || !location.trim()) return Alert.alert('Check the request', 'Enter a location and a whole number greater than zero.');
    addRequest({ resource, quantity: count, location: location.trim(), details: details.trim() });
    setQuantity(''); setLocation(''); setDetails(''); setVisible(false);
  }
  return <Page><Text style={{ color: colors.muted, lineHeight: 20 }}>Assistance requests are saved on this device for demonstration. No agency is contacted.</Text><Button title="＋ Create assistance request" onPress={() => setVisible(true)} /><SectionTitle>Requests · {requests.length}</SectionTitle>
    {requests.length ? requests.map((item) => <Card key={item.id}><Text style={{ color: colors.primary, fontWeight: '700', fontSize: 16 }}>{item.quantity} × {item.resource}</Text><Text style={{ color: colors.muted, marginTop: 6 }}>⌖ {item.location}{item.details ? ` · ${item.details}` : ''}</Text><Text style={{ color: colors.secondary, marginTop: 6, fontWeight: '700' }}>Status: {item.status}</Text>{item.status === 'Pending' && <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}><Pressable onPress={() => updateRequest(item.id, 'Accepted')} style={{ flex: 1, backgroundColor: colors.success, padding: 10, borderRadius: 9, alignItems: 'center' }}><Text style={{ color: 'white', fontWeight: '700' }}>Accept</Text></Pressable><Pressable onPress={() => updateRequest(item.id, 'Rejected')} style={{ flex: 1, backgroundColor: '#FEE2E2', padding: 10, borderRadius: 9, alignItems: 'center' }}><Text style={{ color: '#B91C1C', fontWeight: '700' }}>Reject</Text></Pressable></View>}</Card>) : <Card><Text style={{ color: colors.muted }}>No assistance requests yet.</Text></Card>}
    <FormModal visible={visible} title="Request assistance" onClose={() => setVisible(false)}><Choice label="Required resource" options={resources} value={resource} onChange={setResource} /><Field label="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="number-pad" placeholder="Number of people or items" /><Field label="Location" value={location} onChangeText={setLocation} placeholder="Area, city or landmark" /><Field label="Additional details (optional)" value={details} onChangeText={setDetails} multiline /><Button title="Save request" onPress={submit} /></FormModal>
  </Page>;
}
