/**
 * Types definition for TKA Pintar - Kurikulum Merdeka
 */

export type EducationLevel = 'SD' | 'SMP' | 'SMA_SMK';

export type QuestionDifficulty = 'Mudah' | 'Sedang' | 'HOTS';

export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false' | 'short_answer';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionVariant {
  variantName: string;
  stimulusTitle?: string;
  stimulus?: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string | string[] | boolean;
  explanation: string;
}

export interface Question {
  id: string;
  level: EducationLevel;
  subject: string;
  topic: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  stimulus?: string; // Konteks bacaan, studi kasus, atau data grafik Kurikulum Merdeka
  stimulusTitle?: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string | string[] | boolean;
  explanation: string;
  learningObjective: string; // Capaian Pembelajaran (CP)
  keywords?: string[];
  variants?: QuestionVariant[]; // Variasi kalimat, angka, atau konteks berbeda
  currentVariantIndex?: number;
  isVaried?: boolean;
}

export interface SubjectInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
  accentColor: string; // e.g., 'blue', 'emerald', 'amber', 'purple'
  fase: string; // e.g. "Fase A/B/C" untuk SD, "Fase D" untuk SMP, "Fase E/F" untuk SMA
}

export interface QuizAnswer {
  questionId: string;
  userAnswer: string | string[] | boolean;
  isCorrect: boolean;
  timeSpentSeconds: number;
  isFlagged?: boolean; // Ragu-ragu
}

export interface QuizResult {
  id: string;
  timestamp: number;
  level: EducationLevel;
  subject: string;
  mode: 'practice' | 'exam';
  totalQuestions: number;
  correctAnswers: number;
  score: number; // 0 - 100
  durationSeconds: number;
  xpEarned: number;
  answers: QuizAnswer[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'score' | 'streak' | 'subject' | 'milestone';
  requirementText: string;
  unlockedAt?: number;
}

export interface DayActivity {
  date: string; // YYYY-MM-DD
  dayLabel: string; // Sen, Sel, Rab, Kam, Jum, Sab, Min
  questionsCount: number;
  durationMinutes: number;
  xpEarned: number;
}

export interface StudentProfile {
  name: string;
  avatar: string;
  selectedLevel: EducationLevel;
  grade: string;
  xp: number;
  level: number;
  rankTitle: string;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  weeklyGoalMinutes: number;
  soundEnabled: boolean;
  unlockedBadgeIds: string[];
  history: QuizResult[];
  dailyActivities: Record<string, DayActivity>;
  completedQuestionIds: string[];
  questionVariantIndices: Record<string, number>;
  hideCompletedQuestions: boolean;
  autoVaryCompletedQuestions: boolean;
}
