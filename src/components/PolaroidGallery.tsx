import React, { useState } from 'react';
import { Sparkles, Heart, Plus, X, ZoomIn, Film } from 'lucide-react';
import { RibbonBow } from './RomanticRibbon';

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  imageSrc: string;
  isVideo?: boolean;
  videoSrc?: string;
  dedication: string;
  poem: string;
  rotation: string; // slight organic tilt like real polaroids: -2deg, 1.5deg, etc.
}

const defaultMemories: MemoryItem[] = [
  {
    id: '1',
    title: 'Aquella primera mirada',
    date: 'El inicio de todo',
    imageSrc: '/src/assets/images/hero_romantic_roses_1792363186394.jpg',
    dedication: 'Tus ojos guardaban una constelación entera. Supe en ese instante que ninguna despedida podría borrarte.',
    poem: '«Te amé antes de conocerte y te amaré mucho después de que las horas callen.»',
    rotation: '-rotate-2',
  },
  {
    id: '2',
    title: 'Noches bajo el mismo cielo',
    date: 'Bajo las estrellas',
    imageSrc: '/src/assets/images/memory_starlit_night_1792363187538.jpg',
    dedication: 'Cuando miramos al cielo, sé que la misma luna vela por nosotros. Tu calma siempre fue mi hogar.',
    poem: '«En cada destello lejano, hay un pensamiento mío que vuela a abrazarte.»',
    rotation: 'rotate-1',
  },
  {
    id: '3',
    title: 'Cartas escritas con el alma',
    date: 'Palabras sinceras',
    imageSrc: '/src/assets/images/memory_vintage_letter_1792363188651.jpg',
    dedication: 'El papel guarda lo que la voz a veces calla por pudor: un amor incondicional, puro y sin condiciones.',
    poem: '«No hay distancia capaz de acallar lo que dos almas sellaron con verdad.»',
    rotation: '-rotate-1',
  },
  {
    id: '4',
    title: 'El reflejo de tu ternura',
    date: 'Tu sonrisa',
    imageSrc: '/src/assets/images/memory_coquette_mirror_1792363188439.jpg',
    dedication: 'La belleza de tu corazón supera cualquier flor en primavera. Gracias por cada instante de dulzura.',
    poem: '«Eres esa luz serena que embellece hasta los días más grises.»',
    rotation: 'rotate-2',
  },
  {
    id: '5',
    title: 'La melodía de los dos',
    date: 'Nuestra canción',
    imageSrc: '/src/assets/images/memory_music_melody_1792363188747.jpg',
    dedication: 'Cada nota me devuelve a tus brazos. La música es el puente invisible donde nos seguimos encontrando.',
    poem: '«Si tuviera que elegir un solo acorde para recordar toda mi vida, elegiría tu risa.»',
    rotation: '-rotate-2',
  },
];

