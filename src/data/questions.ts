import { EducationLevel, Question, SubjectInfo } from '../types';

export const SUBJECTS_BY_LEVEL: Record<EducationLevel, SubjectInfo[]> = {
  SD: [
    {
      id: 'sd-literasi',
      name: 'Literasi Membaca',
      description: 'Pemahaman teks fiksi, informasi faktual, ide pokok, dan inferensi bacaan sehari-hari.',
      iconName: 'BookOpen',
      accentColor: 'blue',
      fase: 'Fase B & C (Kelas 4-6)'
    },
    {
      id: 'sd-numerasi',
      name: 'Numerasi & Matematika',
      description: 'Operasi hitung bilangan cacah, pecahan kontekstual, geometri bangun datar, dan pengukuran waktu/uang.',
      iconName: 'Calculator',
      accentColor: 'emerald',
      fase: 'Fase B & C (Kelas 4-6)'
    },
    {
      id: 'sd-ipas',
      name: 'IPAS (Sains & Sosial)',
      description: 'Ekosistem lingkungan, perubahan wujud zat, energi terbarukan, dan kearifan lokal nusantara.',
      iconName: 'Sparkles',
      accentColor: 'amber',
      fase: 'Fase B & C (Kelas 4-6)'
    },
    {
      id: 'sd-pancasila',
      name: 'Pendidikan Pancasila',
      description: 'Penerapan sila Pancasila, keragaman budaya, norma bermasyarakat, dan gotong royong.',
      iconName: 'ShieldCheck',
      accentColor: 'rose',
      fase: 'Fase B & C (Kelas 4-6)'
    }
  ],
  SMP: [
    {
      id: 'smp-literasi',
      name: 'Literasi Bahasa Indonesia',
      description: 'Analisis teks deskripsi, teks prosedur, teks laporan hasil observasi, dan teks eksplanasi ilmiah.',
      iconName: 'BookOpen',
      accentColor: 'blue',
      fase: 'Fase D (Kelas 7-9)'
    },
    {
      id: 'smp-numerasi',
      name: 'Numerasi & Matematika',
      description: 'Aljabar linier, perbandingan skala, teorema Pythagoras, statistika data, dan peluang.',
      iconName: 'Calculator',
      accentColor: 'emerald',
      fase: 'Fase D (Kelas 7-9)'
    },
    {
      id: 'smp-ipa',
      name: 'IPA Terpadu',
      description: 'Sistem organisasi kehidupan, gaya gerak Newton, zat aditif, dan pewarisan sifat makhluk hidup.',
      iconName: 'Atom',
      accentColor: 'amber',
      fase: 'Fase D (Kelas 7-9)'
    },
    {
      id: 'smp-inggris',
      name: 'Bahasa Inggris',
      description: 'Reading comprehension, communicative transactions, inference in functional texts, and vocab.',
      iconName: 'Globe',
      accentColor: 'purple',
      fase: 'Fase D (Kelas 7-9)'
    }
  ],
  SMA_SMK: [
    {
      id: 'sma-penalaran-matematika',
      name: 'Penalaran Matematika',
      description: 'Logika matematika terapan, fungsi & grafik, kalkulus dasar, optimasi masalah, dan pemodelan real-world.',
      iconName: 'TrendingUp',
      accentColor: 'emerald',
      fase: 'Fase E & F (Kelas 10-12)'
    },
    {
      id: 'sma-literasi-indonesia',
      name: 'Literasi Bahasa Indonesia',
      description: 'Evaluasi argumentasi teks opini, validitas data jurnalistik, analisis retorika, dan kritik sastra.',
      iconName: 'BookOpen',
      accentColor: 'blue',
      fase: 'Fase E & F (Kelas 10-12)'
    },
    {
      id: 'sma-sains-terapan',
      name: 'Pemahaman Sains & Vokasi',
      description: 'Termodinamika, rekayasa bioteknologi, stoikiometri industri, efisiensi energi, dan teknologi terapan.',
      iconName: 'Cpu',
      accentColor: 'amber',
      fase: 'Fase E & F (Kelas 10-12)'
    },
    {
      id: 'sma-penalaran-skolastik',
      name: 'Penalaran Umum & Skolastik',
      description: 'Silogisme deduktif-induktif, deret pola figural/numerik, penalaran analitik sebab-akibat, dan TKA UTBK.',
      iconName: 'BrainCircuit',
      accentColor: 'indigo',
      fase: 'Fase E & F (Kelas 10-12)'
    }
  ]
};

