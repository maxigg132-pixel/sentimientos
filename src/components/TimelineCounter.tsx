import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Quote, Copy, Check, Star } from 'lucide-react';
import { RibbonBow } from './RomanticRibbon';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const romanticVerses = [
  {
    verse: '«Te quiero para volvernos locos de risa, ebrios de nada y pasear sin prisa por las calles del recuerdo.»',
    author: 'Mario Benedetti',
  },
  {
    verse: '«Podrá nublarse el sol eternamente; podrá secarse en un instante el mar; pero jamás en mí podrá apagarse la llama de tu amor.»',
    author: 'Gustavo Adolfo Bécquer',
  },
  {
    verse: '«Andábamos sin buscarnos, pero sabiendo que andábamos para encontrarnos.»',
    author: 'Julio Cortázar',
  },
  {
    verse: '«Te amo como se aman ciertas cosas oscuras, secretamente, entre la sombra y el alma.»',
    author: 'Pablo Neruda',
  },
  {
    verse: '«Por una mirada, un mundo; por una sonrisa, un cielo; por un beso... ¡yo no sé qué te diera por un beso!»',
    author: 'Gustavo Adolfo Bécquer',
  },
  {
    verse: '«El más difícil no es el primer beso, sino el último recuerdo que no se quiere marchar.»',
    author: 'Anónimo Romántico',
  },
  {
    verse: '«No te fuiste de mi vida: te quedaste a vivir en la música que escucho y en el silencio que me abraza.»',
    author: 'Ecos del Alma',
  },
  {
    verse: '«Hay personas que son hogar, sin importar en qué punto del mapa se encuentren.»',
    author: 'Pensamiento del Corazón',
  },
  {
    verse: '«Amarte fue fácil, recordarte es inevitable, y agradecerte por existir es mi costumbre diaria.»',
    author: 'Dedicatoria Eterna',
  },
  {
    verse: '«Si volviera a nacer mil veces, en las mil vidas buscaría tus ojos en la multitud.»',
    author: 'Promesa en el Tiempo',
  },
];

const timelineMilestones = [
  {
    phase: '01. El Primer Destello',
    desc: 'El instante en que nuestras miradas coincidieron y el mundo entero guardó silencio por un segundo.',
    icon: '✦',
  },
  {
    phase: '02. La Ternura Compartida',
    desc: 'Las horas que se volvían minutos entre conversaciones interminables, risas y secretos desvelados.',
    icon: '♥',
  },
  {
    phase: '03. El Refugio en la Distancia',
    desc: 'Descubrir que el verdadero cariño no necesita estar al lado para sentirse cerca del pecho.',
    icon: '✧',
  },
  {
    phase: '04. La Huella Imborrable',
    desc: 'La certeza de que fuiste, eres y serás un capítulo eterno de luz en mi historia.',
    icon: 'ღ',
  },
];

