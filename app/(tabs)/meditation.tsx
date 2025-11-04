import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Colors } from '../../constants/Colors';

const MEDITATION_DURATION = 180; // 3 minutes in seconds
const DAILY_GOAL = 5; // 5 sessions per day

export default function MeditationScreen() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(MEDITATION_DURATION);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const exercises = [
    {
      id: 'flower',
      title: '🌸 Smell the Flower',
      description: 'Take a deep breath in through your nose, as if smelling a beautiful flower',
      duration: '4 seconds in',
      emoji: '🌸',
    },
    {
      id: 'candle',
      title: '🕯️ Blow the Candle',
      description: 'Breathe out slowly through your mouth, as if gently blowing out a candle',
      duration: '6 seconds out',
      emoji: '🕯️',
    },
    {
      id: 'bee',
      title: '🐝 Watch the Bee',
      description: 'Follow the bee circling around. Breathe slowly and calmly as you watch',
      duration: 'Natural rhythm',
      emoji: '🐝',
    },
  ];

  // Load completed sessions on mount
  useEffect(() => {
    loadProgress();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerRunning) {
      handleSessionComplete();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimerRunning, timeRemaining]);

  // Exercise animations
  useEffect(() => {
    if (selectedExercise === 'bee') {
      // Continuous rotation for the bee
      Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 8000, // 8 seconds for one complete circle
          useNativeDriver: true,
        })
      ).start();
    } else if (selectedExercise) {
      // Breathing animation for flower and candle
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 6000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    return () => {
      scaleAnim.setValue(1);
      rotationAnim.setValue(0);
    };
  }, [selectedExercise]);

  const loadProgress = async () => {
    try {
      const today = new Date().toDateString();
      const savedDate = await SecureStore.getItemAsync('meditationDate');
      const savedCount = await SecureStore.getItemAsync('meditationCount');

      // Reset if it's a new day
      if (savedDate !== today) {
        await SecureStore.setItemAsync('meditationDate', today);
        await SecureStore.setItemAsync('meditationCount', '0');
        setCompletedSessions(0);
      } else if (savedCount) {
        setCompletedSessions(parseInt(savedCount));
      }
    } catch (error) {
      console.error('Error loading meditation progress:', error);
    }
  };

  const saveProgress = async (count: number) => {
    try {
      await SecureStore.setItemAsync('meditationCount', count.toString());
    } catch (error) {
      console.error('Error saving meditation progress:', error);
    }
  };

  const handleSessionComplete = () => {
    setIsTimerRunning(false);
    
    // Increment completed sessions
    const newCount = Math.min(completedSessions + 1, DAILY_GOAL);
    setCompletedSessions(newCount);
    saveProgress(newCount);

    // Show completion message
    if (newCount >= DAILY_GOAL) {
      Alert.alert(
        '🎉 Daily Goal Achieved!',
        "Congratulations! You've completed all 5 meditation sessions today. Great work!",
        [{ text: 'Awesome!', onPress: () => stopExercise() }]
      );
    } else {
      Alert.alert(
        '✅ Session Complete!',
        `Great job! You've completed ${newCount} of ${DAILY_GOAL} sessions today.`,
        [{ text: 'Continue', onPress: () => stopExercise() }]
      );
    }
  };

  const startExercise = (exerciseId: string) => {
    if (completedSessions >= DAILY_GOAL) {
      Alert.alert(
        'Daily Goal Reached',
        "You've already completed your 5 meditation sessions today. Great work! Come back tomorrow for more.",
        [{ text: 'OK' }]
      );
      return;
    }

    setSelectedExercise(exerciseId);
    setTimeRemaining(MEDITATION_DURATION);
    setIsTimerRunning(true);
  };

  const stopExercise = () => {
    setSelectedExercise(null);
    setIsTimerRunning(false);
    setTimeRemaining(MEDITATION_DURATION);
    scaleAnim.setValue(1);
    rotationAnim.setValue(0);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderProgressCircles = () => {
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Today's Progress</Text>
        <View style={styles.circlesContainer}>
          {[...Array(DAILY_GOAL)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressCircle,
                index < completedSessions && styles.progressCircleFilled,
              ]}
            >
              <Text style={[
                styles.circleNumber,
                index < completedSessions && styles.circleNumberFilled
              ]}>
                {index < completedSessions ? '✓' : index + 1}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.progressText}>
          {completedSessions} of {DAILY_GOAL} sessions completed
        </Text>
      </View>
    );
  };

  if (selectedExercise) {
    const exercise = exercises.find(e => e.id === selectedExercise);
    
    // Calculate bee position for circular motion
    const rotation = rotationAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.title}>Tāriņī</Text>
          <Text style={styles.exerciseTitle}>{exercise?.title}</Text>
          
          {/* Timer Display */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
            <Text style={styles.timerLabel}>remaining</Text>
          </View>
        </View>

        <View style={styles.animationContainer}>
          {selectedExercise === 'bee' ? (
            // Fixed circle with rotating bee for "Watch the Bee"
            <View style={styles.fixedCircleContainer}>
              <View style={styles.fixedCircle}>
                <Text style={styles.breathingEmoji}>{exercise?.emoji}</Text>
              </View>
              
              {/* Small bee rotating around the circle */}
              <Animated.View
                style={[
                  styles.orbitingBee,
                  {
                    transform: [
                      { rotate: rotation },
                      { translateX: 120 }, // Distance from center (radius)
                      { rotate: rotation }, // Counter-rotate to keep bee upright
                    ],
                  },
                ]}
              >
                <Text style={styles.smallBee}>🐝</Text>
              </Animated.View>
            </View>
          ) : (
            // Breathing animation for flower and candle
            <Animated.View
              style={[
                styles.breathingCircle,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Text style={styles.breathingEmoji}>{exercise?.emoji}</Text>
            </Animated.View>
          )}
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>{exercise?.description}</Text>
          <Text style={styles.durationText}>{exercise?.duration}</Text>
        </View>

        {selectedExercise !== 'bee' && (
          <View style={styles.breathingGuide}>
            <Text style={styles.breathingStep}>💨 Breathe In</Text>
            <Text style={styles.breathingSeparator}>•••</Text>
            <Text style={styles.breathingStep}>💨 Breathe Out</Text>
          </View>
        )}

        <TouchableOpacity style={styles.stopButton} onPress={stopExercise}>
          <Text style={styles.stopButtonText}>Stop Exercise</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tāriņī</Text>
        <Text style={styles.subtitle}>Breathing Exercises</Text>
      </View>

      {/* Progress Circles */}
      {renderProgressCircles()}

      <View style={styles.content}>
        <Text style={styles.introText}>
          Simple breathing exercises to help you relax and reduce stress. Complete 5 sessions (3 minutes each) to reach your daily goal:
        </Text>

        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={() => startExercise(exercise.id)}
          >
            <View style={styles.exerciseIconContainer}>
              <Text style={styles.exerciseIcon}>{exercise.emoji}</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseCardTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseDescription}>{exercise.description}</Text>
              <Text style={styles.exerciseDuration}>3 minutes • {exercise.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Tips for Breathing Exercises</Text>
          <Text style={styles.tipText}>• Find a quiet, comfortable place</Text>
          <Text style={styles.tipText}>• Sit or lie down in a relaxed position</Text>
          <Text style={styles.tipText}>• Close your eyes if comfortable</Text>
          <Text style={styles.tipText}>• Focus on your breath</Text>
          <Text style={styles.tipText}>• Complete all 5 sessions daily for best results</Text>
        </View>
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
  progressContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  circlesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 15,
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: Colors.tertiary,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleFilled: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  circleNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  circleNumberFilled: {
    color: Colors.white,
    fontSize: 20,
  },
  progressText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
  exerciseCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  exerciseIcon: {
    fontSize: 32,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 5,
  },
  exerciseDuration: {
    fontSize: 11,
    color: Colors.secondary,
    fontWeight: '600',
  },
  tipsSection: {
    backgroundColor: Colors.tertiary,
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  tipText: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 22,
  },
  exerciseContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  exerciseHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  timerContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  timerLabel: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 5,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fixedCircleContainer: {
    width: 240,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  orbitingBee: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBee: {
    fontSize: 32,
  },
  breathingEmoji: {
    fontSize: 80,
  },
  instructionContainer: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10,
  },
  durationText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  breathingGuide: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  breathingStep: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  breathingSeparator: {
    fontSize: 14,
    color: Colors.secondary,
    marginHorizontal: 15,
  },
  stopButton: {
    marginHorizontal: 40,
    marginBottom: 40,
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  stopButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});