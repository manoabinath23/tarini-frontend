export interface Question {
  id: number;
  text: string;
  category: string;
}

export const BATQuestions: Question[] = [
  // Exhaustion (8 items)
  { id: 1, text: "At School, I feel mentally exhausted.", category: "Exhaustion" },
  { id: 2, text: "Everything I do at school requires a great deal of effort.", category: "Exhaustion" },
  { id: 3, text: "After a day at school, I find it hard to recover my energy.", category: "Exhaustion" },
  { id: 4, text: "At school, I feel physically exhausted", category: "Exhaustion" },
  { id: 5, text: "When I get up in the morning, I lack the energy to start a new day at school", category: "Exhaustion" },
  { id: 6, text: "I want to be active at school, but somehow, I am unable to manage.", category: "Exhaustion" },
  { id: 7, text: "When I exert myself at school, I quickly get tired.", category: "Exhaustion" },
  { id: 8, text: "At the end of the school day, I feel mentally exhausted and drained.", category: "Exhaustion" },
  
  // Mental Distance (5 items)
  { id: 9, text: "I struggle to find any enthusiasm for my work at school.", category: "Mental Distance" },
  { id: 10, text: "At school, I do not think much about what I am doing and I function on autopilot.", category: "Mental Distance" },
  { id: 11, text: "I feel a strong aversion towards my job.", category: "Mental Distance" },
  { id: 12, text: "I feel indifferent about my job.", category: "Mental Distance" },
  { id: 13, text: "I'm cynical about what my work means to others.", category: "Mental Distance" },
  
  // Cognitive Impairment (5 items)
  { id: 14, text: "At school, I have trouble staying focused", category: "Cognitive Impairment" },
  { id: 15, text: "At school, I struggle to think clearly", category: "Cognitive Impairment" },
  { id: 16, text: "I'm forgetful and distracted at school.", category: "Cognitive Impairment" },
  { id: 17, text: "When I'm working at school, I have trouble concentrating.", category: "Cognitive Impairment" },
  { id: 18, text: "I make mistakes at school because I have my mind on other things.", category: "Cognitive Impairment" },
  
  // Emotional Impairment (5 items)
  { id: 19, text: "At work, I feel unable to control my emotions", category: "Emotional Impairment" },
  { id: 20, text: "I do not recognize myself in the way I react emotionally at work", category: "Emotional Impairment" },
  { id: 21, text: "During my work, I become irritable when things don't go my way", category: "Emotional Impairment" },
  { id: 22, text: "I get upset or sad at work without knowing why", category: "Emotional Impairment" },
  { id: 23, text: "At work, I may overreact unintentionally", category: "Emotional Impairment" },
  
  // Psychological complaints (5 items)
  { id: 24, text: "I have trouble falling or staying asleep", category: "Psychological Complaints" },
  { id: 25, text: "I tend to worry", category: "Psychological Complaints" },
  { id: 26, text: "I feel tense and stressed", category: "Psychological Complaints" },
  { id: 27, text: "I feel anxious and/or suffer from panic attacks", category: "Psychological Complaints" },
  { id: 28, text: "Noise and crowds disturb me", category: "Psychological Complaints" },
  
  // Psychosomatic complaints (5 items)
  { id: 29, text: "I suffer from palpitations or chest pain", category: "Psychosomatic Complaints" },
  { id: 30, text: "I suffer from stomach and/or intestinal complaints", category: "Psychosomatic Complaints" },
  { id: 31, text: "I suffer from headaches", category: "Psychosomatic Complaints" },
  { id: 32, text: "I suffer from muscle pain, for example in the neck, shoulder or back", category: "Psychosomatic Complaints" },
  { id: 33, text: "I often get sick", category: "Psychosomatic Complaints" },
];

export const ScaleOptions = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" },
];