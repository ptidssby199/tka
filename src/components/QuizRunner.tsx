import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Question, QuizResult, QuizAnswer } from '../types';
import { soundFx } from '../utils/audio';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  BookOpen, 
  Sparkles,
  HelpCircle,
  Flag,
  Lightbulb
} from 'lucide-react';

interface QuizRunnerProps {
  questions: Question[];
  mode: 'practice' | 'exam';
  subjectName: string;
  onFinish: (result: QuizResult) => void;
  onExit: () => void;
  onRegenerateVariant?: (questionIndex: number) => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  questions,
  mode,
  subjectName,
  onFinish,
  onExit,
  onRegenerateVariant
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [practiceChecked, setPracticeChecked] = useState<Record<string, boolean>>({});
  
  // Timer for exam mode: 2 minutes per question or default 15 minutes
  const totalDurationSeconds = Math.max(300, questions.length * 120);
  const [secondsRemaining, setSecondsRemaining] = useState(totalDurationSeconds);
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ = questions[currentIndex];

  // Exam mode countdown timer
  useEffect(() => {
    if (mode === 'exam' && !isCompleted) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleCompleteQuiz();
            return 0;
          }
          if (prev === 30 || prev === 10) {
            soundFx.playTimerWarning();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode, isCompleted]);

