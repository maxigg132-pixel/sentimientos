import React, { useState, useEffect, useRef } from 'react';
import { Film } from 'lucide-react';
import { CupidArrowHeart } from './CupidArrowHeart';

export interface VideoSlot {
  id: string;
  title: string;
  note: string;
  videoUrl?: string;
}

const initialSlots: VideoSlot[] = [
  {
    id: 'video-1',
    title: 'Video 1',
    note: 'Mi muñequita porcelana eres la tentación del cielo y del infierno',
  },
  {
    id: 'video-2',
    title: 'Video 2',
    note: 'Eres y serás todo lo que quiero en este mundo maldito vicio',
  },
  {
    id: 'video-3',
    title: 'Video 3',
    note: 'Mi obsesión no puedo vivir sin verte',
  },
  {
    id: 'video-4',
    title: 'Video 4',
    note: 'Eres perfecta una tentación disfrazada de bendición amén',
  },
];

const DB_NAME = 'DevocionVideosDB_v2';
const STORE_NAME = 'video_blobs';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveVideoLocally(id: string, file: File): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(file, id);
  } catch {}
}

async function getVideoLocally(id: string): Promise<File | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export const VideoMemories: React.FC = () => {
  const [slots, setSlots] = useState<VideoSlot[]>(initialSlots);
  const [activeSlotId, setActiveSlotId] = useState<string>('video-1');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetSlotId, setTargetSlotId] = useState<string>('video-1');

  useEffect(() => {
    async function loadVideos() {
      let serverVideos: Record<string, string> = {};
      try {
        const res = await fetch('/api/videos-status');
        if (res.ok) {
          const data = await res.json();
          serverVideos = data.videos || {};
        }
      } catch {}

      const resolvedSlots = await Promise.all(
        initialSlots.map(async (slot) => {
          if (serverVideos[slot.id]) {
            return { ...slot, videoUrl: serverVideos[slot.id] };
          }
          const localFile = await getVideoLocally(slot.id);
          if (localFile) {
            const url = URL.createObjectURL(localFile);
            return { ...slot, videoUrl: url };
          }
          return slot;
        })
      );

      setSlots(resolvedSlots);
    }

    loadVideos();
  }, []);

  const persistVideo = async (slotId: string, file: File) => {
    await saveVideoLocally(slotId, file);
    try {
      await fetch(`/api/upload-video?slot=${slotId}`, {
        method: 'POST',
        body: file,
      });
    } catch {}
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 1) {
      const newSlots = [...slots];
      for (let i = 0; i < Math.min(files.length, 4); i++) {
        const file = files[i];
        const slotId = `video-${i + 1}`;
        const url = URL.createObjectURL(file);
        const idx = newSlots.findIndex((s) => s.id === slotId);
        if (idx !== -1) {
          newSlots[idx] = { ...newSlots[idx], videoUrl: url };
        }
        persistVideo(slotId, file);
      }
      setSlots(newSlots);
      setActiveSlotId('video-1');
    } else {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setSlots((prev) =>
        prev.map((s) => (s.id === targetSlotId ? { ...s, videoUrl: url } : s))
      );
      persistVideo(targetSlotId, file);
      setActiveSlotId(targetSlotId);
    }
  };

  const triggerUpload = (slotId: string) => {
    setTargetSlotId(slotId);
    fileInputRef.current?.click();
  };

  const activeSlot = slots.find((s) => s.id === activeSlotId) || slots[0];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title with Cupid Arrow Heart */}
      <div className="text-center mb-8">
        <div className="inline-flex justify-center mb-3">
          <CupidArrowHeart size="md" />
        </div>

        <h2 className="font-display text-3xl sm:text-5xl text-stone-900 font-normal leading-tight">
          Eres la droga más fuerte <br />
          <span className="font-script text-rose-600 font-bold text-4xl sm:text-6xl block mt-1">
            que hay en este mundo
          </span>
        </h2>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Main Video Display Box */}
      <div className="relative bg-[#1A0B10] p-3 sm:p-5 rounded-3xl shadow-2xl border border-rose-900/40 max-w-md sm:max-w-lg mx-auto mb-6">
        <div className="relative aspect-[9/16] max-h-[540px] mx-auto rounded-2xl overflow-hidden bg-black flex items-center justify-center">
          {activeSlot.videoUrl ? (
            <video
              key={activeSlot.videoUrl}
              src={`${activeSlot.videoUrl}#t=0.01`}
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            /* Silent discrete placeholder if video file not yet loaded */
            <div
              onClick={() => triggerUpload(activeSlot.id)}
              className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-gradient-to-b from-stone-900 via-rose-950/40 to-stone-900"
            >
              <div className="w-14 h-14 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center mb-3">
                <Film className="w-6 h-6 text-rose-400" />
              </div>
              <p className="text-xs text-rose-200/90 font-editorial italic max-w-xs leading-relaxed">
                «{activeSlot.note}»
              </p>
            </div>
          )}

          {/* Bottom Card Caption */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-5 text-white z-20">
            <p className="font-editorial text-base sm:text-lg italic leading-relaxed text-pink-100 mb-2 font-normal">
              «{activeSlot.note}»
            </p>

            <div className="flex items-center justify-end pt-1.5 border-t border-white/10 text-xs">
              <span className="text-[11px] text-stone-300 flex items-center gap-1 font-serif">
                <CupidArrowHeart size="sm" className="w-3 h-3 inline-block" /> Mi fruto prohibido
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Video Selector Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
        {slots.map((slot, index) => {
          const isSelected = slot.id === activeSlotId;
          return (
            <div
              key={slot.id}
              onClick={() => {
                if (slot.videoUrl) {
                  setActiveSlotId(slot.id);
                } else {
                  triggerUpload(slot.id);
                }
              }}
              className={`relative cursor-pointer rounded-2xl p-1.5 transition-all duration-300 bg-white border ${
                isSelected
                  ? 'border-rose-600 shadow-lg shadow-rose-200 ring-2 ring-rose-400 -translate-y-1'
                  : 'border-pink-200 hover:border-rose-400'
              }`}
            >
              <div className="relative aspect-[9/14] rounded-xl overflow-hidden bg-stone-900 flex items-center justify-center">
                {slot.videoUrl ? (
                  <video
                    src={`${slot.videoUrl}#t=0.01`}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-rose-950/40">
                    <Film className="w-5 h-5 text-rose-400 mb-1" />
                    <span className="text-[10px] text-rose-200 font-sans">Video {index + 1}</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-serif text-white truncate text-center font-semibold">
                  Video {index + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
