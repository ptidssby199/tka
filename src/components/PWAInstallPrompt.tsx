import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { soundFx } from '../utils/audio';
import { 
  Download, 
  Smartphone, 
  Laptop, 
  CheckCircle2, 
  X, 
  Share, 
  PlusSquare, 
  WifiOff, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // If already running in standalone mode (already installed app)
  if (isInstalled) {
    return (
      <div 
        className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold"
        title="Aplikasi TKA Pintar terpasang sebagai aplikasi mandiri (PWA)"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Terpasang</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    soundFx.playClick();
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowInfoModal(true);
    }
  };

  return (
    <>
      <button
        id="btn-pwa-install"
        onClick={handleInstallClick}
        className={`inline-flex items-center gap-1.5 font-bold transition-all shadow-xs cursor-pointer ${
          compact
            ? 'p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs'
            : 'px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs'
        }`}
        title="Pasang aplikasi ke layar utama HP / Laptop (PWA)"
      >
        <Download className="w-3.5 h-3.5" />
        <span className={compact ? 'hidden sm:inline' : 'inline'}>Install App</span>
      </button>

      {/* iOS Safari Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Pasang di iPhone / iPad
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">
              Jadikan TKA Pintar aplikasi mandiri di perangkat Apple Anda tanpa App Store:
            </p>

            <ol className="space-y-3 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center mt-0.5">
                  1
                </span>
                <span>
                  Buka website ini di browser <strong>Safari</strong> di iPhone/iPad Anda.
                </span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center mt-0.5">
                  2
                </span>
                <span className="flex items-center gap-1 flex-wrap">
                  Tekan tombol <strong>Bagikan (Share)</strong> <Share className="w-3.5 h-3.5 inline text-blue-600" /> di bilah navigasi Safari.
                </span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center mt-0.5">
                  3
                </span>
                <span className="flex items-center gap-1 flex-wrap">
                  Pilih <strong>Tambahkan ke Layar Utama (Add to Home Screen)</strong> <PlusSquare className="w-3.5 h-3.5 inline text-blue-600" />.
                </span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-colors"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Info Modal for Chrome / Desktop if trigger not ready yet */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
              <Download className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Cara Pasang Aplikasi (PWA)
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">
              TKA Pintar mendukung Progressive Web App (PWA) sehingga bisa dipasang seperti aplikasi asli di PC atau HP:
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                  <Smartphone className="w-3.5 h-3.5" /> Android / Chrome Mobile:
                </div>
                <p className="text-blue-800 leading-normal">
                  Tekan menu titik tiga (⋮) di browser Chrome, lalu pilih <strong>"Tambahkan ke Layar Utama"</strong> atau <strong>"Instal Aplikasi"</strong>.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Laptop className="w-3.5 h-3.5" /> Laptop / Komputer (Chrome/Edge):
                </div>
                <p className="text-slate-700 leading-normal">
                  Klik ikon instal <Download className="w-3 h-3 inline text-blue-600" /> yang berada di sisi kanan bilah alamat (address bar) browser Anda.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="mt-5 w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-2xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xl animate-bounce">
      <WifiOff className="w-4 h-4" />
      <span>Mode Offline — Aplikasi tetap bisa dibuka & data tersimpan lokal.</span>
    </div>
  );
};
