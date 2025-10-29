import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', label: 'En', name: 'English' },
    { code: 'si', label: 'සි', name: 'Sinhala' },
    { code: 'ta', label: 'த', name: 'Tamil' },
  ];

  const handleContinue = () => {
    // For now, only English is implemented
    if (selectedLanguage === 'en') {
      router.push('/(auth)/signup');
    } else {
      alert('Coming soon! Only English is available in this version.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>Tāriņī</Text>
      <Text style={styles.subtitle}>Carries You Beyond Chaos</Text>

      <View style={styles.languageContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              selectedLanguage === lang.code && styles.languageButtonSelected,
            ]}
            onPress={() => setSelectedLanguage(lang.code)}
          >
            <Text style={styles.languageLabel}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
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
    marginBottom: 40,
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
    marginBottom: 60,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
  },
  languageButton: {
    width: 80,
    height: 80,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  languageButtonSelected: {
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: Colors.secondary,
  },
  languageLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  continueButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});