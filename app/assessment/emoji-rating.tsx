import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { EmojiSelector } from '../../components/EmojiSelector';
import { emojiAPI } from '../../services/api';
import { EmojiData } from '../../constants/emojis';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function EmojiRatingScreen() {
  const router = useRouter();
  const { updateProfile } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleEmojiSelect = async (emoji: EmojiData) => {
    try {
      setSubmitting(true);
      
      await emojiAPI.submitRating({
        level: emoji.level,
        emoji: emoji.emoji,
        label: emoji.label,
        stressCategory: emoji.stressCategory,
      });

      // Update user's first-time status
      await updateProfile({ isFirstTime: false });

      Alert.alert(
        'Thank You!',
        'Your assessment is complete. Welcome to Tāriņī!',
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <EmojiSelector onSelect={handleEmojiSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});