import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="language" />
        <Stack.Screen name="(auth)/signup" />
        <Stack.Screen name="(auth)/signin" />
        <Stack.Screen name="profile/demographics1" />
        <Stack.Screen name="profile/demographics2" />
        <Stack.Screen name="profile/occupational" />
        <Stack.Screen name="assessment/bat-questions" />
        <Stack.Screen name="assessment/emoji-rating" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  );
}