import { StudentProfile, QuizResult, EducationLevel, DayActivity } from '../types';

const STORAGE_KEY = 'tka_pintar_student_profile_v1';

export function getRankTitle(level: number): string {
  if (level <= 1) return 'Penjelajah Ilmu';
  if (level === 2) return 'Pejuang Merdeka';
  if (level === 3) return 'Cendekiawan Muda';
  if (level === 4) return 'Master Asesmen';
  if (level >= 5) return 'Begawan Prestasi';
  return 'Siswa Berprestasi';
}

export function calculateLevel(xp: number): { level: number; nextLevelXp: number; prevLevelXp: number; progressPercent: number } {
  // Thresholds: Level 1: 0-200, Level 2: 200-500, Level 3: 500-1000, Level 4: 1000-2000, Level 5: 2000-3500...
  const thresholds = [0, 200, 500, 1000, 2000, 3500, 5500, 8000];
  let currentLevel = 1;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      currentLevel = i + 1;
    } else {
      break;
    }
  }

  const prevXp = thresholds[currentLevel - 1] || 0;
  const nextXp = thresholds[currentLevel] || prevXp + 2000;
  const diff = nextXp - prevXp;
  const inLevel = Math.max(0, xp - prevXp);
  const progressPercent = Math.min(100, Math.round((inLevel / diff) * 100));

  return {
    level: currentLevel,
    prevLevelXp: prevXp,
    nextLevelXp: nextXp,
    progressPercent
  };
}

export function getInitialDaysMap(): Record<string, DayActivity> {
  const days: Record<string, DayActivity> = {};
  const today = new Date();
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  // Generate current week days
  const currentDayOfWeek = today.getDay(); // 0 = Sunday
  // Get Monday of this week
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = dayNames[d.getDay()];
    days[dateStr] = {
      date: dateStr,
      dayLabel,
      questionsCount: 0,
      durationMinutes: 0,
      xpEarned: 0
    };
  }

  return days;
}

export function getDefaultProfile(level: EducationLevel = 'SMP'): StudentProfile {
  const today = new Date().toISOString().split('T')[0];
  const days = getInitialDaysMap();

  // Populate some gentle initial activity so dashboard looks alive and inspiring
  const dates = Object.keys(days).sort();
  if (dates.length >= 3) {
    days[dates[0]] = { ...days[dates[0]], questionsCount: 5, durationMinutes: 12, xpEarned: 80 };
    days[dates[1]] = { ...days[dates[1]], questionsCount: 8, durationMinutes: 18, xpEarned: 130 };
    days[dates[2]] = { ...days[dates[2]], questionsCount: 6, durationMinutes: 15, xpEarned: 95 };
  }

  const initialHistory: QuizResult[] = [
    {
      id: 'demo-result-1',
      timestamp: Date.now() - 86400000 * 2,
      level,
      subject: level === 'SD' ? 'sd-literasi' : level === 'SMP' ? 'smp-literasi' : 'sma-literasi-indonesia',
      mode: 'practice',
      totalQuestions: 5,
      correctAnswers: 4,
      score: 80,
      durationSeconds: 240,
      xpEarned: 120,
      answers: []
    },
    {
      id: 'demo-result-2',
      timestamp: Date.now() - 86400000,
      level,
      subject: level === 'SD' ? 'sd-numerasi' : level === 'SMP' ? 'smp-numerasi' : 'sma-penalaran-matematika',
      mode: 'exam',
      totalQuestions: 5,
      correctAnswers: 5,
      score: 100,
      durationSeconds: 310,
      xpEarned: 170,
      answers: []
    }
  ];

  return {
    name: 'Siswa Merdeka',
    avatar: '👨‍🎓',
    selectedLevel: level,
    grade: level === 'SD' ? 'Kelas 6' : level === 'SMP' ? 'Kelas 9' : 'Kelas 12',
    xp: 290,
    level: 2,
    rankTitle: 'Pejuang Merdeka',
    streakDays: 3,
    lastActiveDate: today,
    totalQuizzesTaken: 2,
    totalQuestionsAnswered: 10,
    weeklyGoalMinutes: 90,
    soundEnabled: true,
    unlockedBadgeIds: ['first_quiz', 'score_superior', 'score_perfect', 'streak_3'],
    history: initialHistory,
    dailyActivities: days,
    completedQuestionIds: ['sd-lit-1', 'smp-lit-1'],
    questionVariantIndices: { 'sd-lit-1': 1, 'smp-lit-1': 1 },
    hideCompletedQuestions: false,
    autoVaryCompletedQuestions: true
  };
}

