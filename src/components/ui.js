import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../constants/colors';

export function Page({ children }) { return <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>; }
export function SectionTitle({ children }) { return <Text style={styles.section}>{children}</Text>; }
export function Button({ title, onPress, secondary = false }) { return <Pressable onPress={onPress} style={[styles.button, secondary && styles.secondary]}><Text style={styles.buttonText}>{title}</Text></Pressable>; }
export function Card({ children, style }) { return <View style={[styles.card, style]}>{children}</View>; }
export function Field({ label, value, onChangeText, placeholder, multiline, keyboardType }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder || label} placeholderTextColor="#94A3B8" multiline={multiline} keyboardType={keyboardType} style={[styles.input, multiline && styles.multiline]} /></View>;
}
export function Choice({ label, options, value, onChange }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><View style={styles.choices}>{options.map((option) => <Pressable key={option} onPress={() => onChange(option)} style={[styles.choice, value === option && styles.selected]}><Text style={[styles.choiceText, value === option && styles.selectedText]}>{option}</Text></Pressable>)}</View></View>;
}
export function FormModal({ visible, title, onClose, children }) {
  return <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}><View style={styles.overlay}><View style={styles.sheet}><View style={styles.sheetTop}><Text style={styles.sheetTitle}>{title}</Text><Pressable onPress={onClose}><Text style={styles.dismiss}>Close</Text></Pressable></View><ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView></View></View></Modal>;
}
export const commonStyles = styles;
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 36 },
  section: { color: colors.primary, fontWeight: '700', fontSize: 17, marginTop: 18, marginBottom: 10 },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 15, marginBottom: 11, borderWidth: 1, borderColor: colors.border },
  button: { backgroundColor: colors.emergency, borderRadius: 11, paddingVertical: 13, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', minHeight: 44 },
  secondary: { backgroundColor: colors.secondary }, buttonText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  field: { marginBottom: 12 }, label: { fontSize: 13, color: colors.secondary, fontWeight: '700', marginBottom: 6 },
  input: { minHeight: 44, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, color: colors.text, backgroundColor: colors.white },
  multiline: { minHeight: 84, paddingTop: 10, textAlignVertical: 'top' }, choices: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choice: { borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.white },
  selected: { backgroundColor: colors.secondary, borderColor: colors.secondary }, choiceText: { color: colors.secondary, fontSize: 12, fontWeight: '600' }, selectedText: { color: colors.white },
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#0006' }, sheet: { maxHeight: '92%', backgroundColor: colors.background, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 18 },
  sheetTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14 }, sheetTitle: { fontSize: 20, fontWeight: '700', color: colors.primary }, dismiss: { color: colors.secondary, fontWeight: '700' },
});
