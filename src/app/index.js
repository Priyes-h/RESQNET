import { Redirect } from 'expo-router';
import { useAppData } from '../state/AppDataContext';
export default function Index() {
  const { ready, signedIn } = useAppData();
  if (!ready) return null;
  return <Redirect href={signedIn ? '/(tabs)/home' : '/auth'} />;
}
