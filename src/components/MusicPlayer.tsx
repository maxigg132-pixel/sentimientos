import React, { useState } from 'react';
import { Play, Pause, Music, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { CupidArrowHeart } from './CupidArrowHeart';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // YouTube embed URL for video A-8srq8FOHk ("Te Perdí - Casper ft. Kendo Kaponi") starting at second 82
  const videoId = 'A-8srq8FOHk';
  const startTime = 82;

  return (
    <aside
      aria-label="Reproductor de música de fondo"
      className="fixed bottom-4 right-4 z-40 bg-stone-900/95 backdrop-blur-md border border-rose-900/60 text-white rounded-2xl shadow-2xl transition-all duration-300 max-w-[320px] w-full p-3 overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Animated Disc */}
        <div className="relative shrink-0 w-10 h-10 rounded-full bg-gradient-to-tr from-rose-700 via-rose-500 to-amber-400 p-0.5 flex items-center justify-center">
          <div
            className={`w-full h-full rounded-full bg-stone-950 flex items-center justify-center ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            <Music className="w-4 h-4 text-rose-400" />
          </div>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-400">
              Nuestra Canción
            </span>
            <span className="text-[10px] text-amber-300 font-mono">(1:22)</span>
          </div>
          <p className="text-xs font-serif font-medium text-white truncate" title="Te Perdí - Casper ft. Kendo Kaponi">
            Te Perdí · Casper ft. Kendo
          </p>
          <p className="text-[10px] text-stone-400 truncate">
            {isPlaying ? 'Sonando de fondo...' : 'Pausada'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-colors shadow-md shadow-rose-950 cursor-pointer"
            title={isPlaying ? 'Pausar canción' : 'Reproducir'}
            aria-label={isPlaying ? 'Pausar canción' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
            title={isExpanded ? 'Ocultar video' : 'Ver video'}
            aria-label={isExpanded ? 'Ocultar video' : 'Ver video'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Persistent Single Iframe Container */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'h-44 mt-2.5 opacity-100' : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full h-44 rounded-xl overflow-hidden bg-black border border-stone-800">
          {isPlaying && (
            <iframe
              id="youtube-player-frame"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=${startTime}&enablejsapi=1`}
              title="Te Perdí"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
        </div>
      </div>

      {/* External Link */}
      <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
        <span className="flex items-center gap-1 text-rose-300 font-serif">
          <CupidArrowHeart size="sm" className="w-4 h-3 inline-block" /> Para ti
        </span>
        <a
          href={`https://youtu.be/A-8srq8FOHk?t=${startTime}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors"
        >
          <span>Abrir en YouTube</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
