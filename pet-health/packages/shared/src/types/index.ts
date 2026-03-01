export interface User {
  _id: string;
  openid?: string;
  unionid?: string;
  phone?: string;
  password?: string;
  nickname?: string;
  avatar?: string;
  loginType: ('wechat' | 'phone')[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Pet {
  _id: string;
  userId: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed?: string;
  gender?: 'male' | 'female';
  birthDate?: Date;
  weight?: number;
  avatar?: string;
  chipId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DietRecord {
  _id: string;
  petId: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodType: string;
  amount: number;
  unit: 'g' | 'cup' | 'can';
  notes?: string;
  createdAt: Date;
}

export interface VaccineRecord {
  _id: string;
  petId: string;
  vaccineName: string;
  type: 'rabies' | 'combined' | 'other';
  inoculationDate: Date;
  nextDate?: Date;
  hospital?: string;
  notes?: string;
  createdAt: Date;
}

export interface TrackPoint {
  lat: number;
  lng: number;
  timestamp: Date;
}

export interface WalkRecord {
  _id: string;
  petId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  distance: number;
  trackPoints: TrackPoint[];
  manual: boolean;
  notes?: string;
  createdAt: Date;
}

export interface DietSummary {
  totalMeals: number;
  avgAmount: number;
  foodTypes: string[];
}

export interface WalkSummary {
  totalTimes: number;
  totalDistance: number;
  totalDuration: number;
  avgDuration: number;
}

export interface VaccineAlert {
  vaccineName: string;
  dueDate: Date;
}

export interface HealthReport {
  _id: string;
  petId: string;
  weekStart: Date;
  weekEnd: Date;
  dietSummary: DietSummary;
  walkSummary: WalkSummary;
  vaccineAlerts: VaccineAlert[];
  healthScore: number;
  suggestions: string[];
  createdAt: Date;
}

export interface EmotionRecord {
  _id: string;
  petId: string;
  photoUrl: string;
  emotion: 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral';
  confidence: number;
  analyzedAt: Date;
  createdAt: Date;
}