export const PolaroidGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('romantic_custom_memories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...defaultMemories, ...parsed];
      } catch {
        return defaultMemories;
      }
    }
    return defaultMemories;
  });

  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Adding custom memories
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDedication, setNewDedication] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [isNewVideo, setIsNewVideo] = useState(false);

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVid = file.type.startsWith('video/');
      setIsNewVideo(isVid);
      const url = URL.createObjectURL(file);
      setNewMediaUrl(url);
    }
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newMediaUrl) return;

    const newMem: MemoryItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      date: newDate.trim() || 'Momento especial',
      imageSrc: isNewVideo ? '' : newMediaUrl,
      isVideo: isNewVideo,
      videoSrc: isNewVideo ? newMediaUrl : undefined,
      dedication: newDedication.trim() || 'Un recuerdo guardado para siempre en el corazón.',
      poem: '«Tú eres el instante que nunca termina en mi memoria.»',
      rotation: Math.random() > 0.5 ? 'rotate-1' : '-rotate-1',
    };

    const updated = [newMem, ...memories];
    setMemories(updated);

    // Save custom ones to localStorage
    const customList = updated.filter((m) => !defaultMemories.some((d) => d.id === m.id));
    localStorage.setItem('romantic_custom_memories', JSON.stringify(customList));

    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewDedication('');
    setNewMediaUrl('');
    setIsNewVideo(false);
  };

  return (
    <section id="galeria-recuerdos" className="relative py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex justify-center mb-2">
          <RibbonBow size="md" color="#F472B6" />
        </div>
        <p className="text-xs uppercase tracking-widest font-serif text-rose-500 mb-2">
          Galería de Recuerdos & Instantes
        </p>
        <h2 className="font-display text-3xl sm:text-5xl text-stone-900 font-normal">
          Momentos Grabados en el <span className="font-script text-rose-600 italic">Alma</span>
        </h2>
        <p className="font-editorial text-lg text-stone-600 mt-2 max-w-xl mx-auto">
          Pasa el cursor sobre cada polaroid o tócala para descubrir el mensaje y dedicatoria oculta en el reverso.
        </p>

        {/* Add custom memory button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-50 hover:bg-pink-100/90 text-rose-800 text-sm font-serif border border-pink-200 transition-all shadow-sm hover:shadow"
          >
            <Plus className="w-4 h-4 text-rose-500" />
            <span>Añadir un recuerdo propio (Foto o Video)</span>
          </button>
        </div>
      </div>

      {/* Polaroid Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">
        {memories.map((mem) => {
          const isFlipped = !!flippedCards[mem.id];

          return (
            <div
              key={mem.id}
              className={`relative group cursor-pointer transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02] ${mem.rotation}`}
            >
              {/* Coquette Ribbon Bow Pin on Top */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                <RibbonBow size="sm" color="#FB7185" />
              </div>

              {/* Polaroid Frame */}
              <div
                onClick={() => toggleFlip(mem.id)}
                className="w-full bg-white p-4 sm:p-5 pb-7 sm:pb-8 rounded-xl shadow-lg shadow-pink-100/70 border border-pink-100 gold-shimmer-border relative overflow-hidden transition-all duration-300"
              >
                {/* Visual Front Side */}
                {!isFlipped ? (
                  <div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-rose-50 mb-4 border border-stone-100 group">
                      {mem.isVideo ? (
                        <div className="relative w-full h-full flex items-center justify-center bg-black">
                          <video
                            src={mem.videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm p-1 rounded-full text-white">
                            <Film className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={mem.imageSrc}
                          alt={mem.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}

                      {/* View Full Lightbox Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMemory(mem);
                        }}
                        title="Ver en tamaño completo"
                        className="absolute bottom-2 right-2 bg-white/80 hover:bg-white text-stone-700 p-1.5 rounded-full shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                      >
                        <ZoomIn className="w-4 h-4 text-rose-600" />
                      </button>
                    </div>

                    {/* Handwritten Polaroid Caption */}
                    <div className="text-center pt-1">
                      <p className="font-script text-2xl sm:text-3xl text-stone-900 font-bold leading-tight">
                        {mem.title}
                      </p>
                      <p className="font-serif text-xs text-rose-500/80 mt-1">
                        {mem.date}
                      </p>
                      <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-400 font-sans">
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-300" />
                        <span>Toca para ver el mensaje oculto</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Back Side - Romantic Hidden Dedication */
                  <div className="min-h-[280px] flex flex-col justify-between py-2 px-1 text-center bg-rose-50/40 rounded-lg p-4 border border-dashed border-pink-200">
                    <div className="space-y-3">
                      <div className="flex justify-center text-amber-500">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <p className="font-script text-2xl text-rose-700 font-bold">
                        {mem.title}
                      </p>
                      <p className="font-editorial text-base sm:text-lg text-stone-700 leading-relaxed italic">
                        {mem.dedication}
                      </p>
                      <p className="font-display text-xs text-amber-800/80 tracking-wide pt-2 border-t border-pink-200/50">
                        {mem.poem}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 flex items-center justify-center gap-1.5 text-[11px] text-rose-600 font-sans">
                      <span>Toca para volver a la foto</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeMemory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setActiveMemory(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#FFFDFB] rounded-2xl overflow-hidden shadow-2xl border border-pink-200 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMemory(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-rose-600 transition-colors shadow"
              title="Cerrar vista"
              aria-label="Cerrar modal de recuerdo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4">
              {activeMemory.isVideo ? (
                <video
                  src={activeMemory.videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={activeMemory.imageSrc}
                  alt={activeMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl text-stone-900">
                {activeMemory.title}
              </h3>
              <p className="font-serif text-xs text-rose-500 uppercase tracking-widest">
                {activeMemory.date}
              </p>
              <p className="font-editorial text-lg text-stone-700 italic max-w-lg mx-auto">
                {activeMemory.dedication}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Memory Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#FFFDFB] rounded-2xl shadow-2xl border border-pink-200 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors"
              title="Cerrar"
              aria-label="Cerrar formulario de nuevo recuerdo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <RibbonBow size="sm" color="#F472B6" />
              <h3 className="font-display text-xl text-stone-900 font-normal mt-1">
                Añadir un Recuerdo Inolvidable
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Sube una foto o video especial de ambos para enriquecer la galería
              </p>
            </div>

            <form onSubmit={handleSaveMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-stone-700 uppercase tracking-wider mb-1">
                  Título del recuerdo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Esa tarde mágica..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-stone-700 uppercase tracking-wider mb-1">
                  Fecha o nota temporal
                </label>
                <input
                  type="text"
                  placeholder="Ej: Verano 2024 / Nuestro día favorito"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-stone-700 uppercase tracking-wider mb-1">
                  Dedicatoria o mensaje en el reverso
                </label>
                <textarea
                  rows={3}
                  placeholder="Escribe lo que sientes al mirar este momento..."
                  value={newDedication}
                  onChange={(e) => setNewDedication(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-stone-700 uppercase tracking-wider mb-1">
                  Seleccionar Foto o Video
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  required
                  onChange={handleFileUpload}
                  className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-100 file:text-rose-700 hover:file:bg-pink-200 cursor-pointer"
                />
              </div>

              {newMediaUrl && (
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-stone-100 border border-pink-100">
                  {isNewVideo ? (
                    <video src={newMediaUrl} className="w-full h-full object-cover" autoPlay loop muted />
                  ) : (
                    <img src={newMediaUrl} alt="Preview" className="w-full h-full object-cover" />
                  )}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-serif font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg shadow-md shadow-pink-300 transition-colors"
                >
                  Guardar en el álbum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
