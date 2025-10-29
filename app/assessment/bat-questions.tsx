import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressBar } from '../../components/ProgressBar';
import { Button } from '../../components/Button';
import { batAPI } from '../../services/api';
import { BATQuestions, ScaleOptions } from '../../constants/questions';
import { Colors } from '../../constants/Colors';

export default function BATQuestionsScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>(new Array(33).fill(0));
  const [loading, setLoading] = useState(false);

  const handleResponse = (value: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);

    // Auto-advance to next question
    if (currentQuestion < BATQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (responses[currentQuestion] === 0) {
      Alert.alert('Please answer', 'Please select an answer before proceeding');
      return;
    }

    if (currentQuestion < BATQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuit = () => {
    Alert.alert(
      'Quit Assessment?',
      'Your progress will not be saved. You can take the assessment later from the BAT tab.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Quit',
          style: 'destructive',
          onPress: () => router.replace('/(tabs)'),
        },
      ]
    );
  };

  const handleSubmit = async () => {
    if (responses.some(r => r === 0)) {
      Alert.alert('Incomplete', 'Please answer all questions before submitting');
      return;
    }

    try {
      setLoading(true);
      await batAPI.submitAssessment(responses);
      router.push('/assessment/emoji-rating');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit assessment');
    } finally {
      setLoading(false);
    }
  };

  const question = BATQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === BATQuestions.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Burnout Assessment</Text>
          <TouchableOpacity 
            style={styles.quitButton}
            onPress={handleQuit}
          >
            <Text style={styles.quitButtonText}>Quit</Text>
          </TouchableOpacity>
        </View>
        <ProgressBar current={currentQuestion + 1} total={BATQuestions.length} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{question.category}</Text>
        </View>

        <Text style={styles.questionText}>{question.text}</Text>

        <View style={styles.scaleContainer}>
          {ScaleOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.scaleOption,
                responses[currentQuestion] === option.value && styles.scaleOptionSelected,
              ]}
              onPress={() => handleResponse(option.value)}
            >
              <View style={styles.scaleCircle}>
                <Text style={styles.scaleValue}>{option.value}</Text>
              </View>
              <Text style={styles.scaleLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigation}>
          <Button
            title="Previous"
            onPress={handlePrevious}
            disabled={currentQuestion === 0}
            variant="secondary"
          />
          {isLastQuestion ? (
            <Button title="Submit" onPress={handleSubmit} loading={loading} />
          ) : (
            <Button title="Next" onPress={handleNext} />
          )}
        </View>
      </ScrollView>
    </View>
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
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  quitButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  quitButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.tertiary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  questionText: {
    fontSize: 18,
    color: Colors.text,
    lineHeight: 26,
    marginBottom: 30,
  },
  scaleContainer: {
    marginBottom: 40,
  },
  scaleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  scaleOptionSelected: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.tertiary,
  },
  scaleCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  scaleValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  scaleLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10,
  },
});