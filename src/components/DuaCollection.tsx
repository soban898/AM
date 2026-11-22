import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Sparkles, ArrowRight, Heart, Star, ShieldCheck, Sun, Users, Compass } from 'lucide-react';

interface DuaCollectionProps {
  onNext: () => void;
}

interface DuaItem {
  id: number;
  title: string;
  arabicPhrase: string;
  icon: React.ReactNode;
  text: string;
}

export const DuaCollection: React.FC<DuaCollectionProps> = ({ onNext }) => {
  const [readDuas, setReadDuas] = useState<number[]>([1]);

  const duas: DuaItem[] = [
    {
      id: 1,
      title: 'Happiness',
      arabicPhrase: 'السعادة الدائمة',
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      text: 'May Allah fill your days with happiness that reaches your heart, smiles that come naturally, and moments that make life feel beautiful. May you always find reasons to be grateful and hopeful.',
    },
    {
      id: 2,
      title: 'Success',
      arabicPhrase: 'التوفيق والنجاح',
      icon: <Star className="w-5 h-5 text-amber-400" />,
      text: 'May Allah open doors of opportunities for you that you never imagined. May every sincere effort bring beautiful results, and may your journey be filled with success, wisdom, and endless blessings.',
    },
    {
      id: 3,
      title: 'Protection',
      arabicPhrase: 'الحفظ والعافية',
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      text: 'May Allah protect you from every difficulty, every hidden hardship, and everything that takes away your peace. May He keep you surrounded by goodness and guide you towards what is best for you.',
    },
    {
      id: 4,
      title: 'Peace',
      arabicPhrase: 'السكينة والطمأنينة',
      icon: <Heart className="w-5 h-5 text-pink-400" />,
      text: 'May Allah grant your heart a peace that remains even when life gets difficult. May your worries become lighter, your heart remain hopeful, and your days be filled with tranquillity.',
    },
    {
      id: 5,
      title: 'Family',
      arabicPhrase: 'بركة الأهل',
      icon: <Users className="w-5 h-5 text-emerald-500" />,
      text: 'May Allah bless your parents and your entire family with good health, happiness, long lives filled with goodness, and countless blessings. May your home always remain full of love, laughter, and peace.',
    },
    {
      id: 6,
      title: 'Dreams',
      arabicPhrase: 'تحقيق الأماني',
      icon: <Compass className="w-5 h-5 text-sky-400" />,
      text: 'May every beautiful dream you carry in your heart find its way towards reality. May Allah make your future more beautiful than your expectations and grant you what is truly best for you.',
    },
  ];

  const handleCardClick = (id: number) => {
    sound.playSparkle();
    if (!readDuas.includes(id)) {
      setReadDuas([...readDuas, id]);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between pt-14 pb-20 sm:pt-18 sm:pb-16 px-3 sm:px-6 md:p-12 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3EC] to-[#FCEBED] overflow-hidden">
      {/* Decorative Bismillah Calligraphy or Header Emblem */}
      <div className="relative z-20 max-w-3xl w-full text-center mt-2 px-2">
        <div className="text-lg sm:text-2xl font-serif text-[#C48496] tracking-widest opacity-80 mb-1.5 sm:mb-2">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3.5 py-1 rounded-full bg-white/70 border border-amber-200/60 text-amber-800 text-xs sm:text-sm font-dancing tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Prayers from the Deepest Corner of the Heart</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#5E2B3A] font-semibold tracking-wide">
          Some Beautiful Prayers for You
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[#804859] font-sans max-w-lg mx-auto font-light px-2">
          May the Almighty surround Muniza with grace, light, and boundless mercy today and always.
        </p>
      </div>

      {/* Grid of 6 Dua Cards */}
      <div className="relative z-20 w-full max-w-5xl my-4 sm:my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
        {duas.map((dua) => {
          const isSelected = readDuas.includes(dua.id);
          return (
            <div
              key={dua.id}
              onClick={() => handleCardClick(dua.id)}
              className={`group relative p-4.5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                isSelected
                  ? 'dream-glass-cream dream-glow border-pink-300/80 shadow-md transform -translate-y-0.5 sm:-translate-y-1'
                  : 'bg-white/60 hover:bg-white/90 border-pink-100 hover:border-pink-300 shadow-xs'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-pink-100/70 flex items-center justify-center">
                    {dua.icon}
                  </div>
                  <span className="text-xs font-serif text-[#AA6F80] tracking-wider">
                    {dua.arabicPhrase}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-serif text-[#5B2333] font-medium tracking-wide flex items-center gap-1.5">
                  <span>Dua {dua.id}</span>
                  <span className="text-pink-300 font-sans text-sm">—</span>
                  <span className="text-pink-600 font-serif italic text-base sm:text-lg">{dua.title}</span>
                </h3>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#4E3942] font-sans leading-relaxed font-normal">
                  "{dua.text}"
                </p>
              </div>

              {/* Bottom Subtle Heart */}
              <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-pink-100/60 flex items-center justify-between text-xs text-pink-400">
                <span className="font-cormorant italic text-xs sm:text-sm text-pink-600/80">
                  {isSelected ? 'Read with warmth ♡' : 'Tap to reflect'}
                </span>
                <Heart
                  className={`w-3.5 h-3.5 transition-colors ${
                    isSelected ? 'fill-pink-400 text-pink-400' : 'text-pink-300'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Highlighted Ameen Message */}
      <div className="relative z-20 w-full max-w-md text-center py-3 sm:py-4 px-4 sm:px-6 rounded-2xl bg-white/75 dream-glow border border-amber-200/80 my-2 sm:mb-6">
        <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#6D273B] font-medium tracking-wider">
          Ameen, Sum Ameen. 🤍
        </p>
        <p className="text-[11px] sm:text-xs text-[#8A5262] font-sans mt-0.5 sm:mt-1">
          May every word of these prayers find acceptance in the highest heavens.
        </p>
      </div>

      {/* Navigation Button */}
      <div className="relative z-20 pb-2 sm:pb-4 w-full sm:w-auto px-4 flex justify-center">
        <button
          onClick={() => {
            sound.playSparkle();
            onNext();
          }}
          className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-sm sm:text-base shadow-md hover:shadow-pink-300/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2.5"
        >
          <span>Open A Letter Just For You</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};
