import { useState } from 'react';
import { Alert, Text } from 'react-native';
import { colors } from '../constants/colors';
import { useAppData } from '../state/AppDataContext';
import { Button, Card, Choice, Field, FormModal, Page, SectionTitle } from '../components/ui';

const types = ['Flood', 'Fire', 'Earthquake', 'Cyclone', 'Other'];
const levels = ['Low', 'Medium', 'High', 'Critical'];
export default function IncidentsScreen() {
  const { incidents, addIncident } = useAppData();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(types[0]); const [severity, setSeverity] = useState(levels[1]);
  const [description, setDescription] = useState(''); const [location, setLocation] = useState('');
  function submit() {
    if (!description.trim() || !location.trim()) return Alert.alert('Complete the form', 'Add a description and incident location.');
    addIncident({ type, severity, description: description.trim(), location: location.trim() });
    setDescription(''); setLocation(''); setVisible(false);
  }
  return <Page><Text style={{ color: colors.muted, lineHeight: 20 }}>Locally saved reports for this demo device. They are not sent to emergency services.</Text><Button title="＋ Report an incident" onPress={() => setVisible(true)} /><SectionTitle>Reported incidents · {incidents.length}</SectionTitle>
    {incidents.length ? incidents.map((item) => <Card key={item.id}><Text style={{ color: colors.primary, fontSize: 16, fontWeight: '700' }}>{item.type} · {item.severity}</Text><Text style={{ color: colors.muted, marginTop: 7 }}>{item.description}</Text><Text style={{ color: colors.secondary, marginTop: 7 }}>⌖ {item.location}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 7 }}>Reported locally · {new Date(item.createdAt).toLocaleString()}</Text></Card>) : <Card><Text style={{ color: colors.muted }}>No reports yet. Use the button above to create a demo incident.</Text></Card>}
    <FormModal visible={visible} title="Report an incident" onClose={() => setVisible(false)}><Choice label="Incident type" options={types} value={type} onChange={setType} /><Field label="Description" value={description} onChangeText={setDescription} multiline placeholder="What is happening?" /><Field label="Incident location" value={location} onChangeText={setLocation} placeholder="Area, city or landmark" /><Choice label="Severity" options={levels} value={severity} onChange={setSeverity} /><Button title="Save incident" onPress={submit} /></FormModal>
  </Page>;
}
