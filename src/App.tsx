import React from 'react';
import { VideoMemories } from './components/VideoMemories';
import { EternalDevotionTestament } from './components/EternalDevotionTestament';
import { PetalsCanvas } from './components/PetalsCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { CupidArrowHeart } from './components/CupidArrowHeart';
import { ChevronDown } from 'lucide-react';

export default function App() {
  const scrollToTestament = () => {
    const el = document.getElementById('devocion-oculta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-romantic-pattern text-stone-800 relative flex flex-col font-sans selection:bg-rose-100 selection:text-rose-950 overflow-x-hidden">
      {/* Falling Rose Petals & Stardust Canvas */}
      <PetalsCanvas />

      {/* Background YouTube Music Player ('Te Perdí' at 82s) */}
      <MusicPlayer />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100/90 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
        <a
          href="#"
          className="font-display text-base sm:text-lg font-semibold tracking-tight text-rose-950 flex items-center gap-2 group whitespace-nowrap"
        >
          <CupidArrowHeart size="sm" />
          <span>Mi Devoción Oculta</span>
        </a>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={scrollToTestament}
            className="px-4 py-2 text-xs font-serif font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-full transition-all shadow-sm cursor-pointer whitespace-nowrap touch-manipulation"
          >
            Leer Juramento
          </button>
        </div>
      </header>

      {/* Main Flow */}
      <main className="flex-1 pb-16">
        {/* Intro */}
        <section className="pt-10 sm:pt-12 pb-6 px-4 text-center max-w-3xl mx-auto">
          {/* Cupid Arrow Heart in Hero */}
          <div className="inline-flex justify-center mb-3">
            <CupidArrowHeart size="md" />
          </div>

          {/* Dedication Banner */}
          <p className="text-xs sm:text-sm uppercase tracking-widest font-serif text-rose-600 font-bold mb-3">
            Para la mujer que me quita el sueño de lunes a lunes
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-stone-900 font-normal tracking-tight leading-[1.15] mb-4">
            Para la única mujer que vive en <br className="hidden sm:inline" />
            <span className="font-script text-rose-600 font-bold text-5xl sm:text-6xl md:text-7xl">
              mi corazón
            </span>
          </h1>

          <p className="font-editorial text-xl sm:text-2xl text-stone-700 italic max-w-xl mx-auto leading-relaxed">
            «Un castigo no poder tenerte»
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={scrollToTestament}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-serif text-rose-600 hover:text-rose-800 transition-colors animate-bounce cursor-pointer font-medium touch-manipulation p-2"
            >
              <span>Ir al testamento de amor eterno</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 1. Real Video Memories Section */}
        <VideoMemories />

        {/* Section Divider with Cupid Arrow Heart */}
        <div className="w-full max-w-3xl mx-auto px-4 flex items-center justify-center my-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          <div className="mx-4">
            <CupidArrowHeart size="sm" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        </div>

        {/* 2. The Testament: Eres y serás siempre mi devoción oculta */}
        <EternalDevotionTestament />
      </main>

      {/* Footer */}
      <footer className="border-t border-rose-200/60 bg-white/60 backdrop-blur-xs py-8 px-4 text-center">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-center mb-1">
            <CupidArrowHeart size="sm" />
          </div>
          <p className="font-script text-2xl text-rose-700 font-bold">
            Te amo con devoción eterna
          </p>
          <p className="text-xs text-stone-500 font-editorial italic">
            «Jamás te olvidé, jamás te olvidaré. Eres y serás siempre mi devoción oculta.»
          </p>
          <p className="text-[11px] text-stone-500 font-serif pt-1">
            De tu romántico volaito
          </p>
        </div>
      </footer>
    </div>
  );
}
