import React, { useState } from 'react';
import { StudentProfile, Badge } from '../types';
import { ALL_BADGES } from '../data/badges';
import { calculateLevel, saveProfile } from '../utils/storage';
import { soundFx } from '../utils/audio';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Award, 
  Star, 
  Zap, 
  GraduationCap, 
  Compass, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck,
  Edit2
} from 'lucide-react';

interface GamificationViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
}

export const GamificationView: React.FC<GamificationViewProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);

  const { level, progressPercent, nextLevelXp, prevLevelXp } = calculateLevel(profile.xp);
  const currentInLevelXp = Math.max(0, profile.xp - prevLevelXp);
  const neededInLevelXp = nextLevelXp - prevLevelXp;

  const unlockedSet = new Set(profile.unlockedBadgeIds);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Star': return <Star className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      soundFx.playClick();
      const updated = { ...profile, name: nameInput.trim() };
      saveProfile(updated);
      onUpdateProfile(updated);
      setIsEditingName(false);
    }
  };

  const ranks = [
    { level: 0, title: 'Siswa Baru', xpRange: '0 - 99 XP' },
    { level: 1, title: 'Penjelajah Ilmu', xpRange: '100 - 299 XP' },
    { level: 2, title: 'Pejuang Merdeka', xpRange: '300 - 649 XP' },
    { level: 3, title: 'Cendekiawan Muda', xpRange: '650 - 1.199 XP' },
    { level: 4, title: 'Master Asesmen', xpRange: '1.200 - 2.199 XP' },
    { level: 5, title: 'Begawan Prestasi', xpRange: '2.200+ XP' }
  ];

  // Daily quests checklist based on actual profile state
  const dailyQuests = [
    {
      id: 'quest-1',
      title: 'Latihan Harian',
      desc: 'Selesaikan minimal 1 sesi latihan soal hari ini',
      completed: profile.totalQuizzesTaken > 0,
      rewardXp: 30
    },
    {
      id: 'quest-2',
      title: 'Konsistensi Streak',
      desc: 'Pertahankan api belajar minimal 3 hari berurutan',
      completed: profile.streakDays >= 3,
      rewardXp: 50
    },
    {
      id: 'quest-3',
      title: 'Standar Kelulusan KKM',
      desc: 'Capai nilai minimal 80 pada latihan atau ujian',
      completed: profile.history.some((h) => h.score >= 80),
      rewardXp: 40
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="gamification-view">
      
      {/* Profile & Level Overview Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl sm:text-4xl shadow-xs ring-4 ring-blue-50">
              {profile.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="px-2.5 py-1 text-base font-bold border border-blue-400 rounded-lg outline-none"
                      autoFocus
                    />
                    <button type="submit" className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded-lg font-semibold">
                      Simpan
                    </button>
                  </form>
                ) : (
                  <>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {profile.name}
                    </h2>
                    <button 
                      onClick={() => setIsEditingName(true)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                      title="Ubah nama siswa"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Jenjang {profile.selectedLevel === 'SMA_SMK' ? 'SMA / SMK' : profile.selectedLevel} • {profile.grade}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                  Lv.{level} {profile.rankTitle}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-amber-500" /> {profile.streakDays} Hari Streak
                </span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full md:w-80 bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
              <span className="text-slate-700">Kemajuan Level {level}</span>
              <span className="text-blue-600">{currentInLevelXp} / {neededInLevelXp} XP</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Kumpulkan {neededInLevelXp - currentInLevelXp} XP lagi untuk naik ke Level {level + 1}.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Lencana Prestasi & Misi Harian */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Lencana Prestasi (Badges Showcase) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Lencana Prestasi Siswa
              </h3>
              <p className="text-xs text-slate-500">
                Koleksi lencana yang diperoleh dari capaian akademik dan keaktifan belajar.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              {unlockedSet.size} / {ALL_BADGES.length} Terbuka
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ALL_BADGES.map((b) => {
              const isUnlocked = unlockedSet.has(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isUnlocked
                      ? 'border-amber-300 bg-gradient-to-br from-amber-50/50 to-white shadow-xs'
                      : 'border-slate-200 bg-slate-50/60 opacity-60'
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-200'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {getBadgeIcon(b.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{b.name}</h4>
                      {isUnlocked && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          Tercapai
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {b.description}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 italic">
                      Syarat: {b.requirementText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Misi Harian (Daily Quests) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Misi Pembelajaran
              </h3>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                Tantangan
              </span>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((q) => (
                <div 
                  key={q.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    q.completed 
                      ? 'border-emerald-200 bg-emerald-50/60' 
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      {q.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{q.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{q.desc}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded shrink-0">
                      +{q.rewardXp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jenjang Tingkatan Pangkat */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
              Tingkatan Jenjang Peringkat
            </span>
            <div className="space-y-1.5 text-xs">
              {ranks.map((r) => {
                const isCurrent = r.level === level;
                return (
                  <div 
                    key={r.level}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      isCurrent ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200' : 'text-slate-600'
                    }`}
                  >
                    <span>Lv.{r.level} {r.title}</span>
                    <span className="text-[11px] text-slate-400">{r.xpRange}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
