import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { batAPI, emojiAPI } from '../../services/api';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [latestBAT, setLatestBAT] = useState<any>(null);
  const [todayEmoji, setTodayEmoji] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const batData = await batAPI.getLatestAssessment();
      const emojiData = await emojiAPI.getTodayRating();
      setLatestBAT(batData);
      setTodayEmoji(emojiData);
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 404) {
        // User not logged in or no data yet - this is fine
        console.log('No data available yet');
      } else {
        console.error('Error loading data:', error);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/signin');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circle} />
        <Text style={styles.title}>Tāriņī</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>
          <Text style={styles.appName}>Tāriņī</Text> is your personal companion for managing stress
          and preventing burnout. Track your mental well-being, practice meditation, and stay
          balanced.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Check-in</Text>
        {todayEmoji ? (
          <View style={styles.emojiCard}>
            <Text style={styles.emojiLarge}>{todayEmoji.emoji}</Text>
            <Text style={styles.emojiLabel}>{todayEmoji.label}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/emotions')}
          >
            <Text style={styles.actionText}>Rate your mood today</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest BAT Score</Text>
        {latestBAT ? (
          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>{latestBAT.totalBATScore.toFixed(2)}</Text>
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(latestBAT.riskLevel) }]}>
              <Text style={styles.riskText}>{getRiskText(latestBAT.riskLevel)}</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/bat')}
          >
            <Text style={styles.actionText}>Take BAT Assessment</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personalized Meditations</Text>
        <View style={styles.meditationCard}>
          <Text style={styles.meditationText}>
            Based on your stress levels, we recommend daily meditation sessions to help you relax
            and refocus.
          </Text>
          <TouchableOpacity
            style={styles.meditationButton}
            onPress={() => router.push('/meditation')}
          >
            <Text style={styles.meditationButtonText}>Explore Meditations</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'green':
      return '#4CAF50';
    case 'orange':
      return '#FF9800';
    case 'red':
      return '#F44336';
    default:
      return Colors.tertiary;
  }
};

const getRiskText = (level: string) => {
  switch (level) {
    case 'green':
      return 'No Risk';
    case 'orange':
      return 'At Risk';
    case 'red':
      return 'High Risk';
    default:
      return 'Unknown';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.tertiary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
    color: Colors.text,
  },
  welcomeCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  appName: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  emojiCard: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  emojiLarge: {
    fontSize: 60,
    marginBottom: 10,
  },
  emojiLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  scoreCard: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  riskBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  riskText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionCard: {
    backgroundColor: Colors.secondary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  meditationCard: {
    backgroundColor: Colors.tertiary,
    padding: 20,
    borderRadius: 12,
  },
  meditationText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 15,
  },
  meditationButton: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  meditationButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginVertical: 30,
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});