  const handleSelectOption = (optionId: string) => {
    if (mode === 'practice' && practiceChecked[currentQ.id]) {
      return; // Locked after checking in practice mode
    }
    soundFx.playClick();
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleToggleFlag = () => {
    soundFx.playClick();
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleCheckPracticeAnswer = () => {
    const isCorrect = userAnswers[currentQ.id] === currentQ.correctAnswer;
    if (isCorrect) {
      soundFx.playCorrect();
    } else {
      soundFx.playWrong();
    }
    setPracticeChecked((prev) => ({ ...prev, [currentQ.id]: true }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    soundFx.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleCompleteQuiz = () => {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    let correctCount = 0;

    const answersList: QuizAnswer[] = questions.map((q) => {
      const uAns = userAnswers[q.id];
      const isCorrect = uAns === q.correctAnswer;
      if (isCorrect) correctCount += 1;
      return {
        questionId: q.id,
        userAnswer: uAns ?? '',
        isCorrect,
        timeSpentSeconds: Math.round(elapsedSeconds / questions.length),
        isFlagged: !!flaggedQuestions[q.id]
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    // Base XP: 10 per correct answer, bonus for high score
    const xpBase = correctCount * 20;
    const xpBonus = score >= 90 ? 50 : score >= 75 ? 25 : 10;
    const xpEarned = xpBase + xpBonus;

    const result: QuizResult = {
      id: 'result-' + Date.now(),
      timestamp: Date.now(),
      level: currentQ.level,
      subject: currentQ.subject,
      mode,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score,
      durationSeconds: elapsedSeconds,
      xpEarned,
      answers: answersList
    };

    setIsCompleted(true);
    setQuizResult(result);
    onFinish(result);

    // Celebration sounds and confetti
    if (score >= 75) {
      soundFx.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      soundFx.playCorrect();
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // RESULTS VIEW
  if (isCompleted && quizResult) {
    const isPassed = quizResult.score >= 75;
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn" id="quiz-result-view">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
          
          {/* Trophy Header */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 text-amber-500 border border-amber-200 mb-4 shadow-xs">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {isPassed ? 'Luar Biasa! Asesmen Berhasil' : 'Tetap Semangat & Terus Latihan!'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-md mx-auto">
            {mode === 'exam' ? 'Simulasi Ujian Sekolah TKA' : 'Latihan Mandiri Interaktif'} • {subjectName}
          </p>

          {/* Big Score Card */}
          <div className="my-6 inline-block bg-slate-50 border border-slate-200 rounded-2xl px-8 py-5">
            <div className="text-5xl sm:text-6xl font-extrabold text-blue-600 tracking-tight">
              {quizResult.score}
              <span className="text-2xl font-semibold text-slate-400">/100</span>
            </div>
            <div className="mt-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold">
              <span className={`px-2.5 py-0.5 rounded-full ${
                isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {isPassed ? 'Memenuhi Standar Capaian (KKM ≥ 75)' : 'Perlu Pengayaan Materi'}
              </span>
            </div>
          </div>

          {/* Stats Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left mb-8">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-500">Benar / Total</span>
              <p className="text-lg font-bold text-slate-900 mt-0.5">
                {quizResult.correctAnswers} / {quizResult.totalQuestions} Soal
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-500">Akurasi</span>
              <p className="text-lg font-bold text-slate-900 mt-0.5">
                {Math.round((quizResult.correctAnswers / quizResult.totalQuestions) * 100)}%
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-500">Waktu Belajar</span>
              <p className="text-lg font-bold text-slate-900 mt-0.5">
                {Math.round(quizResult.durationSeconds / 60)} m {quizResult.durationSeconds % 60} d
              </p>
            </div>
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-xs text-emerald-700 font-medium">XP Diperoleh</span>
              <p className="text-lg font-bold text-emerald-700 mt-0.5">
                +{quizResult.xpEarned} XP
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="btn-back-home"
              onClick={onExit}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
            >
              Kembali ke Menu Utama
            </button>
            <button
              id="btn-retry-quiz"
              onClick={() => {
                soundFx.playClick();
                setCurrentIndex(0);
                setUserAnswers({});
                setFlaggedQuestions({});
                setPracticeChecked({});
                setIsCompleted(false);
                setQuizResult(null);
                setSecondsRemaining(totalDurationSeconds);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi Latihan
            </button>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Pembahasan Soal Berdasarkan Kurikulum Merdeka
          </h3>
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const uAns = userAnswers[q.id];
              const isCorrect = uAns === q.correctAnswer;
              return (
                <div 
                  key={q.id}
                  className={`p-5 rounded-2xl border bg-white ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-500">
                        Soal #{idx + 1} • {q.topic}
                      </span>
                      {q.isVaried && (
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-600" /> Variasi Kalimat
                        </span>
                      )}
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Belum Tepat
                        </>
                      )}
                    </span>
                  </div>

                  {q.stimulus && (
                    <div className="mb-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-700 italic border-l-2 border-blue-400">
                      <strong>{q.stimulusTitle || 'Konteks Bacaan'}:</strong> {q.stimulus}
                    </div>
                  )}

                  <p className="font-semibold text-slate-900 text-sm mb-3">
                    {q.question}
                  </p>

                  {/* Options Review */}
                  <div className="space-y-1.5 mb-4">
                    {q.options.map((opt) => {
                      const isUserChoice = uAns === opt.id;
                      const isCorrectChoice = q.correctAnswer === opt.id;
                      let badgeClass = 'border-slate-200 bg-slate-50/60 text-slate-700';
                      if (isCorrectChoice) {
                        badgeClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                      } else if (isUserChoice && !isCorrect) {
                        badgeClass = 'border-rose-300 bg-rose-50 text-rose-800 line-through';
                      }
                      return (
                        <div key={opt.id} className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${badgeClass}`}>
                          <span>
                            <strong>{opt.id}.</strong> {opt.text}
                          </span>
                          {isCorrectChoice && (
                            <span className="text-[11px] font-bold text-emerald-700">Kunci Jawaban</span>
                          )}
                          {isUserChoice && !isCorrectChoice && (
                            <span className="text-[11px] font-bold text-rose-600">Jawaban Anda</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step by step pedagogical explanation */}
                  <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      Pembahasan Konsep:
                    </div>
                    <p className="leading-relaxed">{q.explanation}</p>
                    <div className="pt-1 text-[11px] text-slate-500 border-t border-blue-100 mt-2">
                      <strong className="text-slate-700">Capaian Pembelajaran (CP):</strong> {q.learningObjective}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE QUIZ INTERFACE
  const selectedOptionId = userAnswers[currentQ.id];
  const isChecked = practiceChecked[currentQ.id];
  const isFlagged = flaggedQuestions[currentQ.id];
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" id="active-quiz-runner">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 mb-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Keluar
        </button>

        <div className="flex items-center gap-2 sm:gap-4">
          {mode === 'exam' && (
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs sm:text-sm font-mono font-bold ${
              secondsRemaining <= 60 
                ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse' 
                : 'bg-slate-100 text-slate-800'
            }`}>
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>
          )}

          <span className="text-xs sm:text-sm font-bold text-slate-700">
            Soal {currentIndex + 1} <span className="text-slate-400 font-normal">dari {questions.length}</span>
          </span>

          <button
            onClick={() => setShowQuestionGrid(!showQuestionGrid)}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            Daftar Soal ({answeredCount}/{questions.length})
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Grid Modal / Drawer if toggled */}
      {showQuestionGrid && (
        <div className="mb-6 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Navigasi Butir Soal</span>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-600 rounded-sm inline-block" /> Terjawab</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-400 rounded-sm inline-block" /> Ragu-ragu</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-200 rounded-sm inline-block" /> Belum</span>
            </div>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const isAns = userAnswers[q.id] !== undefined;
              const isFlg = flaggedQuestions[q.id];
              const isCurr = idx === currentIndex;
              let bg = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
              if (isFlg) bg = 'bg-amber-400 text-amber-950 font-bold';
              else if (isAns) bg = 'bg-blue-600 text-white font-bold';
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentIndex(idx);
                    setShowQuestionGrid(false);
                  }}
                  className={`h-9 rounded-lg text-xs font-semibold transition-all border ${
                    isCurr ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                  } ${bg}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        
        {/* Meta badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-100">
              {currentQ.topic}
            </span>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
              currentQ.difficulty === 'HOTS' 
                ? 'bg-rose-50 text-rose-700 border border-rose-200 font-bold' 
                : 'bg-slate-100 text-slate-700'
            }`}>
              {currentQ.difficulty === 'HOTS' ? '🔥 HOTS (Penalaran Tinggi)' : currentQ.difficulty}
            </span>
            {currentQ.isVaried && (
              <span className="px-2.5 py-0.5 text-xs font-bold bg-purple-100 text-purple-800 rounded-md border border-purple-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Variasi Kalimat Baru
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {mode === 'practice' && currentQ.variants && currentQ.variants.length > 0 && onRegenerateVariant && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onRegenerateVariant(currentIndex);
                  setUserAnswers((prev) => {
                    const next = { ...prev };
                    delete next[currentQ.id];
                    return next;
                  });
                  setPracticeChecked((prev) => ({ ...prev, [currentQ.id]: false }));
                }}
                title="Ubah kalimat, nama tokoh, dan angka soal ini menjadi variasi baru"
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
                <span>Ganti Variasi Kalimat</span>
              </button>
            )}

            <button
              onClick={handleToggleFlag}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                isFlagged 
                  ? 'bg-amber-50 text-amber-800 border-amber-300' 
                  : 'text-slate-500 hover:text-slate-800 border-slate-200'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-600' : ''}`} />
              {isFlagged ? 'Ditandai Ragu-ragu' : 'Tandai Ragu-ragu'}
            </button>
          </div>
        </div>

        {/* Stimulus Context (Cerita / Data / Skenario Nyata Kurikulum Merdeka) */}
        {currentQ.stimulus && (
          <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            {currentQ.stimulusTitle && (
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                {currentQ.stimulusTitle}
              </h4>
            )}
            <p className="text-sm text-slate-700 leading-relaxed">
              {currentQ.stimulus}
            </p>
          </div>
        )}

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-6">
          {currentQ.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3" role="radiogroup">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let containerStyle = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/30';
            
            if (mode === 'practice' && isChecked) {
              if (opt.id === currentQ.correctAnswer) {
                containerStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400';
              } else if (isSelected && opt.id !== currentQ.correctAnswer) {
                containerStyle = 'border-rose-400 bg-rose-50 text-rose-950';
              }
            } else if (isSelected) {
              containerStyle = 'border-blue-600 bg-blue-50 text-blue-950 font-semibold ring-1 ring-blue-500';
            }

            return (
              <div
                key={opt.id}
                id={`option-${opt.id.toLowerCase()}`}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-4 rounded-xl border text-sm transition-all cursor-pointer flex items-start gap-3 select-none ${containerStyle}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {opt.id}
                </div>
                <div className="pt-0.5 flex-1 leading-relaxed">
                  {opt.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Practice Mode: Instant Check Button & Drawer */}
        {mode === 'practice' && !isChecked && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleCheckPracticeAnswer}
              disabled={!selectedOptionId}
              className="px-5 py-2.5 bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
            >
              Periksa Jawaban
            </button>
          </div>
        )}

        {/* Practice Mode: Explanation Drawer */}
        {mode === 'practice' && isChecked && (
          <div className="mt-6 p-4 sm:p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Pembahasan Kurikulum Merdeka
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {currentQ.explanation}
            </p>
            <div className="pt-2 text-xs text-slate-600 border-t border-blue-100">
              <span className="font-semibold text-slate-800">Capaian Pembelajaran (CP):</span> {currentQ.learningObjective}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation & Finish Bar */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Soal Sebelumnya
        </button>

        <div className="flex items-center gap-2">
          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              Selanjutnya <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteQuiz}
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
            >
              Selesaikan Asesmen <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
