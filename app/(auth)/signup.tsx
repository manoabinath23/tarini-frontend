import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';

export default function SignUpScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!nickname || !password || !confirmPassword || !age) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (nickname.length < 3 || nickname.length > 20) {
      Alert.alert('Error', 'Nickname must be between 3 and 20 characters');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (parseInt(age) < 18 || parseInt(age) > 100) {
      Alert.alert('Error', 'Please enter a valid age');
      return;
    }

    try {
      setLoading(true);
      await register({
        nickname: nickname.toLowerCase(),
        password,
        gender,
        age: parseInt(age),
        isFirstTime: true,
      });
      router.push('/profile/demographics1');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create account. Nickname might be taken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tāriņī</Text>
        <Text style={styles.subtitle}>Create Your Account</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.disclaimer}>
          Tāriņī does not collect your personal email or phone number. Please create a unique nickname
          and password that will be used to identify you. If you provide relevant demographics or occupation
          information, that might improve the assessment and personalization of meditations.
        </Text>

        <Input
          label="Nickname *"
          value={nickname}
          onChangeText={setNickname}
          placeholder="Enter a unique nickname (3-20 characters)"
        />
        
        <Text style={styles.nicknameHint}>
          This nickname will be used to login. Make sure it's memorable!
        </Text>

        <Input
          label="Password *"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password (min 6 characters)"
          secureTextEntry
        />

        <Input
          label="Confirm Password *"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter your password"
          secureTextEntry
        />

        <Text style={styles.label}>Gender *</Text>
        <View style={styles.genderContainer}>
          {['male', 'female', 'other'].map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.genderButton, gender === g && styles.genderButtonSelected]}
              onPress={() => setGender(g as any)}
            >
              <Text style={[
                styles.genderButtonText,
                gender === g && styles.genderButtonTextSelected
              ]}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input
          label="Age *"
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age (18+)"
          keyboardType="numeric"
        />

        <Button title="Create Account" onPress={handleSignUp} loading={loading} />

        <TouchableOpacity 
          style={styles.signinLink} 
          onPress={() => router.replace('/(auth)/signin')}
        >
          <Text style={styles.signinText}>
            Already have an account? <Text style={styles.signinTextBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text,
  },
  form: {
    padding: 20,
  },
  disclaimer: {
    backgroundColor: Colors.tertiary,
    padding: 15,
    borderRadius: 8,
    fontSize: 12,
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 18,
  },
  label: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 10,
    fontWeight: '600',
  },
  nicknameHint: {
    fontSize: 11,
    color: '#666',
    marginTop: -10,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.tertiary,
    borderRadius: 8,
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  genderButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  genderButtonTextSelected: {
    color: Colors.white,
  },
  signinLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signinText: {
    fontSize: 14,
    color: Colors.text,
  },
  signinTextBold: {
    fontWeight: 'bold',
    color: Colors.secondary,
  },
});