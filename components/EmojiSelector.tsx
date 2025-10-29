import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { EmojisData, EmojiData } from '../constants/emojis';

interface EmojiSelectorProps {
  onSelect: (emoji: EmojiData) => void;
}

export const EmojiSelector: React.FC<EmojiSelectorProps> = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(5);
  const currentEmoji = EmojisData[selectedIndex];

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedIndex < EmojisData.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
    }
  };

  const handleConfirm = () => {
    onSelect(currentEmoji);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How do you feel today?</Text>
      
      <View style={styles.emojiContainer}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={handlePrevious}
          disabled={selectedIndex === 0}
        >
          <Text style={styles.navButtonText}>◀</Text>
        </TouchableOpacity>

        <View style={styles.emojiDisplay}>
          <Text style={styles.emoji}>{currentEmoji.emoji}</Text>
          <Text style={styles.label}>{currentEmoji.label}</Text>
        </View>

        <TouchableOpacity 
          style={styles.navButton} 
          onPress={handleNext}
          disabled={selectedIndex === EmojisData.length - 1}
        >
          <Text style={styles.navButtonText}>▶</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.feedback}>{currentEmoji.feedback}</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 40,
  },
  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  navButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  emojiDisplay: {
    alignItems: 'center',
    minWidth: 150,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  feedbackContainer: {
    backgroundColor: Colors.tertiary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    minHeight: 100,
  },
  feedback: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 20,
  },
  confirmButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});