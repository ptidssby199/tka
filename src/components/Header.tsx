import React from 'react';
import { EducationLevel, StudentProfile } from '../types';
import { calculateLevel } from '../utils/storage';
import { soundFx } from '../utils/audio';
import { 
  Flame, 
  Volume2, 
  VolumeX, 
  GraduationCap, 
  Sparkles,
  Github,
  BookOpen,
  Edit3
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallPrompt';

interface HeaderProps {
  profile: StudentProfile;
  currentTab: 'practice' | 'dashboard' | 'achievements' | 'github';
  onTabChange: (tab: 'practice' | 'dashboard' | 'achievements' | 'github') => void;
  onLevelChange: (level: EducationLevel) => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
  onOpenProfileModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  currentTab,
  onTabChange,
  onLevelChange,
  onToggleSound,
  soundEnabled,
  onOpenProfileModal
}) => {
  const { level, progressPercent, nextLevelXp, prevLevelXp } = calculateLevel(profile.xp);
  const currentInLevelXp = Math.max(0, profile.xp - prevLevelXp);
  const neededInLevelXp = nextLevelXp - prevLevelXp;

  const handleLevelSelect = (lvl: EducationLevel) => {
    soundFx.playClick();
    onLevelChange(lvl);
  };

  const navItems = [
    { id: 'practice', label: 'Latihan & Ujian', icon: BookOpen },
    { id: 'dashboard', label: 'Progres Belajar', icon: GraduationCap },
    { id: 'achievements', label: 'Prestasi & Misi', icon: Sparkles },
    { id: 'github', label: 'GitHub Pages', icon: Github }
  ] as const;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Top Banner / Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900">
                  TKA Pintar
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold tracking-wide text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
                  Kurikulum Merdeka
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Asesmen & Ujian Sekolah Interaktif
              </p>
            </div>
          </div>

          {/* Jenjang Selector (SD / SMP / SMA/SMK) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200" id="jenjang-selector">
            {(['SD', 'SMP', 'SMA_SMK'] as EducationLevel[]).map((lvl) => {
              const label = lvl === 'SMA_SMK' ? 'SMA / SMK' : lvl;
              const isSelected = profile.selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  id={`btn-jenjang-${lvl.toLowerCase()}`}
                  onClick={() => handleLevelSelect(lvl)}
                  className={`px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                    isSelected
                      ? 'bg-white text-blue-700 shadow-xs font-bold border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Gamification Stats & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Streak Counter */}
            <div 
              className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-xs sm:text-sm font-bold"
              title={`${profile.streakDays} hari belajar berturut-turut!`}
              id="streak-indicator"
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-600 animate-pulse" />
              <span>{profile.streakDays}</span>
              <span className="hidden sm:inline text-xs font-medium text-amber-600">Hari</span>
            </div>

            {/* Level & XP Mini Bar */}
            <div className="hidden lg:flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
              <div className="flex flex-col">
                <div className="flex items-center justify-between text-[11px] gap-2">
                  <span className="font-bold text-slate-800">Lv.{level} {profile.rankTitle}</span>
                  <span className="text-slate-500">{profile.xp} XP</span>
                </div>
                <div className="w-28 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-0.5">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Student Name & Avatar Profile Button */}
            <button
              id="btn-edit-student-profile"
              onClick={onOpenProfileModal}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 transition-all text-left group"
              title="Atur Nama & Profil Siswa"
            >
              <span className="text-xl sm:text-2xl leading-none">{profile.avatar || '👨‍🎓'}</span>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[110px]">
                    {profile.name || 'Beri Nama'}
                  </span>
                  <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <span className="text-[10px] text-blue-700 font-semibold block leading-tight">
                  Lv.{level} {profile.rankTitle}
                </span>
              </div>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={onToggleSound}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={soundEnabled ? 'Matikan Suara FX' : 'Aktifkan Suara FX'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-blue-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="border-t border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-1 scrollbar-none" aria-label="Tabs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  onClick={() => {
                    soundFx.playClick();
                    onTabChange(item.id);
                  }}
                  className={`flex items-center gap-2 py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