export const SAMPLE_QUESTIONS: Question[] = [
  // ==========================
  // SD QUESTIONS
  // ==========================
  {
    id: 'sd-lit-1',
    level: 'SD',
    subject: 'sd-literasi',
    topic: 'Teks Informasi & Ekologi',
    difficulty: 'Sedang',
    type: 'single_choice',
    stimulusTitle: 'Upaya Dito Mengurangi Sampah Plastik di Sekolah',
    stimulus: 'Dito mengamati bahwa setiap istirahat siang, tempat sampah di kantin sekolah selalu penuh dengan botol plastik sekali pakai dan kantong jajanan. Bersama kelompoknya, Dito membuat poster ajakan "Bawa Tumbler Sendiri, Selamatkan Bumi". Dalam satu minggu, jumlah botol plastik di tempat sampah menurun drastis dari 120 botol menjadi 35 botol per hari.',
    question: 'Berdasarkan bacaan di atas, apa tujuan utama gerakan yang diinisiasi oleh Dito dan kelompoknya?',
    options: [
      { id: 'A', text: 'Mendorong siswa membawa bekal makanan berat dari rumah setiap hari' },
      { id: 'B', text: 'Mengurangi timbulan sampah botol plastik sekali pakai melalui kebiasaan membawa wadah minum mandiri' },
      { id: 'C', text: 'Mengharuskan kantin sekolah berhenti menjual segala jenis minuman' },
      { id: 'D', text: 'Membuat lomba poster kebersihan lingkungan antarkelas' }
    ],
    correctAnswer: 'B',
    explanation: 'Dito melihat penumpukan botol plastik sekali pakai dan membuat poster "Bawa Tumbler Sendiri, Selamatkan Bumi" yang terbukti menurunkan timbulan botol dari 120 menjadi 35. Inti gerakan adalah menumbuhkan kesadaran ramah lingkungan dengan membawa wadah minum sendiri.',
    learningObjective: 'Mampu menemukan informasi tersurat dan mengevaluasi tujuan penulis dalam teks informatif sederhana (Fase C).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Tas Belanja Kain di Koperasi',
        stimulusTitle: 'Aksi Nyata Rania Mengurangi Kantong Kresek',
        stimulus: 'Rania melihat banyak kantong kresek hitam berserakan di sekitar koperasi sekolah setelah jam istirahat. Bersama kader Adiwiyata cilik, Rania membagikan tas jinjing kain serbaguna bertuliskan "Belanja Bijak Tanpa Plastik". Hasilnya, penggunaan kantong kresek di koperasi berkurang dari 150 lembar menjadi hanya 20 lembar per hari.',
        question: 'Berdasarkan wacana di atas, apa sasaran utama dari inisiatif yang digagas oleh Rania?',
        options: [
          { id: 'A', text: 'Mengganti kemasan belanja sekali pakai dengan tas kain yang dapat digunakan berulang kali' },
          { id: 'B', text: 'Menutup koperasi sekolah agar siswa berhemat' },
          { id: 'C', text: 'Mewajibkan siswa membeli barang dalam jumlah besar' },
          { id: 'D', text: 'Mengadakan bazar barang antik di sekolah' }
        ],
        correctAnswer: 'A',
        explanation: 'Gerakan Rania berfokus pada substitusi tas belanja sekali pakai dengan tas kain guna ulang, yang langsung menurunkan timbulan sampah kresek dari 150 menjadi 20 lembar.',
      }
    ]
  },
  {
    id: 'sd-lit-2',
    level: 'SD',
    subject: 'sd-literasi',
    topic: 'Ide Pokok & Inferensi Cerita',
    difficulty: 'HOTS',
    type: 'single_choice',
    stimulusTitle: 'Kisah Sahabat di Kebun Sayur Desa',
    stimulus: 'Ahmad dan Wayan menanam benih tomat bersama. Meskipun benih ditanam di hari yang sama, pohon tomat milik Wayan tumbuh lebih subur dan berbuah lebat karena ia rutin menyiram dan menambahkan kompos alami dari dedaunan kering. Ahmad yang sebelumnya malas kini bertanya kepada Wayan tentang teknik merawat tanaman tanpa bahan kimia.',
    question: 'Nilai karakter Profil Pelajar Pancasila apa yang paling menonjol dari sikap Wayan ketika Ahmad meminta bimbingannya?',
    options: [
      { id: 'A', text: 'Kemandirian dan menyimpan rahasia keberhasilan sendiri' },
      { id: 'B', text: 'Bergotong royong dan bernalar kritis dalam membagikan ilmu bermanfaat bagi sesama' },
      { id: 'C', text: 'Mengakui kelemahan teman di depan orang lain' },
      { id: 'D', text: 'Menghindari kerja sama demi menjaga persaingan panen tomat' }
    ],
    correctAnswer: 'B',
    explanation: 'Sikap Wayan menunjukkan dimensi Bergotong Royong (berbagi kebaikan) serta Bernalar Kritis dalam memanfaatkan kompos alami ramah lingkungan untuk keberhasilan bersama.',
    learningObjective: 'Mengidentifikasi nilai-nilai karakter luhur dan pesan moral dalam teks narasi fiksi (Fase C).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Tanaman Cabai Organik',
        stimulusTitle: 'Dua Sahabat dan Kebun Hidroponik',
        stimulus: 'Fajar dan Putu merawat tanaman cabai di kebun sekolah. Putu rajin membuat pupuk organik cair dari kulit pisang dan sisa sayuran dapur, sehingga cabainya berbuah lebat. Melihat hal itu, Fajar yang tanamannya kerdil meminta saran kepada Putu. Putu dengan sabar mengajari Fajar cara fermentasi pupuk alami tersebut.',
        question: 'Sikap terpuji yang ditunjukkan Putu mencerminkan dimensi Profil Pelajar Pancasila yaitu...',
        options: [
          { id: 'A', text: 'Bergotong royong dan bernalar kritis melalui kerelaan berbagi ilmu ramah lingkungan' },
          { id: 'B', text: 'Kreatif tanpa perlu memedulikan kebutuhan teman' },
          { id: 'C', text: 'Bersikap kompetitif agar panen miliknya tetap yang terbaik' },
          { id: 'D', text: 'Menolak kerja sama karena pupuk organik adalah rahasia pribadi' }
        ],
        correctAnswer: 'A',
        explanation: 'Putu bersedia berbagi pengetahuan pembuatan pupuk organik cair kepada Fajar, mengedepankan gotong royong dan nalar kritis peduli lingkungan.',
      }
    ]
  },
  {
    id: 'sd-num-1',
    level: 'SD',
    subject: 'sd-numerasi',
    topic: 'Pecahan & Pemecahan Masalah',
    difficulty: 'Sedang',
    type: 'single_choice',
    stimulusTitle: 'Pembagian Kue Bolu Tradisional',
    stimulus: 'Ibu memotong 1 loyang kue bolu pandan menjadi 12 bagian sama besar. Rina memakan 2 bagian, Doni memakan 3 bagian, dan sisanya dibagikan secara merata kepada 7 sepupu mereka yang datang berkunjung.',
    question: 'Berapa bagian kue bolu yang diterima oleh masing-masing sepupu?',
    options: [
      { id: 'A', text: '1/12 bagian' },
      { id: 'B', text: '2/12 bagian' },
      { id: 'C', text: '7/12 bagian' },
      { id: 'D', text: '5/12 bagian' }
    ],
    correctAnswer: 'A',
    explanation: 'Kue mula-mula = 12 bagian. Dimakan Rina (2) + Doni (3) = 5 bagian. Sisa kue = 12 - 5 = 7 bagian. Dibagikan kepada 7 orang sepupu sama rata: 7 bagian / 7 orang = 1 bagian per anak. Dalam bentuk pecahan dari seluruh kue: 1/12.',
    learningObjective: 'Menyelesaikan masalah penalaran pecahan sederhana dalam konteks kehidupan sehari-hari (Fase B/C).',
    variants: [
      {
        variantName: 'Variasi Angka & Konteks #2: Martabak Manis',
        stimulusTitle: 'Pembagian Martabak Manis Keluarga',
        stimulus: 'Ayah memotong 1 loyang martabak manis menjadi 16 potongan sama besar. Dimas memakan 3 potong, Kakak memakan 5 potong, dan sisa martabak tersebut dibagikan sama rata kepada 8 anak yatim di panti asuhan dekat rumah.',
        question: 'Berapa bagian martabak manis dari keseluruhan loyang yang didapatkan oleh masing-masing anak?',
        options: [
          { id: 'A', text: '1/16 bagian' },
          { id: 'B', text: '2/16 bagian' },
          { id: 'C', text: '8/16 bagian' },
          { id: 'D', text: '3/16 bagian' }
        ],
        correctAnswer: 'A',
        explanation: 'Total potongan = 16. Dimakan (3 + 5) = 8 potong. Sisa = 16 - 8 = 8 potong. Dibagikan kepada 8 anak: 8 / 8 = 1 potong per anak. Nilai pecahannya adalah 1/16 dari seluruh loyang.',
      }
    ]
  },
  {
    id: 'sd-num-2',
    level: 'SD',
    subject: 'sd-numerasi',
    topic: 'Operasi Hitung & Estimasi Belanja',
    difficulty: 'HOTS',
    type: 'single_choice',
    stimulusTitle: 'Koperasi Kejujuran Sekolah',
    stimulus: 'Budi memiliki uang saku Rp 20.000. Di koperasi sekolah, ia membeli 2 buku tulis seharga Rp 4.500 per buku, 1 penggaris segitiga seharga Rp 3.000, dan beberapa pensil seharga Rp 2.500 per batang. Jika sisa uang kembalian Budi adalah Rp 3.000, berapa batang pensil yang ia beli?',
    question: 'Berapa batang pensil yang dibeli oleh Budi di koperasi sekolah?',
    options: [
      { id: 'A', text: '1 batang' },
      { id: 'B', text: '2 batang' },
      { id: 'C', text: '3 batang' },
      { id: 'D', text: '4 batang' }
    ],
    correctAnswer: 'B',
    explanation: 'Total uang belanja Budi = Rp 20.000 - Rp 3.000 (sisa) = Rp 17.000. Biaya 2 buku tulis = 2 x 4.500 = Rp 9.000. Biaya penggaris = Rp 3.000. Subtotal buku + penggaris = 9.000 + 3.000 = Rp 12.000. Sisa untuk pensil = 17.000 - 12.000 = Rp 5.000. Jumlah pensil = 5.000 / 2.500 = 2 batang.',
    learningObjective: 'Memecahkan persoalan aritmatika multi-langkah dan pengelolaan keuangan dasar.',
    variants: [
      {
        variantName: 'Variasi Angka & Konteks #2: Perlengkapan Menggambar',
        stimulusTitle: 'Toko Buku Ceria',
        stimulus: 'Nadia membawa uang Rp 25.000. Ia membeli 3 buku gambar seharga Rp 5.000 per buku, 1 penghapus seharga Rp 2.000, dan beberapa rautan pensil seharga Rp 2.000 per buah. Jika sisa uang kembalian Nadia adalah Rp 4.000, berapa banyak rautan pensil yang ia beli?',
        question: 'Berapa banyak buah rautan pensil yang dibeli oleh Nadia?',
        options: [
          { id: 'A', text: '1 buah' },
          { id: 'B', text: '2 buah' },
          { id: 'C', text: '3 buah' },
          { id: 'D', text: '4 buah' }
        ],
        correctAnswer: 'B',
        explanation: 'Total belanja = 25.000 - 4.000 = Rp 21.000. 3 buku gambar = 3 x 5.000 = Rp 15.000. Penghapus = Rp 2.000. Subtotal = 17.000. Sisa untuk rautan = 21.000 - 17.000 = Rp 4.000. Jumlah rautan = 4.000 / 2.000 = 2 buah.',
      }
    ]
  },
  {
    id: 'sd-ipas-1',
    level: 'SD',
    subject: 'sd-ipas',
    topic: 'Energi & Transformasi Bentuk',
    difficulty: 'Mudah',
    type: 'single_choice',
    stimulusTitle: 'Pembangkit Listrik Tenaga Surya Sederhana',
    stimulus: 'Di atap perpustakaan sekolah dipasang panel surya (solar panel). Ketika sinar matahari bersinar terik pada siang hari, lampu-lampu baca di dalam perpustakaan dapat menyala terang tanpa menggunakan arus listrik dari bahan bakar fosil.',
    question: 'Transformasi energi yang terjadi pada perangkat panel surya tersebut adalah...',
    options: [
      { id: 'A', text: 'Energi kimia menjadi energi gerak' },
      { id: 'B', text: 'Energi cahaya matahari menjadi energi listrik, lalu menjadi energi cahaya' },
      { id: 'C', text: 'Energi panas bumi menjadi energi kinetik' },
      { id: 'D', text: 'Energi angin menjadi energi potensial' }
    ],
    correctAnswer: 'B',
    explanation: 'Panel surya menangkap foton (energi cahaya matahari) dan mengubahnya menjadi energi listrik melalui efek fotovoltaik, yang kemudian dialirkan ke lampu sehingga berubah menjadi energi cahaya untuk menerangi ruangan.',
    learningObjective: 'Memahami konsep perubahan bentuk energi terbarukan dalam pemanfaatan teknologi hijau (Fase C).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Kincir Angin Mikro Sekolah',
        stimulusTitle: 'Pembangkit Listrik Tenaga Bayu (Angin) Mini',
        stimulus: 'Di halaman sekolah pesisir pantai dipasang kincir angin mini. Ketika angin laut bertiup kencang memutar bilah baling-baling, generator kecil berputar dan menyalakan lampu taman sekolah pada malam hari.',
        question: 'Urutan transformasi energi yang berlangsung pada kincir angin tersebut adalah...',
        options: [
          { id: 'A', text: 'Energi kinetik (gerak) angin menjadi energi listrik, kemudian menjadi energi cahaya' },
          { id: 'B', text: 'Energi panas bumi menjadi energi kimia' },
          { id: 'C', text: 'Energi suara menjadi energi potensial' },
          { id: 'D', text: 'Energi nuklir menjadi energi kinetik' }
        ],
        correctAnswer: 'A',
        explanation: 'Bilah kincir memanfaatkan energi kinetik (gerak) angin yang memutar generator menghasilkan energi listrik, lalu dialirkan ke bohlam menghasilkan cahaya.',
      }
    ]
  },
  {
    id: 'sd-pancasila-1',
    level: 'SD',
    subject: 'sd-pancasila',
    topic: 'Penerapan Nilai Pancasila',
    difficulty: 'Sedang',
    type: 'single_choice',
    stimulusTitle: 'Musyawarah Pemilihan Ketua Kelas',
    stimulus: 'Kelas 5 SD Merdeka sedang mengadakan pemilihan ketua kelas. Siti, Danu, dan Made memiliki ide masing-masing. Seluruh siswa diberikan kesempatan menyampaikan pendapat secara santun, lalu hasil akhir disepakati melalui kesepakatan mufakat tanpa memaksakan kehendak.',
    question: 'Peristiwa tersebut merupakan cerminan pengamalan sila Pancasila yang berlambang...',
    options: [
      { id: 'A', text: 'Bintang Tunggal (Sila ke-1)' },
      { id: 'B', text: 'Rantai Emas (Sila ke-2)' },
      { id: 'C', text: 'Kepala Banteng (Sila ke-4)' },
      { id: 'D', text: 'Padi dan Kapas (Sila ke-5)' }
    ],
    correctAnswer: 'C',
    explanation: 'Musyawarah untuk mufakat dengan menghargai pendapat bersama adalah implementasi Sila ke-4: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan" yang disimbolkan dengan lambang Kepala Banteng.',
    learningObjective: 'Menganalisis penerapan sila-sila Pancasila dalam kehidupan sosial di lingkungan sekolah (Fase C).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Penentuan Lokasi Kegiatan Bakti Sosial',
        stimulusTitle: 'Rapat Penentuan Kegiatan Akhir Semester',
        stimulus: 'Pengurus kelas berdiskusi menentukan lokasi bakti sosial akhir tahun. Setiap perwakilan kelompok mengemukakan alasannya secara terbuka. Setelah ditimbang bersama, seluruh anggota kelas menyepakati panti asuhan terdekat sebagai lokasi tujuan secara damai dan lapang dada.',
        question: 'Pengambilan keputusan bersama melalui musyawarah mufakat di atas adalah penerapan nilai sila Pancasila dengan simbol...',
        options: [
          { id: 'A', text: 'Pohon Beringin (Sila ke-3)' },
          { id: 'B', text: 'Kepala Banteng (Sila ke-4)' },
          { id: 'C', text: 'Rantai Emas (Sila ke-2)' },
          { id: 'D', text: 'Bintang Tunggal (Sila ke-1)' }
        ],
        correctAnswer: 'B',
        explanation: 'Menyepakati keputusan bersama secara damai melalui musyawarah mufakat adalah ciri khas pengamalan Sila ke-4 yang disimbolkan oleh Kepala Banteng.',
      }
    ]
  },

  // ==========================
  // SMP QUESTIONS
  // ==========================
  {
    id: 'smp-lit-1',
    level: 'SMP',
    subject: 'smp-literasi',
    topic: 'Teks Eksplanasi Ilmiah & Kritis',
    difficulty: 'HOTS',
    type: 'single_choice',
    stimulusTitle: 'Dinamika Hujan Asam dan Dampak Ekologis',
    stimulus: 'Hujan asam terjadi ketika senyawa belerang dioksida (SO2) dan nitrogen oksida (NOx) yang dilepaskan oleh aktivitas industri serta kendaraan bermotor bereaksi dengan uap air dan oksigen di atmosfer. Reaksi ini membentuk asam sulfat dan asam nitrat yang larut dalam butiran air hujan, menurunkan pH air hujan di bawah angka normal (pH < 5,6). Dampaknya memicu pelapukan cepat batuan candi bersejarah serta pengikisan lapisan lilin pada daun tanaman hutan.',
    question: 'Berdasarkan teks eksplanasi tersebut, simpulan kausalitas (sebab-akibat) yang paling logis dan komprehensif adalah...',
    options: [
      { id: 'A', text: 'Kerusakan candi disebabkan oleh kelembaban udara murni tanpa keterlibatan polutan industri' },
      { id: 'B', text: 'Pelepasan gas emisi fosil memicu reaksi asam di awan yang mempercepat degradasi cagar budaya dan biosfer' },
      { id: 'C', text: 'pH air hujan di bawah 5,6 justru meningkatkan kesuburan daun tanaman hutan' },
      { id: 'D', text: 'Reaksi asam sulfat hanya membahayakan manusia, bukan struktur batuan' }
    ],
    correctAnswer: 'B',
    explanation: 'Secara kausalitas, emisi SO2 dan NOx dari industri/kendaraan bereaksi di atmosfer membentuk asam, menurunkan pH hujan, yang berakibat langsung pada pengikisan batuan candi dan kerusakan daun hutan secara sistemik.',
    learningObjective: 'Mengevaluasi hubungan sebab-akibat dan akurasi informasi dalam teks eksplanasi ilmiah (Fase D).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Fenomena Eutrofikasi Danau',
        stimulusTitle: 'Pencemaran Limbah Pupuk dan Blooming Alga',
        stimulus: 'Penggunaan pupuk kimia kaya fosfat dan nitrat yang berlebihan di lahan pertanian dapat terbawa aliran air menuju danau. Kondisi ini memicu eutrofikasi, yaitu ledakan pertumbuhan alga air (blooming algae) yang menutupi permukaan air. Saat alga mati dan membusuk, bakteri aerob menghabiskan kadar oksigen terlarut (DO), memicu kematian massal ikan serta kepunahan biota dasar danau.',
        question: 'Rantai sebab-akibat ekologis yang paling tepat berdasarkan teks eksplanasi di atas adalah...',
        options: [
          { id: 'A', text: 'Kelebihan nutrien pertanian memicu blooming alga yang mendegradasi oksigen terlarut dan merusak ekosistem air' },
          { id: 'B', text: 'Bakteri pembusuk menghasilkan oksigen tambahan yang menyehatkan populasi ikan danau' },
          { id: 'C', text: 'Alga di permukaan air danau berfungsi mendinginkan suhu air tanpa dampak negatif' },
          { id: 'D', text: 'Fosfat dan nitrat mencegah pertumbuhan tanaman air secara total' }
        ],
        correctAnswer: 'A',
        explanation: 'Limbah pupuk fosfat/nitrat memicu ledakan alga, dekomposisinya menyerap oksigen terlarut, menyebabkan anoksia yang membunuh biota air.',
      }
    ]
  },
  {
    id: 'smp-num-1',
    level: 'SMP',
    subject: 'smp-numerasi',
    topic: 'Statistika & Analisis Diagram',
    difficulty: 'HOTS',
    type: 'single_choice',
    stimulusTitle: 'Data Penjualan Toko Alat Tulis Cerdas',
    stimulus: 'Berikut adalah rata-rata nilai tryout matematika dari 9 siswa kelas 9: 75, 80, 85, 70, 90, 85, 95, 80, 85. Seorang siswa susulan bernama Rama baru saja mengikuti tes, sehingga rata-rata nilai dari seluruh 10 siswa menjadi tepat 83.',
    question: 'Berapakah nilai ujian matematika yang diperoleh Rama?',
    options: [
      { id: 'A', text: '83' },
      { id: 'B', text: '86' },
      { id: 'C', text: '88' },
      { id: 'D', text: '90' }
    ],
    correctAnswer: 'C',
    explanation: 'Jumlah nilai 9 siswa = 75 + 80 + 85 + 70 + 90 + 85 + 95 + 80 + 85 = 745. Rata-rata 10 siswa adalah 83, maka total nilai 10 siswa = 10 x 83 = 830. Nilai Rama = Total 10 siswa - Jumlah 9 siswa = 830 - 745 = 85 + 3 = 88.',
    learningObjective: 'Menentukan dan menganalisis ukuran pemusatan data (mean) pada pemecahan masalah statistika (Fase D).',
    variants: [
      {
        variantName: 'Variasi Angka #2: Nilai Tryout Farhan',
        stimulusTitle: 'Hasil Asesmen Numerasi Kelompok Belajar',
        stimulus: 'Data perolehan nilai simulasi asesmen numerasi dari 9 siswa adalah: 70, 75, 80, 85, 90, 75, 85, 80, 90. Seorang siswa susulan bernama Farhan baru menyerahkan lembar jawabannya, sehingga nilai rata-rata keseluruhan dari 10 siswa menjadi tepat 82.',
        question: 'Berapakah skor nilai yang diperoleh oleh Farhan?',
        options: [
          { id: 'A', text: '82' },
          { id: 'B', text: '85' },
          { id: 'C', text: '90' },
          { id: 'D', text: '88' }
        ],
        correctAnswer: 'C',
        explanation: 'Jumlah nilai 9 siswa = 70 + 75 + 80 + 85 + 90 + 75 + 85 + 80 + 90 = 730. Rata-rata 10 siswa adalah 82, sehingga total nilai = 10 x 82 = 820. Nilai Farhan = 820 - 730 = 90.',
      }
    ]
  },
  {
    id: 'smp-num-2',
    level: 'SMP',
    subject: 'smp-numerasi',
    topic: 'Teorema Pythagoras & Geometri Ruang',
    difficulty: 'Sedang',
    type: 'single_choice',
    stimulusTitle: 'Pemasangan Tiang Antena Komunikasi',
    stimulus: 'Sebuah tiang pemancar sinyal berdiri tegak dengan tinggi 24 meter di atas tanah datar. Kawat baja pengikat direntangkan dari puncak tiang menuju pasak di tanah yang berjarak 7 meter dari dasar tiang untuk menahan terpaan angin kencang.',
    question: 'Berapa panjang kawat baja pengikat minimal yang dibutuhkan?',
    options: [
      { id: 'A', text: '25 meter' },
      { id: 'B', text: '31 meter' },
      { id: 'C', text: '26 meter' },
      { id: 'D', text: '28 meter' }
    ],
    correctAnswer: 'A',
    explanation: 'Gunakan Teorema Pythagoras pada segitiga siku-siku: c² = a² + b² = 24² + 7² = 576 + 49 = 625. c = √625 = 25 meter. (Tripel Pythagoras 7, 24, 25).',
    learningObjective: 'Menerapkan Teorema Pythagoras dalam menghitung jarak dan panjang konstruksi kontekstual (Fase D).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Tangga Pengecatan Gedung',
        stimulusTitle: 'Pemasangan Tangga Darurat',
        stimulus: 'Petugas kebersihan menyandarkan sebuah tangga lurus pada dinding gedung bertingkat. Ujung atas tangga menyentuh bibir jendela setinggi 12 meter dari permukaan tanah, sementara ujung bawah tangga berada pada jarak 5 meter dari pangkal dinding gedung.',
        question: 'Berapakah panjang tangga lurus tersebut?',
        options: [
          { id: 'A', text: '13 meter' },
          { id: 'B', text: '15 meter' },
          { id: 'C', text: '17 meter' },
          { id: 'D', text: '14 meter' }
        ],
        correctAnswer: 'A',
        explanation: 'Teorema Pythagoras: c² = 12² + 5² = 144 + 25 = 169. c = √169 = 13 meter. (Tripel Pythagoras 5, 12, 13).',
      }
    ]
  },
  {
    id: 'smp-ipa-1',
    level: 'SMP',
    subject: 'smp-ipa',
    topic: 'Hukum Gerak Newton & Efisiensi',
    difficulty: 'Sedang',
    type: 'single_choice',
    stimulusTitle: 'Pengereman Bus Sekolah',
    stimulus: 'Sebuah bus sekolah melaju dengan kecepatan 50 km/jam. Tiba-tiba ada kucing melintas di tengah jalan sehingga sopir menginjak rem mendadak. Seluruh siswa yang sedang duduk terdorong ke arah depan secara spontan.',
    question: 'Peristiwa terdorongnya siswa ke depan saat direm mendadak merupakan manifestasi dari...',
    options: [
      { id: 'A', text: 'Hukum III Newton tentang aksi dan reaksi sebanding' },
      { id: 'B', text: 'Hukum I Newton (Inersia/Kelembaman) karena benda cenderung mempertahankan keadaan geraknya' },
      { id: 'C', text: 'Hukum II Newton tentang percepatan berbanding terbalik dengan massa' },
      { id: 'D', text: 'Gaya gesek kinetik antara ban dan aspal yang berpindah ke tubuh penumpang' }
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan Hukum I Newton (Kelembaman), setiap benda cenderung mempertahankan keadaannya. Karena penumpang awalnya bergerak maju bersama bus, saat bus berhenti mendadak, tubuh penumpang tetap ingin mempertahankan gerak maju sehingga terdorong ke depan.',
    learningObjective: 'Menjelaskan fenomena fisis gerak dan kelembaman benda berdasarkan prinsip mekanika dasar (Fase D).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Akselerasi Kereta Cepat',
        stimulusTitle: 'Sentakan Saat Kereta Bergerak Tiba-Tiba',
        stimulus: 'Saat kereta komuter yang semula diam di stasiun mendadak digas dan melaju kencang ke depan, para penumpang yang sedang berdiri merasakan tubuh mereka tersentak dan terdorong ke arah belakang.',
        question: 'Kecenderungan tubuh penumpang terdorong ke belakang ketika kendaraan tiba-tiba melaju ke depan merupakan penerapan prinsip...',
        options: [
          { id: 'A', text: 'Hukum I Newton (Kelembaman) di mana tubuh berusaha mempertahankan posisi diamnya' },
          { id: 'B', text: 'Hukum III Newton tentang pasangan gaya aksi-reaksi' },
          { id: 'C', text: 'Hukum II Newton di mana massa berbanding lurus dengan gaya gravitasi' },
          { id: 'D', text: 'Gaya sentrifugal akibat lintasan rel melingkar' }
        ],
        correctAnswer: 'A',
        explanation: 'Tubuh penumpang awalnya berada dalam posisi diam. Saat kereta bergerak mendadak, inersia tubuh berusaha mempertahankan keadaannya yang diam, sehingga terasa terdorong ke belakang.',
      }
    ]
  },
  {
    id: 'smp-inggris-1',
    level: 'SMP',
    subject: 'smp-inggris',
    topic: 'Reading Comprehension & Critical Context',
    difficulty: 'Sedang',
    type: 'single_choice',
    stimulusTitle: 'Youth Eco-Ambassador Notice',
    stimulus: '"Dear Students, Our Green School Club will organize a community coastal cleanup this Saturday at 07.30 AM. Participants are requested to bring their own reusable water bottles and gloves. Biodegradable trash bags will be provided by the committee. Let’s turn our awareness into real footprints!"',
    question: 'What is the primary message conveyed by the announcement?',
    options: [
      { id: 'A', text: 'Students must purchase trash bags before arriving at the beach' },
      { id: 'B', text: 'An invitation for students to actively participate in preserving the marine environment' },
      { id: 'C', text: 'A formal cancellation of regular Saturday extracurricular classes' },
      { id: 'D', text: 'A recommendation to avoid visiting the coast due to severe pollution' }
    ],
    correctAnswer: 'B',
    explanation: 'The announcement invites students to join a coastal cleanup activity on Saturday, emphasizing taking real environmental action ("turn awareness into real footprints").',
    learningObjective: 'Identify main idea, purpose, and key functional details in authentic English announcements (Fase D).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Book Charity Drive Notice',
        stimulusTitle: 'Student Council Charity Announcement',
        stimulus: '"Attention All Learners! The Student Council is launching our annual Book Donation Week from Monday to Thursday at the library foyer. We welcome pre-loved storybooks, encyclopedias, and science magazines in good condition for remote village schools. Be a beacon of literacy for others!"',
        question: 'What is the central objective of the notification?',
        options: [
          { id: 'A', text: 'To urge students to donate educational books for underprivileged schools' },
          { id: 'B', text: 'To notify students that the main library will be closed for renovation' },
          { id: 'C', text: 'To sell discounted textbooks to junior high students' },
          { id: 'D', text: 'To recruit new volunteer librarians for the school council' }
        ],
        correctAnswer: 'A',
        explanation: 'The notice calls upon learners to participate in Book Donation Week to support remote village schools ("Be a beacon of literacy").',
      }
    ]
  },

  // ==========================
  // SMA / SMK QUESTIONS
  // ==========================
  {
    id: 'sma-pen-1',
    level: 'SMA_SMK',
    subject: 'sma-penalaran-matematika',
    topic: 'Pemodelan Fungsi & Optimasi Biaya',
    difficulty: 'HOTS',
    type: 'single_choice',
    stimulusTitle: 'Optimasi Produksi UMKM Industri Kreatif',
    stimulus: 'Sebuah UMKM konveksi memproduksi seragam sekolah ramah lingkungan. Biaya total produksi harian dinyatakan dengan rumus fungsi C(x) = 2x² - 80x + 1500 (dalam ribuan rupiah), di mana x menyatakan banyaknya potong seragam yang diproduksi setiap hari.',
    question: 'Berapa banyak seragam yang harus diproduksi per hari agar biaya total produksinya minimum?',
    options: [
      { id: 'A', text: '15 potong' },
      { id: 'B', text: '20 potong' },
      { id: 'C', text: '25 potong' },
      { id: 'D', text: '40 potong' }
    ],
    correctAnswer: 'B',
    explanation: 'Fungsi kuadrat C(x) = ax² + bx + c dengan a = 2, b = -80, c = 1500. Nilai minimum terjadi pada sumbu simetri: x = -b / (2a) = -(-80) / (2 x 2) = 80 / 4 = 20. Jadi, produksi optimal adalah 20 potong seragam.',
    learningObjective: 'Menerapkan kalkulus diferensial atau titik optimum fungsi kuadrat pada permasalahan ekonomi riil (Fase F).',
    variants: [
      {
        variantName: 'Variasi Angka & Konteks #2: Produksi Kerajinan Anyaman',
        stimulusTitle: 'Biaya Minimum Kerajinan Vokasi',
        stimulus: 'Sebuah bengkel kreatif SMK memproduksi tas anyaman bambu. Biaya pengeluaran harian dimodelkan dengan fungsi kuadrat K(x) = x² - 60x + 2000 (dalam ribuan rupiah), dengan x merupakan jumlah unit tas yang dihasilkan per hari.',
        question: 'Berapakah jumlah tas anyaman yang harus diproduksi agar tercapai pengeluaran biaya minimum?',
        options: [
          { id: 'A', text: '30 unit' },
          { id: 'B', text: '60 unit' },
          { id: 'C', text: '25 unit' },
          { id: 'D', text: '40 unit' }
        ],
        correctAnswer: 'A',
        explanation: 'Fungsi K(x) = x² - 60x + 2000. Titik minimum dicapai pada sumbu simetri: x = -b / (2a) = -(-60) / (2 x 1) = 60 / 2 = 30 unit.',
      }
    ]
  },
  {
    id: 'sma-pen-2',
    level: 'SMA_SMK',
    subject: 'sma-penalaran-matematika',
    topic: 'Geometri Analitik & Jarak Ruang',
    difficulty: 'Sedang',
    type: 'single_choice',
    stimulusTitle: 'Instalasi Sensor Suhu Gudang Farmasi',
    stimulus: 'Ruang penyimpanan vaksin berbentuk kubus ABCD.EFGH dengan panjang rusuk 6 meter. Sebuah sensor suhu utama dipasang di titik sudut E, sedangkan pendingin udara diletakkan tepat di pusat bidang alas ABCD.',
    question: 'Jarak antara sensor suhu utama di titik E ke pusat pendingin udara di alas ABCD adalah...',
    options: [
      { id: 'A', text: '3√6 meter' },
      { id: 'B', text: '6√2 meter' },
      { id: 'C', text: '3√2 meter' },
      { id: 'D', text: '4√3 meter' }
    ],
    correctAnswer: 'A',
    explanation: 'Misal titik pusat alas ABCD adalah O. Titik E berada tepat di atas titik A (EA tegak lurus alas, EA = 6 m). Jarak dari A ke pusat O adalah setengah dari diagonal alas AC = 1/2 x (6√2) = 3√2 m. Jarak EO = √(EA² + AO²) = √(6² + (3√2)²) = √(36 + 18) = √54 = 3√6 meter.',
    learningObjective: 'Menghitung jarak titik ke garis dan bidang dalam dimensi tiga pada permasalahan teknis ruang (Fase E/F).',
    variants: [
      {
        variantName: 'Variasi Angka #2: Ruang Server Laboratorium 8 Meter',
        stimulusTitle: 'Pemasangan Access Point Laboratorium',
        stimulus: 'Ruang server komputer berbentuk kubus KLMN.OPQR dengan panjang rusuk 8 meter. Sebuah perangkat access point jaringan dipasang di titik sudut O, sedangkan terminal kabel utama terletak tepat di titik pusat lantai bidang alas KLMN.',
        question: 'Jarak lurus dari access point di titik O ke terminal kabel di pusat lantai alas adalah...',
        options: [
          { id: 'A', text: '4√6 meter' },
          { id: 'B', text: '8√2 meter' },
          { id: 'C', text: '4√2 meter' },
          { id: 'D', text: '6√3 meter' }
        ],
        correctAnswer: 'A',
        explanation: 'Jarak vertikal = 8 m. Jarak dari sudut alas ke pusat alas = 1/2 x (8√2) = 4√2 m. Jarak hipotenusa = √(8² + (4√2)²) = √(64 + 32) = √96 = √(16 x 6) = 4√6 meter.',
      }
    ]
  },
  {
    id: 'sma-lit-1',
    level: 'SMA_SMK',
    subject: 'sma-literasi-indonesia',
    topic: 'Kritik Argumen & Teks Opini Editorial',
    difficulty: 'HOTS',
    type: 'single_choice',
    stimulusTitle: 'Transformasi Kecerdasan Artifisial dalam Dunia Kerja',
    stimulus: '"Kehadiran Generative AI tidak diragukan lagi telah mengotomatisasi berbagai pekerjaan repetitif. Kendati demikian, pandangan distopis yang menyatakan tenaga kerja manusia akan punah terbukti terlalu simplistis. Sejarah revolusi industri menunjukkan bahwa disrupsi teknologi selalu melahirkan ceruk profesi baru yang berorientasi pada pemikiran strategis, empati interpersonal, dan orisinalitas etika yang belum sanggup direplikasi oleh algoritma."',
    question: 'Asumsi implisit mendasar yang melandasi argumentasi penulis teks di atas adalah...',
    options: [
      { id: 'A', text: 'Teknologi cerdas tidak akan pernah diadopsi oleh korporasi multinasional' },
      { id: 'B', text: 'Kapasitas unik kognitif dan afektif manusia tetap menjadi pembeda esensial di tengah otomatisasi teknologi' },
      { id: 'C', text: 'Semua jenis profesi manual akan lenyap dalam kurun waktu kurang dari satu dekade' },
      { id: 'D', text: 'Pendidikan vokasi tidak lagi relevan dengan perkembangan kecerdasan buatan' }
    ],
    correctAnswer: 'B',
    explanation: 'Penulis menegaskan bahwa profesi baru menuntut "pemikiran strategis, empati interpersonal, dan orisinalitas etika". Asumsi implisitnya adalah bahwa kualitas unik manusia (kognitif tingkat tinggi & afektif/empati) tidak dapat digantikan sepenuhnya oleh mesin algoritma.',
    learningObjective: 'Menganalisis koherensi penalaran, bias, dan asumsi tersembunyi dalam wacana argumentatif kontemporer (Fase F).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Disrupsi Otomasi Medis',
        stimulusTitle: 'Dilema Algoritma Diagnostik dalam Pelayanan Kesehatan',
        stimulus: '"Pemanfaatan sistem visi komputer berkecepatan tinggi dalam membaca citra radiologi memang melampaui kecepatan deteksi dokter manusia. Akan tetapi, mereduksi profesi dokter sekadar pembaca data diagnostik adalah kekeliruan fatal. Hubungan terapeutik yang melibatkan pertimbangan empati kultural, penyampaian kabar duka secara welas asih, dan pengambilan keputusan etis pada kasus terminal tetap menuntut kehadiran kesadaran manusiawi."',
        question: 'Landasan pemikiran utama yang ingin ditekankan oleh penulis editorial tersebut adalah...',
        options: [
          { id: 'A', text: 'Dimensi afektif empati dan etika manusiawi tidak dapat disubstitusi sepenuhnya oleh kepintaran kalkulasi mesin' },
          { id: 'B', text: 'Penggunaan perangkat lunak medis harus dihentikan demi menjaga keamanan pasien' },
          { id: 'C', text: 'Radiologi komputer sama sekali tidak akurat dalam mengidentifikasi penyakit' },
          { id: 'D', text: 'Biaya pengobatan akan naik drastis akibat kehadiran teknologi kecerdasan buatan' }
        ],
        correctAnswer: 'A',
        explanation: 'Penulis menekankan bahwa walau mesin cepat mengolah data, dimensi empati kultural, etika, dan relasi manusiawi merupakan inti yang tak tergantikan oleh kecerdasan buatan.',
      }
    ]
  },
  {
    id: 'sma-sains-1',
    level: 'SMA_SMK',
    subject: 'sma-sains-terapan',
    topic: 'Termodinamika & Energi Berkelanjutan',
    difficulty: 'HOTS',
    type: 'single_choice',
    stimulusTitle: 'Efisiensi Mesin Termal Pembangkit Biomassa',
    stimulus: 'Sebuah prototipe pembangkit listrik biomassa siklus Carnot beroperasi antara reservoir suhu tinggi (T1 = 600 Kelvin) dan reservoir suhu rendah (T2 = 360 Kelvin). Dalam setiap siklusnya, mesin menyerap kalor sebesar 50.000 Joule dari reservoir suhu tinggi.',
    question: 'Berapakah efisiensi termal ideal mesin serta besar usaha mekanik (W) yang dihasilkan dalam satu siklus?',
    options: [
      { id: 'A', text: 'Efisiensi 40% dengan usaha mekanik 20.000 Joule' },
      { id: 'B', text: 'Efisiensi 60% dengan usaha mekanik 30.000 Joule' },
      { id: 'C', text: 'Efisiensi 50% dengan usaha mekanik 25.000 Joule' },
      { id: 'D', text: 'Efisiensi 30% dengan usaha mekanik 15.000 Joule' }
    ],
    correctAnswer: 'A',
    explanation: 'Efisiensi siklus Carnot η = 1 - (T2/T1) = 1 - (360/600) = 1 - 0.6 = 0.40 atau 40%. Usaha W = η x Q1 = 0.40 x 50.000 J = 20.000 Joule.',
    learningObjective: 'Menghitung efisiensi siklus termodinamika dan konversi energi dalam industri rekayasa (Fase F).',
    variants: [
      {
        variantName: 'Variasi Angka #2: Pembangkit Geotermal Siklus Carnot',
        stimulusTitle: 'Efisiensi Siklus Termal Pembangkit Geotermal',
        stimulus: 'Turbin uap geotermal siklus Carnot bekerja pada reservoir uap panas bersuhu T1 = 800 Kelvin dan reservoir pendingin kondensor bersuhu T2 = 400 Kelvin. Setiap siklus kerja, sistem menerima pasokan kalor Q1 = 60.000 Joule dari reservoir suhu tinggi.',
        question: 'Berapa efisiensi termal mesin turbin tersebut serta usaha mekanik (W) yang dibangkitkan?',
        options: [
          { id: 'A', text: 'Efisiensi 50% dengan usaha mekanik 30.000 Joule' },
          { id: 'B', text: 'Efisiensi 40% dengan usaha mekanik 24.000 Joule' },
          { id: 'C', text: 'Efisiensi 60% dengan usaha mekanik 36.000 Joule' },
          { id: 'D', text: 'Efisiensi 25% dengan usaha mekanik 15.000 Joule' }
        ],
        correctAnswer: 'A',
        explanation: 'Efisiensi Carnot η = 1 - (T2/T1) = 1 - (400/800) = 0.50 atau 50%. Usaha W = η x Q1 = 0.50 x 60.000 J = 30.000 Joule.',
      }
    ]
  },
  {
    id: 'sma-sko-1',
    level: 'SMA_SMK',
    subject: 'sma-penalaran-skolastik',
    topic: 'Silogisme Logika Deduktif',
    difficulty: 'Sedang',
    type: 'single_choice',
    stimulusTitle: 'Standar Akreditasi Laboratorium Sains',
    stimulus: 'Premis 1: Semua sekolah dengan predikat Adiwiyata Mandiri memiliki instalasi pengolahan air limbah terstandar.\nPremis 2: Beberapa sekolah di Kabupaten Sukamaju memiliki predikat Adiwiyata Mandiri.\nPremis 3: SMA Tunas Bangsa adalah salah satu sekolah di Kabupaten Sukamaju yang tidak memiliki instalasi pengolahan air limbah terstandar.',
    question: 'Kesimpulan logis yang PASTI BENAR berdasarkan ketiga premis di atas adalah...',
    options: [
      { id: 'A', text: 'SMA Tunas Bangsa bukan merupakan sekolah berpredikat Adiwiyata Mandiri' },
      { id: 'B', text: 'Tidak ada sekolah di Kabupaten Sukamaju yang peduli lingkungan' },
      { id: 'C', text: 'Semua sekolah di Kabupaten Sukamaju memiliki fasilitas Adiwiyata Mandiri' },
      { id: 'D', text: 'SMA Tunas Bangsa akan segera mendapatkan predikat Adiwiyata Mandiri' }
    ],
    correctAnswer: 'A',
    explanation: 'Modus Tollens: Jika P (Adiwiyata Mandiri) maka Q (memiliki instalasi limbah). Diketahui SMA Tunas Bangsa tidak memiliki instalasi limbah (~Q). Maka pasti SMA Tunas Bangsa bukan berpredikat Adiwiyata Mandiri (~P).',
    learningObjective: 'Mengonstruksi penarikan kesimpulan logis deduktif berbasis logika proposisional formal (Fase E/F).',
    variants: [
      {
        variantName: 'Variasi Konteks #2: Standar ISO Laboratorium Komputer',
        stimulusTitle: 'Sertifikasi Keamanan Siber Lab Vokasi',
        stimulus: 'Premis 1: Semua pusat data yang tersertifikasi ISO 27001 menerapkan sistem enkripsi ganda terpusat.\nPremis 2: Sebagian institusi pelatihan di Kota Metropolitan memiliki sertifikasi ISO 27001.\nPremis 3: Balai Latihan Kerja (BLK) Harapan di Kota Metropolitan tidak menerapkan sistem enkripsi ganda terpusat.',
        question: 'Simpulan deduktif yang secara mutlak valid adalah...',
        options: [
          { id: 'A', text: 'BLK Harapan bukan merupakan pusat data yang tersertifikasi ISO 27001' },
          { id: 'B', text: 'Semua pusat data di Kota Metropolitan rentan terhadap serangan peretasan' },
          { id: 'C', text: 'BLK Harapan telah memenuhi seluruh kualifikasi sertifikasi internasional' },
          { id: 'D', text: 'Tidak ada institusi di Kota Metropolitan yang memiliki sistem enkripsi' }
        ],
        correctAnswer: 'A',
        explanation: 'Berdasarkan Modus Tollens: P -> Q. Diketahui ~Q (tidak ada enkripsi ganda). Maka kesimpulan pasti adalah ~P (BLK Harapan bukan pusat data tersertifikasi ISO 27001).',
      }
    ]
  },
  {
    id: 'sma-sko-2',
    level: 'SMA_SMK',
    subject: 'sma-penalaran-skolastik',
    topic: 'Pola Barisan Bilangan & Logika Numerik',
    difficulty: 'HOTS',
    type: 'single_choice',
    stimulusTitle: 'Pola Algoritma Kompresi Data',
    stimulus: 'Sebuah deret angka enkripsi keamanan jaringan membentuk keteraturan pola sebagai berikut:\n4, 7, 14, 17, 34, 37, 74, ...',
    question: 'Dua bilangan selanjutnya yang memenuhi pola keteraturan tersebut secara berurutan adalah...',
    options: [
      { id: 'A', text: '77 dan 154' },
      { id: 'B', text: '78 dan 156' },
      { id: 'C', text: '81 dan 162' },
      { id: 'D', text: '77 dan 148' }
    ],
    correctAnswer: 'A',
    explanation: 'Perhatikan pola bergantian: +3, lalu x2.\n4 (+3) = 7\n7 (x2) = 14\n14 (+3) = 17\n17 (x2) = 34\n34 (+3) = 37\n37 (x2) = 74\nBerikutnya: 74 (+3) = 77, lalu 77 (x2) = 154.',
    learningObjective: 'Menganalisis keteraturan pola barisan aritmatika dan geometri kombinatif dalam TKA Skolastik (Fase E/F).',
    variants: [
      {
        variantName: 'Variasi Angka #2: Deret Kriptografi Barisan Ganda',
        stimulusTitle: 'Pola Bilangan Enkripsi Algoritmik',
        stimulus: 'Perhatikan keteraturan deret angka matematis berikut:\n3, 7, 21, 25, 75, 79, 237, ...',
        question: 'Dua suku bilangan berikutnya yang memenuhi pola keteraturan deret di atas adalah...',
        options: [
          { id: 'A', text: '241 dan 723' },
          { id: 'B', text: '240 dan 720' },
          { id: 'C', text: '245 dan 735' },
          { id: 'D', text: '241 dan 482' }
        ],
        correctAnswer: 'A',
        explanation: 'Pola berselang-seling: (+4), lalu (x3).\n3 (+4) = 7\n7 (x3) = 21\n21 (+4) = 25\n25 (x3) = 75\n75 (+4) = 79\n79 (x3) = 237\nBerikutnya: 237 (+4) = 241, lalu 241 (x3) = 723.',
      }
    ]
  }
];
