import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Dropdown } from '../../components/Dropdown';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';

export default function OccupationalScreen() {
  const router = useRouter();
  const { updateProfile } = useAuth();
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [classSize, setClassSize] = useState('');
  const [yearsInSchool, setYearsInSchool] = useState('');
  const [teachesOther, setTeachesOther] = useState('');

  const qualificationOptions = [
    { label: 'Trainee Grad', value: 'trainee_grad' },
    { label: 'Grad', value: 'grad' },
    { label: 'Trained', value: 'trained' },
    { label: 'Other', value: 'other' },
  ];

  const experienceOptions = [
    { label: 'Less than 1 year', value: '<1' },
    { label: 'Early Career (1-3 years)', value: '1-3' },
    { label: 'Mid Career (2-23 years)', value: '2-23' },
    { label: 'Late Career (24-40 years)', value: '24-40' },
  ];

  const classSizeOptions = [
    { label: 'Less than 30 students', value: '<30' },
    { label: 'More than 30 students', value: '>30' },
  ];

  const schoolYearsOptions = [
    { label: 'Less than 7 years', value: '<7' },
    { label: 'More than 7 years', value: '>7' },
  ];

  const yesNoOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const handleSave = async () => {
    try {
      await updateProfile({
        occupational: {
          qualification,
          teachingExperience: experience,
          classSize,
          yearsInCurrentSchool: yearsInSchool,
          teachesOtherSubjects: teachesOther === 'yes',
        },
      });
      router.push('/assessment/bat-questions');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tāriņī</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Demographic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Occupational</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <View style={styles.highlightSection}>
          <Text style={styles.sectionTitle}>Occupational Information</Text>
          <Text style={styles.sectionSubtitle}>Cultural / Social Factors</Text>
          <Text style={styles.sectionSubtitle}>Life Stage / Career Stage</Text>
          <Text style={styles.highlight}>
            Early career workers → higher stress from learning demands.
          </Text>
          <Text style={styles.highlight}>
            Mid-career → juggling career and family can increase burnout.
          </Text>
          <Text style={styles.sectionSubtitle}>Late career</Text>
          <Text style={styles.description}>
            Expectations of constant productivity → higher risk
          </Text>
        </View>

        <Dropdown
          label="Qualification as a teacher"
          value={qualification}
          options={qualificationOptions}
          onSelect={setQualification}
          placeholder="Select your qualification"
        />

        <Dropdown
          label="Teaching Experience"
          value={experience}
          options={experienceOptions}
          onSelect={setExperience}
          placeholder="Select years of experience"
        />

        <Dropdown
          label="Class Size"
          value={classSize}
          options={classSizeOptions}
          onSelect={setClassSize}
          placeholder="Select class size"
        />

        <Dropdown
          label="Years in the current school"
          value={yearsInSchool}
          options={schoolYearsOptions}
          onSelect={setYearsInSchool}
          placeholder="Select duration"
        />

        <Dropdown
          label="Teach any other subject in addition to the main subject"
          value={teachesOther}
          options={yesNoOptions}
          onSelect={setTeachesOther}
          placeholder="Select Yes or No"
        />

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
  highlightSection: {
    backgroundColor: '#FFFACD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  highlight: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: Colors.text,
  },
  spacer: {
    height: 30,
  },
});