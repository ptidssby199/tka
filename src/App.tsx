import React, { useState, useEffect } from 'react';
import { 
  EducationLevel, 
  StudentProfile, 
  Question, 
  QuizResult, 
  QuestionDifficulty 
} from './types';
import { 
  loadProfile, 
  saveProfile, 
  recordQuizCompletion, 
  getDefaultProfile 
} from './utils/storage';
import { soundFx } from './utils/audio';
import { SAMPLE_QUESTIONS, SUBJECTS_BY_LEVEL } from './data/questions';
import { ALL_BADGES } from './data/badges';
import { prepareQuestionsForQuiz, getNextVariant } from './utils/questionVariation';
import { Header } from './components/Header';
import { PracticeView } from './components/PracticeView';
import { DashboardView } from './components/DashboardView';
import { GamificationView } from './components/GamificationView';
import { GithubDeployGuide } from './components/GithubDeployGuide';
import { QuizRunner } from './components/QuizRunner';
import { Sparkles, Trophy, X } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => loadProfile());
  const [currentTab, setCurrentTab] = useState<'practice' | 'dashboard' | 'achievements' | 'github'>('practice');
  const [activeQuiz, setActiveQuiz] = useState<{
    questions: Question[];
    mode: 'practice' | 'exam';
    subjectName: string;
  } | null>(null);

  const [newBadgeToast, setNewBadgeToast] = useState<{ name: string; icon: string } | null>(null);

  // Sync sound settings with audio manager
  useEffect(() => {
    soundFx.enabled = profile.soundEnabled;
  }, [profile.soundEnabled]);

  // Handle Jenjang Change (SD, SMP, SMA/SMK)
  const handleLevelChange = (lvl: EducationLevel) => {
    const updated: StudentProfile = {
      ...profile,
      selectedLevel: lvl,
      grade: lvl === 'SD' ? 'Kelas 6' : lvl === 'SMP' ? 'Kelas 9' : 'Kelas 12'
    };
    setProfile(updated);
    saveProfile(updated);
  };

  // Toggle Sound FX
  const handleToggleSound = () => {
    const nextState = !profile.soundEnabled;
    soundFx.enabled = nextState;
    if (nextState) soundFx.playClick();
    const updated = { ...profile, soundEnabled: nextState };
    setProfile(updated);
    saveProfile(updated);
  };

  // Start Quiz from Subject / Practice configuration with Anti-Memorization Variation Engine
  const handleStartQuiz = (
    subjectId: string, 
    mode: 'practice' | 'exam', 
    difficulty: 'all' | QuestionDifficulty = 'all'
  ) => {
    const { questions: preparedList } = prepareQuestionsForQuiz(
      SAMPLE_QUESTIONS,
      profile,
      subjectId,
      difficulty
    );

    const subjects = SUBJECTS_BY_LEVEL[profile.selectedLevel] || [];
    const subjObj = subjects.find((s) => s.id === subjectId);
    const subjectName = subjObj ? subjObj.name : 'Asesmen Campuran';

    setActiveQuiz({
      questions: preparedList,
      mode,
      subjectName
    });
  };

  // Dynamically swap a question to its next contextual variant during active practice
  const handleRegenerateVariant = (qIndex: number) => {
    if (!activeQuiz) return;
    const currentQ = activeQuiz.questions[qIndex];
    const variedQ = getNextVariant(currentQ, currentQ.currentVariantIndex || 0);

    const updatedQuestions = [...activeQuiz.questions];
    updatedQuestions[qIndex] = variedQ;

    setActiveQuiz({
      ...activeQuiz,
      questions: updatedQuestions
    });
  };

  // Reset question completion status for student
  const handleResetQuestionHistory = () => {
    const updated: StudentProfile = {
      ...profile,
      completedQuestionIds: [],
      questionVariantIndices: {}
    };
    setProfile(updated);
    saveProfile(updated);
  };

  // Handle Quiz Completion
  const handleQuizFinish = (result: QuizResult) => {
    const { updatedProfile, newBadges } = recordQuizCompletion(profile, result);
    setProfile(updatedProfile);

    // Show toast for newly unlocked badge
    if (newBadges.length > 0) {
      const badgeInfo = ALL_BADGES.find((b) => b.id === newBadges[0]);
      if (badgeInfo) {
        setNewBadgeToast({ name: badgeInfo.name, icon: badgeInfo.icon });
        setTimeout(() => {
          setNewBadgeToast(null);
        }, 6000);
      }
    }
  };

  // Reset Data to Initial
  const handleResetData = () => {
    const def = getDefaultProfile(profile.selectedLevel);
    saveProfile(def);
    setProfile(def);
    soundFx.playClick();
  };

  // Import Data
  const handleImportData = (imported: StudentProfile) => {
    setProfile(imported);
    saveProfile(imported);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Newly Earned Badge Toast Notification */}
      {newBadgeToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-amber-400/40 flex items-center gap-3">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-xl">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Lencana Baru Terbuka!
              </span>
              <p className="text-sm font-bold">{newBadgeToast.name}</p>
            </div>
            <button
              onClick={() => setNewBadgeToast(null)}
              className="ml-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Header (Only shown when not in full-screen quiz mode) */}
      {!activeQuiz && (
        <Header
          profile={profile}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onLevelChange={handleLevelChange}
          onToggleSound={handleToggleSound}
          soundEnabled={profile.soundEnabled}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeQuiz ? (
          <QuizRunner
            questions={activeQuiz.questions}
            mode={activeQuiz.mode}
            subjectName={activeQuiz.subjectName}
            onFinish={handleQuizFinish}
            onExit={() => setActiveQuiz(null)}
            onRegenerateVariant={handleRegenerateVariant}
          />
        ) : (
          <>
            {currentTab === 'practice' && (
              <PracticeView
                selectedLevel={profile.selectedLevel}
                profile={profile}
                onUpdateProfile={(updated) => {
                  setProfile(updated);
                  saveProfile(updated);
                }}
                onResetCompletedQuestions={handleResetQuestionHistory}
                onStartQuiz={handleStartQuiz}
              />
            )}

            {currentTab === 'dashboard' && (
              <DashboardView
                profile={profile}
                onStartQuizFromSubject={(subjId) => handleStartQuiz(subjId, 'practice')}
              />
            )}

            {currentTab === 'achievements' && (
              <GamificationView
                profile={profile}
                onUpdateProfile={setProfile}
              />
            )}

            {currentTab === 'github' && (
              <GithubDeployGuide
                profile={profile}
                onResetData={handleResetData}
                onImportData={handleImportData}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      {!activeQuiz && (
        <footer className="border-t border-slate-200 bg-white py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">TKA Pintar</span>
              <span>• Latihan Soal Ujian Sekolah SD, SMP, SMA/SMK</span>
              <span className="text-blue-600 font-semibold">Kurikulum Merdeka</span>
            </div>
            <div>
              <span>Siap Publikasi ke GitHub Pages dengan GitHub Actions</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
