import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { useAppData } from '../state/AppDataContext';

export default function AuthScreen() {
  const { setSignedIn, updateProfile } = useAppData();
  const [registering, setRegistering] = useState(false);
  const [agency, setAgency] = useState(''); const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); const [type, setType] = useState(''); const [password, setPassword] = useState('');
  function continueDemo() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 4) return Alert.alert('Check your details', 'Enter a valid email and a demo password with at least four characters.');
    if (registering && (!agency.trim() || !phone.trim() || !type.trim())) return Alert.alert('Complete your agency details', 'Agency name, phone and agency type are required.');
    if (registering) updateProfile({ name: agency.trim(), email: email.trim(), phone: phone.trim(), type: type.trim(), registration: 'LOCAL-DEMO', headquarters: 'Add headquarters in profile' });
    setSignedIn(true); router.replace('/(tabs)/home');
  }
  const input = (placeholder, value, onChangeText, extra = {}) => <TextInput placeholder={placeholder} placeholderTextColor="#94A3B8" value={value} onChangeText={onChangeText} style={styles.input} {...extra} />;
  return <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><View style={styles.brand}><Text style={styles.mark}>R</Text><Text style={styles.title}>RESQNET</Text><Text style={styles.subtitle}>Rescue coordination workspace</Text></View><View style={styles.form}><Text style={styles.heading}>{registering ? 'Register your agency' : 'Agency sign in'}</Text><Text style={styles.note}>Demo access is stored on this device only. No account service is connected.</Text>{registering && <>{input('Agency name', agency, setAgency)}{input('Phone number', phone, setPhone, { keyboardType: 'phone-pad' })}{input('Agency type', type, setType)}</>}{input('Email address', email, setEmail, { keyboardType: 'email-address', autoCapitalize: 'none' })}{input('Demo password', password, setPassword, { secureTextEntry: true })}<Pressable style={styles.button} onPress={continueDemo}><Text style={styles.buttonText}>{registering ? 'Create demo profile' : 'Sign in'}</Text></Pressable><Pressable onPress={() => setRegistering(!registering)} style={styles.switch}><Text style={styles.switchText}>{registering ? 'Already set up? Sign in' : 'New agency? Register'}</Text></Pressable></View></KeyboardAvoidingView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 20 }, brand: { alignItems: 'center', marginBottom: 28 }, mark: { width: 58, height: 58, borderRadius: 18, backgroundColor: colors.emergency, color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 30, fontWeight: '800', overflow: 'hidden' }, title: { fontSize: 25, fontWeight: '800', color: colors.primary, marginTop: 12, letterSpacing: 2 }, subtitle: { color: colors.muted, marginTop: 4 }, form: { backgroundColor: 'white', borderRadius: 18, padding: 20 }, heading: { color: colors.primary, fontSize: 20, fontWeight: '700' }, note: { color: colors.muted, lineHeight: 18, fontSize: 12, marginTop: 6, marginBottom: 14 }, input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, minHeight: 46, paddingHorizontal: 12, color: colors.text, marginBottom: 10 }, button: { minHeight: 46, backgroundColor: colors.emergency, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4 }, buttonText: { color: 'white', fontWeight: '700' }, switch: { padding: 12, alignItems: 'center' }, switchText: { color: colors.secondary, fontWeight: '700' } });
