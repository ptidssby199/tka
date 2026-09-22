import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { getDefaultProfile, saveProfile } from '../utils/storage';
import { soundFx } from '../utils/audio';
import { 
  Github, 
  Terminal, 
  Check, 
  Copy, 
  Download, 
  Upload, 
  ExternalLink, 
  RotateCcw, 
  CheckCircle2, 
  Rocket, 
  Shield, 
  FolderGit2
} from 'lucide-react';

interface GithubDeployGuideProps {
  profile: StudentProfile;
  onResetData: () => void;
  onImportData: (data: StudentProfile) => void;
}

export const GithubDeployGuide: React.FC<GithubDeployGuideProps> = ({
  profile,
  onResetData,
  onImportData
}) => {
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState(false);

  const workflowContent = `name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Build project
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const gitCommands = `# 1. Inisialisasi Git dan tambahkan semua file proyek
git init
git add .
git commit -m "feat: inisialisasi TKA Pintar Kurikulum Merdeka dengan GitHub Actions"

# 2. Atur branch utama ke main dan hubungkan ke repository GitHub Anda
git branch -M main
git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git

# 3. Push ke GitHub (Workflow Actions akan berjalan secara otomatis!)
git push -u origin main`;

  const handleCopy = (text: string, type: 'workflow' | 'git') => {
    soundFx.playClick();
    navigator.clipboard.writeText(text);
    if (type === 'workflow') {
      setCopiedWorkflow(true);
      setTimeout(() => setCopiedWorkflow(false), 2000);
    } else {
      setCopiedGitCmd(true);
      setTimeout(() => setCopiedGitCmd(false), 2000);
    }
  };

  const handleExportData = () => {
    soundFx.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tka_pintar_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content) as StudentProfile;
        if (parsed.name && parsed.history) {
          saveProfile(parsed);
          onImportData(parsed);
          soundFx.playCorrect();
          alert('Data siswa berhasil dipulihkan!');
        } else {
          alert('Format berkas cadangan tidak valid.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON cadangan.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="github-deploy-guide">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full w-fit mb-2">
              <Rocket className="w-3.5 h-3.5 text-blue-600" />
              Siap Publikasi Bebas Biaya
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Otomatisasi Deployment ke GitHub Pages
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Proyek ini sudah dikonfigurasi 100% untuk berjalan di GitHub Pages sebagai static web application. Setiap ada pembaharuan kode yang di-push ke branch <code>main</code>, GitHub Actions akan otomatis melakukan kompilasi dan mempublikasikan versi terbaru secara langsung.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 shrink-0">
            <div className="p-3 bg-slate-900 text-white rounded-xl">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-700 block">Status Konfigurasi</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4" /> Workflow Actions Siap
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Langkah Mudah Deploy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Buat Repositori di GitHub</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Buka <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold inline-flex items-center gap-0.5">github.com/new <ExternalLink className="w-3 h-3" /></a> dan buat repositori baru (Public disarankan agar GitHub Pages gratis).
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Push Kode ke Branch Main</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Jalankan perintah git commit & push. File <code>.github/workflows/deploy.yml</code> yang sudah disertakan akan langsung otomatis terpicu.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Aktifkan GitHub Actions Pages</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Di repository GitHub Anda, buka tab <strong>Settings</strong> &gt; <strong>Pages</strong>, lalu pada <em>Build and deployment &gt; Source</em> pilih <strong>GitHub Actions</strong>.
          </p>
        </div>
      </div>

      {/* Terminal Command Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-base">Perintah Terminal untuk Push ke GitHub</h3>
          </div>
          <button
            onClick={() => handleCopy(gitCommands, 'git')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
          >
            {copiedGitCmd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedGitCmd ? 'Tersalin!' : 'Salin Perintah'}
          </button>
        </div>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
          {gitCommands}
        </pre>
      </div>

      {/* Workflow YAML Preview */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Github className="w-5 h-5 text-slate-900" />
              Berkas Workflow: <code>.github/workflows/deploy.yml</code>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Berkas ini sudah tersimpan di dalam folder proyek Anda.
            </p>
          </div>

          <button
            onClick={() => handleCopy(workflowContent, 'workflow')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
          >
            {copiedWorkflow ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedWorkflow ? 'Tersalin!' : 'Salin YAML'}
          </button>
        </div>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto max-h-72 leading-relaxed border border-slate-800">
          {workflowContent}
        </pre>
      </div>

      {/* Backup, Restore, and Reset Data */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-1">
          Pusat Data & Cadangan Siswa
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Seluruh progres belajar tersimpan di penyimpanan lokal (browser). Anda dapat mengekspor atau mengimpor data kapan saja untuk berpindah perangkat.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" /> Unduh Cadangan Data (JSON)
          </button>

          <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl cursor-pointer transition-colors">
            <Upload className="w-4 h-4" /> Pulihkan dari Berkas JSON
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin mengatur ulang data siswa ke data awal?')) {
                onResetData();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 font-semibold text-xs rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset ke Data Awal
          </button>
        </div>
      </div>

    </div>
  );
};
