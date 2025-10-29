import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Dropdown } from '../../components/Dropdown';
import { Colors } from '../../constants/Colors';

export default function Demographics2Screen() {
  const router = useRouter();
  const [maritalStatus, setMaritalStatus] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [sleepPattern, setSleepPattern] = useState('');
  const [chronicIllness, setChronicIllness] = useState('');
  const [mentalHealth, setMentalHealth] = useState('');

  const maritalOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
  ];

  const sleepHoursOptions = [
    { label: '7 - 8 hours', value: '7-8' },
    { label: 'Less than 7 hours', value: '<7' },
  ];

  const sleepPatternOptions = [
    { label: 'Sleep well at night', value: 'well' },
    { label: 'Irregular sleep', value: 'irregular' },
  ];

  const yesNoOptions = [
    { label: 'None', value: 'none' },
    { label: 'Yes', value: 'yes' },
  ];

  const handleSave = () => {
    // Save to context/backend later
    router.push('/profile/occupational');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tāriņī</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab]}>
          <Text style={styles.tabText}>Demographics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Occupational</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Demographics Information</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.description}>Already collected during signup</Text>
        </View>

        <Dropdown
          label="Relationship Status"
          value={maritalStatus}
          options={maritalOptions}
          onSelect={setMaritalStatus}
          placeholder="Select relationship status"
        />

        <Dropdown
          label="How many hours do you sleep"
          value={sleepHours}
          options={sleepHoursOptions}
          onSelect={setSleepHours}
          placeholder="Select sleep hours"
        />

        <Dropdown
          label="Sleep Pattern"
          value={sleepPattern}
          options={sleepPatternOptions}
          onSelect={setSleepPattern}
          placeholder="Select sleep pattern"
        />

        <View style={styles.highlightField}>
          <Dropdown
            label="Chronic Illness"
            value={chronicIllness}
            options={yesNoOptions}
            onSelect={setChronicIllness}
            placeholder="Select option"
          />
        </View>

        <View style={styles.highlightField}>
          <Dropdown
            label="Mental Health Issues"
            value={mentalHealth}
            options={yesNoOptions}
            onSelect={setMentalHealth}
            placeholder="Select option"
          />
        </View>

        <Button title="Save" onPress={handleSave} />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  highlightField: {
    backgroundColor: '#FFFACD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  spacer: {
    height: 30,
  },
});