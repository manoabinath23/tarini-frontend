import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function MeditationScreen() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [scaleAnim] = useState(new Animated.Value(1));
  const rotationAnim = useRef(new Animated.Value(0)).current;

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

  const startExercise = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
  };

  const stopExercise = () => {
    setSelectedExercise(null);
    scaleAnim.setValue(1);
    rotationAnim.setValue(0);
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

      <View style={styles.content}>
        <Text style={styles.introText}>
          Simple breathing exercises to help you relax and reduce stress. Choose an exercise below:
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
              <Text style={styles.exerciseDuration}>{exercise.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Tips for Breathing Exercises</Text>
          <Text style={styles.tipText}>• Find a quiet, comfortable place</Text>
          <Text style={styles.tipText}>• Sit or lie down in a relaxed position</Text>
          <Text style={styles.tipText}>• Close your eyes if comfortable</Text>
          <Text style={styles.tipText}>• Focus on your breath</Text>
          <Text style={styles.tipText}>• Practice for 2-5 minutes daily</Text>
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