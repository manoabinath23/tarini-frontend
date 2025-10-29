import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/Colors';

export default function SplashScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (!user) {
          router.replace('/(auth)/signin');
        } else if (user.isFirstTime) {
          router.replace('/profile/demographics1');
        } else {
          router.replace('/(tabs)');
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, loading]);

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>Tāriņī</Text>
      <Text style={styles.subtitle}>Carries You Beyond Chaos</Text>
      <Text style={styles.footer}>Centre for Meditation Research</Text>
      <Text style={styles.footerSub}>University of Colombo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.tertiary,
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.primary,
    marginBottom: 100,
  },
  footer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  footerSub: {
    fontSize: 14,
    color: Colors.text,
  },
});