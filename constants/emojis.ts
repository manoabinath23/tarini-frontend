export interface EmojiData {
  level: number;
  emoji: string;
  label: string;
  feedback: string;
  stressCategory: 'low' | 'average' | 'high';
}

export const EmojisData: EmojiData[] = [
  {
    level: 1,
    emoji: "😃",
    label: "Very Happy & Relaxed",
    feedback: "You're in a great mood! Keep enjoying your day. Maybe share that good vibe with others!",
    stressCategory: 'low'
  },
  {
    level: 2,
    emoji: "🙂",
    label: "Moderate Relaxed & Calm",
    feedback: "You're calm and collected. A great time to reflect or meditate to maintain this balance.",
    stressCategory: 'low'
  },
  {
    level: 3,
    emoji: "😐",
    label: "Mildly Stressed but Okay",
    feedback: "You're doing okay, but there's a bit of tension. Take a deep breath or stretch for a few minutes.",
    stressCategory: 'low'
  },
  {
    level: 4,
    emoji: "😕",
    label: "Slightly Stressed",
    feedback: "A bit of stress today? Try a short break or a 5-minute mindfulness session to reset.",
    stressCategory: 'average'
  },
  {
    level: 5,
    emoji: "😟",
    label: "Moderately Stressed",
    feedback: "Stress is building up. Let's slow down. Consider a guided meditation or light walk.",
    stressCategory: 'average'
  },
  {
    level: 6,
    emoji: "😣",
    label: "Quite Stressed",
    feedback: "You're feeling the pressure. It's okay to pause. Do something kind for yourself now.",
    stressCategory: 'average'
  },
  {
    level: 7,
    emoji: "😫",
    label: "Very Stressed",
    feedback: "This seems overwhelming. Try deep breathing or a calming audio to soothe your mind.",
    stressCategory: 'average'
  },
  {
    level: 7.5,
    emoji: "😩",
    label: "Borderline High Stress",
    feedback: "You're nearing burnout. Time for serious self-care—try a full 10-minute meditation or talk to someone.",
    stressCategory: 'high'
  },
  {
    level: 8,
    emoji: "😖",
    label: "Highly Stressed",
    feedback: "High stress alert! Prioritize rest and reduce mental load. You don't have to handle everything alone.",
    stressCategory: 'high'
  },
  {
    level: 9,
    emoji: "😵‍💫",
    label: "Extremely Stressed",
    feedback: "Extreme stress detected. You need to disconnect and reset. Consider guided breathing and seek support if needed.",
    stressCategory: 'high'
  },
  {
    level: 10,
    emoji: "🤕",
    label: "Severe Stress / Breakdown",
    feedback: "You're under intense stress. Please stop and take care of yourself. Use emergency calming tools, or talk to someone immediately.",
    stressCategory: 'high'
  },
];