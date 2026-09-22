import { Badge } from '../types';

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_quiz',
    name: 'Langkah Awal',
    description: 'Menyelesaikan sesi latihan atau ujian pertama Anda.',
    icon: 'Sparkles',
    category: 'milestone',
    requirementText: 'Selesaikan 1 kuis apapun'
  },
  {
    id: 'score_perfect',
    name: 'Sempurna 100',
    description: 'Meraih skor sempurna 100 pada latihan atau simulasi ujian.',
    icon: 'Award',
    category: 'score',
    requirementText: 'Dapatkan nilai 100%'
  },
  {
    id: 'score_superior',
    name: 'Di Atas Standar',
    description: 'Meraih skor di atas batas kelulusan (KKM ≥ 80).',
    icon: 'Star',
    category: 'score',
    requirementText: 'Dapatkan nilai minimal 80%'
  },
  {
    id: 'hots_slayer',
    name: 'Penakluk HOTS',
    description: 'Mampu menjawab benar soal-soal bernalar tingkat tinggi (HOTS).',
    icon: 'Flame',
    category: 'score',
    requirementText: 'Jawab benar soal bertingkat HOTS'
  },
  {
    id: 'streak_3',
    name: 'Disiplin Belajar',
    description: 'Aktif belajar selama 3 hari berturut-turut tanpa terputus.',
    icon: 'Zap',
    category: 'streak',
    requirementText: 'Capai streak 3 hari'
  },
  {
    id: 'streak_7',
    name: 'Juara Konsistensi',
    description: 'Mempertahankan konsistensi belajar selama 7 hari berturut-turut.',
    icon: 'Trophy',
    category: 'streak',
    requirementText: 'Capai streak 7 hari'
  },
  {
    id: 'cendekiawan',
    name: 'Cendekiawan Muda',
    description: 'Mencapai Level 3 dengan mengumpulkan lebih dari 500 XP.',
    icon: 'GraduationCap',
    category: 'milestone',
    requirementText: 'Capai Level 3'
  },
  {
    id: 'master_kurikulum',
    name: 'Master Kurikulum Merdeka',
    description: 'Menyelesaikan minimal 5 sesi latihan dengan performa memuaskan.',
    icon: 'Compass',
    category: 'milestone',
    requirementText: 'Selesaikan 5 sesi ujian/latihan'
  }
];