export function loadProfile(): StudentProfile {
  if (typeof window === 'undefined') return getDefaultProfile();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const def = getDefaultProfile();
      saveProfile(def);
      return def;
    }
    const parsed = JSON.parse(raw) as StudentProfile;
    // Ensure all keys exist
    if (!parsed.dailyActivities) {
      parsed.dailyActivities = getInitialDaysMap();
    }
    if (!parsed.completedQuestionIds) {
      parsed.completedQuestionIds = [];
    }
    if (!parsed.questionVariantIndices) {
      parsed.questionVariantIndices = {};
    }
    if (parsed.hideCompletedQuestions === undefined) {
      parsed.hideCompletedQuestions = false;
    }
    if (parsed.autoVaryCompletedQuestions === undefined) {
      parsed.autoVaryCompletedQuestions = true;
    }
    return parsed;
  } catch {
    return getDefaultProfile();
  }
}

export function saveProfile(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to localStorage:', e);
  }
}

export function recordQuizCompletion(profile: StudentProfile, result: QuizResult): { updatedProfile: StudentProfile; newBadges: string[] } {
  const today = new Date().toISOString().split('T')[0];
  const newHistory = [result, ...profile.history];

  // Update daily activity
  const updatedDaily = { ...(profile.dailyActivities || getInitialDaysMap()) };
  const currentDay = updatedDaily[today] || {
    date: today,
    dayLabel: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][new Date().getDay()],
    questionsCount: 0,
    durationMinutes: 0,
    xpEarned: 0
  };

  const minutesSpent = Math.max(1, Math.round(result.durationSeconds / 60));
  updatedDaily[today] = {
    ...currentDay,
    questionsCount: currentDay.questionsCount + result.totalQuestions,
    durationMinutes: currentDay.durationMinutes + minutesSpent,
    xpEarned: currentDay.xpEarned + result.xpEarned
  };

  // Streak logic
  let newStreak = profile.streakDays;
  if (profile.lastActiveDate !== today) {
    const lastDate = new Date(profile.lastActiveDate);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  const newTotalXp = profile.xp + result.xpEarned;
  const { level: newLevel } = calculateLevel(newTotalXp);
  const newRank = getRankTitle(newLevel);

  // Check newly unlocked badges
  const unlocked = new Set(profile.unlockedBadgeIds);
  const newlyEarned: string[] = [];

  const checkBadge = (id: string, condition: boolean) => {
    if (condition && !unlocked.has(id)) {
      unlocked.add(id);
      newlyEarned.push(id);
    }
  };

  checkBadge('first_quiz', newHistory.length >= 1);
  checkBadge('score_perfect', result.score === 100);
  checkBadge('score_superior', result.score >= 80);
  checkBadge('streak_3', newStreak >= 3);
  checkBadge('streak_7', newStreak >= 7);
  checkBadge('cendekiawan', newLevel >= 3);
  checkBadge('master_kurikulum', newHistory.length >= 5);

  // Track completed questions and update variant rotation
  const completedSet = new Set(profile.completedQuestionIds || []);
  const updatedVariantIndices = { ...(profile.questionVariantIndices || {}) };

  result.answers.forEach((ans) => {
    completedSet.add(ans.questionId);
    // Advance variant index so next time this question appears, it uses a fresh variation
    const currentVar = updatedVariantIndices[ans.questionId] || 0;
    updatedVariantIndices[ans.questionId] = currentVar + 1;
  });

  const updatedProfile: StudentProfile = {
    ...profile,
    xp: newTotalXp,
    level: newLevel,
    rankTitle: newRank,
    streakDays: newStreak,
    lastActiveDate: today,
    totalQuizzesTaken: profile.totalQuizzesTaken + 1,
    totalQuestionsAnswered: profile.totalQuestionsAnswered + result.totalQuestions,
    unlockedBadgeIds: Array.from(unlocked),
    history: newHistory,
    dailyActivities: updatedDaily,
    completedQuestionIds: Array.from(completedSet),
    questionVariantIndices: updatedVariantIndices
  };

  saveProfile(updatedProfile);
  return { updatedProfile, newBadges: newlyEarned };
}
