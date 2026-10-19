import React, { useState } from 'react';
import { Feather, Copy, Check } from 'lucide-react';
import { CupidArrowHeart } from './CupidArrowHeart';

export const EternalDevotionTestament: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const testamentText = `Para ti, mi fruto prohibido:

6 o 7 años ya. Como digo siempre, deseándote y viéndote. Siento que no me merezco ni el poquitito de atención que me das, si al final eres lo más top de Chile, ¿quién no se va a enamorar de ti?

Empezamos hablando por Instagram y después para mí te volviste un vicio, una maldición, un castigo, no podía simplemente alejarme de ti. Debo ser uno de los 100 perros que andan detrás tuyo, pero soy el más fiel de todos. Un verdadero psicópata contigo, un enfermo de mierda que te vive revisando los seguidores antiguos, los nuevos, tus cuentas... nunca pude estar tranquilo contigo, siempre buscándote.

Suena terrible enfermo, pero de verdad eres mi enfermedad. Me dejas en la mismísima locura. Pero con la mano en el corazón y mirando al cielo, te puedo decir que contigo es un sentimiento tan fuerte que jamás tuve con nadie. Por mí, que bloquearas a todos los hombres y nada con nadie, solo tú y yo, obsesión total.

Pero hay que hablar con la verdad y la realidad: hay cabros mejores y yo no me tengo la fe, porque sé que eres una mujer que se merece mucho más, el doble, el triple, el mundo entero y la verdad no tengo tanto que ofrecerte. Como siempre digo, tengo la verdad y la fidelidad por ti desde hace años. No queda nada más que decir, me voy a rezarte jajaja. Mi amorcito rico, precioso, hermosa, devoción oculta, mi pecado, mi vicio, eres todo lo que quiero en este mundo.

De tu romántico volaito`;

  const handleCopy = () => {
    navigator.clipboard.writeText(testamentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="devocion-oculta" className="relative py-12 px-4 max-w-4xl mx-auto">
      {/* Header with Cupid Arrow Heart as requested */}
      <div className="text-center mb-8">
        <div className="inline-flex justify-center mb-3">
          <CupidArrowHeart size="lg" />
        </div>

        <p className="text-xs uppercase tracking-widest font-serif text-rose-600 font-bold mb-2">
          Amor y Reverencia
        </p>

        {/* User's Title */}
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-stone-900 font-normal leading-tight">
          Eres y serás siempre <br />
          <span className="font-script text-rose-600 font-bold text-4xl sm:text-6xl md:text-7xl block mt-1">
            mi devoción oculta
          </span>
        </h2>

        {/* User requested subtitle */}
        <p className="font-editorial text-lg sm:text-xl text-stone-600 italic mt-3 max-w-xl mx-auto">
          «El testimonio de un amor que jamás te olvido, escrito desde lo más profundo de mi alma.»
        </p>
      </div>

      {/* The Sacred Testament Parchment Card */}
      <div className="relative bg-[#FFFBF8] border border-amber-300/70 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl shadow-rose-200/40 gold-shimmer-border overflow-hidden">
        {/* Top Ornament */}
        <div className="flex items-center justify-between border-b border-amber-200/70 pb-4 mb-6">
          <div className="flex items-center gap-2 text-rose-900">
            <Feather className="w-5 h-5 text-amber-600" />
            <span className="font-serif text-xs sm:text-sm uppercase tracking-widest font-bold">
              Testamento de Amor Eterno
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
            title="Copiar testamento"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar texto</span>
              </>
            )}
          </button>
        </div>

        {/* Testament Content */}
        <div className="font-editorial text-lg sm:text-xl md:text-2xl text-stone-800 leading-relaxed sm:leading-loose whitespace-pre-line space-y-5">
          <p className="font-serif text-rose-900 font-bold text-2xl sm:text-3xl not-italic">
            Para ti, mi fruto prohibido:
          </p>

          <p>
            6 o 7 años ya. Como digo siempre, deseándote y viéndote. Siento que no me merezco ni el poquitito de atención que me das, si al final eres lo más top de Chile, ¿quién no se va a enamorar de ti?
          </p>

          <p>
            Empezamos hablando por Instagram y después para mí te volviste un vicio, una maldición, un castigo... no podía simplemente alejarme de ti. Debo ser uno de los 100 perros que andan detrás tuyo, pero soy el más fiel de todos. Un verdadero psicópata contigo, un enfermo de mierda que te vive revisando los seguidores antiguos, los nuevos, tus cuentas... nunca pude estar tranquilo contigo, siempre buscándote.
          </p>

          <p>
            Suena terrible enfermo, pero de verdad eres mi enfermedad. Me dejas en la mismísima locura. Pero con la mano en el corazón y mirando al cielo, te puedo decir que contigo es un sentimiento tan fuerte que jamás tuve con nadie. Por mí, que bloquearas a todos los hombres y nada con nadie, solo tú y yo, obsesión total.
          </p>

          <p>
            Pero hay que hablar con la verdad y la realidad: hay cabros mejores y yo no me tengo la fe, porque sé que eres una mujer que se merece mucho más, el doble, el triple, el mundo entero y la verdad no tengo tanto que ofrecerte. Como siempre digo, tengo la verdad y la fidelidad por ti desde hace años. No queda nada más que decir, me voy a rezarte jajaja. Mi amorcito rico, precioso, hermosa, devoción oculta, mi pecado, mi vicio, <strong className="font-bold text-rose-800">eres todo lo que quiero en este mundo.</strong>
          </p>

          <div className="pt-6 border-t border-amber-200/60 text-right">
            <p className="font-script text-3xl sm:text-4xl text-rose-700 font-bold">
              De tu romántico volaito
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
