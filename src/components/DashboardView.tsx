import React, { useState } from 'react';
import { StudentProfile, EducationLevel, QuizResult } from '../types';
import { SUBJECTS_BY_LEVEL, SAMPLE_QUESTIONS } from '../data/questions';
import { calculateLevel } from '../utils/storage';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Target, 
  BarChart3, 
  Award,
  ChevronRight,
  Sparkles,
  Layers,
  BookOpen,
  Brain,
  RotateCcw
} from 'lucide-react';

interface DashboardViewProps {
  profile: StudentProfile;
  onStartQuizFromSubject: (subjectId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  onStartQuizFromSubject
}) => {
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<QuizResult | null>(null);

  const subjects = SUBJECTS_BY_LEVEL[profile.selectedLevel] || [];
  const history = profile.history || [];

  // Calculate high-level stats
  const totalQuizzes = history.length;
  const averageScore = totalQuizzes > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / totalQuizzes)
    : 0;
  
  const totalQuestionsDone = history.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const totalMinutesStudied = Math.round(
    history.reduce((acc, curr) => acc + curr.durationSeconds, 0) / 60
  );

  // Weekly study progress calculation
  const weeklyActivities = Object.values(profile.dailyActivities || {});
  const weeklyTotalMinutes = weeklyActivities.reduce((acc, d) => acc + d.durationMinutes, 0);
  const weeklyTotalQuestions = weeklyActivities.reduce((acc, d) => acc + d.questionsCount, 0);
  const weeklyGoalPercent = Math.min(100, Math.round((weeklyTotalMinutes / (profile.weeklyGoalMinutes || 90)) * 100));

  // Subject mastery statistics
  const subjectStats = subjects.map((subj) => {
    const subjHistory = history.filter((h) => h.subject === subj.id);
    if (subjHistory.length === 0) {
      return {
        ...subj,
        testsCount: 0,
        averageScore: 0,
        masteryLevel: 'Belum Diuji'
      };
    }
    const avg = Math.round(subjHistory.reduce((acc, h) => acc + h.score, 0) / subjHistory.length);
    let masteryLevel = 'Perlu Latihan';
    if (avg >= 85) masteryLevel = 'Mahir (Tinggi)';
    else if (avg >= 75) masteryLevel = 'Cakap (Sesuai Standar)';
    else if (avg >= 60) masteryLevel = 'Dasar';

    return {
      ...subj,
      testsCount: subjHistory.length,
      averageScore: avg,
      masteryLevel
    };
  });

  // Data for Score Evolution Chart (Reversed to chronological order: oldest to newest)
  const chartPoints = [...history]
    .slice(0, 8)
    .reverse()
    .map((h, idx) => ({
      index: idx + 1,
      score: h.score,
      date: new Date(h.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      mode: h.mode === 'exam' ? 'Simulasi' : 'Latihan'
    }));

  // Dynamic question variations tracking
  const levelQuestions = SAMPLE_QUESTIONS.filter((q) => q.level === profile.selectedLevel);
  const completedCount = levelQuestions.filter((q) => (profile.completedQuestionIds || []).includes(q.id)).length;
  const variedRotationCount = Object.keys(profile.questionVariantIndices || {}).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="dashboard-siswa">
      
      {/* Top Welcome & KPI Cards */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard Progres Belajar Siswa
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Pemantauan capaian kompetensi, grafik perkembangan nilai, dan target mingguan Kurikulum Merdeka ({profile.selectedLevel === 'SMA_SMK' ? 'SMA / SMK' : profile.selectedLevel}).
            </p>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-xs font-semibold">
            <Layers className="w-4 h-4 text-blue-600" />
            {profile.selectedLevel === 'SD' ? 'Fase A/B/C' : profile.selectedLevel === 'SMP' ? 'Fase D' : 'Fase E/F'}
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Rata-rata Skor</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {averageScore}
              <span className="text-sm font-normal text-slate-500 ml-1">/100</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {averageScore >= 75 ? 'Di atas standar KKM (75)' : 'Tingkatkan latihan harian'}
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Soal Terjawab</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalQuestionsDone}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Dari {totalQuizzes} sesi ujian & latihan
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Waktu Belajar</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalMinutesStudied}
              <span className="text-sm font-normal text-slate-500 ml-1">Menit</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Akumulasi waktu fokus belajar
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Peringkat & XP</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Lv.{profile.level}
            </div>
            <p className="text-xs text-purple-700 font-semibold mt-1">
              {profile.rankTitle} ({profile.xp} XP)
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart Perkembangan Nilai & Target Mingguan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRAFIK PERKEMBANGAN NILAI (Interactive SVG Chart) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Grafik Perkembangan Nilai Asesmen
                </h2>
                <p className="text-xs text-slate-500">
                  Tren skor ujian & latihan terkini dengan batas KKM (75).
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-0.5 bg-blue-600 inline-block" /> Skor Siswa
                </span>
                <span className="flex items-center gap-1.5 text-rose-600">
                  <span className="w-3 h-0.5 border-b border-dashed border-rose-500 inline-block" /> KKM (75)
                </span>
              </div>
            </div>

            {/* SVG Line Chart Canvas */}
            {chartPoints.length > 0 ? (
              <div className="relative mt-6 h-64 w-full" id="score-evolution-chart">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines: 100, 75 (KKM), 50, 25, 0 */}
                  {[100, 75, 50, 25, 0].map((val) => {
                    const y = 200 - (val / 100) * 170 - 15;
                    const isKkm = val === 75;
                    return (
                      <g key={val}>
                        <line
                          x1="35"
                          y1={y}
                          x2="495"
                          y2={y}
                          stroke={isKkm ? '#f43f5e' : '#e2e8f0'}
                          strokeWidth={isKkm ? '1.5' : '1'}
                          strokeDasharray={isKkm ? '4 3' : undefined}
                        />
                        <text x="5" y={y + 4} fontSize="10" fill={isKkm ? '#e11d48' : '#94a3b8'} fontWeight={isKkm ? 'bold' : 'normal'}>
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Draw points & line */}
                  {(() => {
                    const count = chartPoints.length;
                    const stepX = count > 1 ? (495 - 45) / (count - 1) : 0;
                    
                    const coords = chartPoints.map((pt, i) => {
                      const x = count === 1 ? 260 : 45 + i * stepX;
                      const y = 200 - (pt.score / 100) * 170 - 15;
                      return { ...pt, x, y };
                    });

                    const pathD = coords.reduce((acc, curr, idx) => {
                      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
                    }, '');

                    const areaD = coords.length > 1 
                      ? `${pathD} L ${coords[coords.length - 1].x} 185 L ${coords[0].x} 185 Z`
                      : '';

                    return (
                      <>
                        {coords.length > 1 && (
                          <path d={areaD} fill="url(#scoreGradient)" />
                        )}
                        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        
                        {coords.map((pt, idx) => (
                          <g key={idx} className="group cursor-pointer">
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="5"
                              fill="#ffffff"
                              stroke="#2563eb"
                              strokeWidth="2.5"
                              className="transition-transform group-hover:scale-125"
                            />
                            {/* Score number on top of dot */}
                            <text
                              x={pt.x}
                              y={pt.y - 10}
                              fontSize="11"
                              fontWeight="bold"
                              fill="#1e293b"
                              textAnchor="middle"
                            >
                              {pt.score}
                            </text>
                            {/* Date label at bottom */}
                            <text
                              x={pt.x}
                              y="198"
                              fontSize="9"
                              fill="#64748b"
                              textAnchor="middle"
                            >
                              {pt.date}
                            </text>
                          </g>
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-200 rounded-xl">
                <BarChart3 className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-sm font-semibold text-slate-700">Belum Ada Riwayat Nilai</p>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Mulai latihan soal atau simulasi ujian untuk mengamati grafik perkembangan nilai Anda.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Standar Asesmen Nasional: <strong>KKM 75</strong></span>
            <span className="text-emerald-700 font-semibold">
              {averageScore >= 75 ? '✓ Performa Akademik Terjaga' : '• Perbanyak Latihan Mandiri'}
            </span>
          </div>
        </div>

        {/* PENCAPAIAN MINGGUAN (Weekly Goal & Active Days) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Pencapaian Mingguan
              </h2>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                Minggu Ini
              </span>
            </div>

            {/* Target Progress Bar */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-blue-600" /> Target Waktu Belajar
                </span>
                <span className="font-bold text-slate-900">
                  {weeklyTotalMinutes} / {profile.weeklyGoalMinutes || 90} m
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${weeklyGoalPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                {weeklyGoalPercent >= 100 
                  ? '🎉 Target mingguan tercapai! Pertahankan prestasimu.' 
                  : `Kurang ${Math.max(0, (profile.weeklyGoalMinutes || 90) - weeklyTotalMinutes)} menit lagi untuk memenuhi target.`}
              </p>
            </div>

            {/* 7-Days Active Tracker (Senin - Minggu) */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-3 uppercase tracking-wider">
                Hari Aktif Belajar
              </span>
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {weeklyActivities.map((day, idx) => {
                  const isActive = day.questionsCount > 0 || day.durationMinutes > 0;
                  return (
                    <div 
                      key={idx}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' 
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                      title={`${day.dayLabel} (${day.date}): ${day.questionsCount} soal, ${day.durationMinutes} menit`}
                    >
                      <span className="text-[11px] uppercase font-bold">{day.dayLabel}</span>
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                        isActive ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-slate-300'
                      }`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Weekly summary badge */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Soal Terjawab: <strong>{weeklyTotalQuestions}</strong></span>
            <span className="text-amber-600 font-bold">🔥 {profile.streakDays} Hari Streak</span>
          </div>
        </div>
      </div>

      {/* Dynamic Question Variation & Anti-Memorization Status Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xs border border-indigo-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              Sistem Soal Adaptif & Anti-Hafalan Aktif
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Rotasi Soal & Variasi Konteks Otomatis
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Jika kamu mengulang latihan, kalimat soal, nama tokoh, skenario stimulus, dan angka matematis otomatis diperbarui. Hal ini melatih daya nalar kritis agar kamu memahami konsep esensial Kurikulum Merdeka tanpa menghafal pola kunci jawaban.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur border border-white/10 p-3 rounded-xl text-center min-w-[110px]">
              <span className="text-xs text-slate-300 block">Soal Dikerjakan</span>
              <span className="text-xl font-extrabold text-amber-300">{completedCount}/{levelQuestions.length}</span>
              <span className="text-[10px] text-slate-400 block">Jenjang Ini</span>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/10 p-3 rounded-xl text-center min-w-[110px]">
              <span className="text-xs text-slate-300 block">Rotasi Variasi</span>
              <span className="text-xl font-extrabold text-purple-300">{variedRotationCount}</span>
              <span className="text-[10px] text-slate-400 block">Soal Teradaptasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Mastery Breakdown (Penguasaan per Mata Pelajaran) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Penguasaan Kompetensi per Mata Pelajaran
            </h2>
            <p className="text-xs text-slate-500">
              Evaluasi penguasaan materi asesmen berbasis Capaian Pembelajaran Kurikulum Merdeka.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectStats.map((subj) => {
            const pct = subj.averageScore;
            return (
              <div 
                key={subj.id}
                className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-all bg-slate-50/50"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{subj.name}</h3>
                    <span className="text-[11px] text-slate-500">{subj.fase} • {subj.testsCount} kali tes</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    pct >= 75 ? 'bg-emerald-100 text-emerald-800' : pct > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {subj.masteryLevel}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 mt-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Capaian Skor</span>
                    <span>{subj.averageScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 line-clamp-1 max-w-[220px]">
                    {subj.description}
                  </span>
                  <button
                    onClick={() => onStartQuizFromSubject(subj.id)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    Latihan <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Riwayat Asesmen & Ujian */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Riwayat Asesmen & Latihan Soal
        </h2>

        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase font-bold tracking-wider">
                  <th className="pb-3 font-semibold">Tanggal</th>
                  <th className="pb-3 font-semibold">Mata Pelajaran</th>
                  <th className="pb-3 font-semibold">Mode</th>
                  <th className="pb-3 font-semibold">Nilai</th>
                  <th className="pb-3 font-semibold">Durasi</th>
                  <th className="pb-3 font-semibold">XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((h) => {
                  const isPassed = h.score >= 75;
                  const subjObj = subjects.find((s) => s.id === h.subject);
                  const subjTitle = subjObj ? subjObj.name : h.subject;
                  return (
                    <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 text-slate-600 font-medium">
                        {new Date(h.timestamp).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3.5 font-bold text-slate-900">
                        {subjTitle}
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                          h.mode === 'exam' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {h.mode === 'exam' ? 'Simulasi Ujian' : 'Latihan Bebas'}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className={`font-bold text-sm ${
                          isPassed ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {h.score}/100
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-500">
                        {Math.round(h.durationSeconds / 60)}m {h.durationSeconds % 60}d
                      </td>
                      <td className="py-3.5 font-bold text-blue-600">
                        +{h.xpEarned} XP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-4 text-center">
            Belum ada riwayat asesmen yang tercatat.
          </p>
        )}
      </div>

    </div>
  );
};
