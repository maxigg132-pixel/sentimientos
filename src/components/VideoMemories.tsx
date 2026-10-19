import React, { useState, useEffect, useRef } from 'react';
import { Film } from 'lucide-react';
import { CupidArrowHeart } from './CupidArrowHeart';

export interface VideoSlot {
  id: string;
  title: string;
  note: string;
  videoUrl: string;
}

// Default directly to the permanent files in /public/videos/
const initialSlots: VideoSlot[] = [
  {
    id: 'video-1',
    title: 'Video 1',
    note: 'Mi muñequita porcelana eres la tentación del cielo y del infierno',
    videoUrl: '/videos/video-1.mp4',
  },
  {
    id: 'video-2',
    title: 'Video 2',
    note: 'Eres y serás todo lo que quiero en este mundo maldito vicio',
    videoUrl: '/videos/video-2.mp4',
  },
  {
    id: 'video-3',
    title: 'Video 3',
    note: 'Mi obsesión no puedo vivir sin verte',
    videoUrl: '/videos/video-3.mp4',
  },
  {
    id: 'video-4',
    title: 'Video 4',
    note: 'Eres perfecta una tentación disfrazada de bendición amén',
    videoUrl: '/videos/video-4.mp4',
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
  const [videoError, setVideoError] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    async function checkLocalOverrides() {
      const resolved = await Promise.all(
        initialSlots.map(async (slot) => {
          const localBlob = await getVideoLocally(slot.id);
          if (localBlob) {
            return { ...slot, videoUrl: URL.createObjectURL(localBlob) };
          }
          return slot;
        })
      );
      setSlots(resolved);
    }
    checkLocalOverrides();
  }, []);

  const activeSlot = slots.find((s) => s.id === activeSlotId) || slots[0];
  const hasError = videoError[activeSlot.id];

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

      {/* Main Video Display Box */}
      <div className="relative bg-[#1A0B10] p-3 sm:p-5 rounded-3xl shadow-2xl border border-rose-900/40 max-w-md sm:max-w-lg mx-auto mb-6">
        <div className="relative aspect-[9/16] max-h-[540px] mx-auto rounded-2xl overflow-hidden bg-black flex items-center justify-center">
          <video
            key={activeSlot.videoUrl}
            ref={(el) => {
              videoRefs.current[activeSlot.id] = el;
            }}
            src={`${activeSlot.videoUrl}#t=0.01`}
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            onError={() => {
              setVideoError((prev) => ({ ...prev, [activeSlot.id]: true }));
            }}
            onLoadedData={() => {
              setVideoError((prev) => ({ ...prev, [activeSlot.id]: false }));
            }}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              hasError ? 'opacity-0 absolute pointer-events-none' : 'opacity-100'
            }`}
          />

          {/* Graceful fallback if video file is not yet deployed */}
          {hasError && (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-stone-900 via-rose-950/40 to-stone-900">
              <div className="w-16 h-16 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center mb-3">
                <Film className="w-7 h-7 text-rose-400" />
              </div>
              <p className="font-display text-base text-white font-normal mb-1">
                {activeSlot.title}
              </p>
              <p className="text-xs text-rose-200/90 font-editorial italic max-w-xs leading-relaxed mb-3">
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
          const isSlotError = videoError[slot.id];

          return (
            <div
              key={slot.id}
              onClick={() => setActiveSlotId(slot.id)}
              className={`relative cursor-pointer rounded-2xl p-1.5 transition-all duration-300 bg-white border ${
                isSelected
                  ? 'border-rose-600 shadow-lg shadow-rose-200 ring-2 ring-rose-400 -translate-y-1'
                  : 'border-pink-200 hover:border-rose-400'
              }`}
            >
              <div className="relative aspect-[9/14] rounded-xl overflow-hidden bg-stone-900 flex items-center justify-center">
                {!isSlotError ? (
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
