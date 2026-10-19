import React, { useState, useEffect, useRef } from 'react';
import { Mail, MailOpen, Play, Pause, RotateCcw, Eye, Heart, Sparkles, Feather } from 'lucide-react';
import { RibbonBow } from './RomanticRibbon';

interface InteractiveLetterProps {
  belovedName: string;
}

export const InteractiveLetter: React.FC<InteractiveLetterProps> = ({ belovedName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const letterRef = useRef<HTMLDivElement | null>(null);

  const fullLetter = `Mi inolvidable ${belovedName},

Si estás leyendo estas líneas, es porque hay sentimientos que el tiempo no logra desgastar, y recuerdos que habitan en mi mente como una melodía que nunca se cansa de sonar.

A veces la vida toma rumbos inesperados y las estaciones cambian, pero quiero que sepas algo con total certeza: haberte conocido ha sido uno de los regalos más puros y hermosos que el destino pudo concederme. Cada risa compartida, cada mirada que se entendía sin palabras, y cada instante en el que tu presencia llenaba de luz cualquier sombra, permanecen guardados en el rincón más sagrado de mi corazón.

No escribo esto con melancolía, sino con una profunda e inmensa gratitud. Te agradezco por haber sido mi refugio, por la ternura con la que tocaste mi alma y por haberme enseñado la dimensión más noble del amor.

Te deseo desde lo más profundo de mi ser toda la felicidad del mundo, esa que llena de paz las mañanas y dibuja sonrisas genuinas en tu rostro. Que la vida te trate con la misma dulzura que tú desprendes al caminar.

Aunque los caminos se bifurquen, tu recuerdo siempre será mi lugar seguro. Gracias por haber existido de esta manera tan perfecta en mi historia.

Siempre en mi alma y en mi memoria,
Con amor eterno e infinito. ♡`;

  // Typewriter effect
  useEffect(() => {
    if (!isOpen || isPaused) return;

    if (displayedText.length < fullLetter.length) {
      const timeout = setTimeout(() => {
        // slight pacing variation for natural feel
        const char = fullLetter[displayedText.length];
        const delay = char === '.' || char === '\n' ? 95 : char === ',' ? 60 : 28;
        setDisplayedText(fullLetter.slice(0, displayedText.length + 1));
      }, 30);

      setIsTyping(true);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [isOpen, displayedText, isPaused, fullLetter]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPaused(false);
    setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 450);
  };

  const handleReset = () => {
    setDisplayedText('');
    setIsPaused(false);
    setIsTyping(true);
  };

  const handleShowAll = () => {
    setDisplayedText(fullLetter);
    setIsTyping(false);
    setIsPaused(false);
  };

  return (
    <section id="carta-interactiva" className="relative py-20 px-4 max-w-4xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <div className="inline-flex justify-center mb-2">
          <RibbonBow size="md" color="#F472B6" />
        </div>
        <p className="text-xs uppercase tracking-widest font-serif text-rose-500 mb-2">
          Confidencias del Alma
        </p>
        <h2 className="font-display text-3xl sm:text-5xl text-stone-900 font-normal">
          La Carta que Guarda mi <span className="font-script text-rose-600 italic">Corazón</span>
        </h2>
        <p className="font-editorial text-lg text-stone-600 mt-2 max-w-xl mx-auto">
          Toca el sobre sellado con cera para desplegar el mensaje escrito con tinta imborrable.
        </p>
      </div>

      {/* Envelope & Letter Container */}
      <div className="relative flex flex-col items-center">
        {/* The Envelope */}
        {!isOpen && (
          <div
            onClick={handleOpen}
            className="group cursor-pointer relative w-full max-w-md bg-[#FFF5F8] border-2 border-pink-200/90 rounded-2xl p-6 sm:p-8 shadow-xl shadow-pink-100 hover:shadow-2xl hover:shadow-pink-200/80 transition-all duration-500 hover:-translate-y-1"
          >
            {/* Top coquette ribbon on the envelope */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <RibbonBow size="sm" color="#FB7185" />
            </div>

            {/* Envelope flap graphics */}
            <div className="relative h-56 sm:h-64 flex flex-col items-center justify-center bg-gradient-to-b from-rose-50/70 to-pink-100/60 rounded-xl border border-pink-200/60 p-6 overflow-hidden">
              {/* Subtle envelope fold diagonal lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-pink-200/70 stroke-[1.5]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="50" y2="55" />
                <line x1="100" y1="0" x2="50" y2="55" />
                <line x1="0" y1="100" x2="44" y2="55" />
                <line x1="100" y1="100" x2="56" y2="55" />
              </svg>

              {/* Golden Wax Seal */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-1 shadow-lg shadow-amber-900/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-amber-200/60 bg-gradient-to-br from-rose-800 to-amber-900 flex flex-col items-center justify-center text-amber-200 shadow-inner">
                  <Heart className="w-6 h-6 fill-amber-300 text-amber-300 mb-0.5" />
                  <span className="text-[8px] font-serif uppercase tracking-widest text-amber-100 font-bold">
                    Amor
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center z-10">
                <p className="font-script text-2xl text-rose-900 font-bold">
                  Para ti, {belovedName}
                </p>
                <p className="text-xs font-serif text-stone-600 mt-1 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Toca para romper el sello y abrir
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-sans text-stone-500">
              <Mail className="w-4 h-4 text-rose-400" />
              <span>Guardada con delicadeza en el tiempo</span>
            </div>
          </div>
        )}

        {/* Opened Letter & Parchment Paper */}
        {isOpen && (
          <div
            ref={letterRef}
            className="w-full max-w-2xl bg-[#FCF8F2] border border-amber-200/70 rounded-2xl shadow-2xl shadow-pink-200/50 p-6 sm:p-10 md:p-12 relative overflow-hidden paper-texture animate-in fade-in duration-700"
          >
            {/* Subtle corner decorations */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-300/60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-300/60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-300/60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-300/60 rounded-br-lg pointer-events-none" />

            {/* Letter Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-amber-200/60 pb-4 mb-6 gap-3">
              <div className="flex items-center gap-2 text-rose-800">
                <Feather className="w-5 h-5 text-amber-600" />
                <span className="font-serif text-sm tracking-widest uppercase">
                  Epístola de Gratitud y Amor
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-serif italic">
                <MailOpen className="w-3.5 h-3.5 text-rose-400" />
                <span>Escrita para la eternidad</span>
              </div>
            </div>

            {/* Typewriter Text Area */}
            <div className="font-editorial text-lg sm:text-xl md:text-2xl text-stone-800 leading-relaxed sm:leading-loose whitespace-pre-line min-h-[360px]">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-5 bg-rose-500 ml-1 animate-pulse align-middle" />
              )}
            </div>

            {/* Audio typewriter indicator / progress */}
            <div className="mt-8 pt-6 border-t border-amber-200/50 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 font-sans">
              <div className="flex items-center gap-2">
                <span className="text-stone-500">
                  Progreso:{' '}
                  <span className="font-mono font-medium text-rose-700">
                    {Math.round((displayedText.length / fullLetter.length) * 100)}%
                  </span>
                </span>
                {isTyping && (
                  <span className="inline-flex items-center gap-1 text-rose-600 text-xs italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    escribiendo...
                  </span>
                )}
              </div>

              {/* Action Buttons for Letter */}
              <div className="flex items-center gap-2">
                {isTyping && (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-100/70 hover:bg-pink-100 text-rose-800 font-medium transition-colors"
                    title={isPaused ? "Reanudar máquina de escribir" : "Pausar escritura"}
                  >
                    {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                    <span>{isPaused ? 'Continuar' : 'Pausar'}</span>
                  </button>
                )}

                <button
                  onClick={handleShowAll}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100/70 hover:bg-amber-100 text-amber-900 font-medium transition-colors"
                  title="Mostrar la carta completa sin esperar"
                >
                  <Eye className="w-3 h-3" />
                  <span>Leer completa</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors"
                  title="Reiniciar efecto de escritura"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Releer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