export const TimelineCounter: React.FC = () => {
  const [heartCount, setHeartCount] = useState(724);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [copied, setCopied] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play soft chime on click
  const playHeartChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pentatonic chime
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHeartCount((prev) => prev + 1);

    // Change to next random verse
    let nextIdx = Math.floor(Math.random() * romanticVerses.length);
    if (nextIdx === currentVerseIndex) {
      nextIdx = (nextIdx + 1) % romanticVerses.length;
    }
    setCurrentVerseIndex(nextIdx);

    playHeartChime();

    // Spawn 4-6 floating particles
    const rect = e.currentTarget.getBoundingClientRect();
    const colors = ['#F472B6', '#FB7185', '#FDA4AF', '#FCD34D', '#E11D48'];
    const newHearts: FloatingHeart[] = [];

    for (let i = 0; i < 5; i++) {
      newHearts.push({
        id: Date.now() + i + Math.random(),
        x: rect.left + rect.width / 2 + (Math.random() * 60 - 30),
        y: rect.top + (Math.random() * 20 - 10),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 14,
      });
    }

    setFloatingHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1800);
  };

  const handleCopyVerse = () => {
    const text = `${romanticVerses[currentVerseIndex].verse} — ${romanticVerses[currentVerseIndex].author}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="linea-de-tiempo" className="relative py-20 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Floating hearts container */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {floatingHearts.map((h) => (
          <div
            key={h.id}
            className="absolute transition-transform animate-float-heart"
            style={{
              left: `${h.x}px`,
              top: `${h.y}px`,
              color: h.color,
              animation: 'floatUpAndFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <Heart style={{ width: h.size, height: h.size }} fill="currentColor" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes floatUpAndFade {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 0.9;
            transform: translate(${Math.random() * 40 - 20}px, -70px) scale(1.2) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: translate(${Math.random() * 80 - 40}px, -150px) scale(1) rotate(-15deg);
          }
        }
      `}</style>

      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex justify-center mb-2">
          <RibbonBow size="md" color="#F472B6" />
        </div>
        <p className="text-xs uppercase tracking-widest font-serif text-rose-500 mb-2">
          Constelación de Recuerdos
        </p>
        <h2 className="font-display text-3xl sm:text-5xl text-stone-900 font-normal">
          Línea del Tiempo & <span className="font-script text-rose-600 italic">Latidos</span>
        </h2>
        <p className="font-editorial text-lg text-stone-600 mt-2 max-w-xl mx-auto">
          Cada latido es un recuerdo que renace, un verso que te busca y un deseo sincero para tu porvenir.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Romantic Timeline */}
        <div className="lg:col-span-6 relative">
          <div className="border-l-2 border-dashed border-pink-200/90 ml-6 pl-8 space-y-8 relative">
            {timelineMilestones.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node indicator */}
                <div className="absolute -left-[45px] top-1 w-8 h-8 rounded-full bg-white border border-pink-300 flex items-center justify-center text-rose-500 text-xs shadow-sm shadow-pink-100 group-hover:scale-110 group-hover:bg-pink-50 transition-all">
                  <span>{item.icon}</span>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-pink-100/90 shadow-sm transition-all hover:shadow-md hover:border-pink-200">
                  <h3 className="font-display text-base sm:text-lg font-medium text-stone-900">
                    {item.phase}
                  </h3>
                  <p className="font-editorial text-stone-600 text-base leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Heart & Random Verse Generator */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full bg-[#FFF9FB] border border-pink-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-pink-100 text-center relative overflow-hidden gold-shimmer-border">
            {/* Top coquette ribbon */}
            <div className="absolute top-2 right-4">
              <RibbonBow size="sm" color="#F472B6" />
            </div>

            <p className="text-xs uppercase tracking-widest font-serif text-rose-500 font-semibold mb-2">
              Contador de Pensamientos
            </p>

            {/* Heart Counter Interactive Button */}
            <div className="my-4 flex flex-col items-center">
              <button
                onClick={handleHeartClick}
                className="group relative w-24 h-24 rounded-full bg-gradient-to-tr from-pink-400 via-rose-400 to-rose-500 p-1 flex items-center justify-center shadow-lg shadow-rose-300 hover:shadow-rose-400/70 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse"
                title="Toca para enviar un latido y revelar un verso"
                aria-label="Hacer latir este recuerdo"
              >
                <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white fill-white transition-transform duration-300 group-hover:scale-110" />
                </div>
              </button>

              <div className="mt-4">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
                  {heartCount.toLocaleString()}
                </span>
                <span className="block text-xs font-serif text-stone-500 uppercase tracking-widest mt-0.5">
                  Latidos de gratitud dedicados
                </span>
              </div>
              <p className="text-[11px] text-rose-600/80 mt-1 font-sans">
                (Toca el corazón para generar un nuevo verso y enviar amor)
              </p>
            </div>

            {/* Revealed Romantic Verse Card */}
            <div className="mt-6 pt-5 border-t border-pink-200/60 text-left bg-white/70 p-4 rounded-xl border border-pink-100/70 relative">
              <Quote className="w-5 h-5 text-pink-300 mb-1" />
              <p className="font-editorial text-lg sm:text-xl text-stone-800 italic leading-relaxed">
                {romanticVerses[currentVerseIndex].verse}
              </p>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-pink-100 text-xs text-rose-700 font-serif">
                <span className="flex items-center gap-1 font-medium">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                  {romanticVerses[currentVerseIndex].author}
                </span>

                <button
                  onClick={handleCopyVerse}
                  className="flex items-center gap-1 text-stone-500 hover:text-rose-700 transition-colors px-2 py-1 rounded-md hover:bg-pink-50"
                  title="Copiar este verso"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-sans">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-sans">Copiar verso</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
