import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { calculateLevel, getRankTitle, getDefaultProfile } from '../utils/storage';
import { soundFx } from '../utils/audio';
import { 
  User, 
  School, 
  Sparkles, 
  Check, 
  X, 
  RotateCcw, 
  Smartphone, 
  Laptop, 
  ShieldCheck,
  Award
} from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (updated: StudentProfile) => void;
  onResetToZero: () => void;
  isFirstTime?: boolean;
}

const AVATAR_OPTIONS = ['👨‍🎓', '👩‍🎓', '🧑‍💻', '👩‍🔬', '🦊', '🚀', '🌟', '🦉', '🎯', '🦁', '🐬', '🏆'];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetToZero,
  isFirstTime = false
}) => {
  const [name, setName] = useState(profile.name || '');
  const [schoolName, setSchoolName] = useState(profile.schoolName || '');
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || '👨‍🎓');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    const trimmedName = name.trim();
    const updated: StudentProfile = {
      ...profile,
      name: trimmedName,
      schoolName: schoolName.trim(),
      avatar: selectedAvatar
    };
    onSaveProfile(updated);
    onClose();
  };

  const handleConfirmReset = () => {
    soundFx.playClick();
    onResetToZero();
    setShowResetConfirm(false);
    onClose();
  };

  const { level, nextLevelXp, prevLevelXp, progressPercent } = calculateLevel(profile.xp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn" id="student-profile-modal">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative">
        
        {/* Close Button if not strictly required first-time */}
        {!isFirstTime && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-blue-100 text-blue-700 rounded-2xl mb-3 ring-4 ring-blue-50">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {isFirstTime ? 'Selamat Datang di TKA Pintar!' : 'Profil Siswa & Perangkat'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isFirstTime 
              ? 'Mulai perjalanan belajarmu dari Level 0. Masukkan nama agar tercatat di lembar evaluasi dan sertifikat.' 
              : 'Data tersimpan otomatis di perangkat (PC / HP) ini.'}
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Pilih Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedAvatar(av);
                  }}
                  className={`text-2xl p-2.5 rounded-2xl border-2 transition-all flex items-center justify-center ${
                    selectedAvatar === av
                      ? 'border-blue-600 bg-blue-50 scale-105 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Student Name Input */}
          <div>
            <label htmlFor="student-name-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap Siswa <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="student-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Muhammad Rizky, Siti Aisyah"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* School Name Input (Optional) */}
          <div>
            <label htmlFor="school-name-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-slate-400" />
              Asal Sekolah (Opsional)
            </label>
            <input
              id="school-name-input"
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Contoh: SD Negeri 1, SMP Nusantara, SMA Negeri 5"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Device & LocalStorage Info Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-1 text-blue-600">
                <Laptop className="w-3.5 h-3.5" />
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              Penyimpanan Privat di PC / Handphone
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Setiap smartphone atau komputer yang membuka aplikasi ini memiliki data level dan progres tersendiri yang tersimpan di memori browser (LocalStorage).
            </p>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60 font-semibold text-slate-700">
              <span>Status Level Saat Ini:</span>
              <span className="text-blue-700 font-bold">
                Lv. {level} • {profile.rankTitle} ({profile.xp} XP)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              id="btn-save-student-profile"
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Simpan Profil
            </button>

            {!isFirstTime && (
              <div className="flex items-center justify-between pt-1">
                {!showResetConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Progres Mulai dari Lv. 0
                  </button>
                ) : (
                  <div className="w-full p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                    <p className="text-xs text-rose-800 font-semibold">
                      Yakin ingin mereset seluruh nilai, XP, dan mulai kembali dari Level 0?
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleConfirmReset}
                        className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700"
                      >
                        Ya, Reset ke Lv. 0
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-300"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};
