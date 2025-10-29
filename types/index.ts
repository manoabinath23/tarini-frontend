export interface User {
  _id?: string;
  nickname: string;
  password?: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  demographics?: Demographics;
  occupational?: Occupational;
  isFirstTime: boolean;
  createdAt?: Date;
}

export interface Demographics {
  maritalStatus?: string;
  sleepHours?: string;
  sleepPattern?: string;
  chronicIllness?: string;
  mentalHealthIssues?: string;
}

export interface Occupational {
  qualification?: string;
  teachingExperience?: string;
  classSize?: string;
  yearsInCurrentSchool?: string;
  teachesOtherSubjects?: boolean;
}

export interface BATResponse {
  _id?: string;
  userId: string;
  responses: number[];
  exhaustionScore: number;
  mentalDistanceScore: number;
  cognitiveImpairmentScore: number;
  emotionalImpairmentScore: number;
  totalBATScore: number;
  psychologicalComplaintsScore: number;
  psychosomaticComplaintsScore: number;
  combinedSecondaryScore: number;
  riskLevel: 'green' | 'orange' | 'red';
  timestamp: Date;
}

export interface EmojiRating {
  _id?: string;
  userId: string;
  level: number;
  emoji: string;
  label: string;
  stressCategory: 'low' | 'average' | 'high';
  timestamp: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (nickname: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  loading: boolean;
}