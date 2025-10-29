import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { batAPI } from '../../services/api';
import { Colors } from '../../constants/Colors';

export default function BATScreen() {
  const router = useRouter();
  const [latestAssessment, setLatestAssessment] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const latest = await batAPI.getLatestAssessment();
      const historyData = await batAPI.getAssessmentHistory();
      setLatestAssessment(latest);
      setHistory(historyData);
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 404) {
        // User not logged in or no data yet - this is fine
        console.log('No assessment data available yet');
      } else {
        console.error('Error loading assessments:', error);
      }
    } finally {
      setLoading(false);
    }
  };

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
        return 'No Risk of Burnout';
      case 'orange':
        return 'At Risk for Burnout';
      case 'red':
        return 'Very High Risk of Burnout';
      default:
        return 'Unknown';
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
        <Text style={styles.subtitle}>Burnout Assessment</Text>
      </View>

      {latestAssessment ? (
        <>
          <View style={styles.scoreSection}>
            <Text style={styles.sectionTitle}>Your Latest BAT Score</Text>
            
            <View style={styles.mainScoreCard}>
              <Text style={styles.mainScore}>{latestAssessment.totalBATScore.toFixed(2)}</Text>
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getRiskColor(latestAssessment.riskLevel) },
                ]}
              >
                <Text style={styles.riskText}>{getRiskText(latestAssessment.riskLevel)}</Text>
              </View>
              <Text style={styles.dateText}>
                Assessed on: {new Date(latestAssessment.timestamp).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.dimensionsSection}>
            <Text style={styles.sectionTitle}>Dimension Scores</Text>
            
            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionLabel}>Exhaustion</Text>
              <Text style={styles.dimensionScore}>
                {latestAssessment.exhaustionScore.toFixed(2)}
              </Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionLabel}>Mental Distance</Text>
              <Text style={styles.dimensionScore}>
                {latestAssessment.mentalDistanceScore.toFixed(2)}
              </Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionLabel}>Cognitive Impairment</Text>
              <Text style={styles.dimensionScore}>
                {latestAssessment.cognitiveImpairmentScore.toFixed(2)}
              </Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionLabel}>Emotional Impairment</Text>
              <Text style={styles.dimensionScore}>
                {latestAssessment.emotionalImpairmentScore.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.secondarySection}>
            <Text style={styles.sectionTitle}>Secondary Symptoms</Text>
            
            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionLabel}>Psychological Complaints</Text>
              <Text style={styles.dimensionScore}>
                {latestAssessment.psychologicalComplaintsScore.toFixed(2)}
              </Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionLabel}>Psychosomatic Complaints</Text>
              <Text style={styles.dimensionScore}>
                {latestAssessment.psychosomaticComplaintsScore.toFixed(2)}
              </Text>
            </View>

            <View style={styles.combinedCard}>
              <Text style={styles.dimensionLabel}>Combined Secondary Score</Text>
              <Text style={styles.dimensionScore}>
                {latestAssessment.combinedSecondaryScore.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.legendSection}>
            <Text style={styles.legendTitle}>Score Interpretation:</Text>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>Green: No risk of burnout</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.legendText}>Orange: At risk for burnout</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
              <Text style={styles.legendText}>Red: Very high risk of burnout</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => router.push('/assessment/bat-questions')}
          >
            <Text style={styles.retakeButtonText}>Retake Assessment</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No assessment found</Text>
          <TouchableOpacity
            style={styles.takeButton}
            onPress={() => router.push('/assessment/bat-questions')}
          >
            <Text style={styles.takeButtonText}>Take BAT Assessment</Text>
          </TouchableOpacity>
        </View>
      )}
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
  scoreSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  mainScoreCard: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  mainScore: {
    fontSize: 64,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
  },
  riskBadge: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  riskText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
  },
  dimensionsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  secondarySection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  dimensionCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  combinedCard: {
    backgroundColor: Colors.tertiary,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  dimensionLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
    flex: 1,
  },
  dimensionScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  legendSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: Colors.text,
  },
  retakeButton: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  retakeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 30,
  },
  takeButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  takeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});