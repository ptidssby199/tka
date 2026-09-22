import React, { useState } from 'react';
import { EducationLevel, SubjectInfo, QuestionDifficulty, StudentProfile } from '../types';
import { SUBJECTS_BY_LEVEL, SAMPLE_QUESTIONS } from '../data/questions';
import { soundFx } from '../utils/audio';
import { prepareQuestionsForQuiz } from '../utils/questionVariation';
import { 
  BookOpen, 
  Timer, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  EyeOff,
  RotateCcw,
  Check,
  Brain
} from 'lucide-react';

interface PracticeViewProps {
  selectedLevel: EducationLevel;
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onResetCompletedQuestions: () => void;
  onStartQuiz: (subjectId: string, mode: 'practice' | 'exam', difficulty: 'all' | QuestionDifficulty) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  selectedLevel,
  profile,
  onUpdateProfile,
  onResetCompletedQuestions,
  onStartQuiz
}) => {
  const [selectedMode, setSelectedMode] = useState<'practice' | 'exam'>('practice');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | QuestionDifficulty>('all');
  const [resetSuccessNotice, setResetSuccessNotice] = useState(false);

  const subjects = SUBJECTS_BY_LEVEL[selectedLevel] || [];

  // Default select first subject if none selected
  const activeSubjectId = selectedSubjectId || (subjects.length > 0 ? subjects[0].id : '');

  // Calculate question preview with variation engine
  const preparation = prepareQuestionsForQuiz(
    SAMPLE_QUESTIONS,
    profile,
    activeSubjectId,
    selectedDifficulty
  );

  const levelQuestions = SAMPLE_QUESTIONS.filter((q) => q.level === selectedLevel);
  const completedSet = new Set(profile.completedQuestionIds || []);
  const completedInLevelCount = levelQuestions.filter((q) => completedSet.has(q.id)).length;

  const handleStart = () => {
    soundFx.playClick();
    onStartQuiz(activeSubjectId, selectedMode, selectedDifficulty);
  };

  const handleToggleHideCompleted = () => {
    soundFx.playClick();
    const updated: StudentProfile = {
      ...profile,
      hideCompletedQuestions: !profile.hideCompletedQuestions
    };
    onUpdateProfile(updated);
  };

  const handleToggleAutoVary = () => {
    soundFx.playClick();
    const updated: StudentProfile = {
      ...profile,
      autoVaryCompletedQuestions: !profile.autoVaryCompletedQuestions
    };
    onUpdateProfile(updated);
  };

  const handleResetHistoryClick = () => {
    soundFx.playClick();
    onResetCompletedQuestions();
    setResetSuccessNotice(true);
    setTimeout(() => {
      setResetSuccessNotice(false);
    }, 4000);
  };

  const levelLabel = selectedLevel === 'SMA_SMK' ? 'SMA / SMK' : selectedLevel;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="practice-selection-view">
      
      {/* Hero / Intro Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur rounded-full text-xs font-semibold mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Asesmen Standar TKA • Kurikulum Merdeka
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Latihan Soal Ujian Jenjang {levelLabel}
          </h1>
          <p className="mt-2 text-blue-100 text-sm sm:text-base leading-relaxed">
            Tingkatkan kesiapan akademikmu dengan soal berbasis konteks kehidupan nyata, studi kasus ilmiah, dan penalaran tinggi (HOTS) yang otomatis beradaptasi agar kamu tidak sekadar menghafal jawaban.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              id="btn-quick-start"
              onClick={handleStart}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl text-sm transition-all shadow-sm"
            >
              <Play className="w-4 h-4 fill-blue-700" /> Mulai Asesmen Sekarang
            </button>
            <span className="text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 backdrop-blur">
              {preparation.questions.length} Butir Soal Siap Dikerjakan
            </span>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <BookOpen className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* SMART QUESTION ENGINE SETTINGS (ANTI-HAFALAN & VARIASI KALIMAT) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <Brain className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Fitur Soal Adaptif & Sistem Anti-Hafalan (Up-to-Date)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Atur bagaimana soal disajikan saat kamu berlatih berulang kali agar tetap menantang.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl font-semibold border border-slate-200">
              Progres Jenjang: <strong className="text-blue-700">{completedInLevelCount}</strong>/{levelQuestions.length} Soal Selesai
            </span>
            <button
              onClick={handleResetHistoryClick}
              title="Reset status pengerjaan soal jenjang ini"
              className="text-xs text-slate-500 hover:text-slate-800 p-1.5 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {resetSuccessNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Riwayat pengerjaan soal berhasil di-reset. Semua soal kini dapat diakses kembali dari awal!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Toggle 1: Sembunyikan Soal yang Sudah Selesai */}
          <div 
            onClick={handleToggleHideCompleted}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              profile.hideCompletedQuestions
                ? 'bg-blue-50/60 border-blue-400 ring-1 ring-blue-300'
                : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${
              profile.hideCompletedQuestions ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <EyeOff className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  Sembunyikan Soal yang Sudah Dikerjakan
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  profile.hideCompletedQuestions ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {profile.hideCompletedQuestions ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Jika diaktifkan, soal yang sudah pernah kamu selesaikan tidak akan ditampilkan lagi, sehingga kamu selalu mendapatkan materi baru.
              </p>
            </div>
          </div>

          {/* Toggle 2: Variasi Kalimat & Konteks Baru Otomatis */}
          <div 
            onClick={handleToggleAutoVary}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              profile.autoVaryCompletedQuestions
                ? 'bg-purple-50/60 border-purple-400 ring-1 ring-purple-300'
                : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${
              profile.autoVaryCompletedQuestions ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  Variasi Kalimat & Konteks Baru Otomatis
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  profile.autoVaryCompletedQuestions ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {profile.autoVaryCompletedQuestions ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Jika soal muncul kembali, kata, nama tokoh, angka numerik, dan skenario cerita diubah otomatis. Kamu terlatih memahami konsep inti tanpa menghafal pilihan!
              </p>
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {preparation.unseenCount} Soal Belum Pernah Dikerjakan
          </span>
          {preparation.variedCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              {preparation.variedCount} Soal Menggunakan Variasi Konteks Baru
            </span>
          )}
          {preparation.skippedCompletedCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
              <EyeOff className="w-3.5 h-3.5 text-amber-600" />
              {preparation.skippedCompletedCount} Soal Sudah Dikerjakan Disembunyikan
            </span>
          )}
          {preparation.isAllCompletedFallback && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
              Hebat! Semua soal di kategori ini sudah pernah kamu kerjakan. Kami mengaktifkan variasi kalimat baru.
            </span>
          )}
        </div>
      </div>

      {/* Mode Selector (Latihan Mandiri vs Simulasi Ujian TKA) */}
      <div>
        <div className="mb-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            1. Pilih Mode Belajar
          </h2>
          <p className="text-xs text-slate-500">
            Sesuaikan dengan target belajarmu hari ini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mode Latihan */}
          <div
            id="mode-practice"
            onClick={() => {
              soundFx.playClick();
              setSelectedMode('practice');
            }}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedMode === 'practice'
                ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              {selectedMode === 'practice' && (
                <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                  Aktif
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900">Mode Latihan Mandiri</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Pembahasan dan kunci jawaban langsung ditampilkan setelah menjawab tiap butir soal. Dilengkapi tombol regenerasi variasi kalimat seketika!
            </p>
          </div>

          {/* Mode Simulasi Ujian */}
          <div
            id="mode-exam"
            onClick={() => {
              soundFx.playClick();
              setSelectedMode('exam');
            }}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedMode === 'exam'
                ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-1 ring-purple-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 mb-3">
                <Timer className="w-6 h-6" />
              </div>
              {selectedMode === 'exam' && (
                <span className="text-xs font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
                  Aktif
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900">Mode Simulasi Ujian TKA</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Dilengkapi hitung mundur timer terstandar, lembar nomor butir soal, penanda ragu-ragu, dan rekapitulasi nilai akhir dengan batas kelulusan KKM 75.
            </p>
          </div>
        </div>
      </div>

      {/* Subject Selection */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Pilih Mata Pelajaran Asesmen ({levelLabel})
            </h2>
            <p className="text-xs text-slate-500">
              Setiap mata pelajaran disusun sesuai Capaian Pembelajaran Kurikulum Merdeka.
            </p>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
            <span className="text-xs text-slate-500 font-medium px-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Tingkat:
            </span>
            {(['all', 'Mudah', 'Sedang', 'HOTS'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedDifficulty(diff);
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {diff === 'all' ? 'Semua' : diff}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((subj) => {
            const isSelected = activeSubjectId === subj.id;
            const qCount = SAMPLE_QUESTIONS.filter((q) => q.level === selectedLevel && q.subject === subj.id).length;
            const completedCount = SAMPLE_QUESTIONS.filter((q) => q.level === selectedLevel && q.subject === subj.id && completedSet.has(q.id)).length;
            return (
              <div
                key={subj.id}
                id={`subject-card-${subj.id}`}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedSubjectId(subj.id);
                }}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                      {subj.fase}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {completedCount}/{qCount} Selesai
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {subj.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {subj.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-blue-700' : 'text-slate-500'}>
                    {isSelected ? 'Terpilih' : 'Klik untuk Pilih'}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Action Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Konfirmasi Pilihan Asesmen
          </span>
          <p className="text-sm font-bold text-slate-900 mt-0.5">
            Jenjang {levelLabel} • {subjects.find((s) => s.id === activeSubjectId)?.name || 'Mata Pelajaran'} • {selectedMode === 'exam' ? 'Simulasi Ujian TKA' : 'Latihan Bebas'}
          </p>
        </div>

        <button
          id="btn-launch-quiz"
          onClick={handleStart}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" /> Buka Lembar Soal ({preparation.questions.length} Soal Siap)
        </button>
      </div>

    </div>
  );
};
