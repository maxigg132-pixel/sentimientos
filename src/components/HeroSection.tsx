import React from 'react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { RibbonBow } from './RomanticRibbon';

interface HeroSectionProps {
  onOpenLetter: () => void;
  belovedName: string;
  onEditName: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenLetter,
  belovedName,
  onEditName,
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 pt-12 pb-16 text-center overflow-hidden">
      {/* Decorative Golden & Rose Halos */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[620px] h-[340px] md:h-[620px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(251, 207, 232, 0.8) 0%, rgba(254, 240, 138, 0.25) 50%, transparent 70%)'
        }}
      />

      {/* Coquette Ribbon Top Decorator */}
      <div className="relative z-20 mb-3 animate-float-soft">
        <RibbonBow size="lg" color="#F472B6" />
      </div>

      {/* Recipient Kicker Tag - Clean typography without pills */}
      <div className="relative z-20 flex items-center justify-center gap-2 text-xs md:text-sm tracking-widest uppercase font-serif text-rose-800/80 mb-4">
        <span>Una carta desde el corazón</span>
        <span aria-hidden="true" className="text-amber-500">✦</span>
        <button
          onClick={onEditName}
          className="hover:text-rose-600 transition-colors underline decoration-dotted underline-offset-4 cursor-pointer"
          title="Toca para cambiar el nombre o dedicatoria"
        >
          Para: {belovedName}
        </button>
      </div>

      {/* Main Hero Headline */}
      <div className="relative z-20 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-stone-900 leading-[1.1] mb-6">
          Para siempre en <br className="hidden sm:inline" />
          <span className="font-script italic text-rose-600 font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-9xl ml-2">
            mi memoria
          </span>
        </h1>

        <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-stone-700 italic max-w-2xl mx-auto leading-relaxed mb-8">
          «Hay miradas que desafían al tiempo, y amores que, aunque los días pasen, florecen eternamente en el alma.»
        </p>
      </div>

      {/* Visual Accent Card with generated hero rose still-life */}
      <div className="relative z-20 w-full max-w-md sm:max-w-lg mx-auto mb-10 group">
        <div className="p-2.5 sm:p-3 bg-white rounded-2xl shadow-xl shadow-pink-100 border border-pink-100/80 gold-shimmer-border transition-transform duration-500 hover:scale-[1.01]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <img
              src="/src/assets/images/hero_romantic_roses_1792363186394.jpg"
              alt="Rosas y carta romántica vintage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/95 text-xs font-serif italic">
              <span>Un suspiro que no se extingue</span>
              <span className="flex items-center gap-1 text-amber-200">
                <Sparkles className="w-3 h-3" /> Siempre en mí
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing CTA Button */}
      <div className="relative z-20 flex flex-col items-center gap-4">
        <button
          onClick={onOpenLetter}
          className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-serif font-medium tracking-wide text-rose-950 bg-gradient-to-r from-pink-100 via-rose-200 to-amber-100 border border-amber-300/60 shadow-lg shadow-pink-200/50 hover:shadow-pink-300/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse-glow"
        >
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-bounce" />
          <span>Abrir esta carta</span>
          <Sparkles className="w-4 h-4 text-amber-600" />
        </button>

        <p className="text-xs text-stone-500 font-sans tracking-wide">
          Haz clic para desplegar los recuerdos y las palabras que guardo para ti
        </p>

        <button
          onClick={onOpenLetter}
          aria-label="Desplazarse hacia la carta"
          className="mt-2 text-rose-400 hover:text-rose-600 transition-colors animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};
