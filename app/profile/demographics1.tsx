import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';

export default function Demographics1Screen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('demographic');

  const handleNext = () => {
    router.push('/profile/demographics2');
  };

  const handleSkip = () => {
    router.push('/profile/demographics2');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tāriņī</Text>
      </View>

      <View style={styles.optionalNotice}>
        <Text style={styles.optionalTitle}>⚠️ OPTIONAL SECTION</Text>
        <Text style={styles.optionalText}>
          As these information are not considered in final version of the app, 
          you do NOT have to fill these pages. This information is not needed, so you can skip if you prefer.
        </Text>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          Tāriņī does not collect your Personal details such as your name or phone number. However,
          if you can provide relevant demographics or occupation information, that might improve the
          assessment and personalization of meditations.
        </Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'demographic' && styles.activeTab]}
          onPress={() => setActiveTab('demographic')}
        >
          <Text style={[styles.tabText, activeTab === 'demographic' && styles.activeTabText]}>
            Demographics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'occupational' && styles.activeTab]}
        >
          <Text style={styles.tabText}>Occupational</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.infoText}>
          This section collects basic demographic information. All fields are optional.
        </Text>
        
        <View style={styles.nextSection}>
          <Text style={styles.nextSectionText}>
            Complete information will be collected in the next screens
          </Text>
        </View>

        <Button title="Next" onPress={handleNext} />
        
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip This Page →</Text>
        </TouchableOpacity>
        
        <View style={styles.spacer} />
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
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  optionalNotice: {
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
  },
  optionalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  optionalText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },
  disclaimer: {
    backgroundColor: Colors.tertiary,
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.text,
    lineHeight: 18,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  activeTabText: {
    color: Colors.white,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  nextSection: {
    backgroundColor: Colors.tertiary,
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  nextSectionText: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
  },
  skipButton: {
    marginTop: 15,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  spacer: {
    height: 30,
  },
});