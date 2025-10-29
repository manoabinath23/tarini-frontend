import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { EmojiSelector } from '../../components/EmojiSelector';
import { emojiAPI } from '../../services/api';
import { EmojiData } from '../../constants/emojis';
import { Colors } from '../../constants/Colors';

export default function EmotionsScreen() {
  const [todayRating, setTodayRating] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const today = await emojiAPI.getTodayRating();
      const weekHistory = await emojiAPI.getRatingHistory('weekly');
      setTodayRating(today);
      setHistory(weekHistory);
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 404) {
        // User not logged in or no data yet - this is fine
        console.log('No emoji data available yet');
      } else {
        console.error('Error loading emoji data:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiSelect = async (emoji: EmojiData) => {
    try {
      await emojiAPI.submitRating({
        level: emoji.level,
        emoji: emoji.emoji,
        label: emoji.label,
        stressCategory: emoji.stressCategory,
      });
      
      Alert.alert('Success', 'Your mood has been recorded!', [
        { text: 'OK', onPress: () => loadData() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to record mood');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tāriņī</Text>
        <Text style={styles.subtitle}>Rate Your Emotions</Text>
      </View>

      {todayRating ? (
        <View style={styles.todaySection}>
          <Text style={styles.sectionTitle}>Today's Mood</Text>
          <View style={styles.todayCard}>
            <Text style={styles.todayEmoji}>{todayRating.emoji}</Text>
            <Text style={styles.todayLabel}>{todayRating.label}</Text>
            <Text style={styles.todayTime}>
              Recorded at: {new Date(todayRating.timestamp).toLocaleTimeString()}
            </Text>
          </View>
          <Text style={styles.updateNote}>
            You can update your mood rating below if it has changed.
          </Text>
        </View>
      ) : (
        <View style={styles.rateSection}>
          <Text style={styles.sectionTitle}>How are you feeling today?</Text>
        </View>
      )}

      <View style={styles.selectorSection}>
        <EmojiSelector onSelect={handleEmojiSelect} />
      </View>

      {history.length > 0 && (
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>This Week's History</Text>
          {history.map((item, index) => (
            <View key={index} style={styles.historyCard}>
              <Text style={styles.historyEmoji}>{item.emoji}</Text>
              <View style={styles.historyInfo}>
                <Text style={styles.historyLabel}>{item.label}</Text>
                <Text style={styles.historyDate}>
                  {new Date(item.timestamp).toLocaleDateString()}
                </Text>
              </View>
              <View
                style={[
                  styles.stressBadge,
                  {
                    backgroundColor:
                      item.stressCategory === 'low'
                        ? '#4CAF50'
                        : item.stressCategory === 'average'
                        ? '#FF9800'
                        : '#F44336',
                  },
                ]}
              >
                <Text style={styles.stressBadgeText}>
                  {item.stressCategory.toUpperCase()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>About Emoji Ratings</Text>
        <Text style={styles.infoText}>
          Daily mood tracking helps identify patterns in your stress levels. Regular check-ins
          allow you to:
        </Text>
        <Text style={styles.infoBullet}>• Monitor your emotional well-being</Text>
        <Text style={styles.infoBullet}>• Identify stress triggers</Text>
        <Text style={styles.infoBullet}>• Track your progress over time</Text>
        <Text style={styles.infoBullet}>• Receive personalized meditation recommendations</Text>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: Colors.text,
  },
  todaySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  rateSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  todayCard: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  todayEmoji: {
    fontSize: 64,
    marginBottom: 10,
  },
  todayLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  todayTime: {
    fontSize: 12,
    color: '#666',
  },
  updateNote: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  selectorSection: {
    marginBottom: 30,
  },
  historySection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  historyCard: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  historyInfo: {
    flex: 1,
  },
  historyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
  },
  stressBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  stressBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
    backgroundColor: Colors.tertiary,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 15,
  },
  infoBullet: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 24,
  },
});