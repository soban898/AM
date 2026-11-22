import React from 'react';
import { sound } from '../utils/audio';
import { TulipSingle } from './TulipArt';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface LittleThingsProps {
  onNext: () => void;
}

export const LittleThings: React.FC<LittleThingsProps> = ({ onNext }) => {
  const cards = [
    {
      id: 1,
      text: 'May your smile never lose its magic.',
      color: 'pink' as const,
      icon: '✨',
      desc: 'Brightening the world effortlessly',
    },
    {
      id: 2,
      text: 'May your heart always find peace.',
      color: 'white' as const,
      icon: '🕊️',
      desc: 'In quiet moments and busy days',
    },
    {
      id: 3,
      text: 'May your dreams grow bigger every year.',
      color: 'blush' as const,
      icon: '🌱',
      desc: 'Reaching higher than yesterday',
    },
    {
      id: 4,
      text: 'May happiness find you in unexpected places.',
      color: 'dusty' as const,
      icon: '🌸',
      desc: 'Little surprises along the road',
    },
    {
      id: 5,
      text: 'May every new chapter bring something beautiful.',
      color: 'pink' as const,
      icon: '📖',
      desc: 'Unfolding with grace and joy',
    },
    {
      id: 6,
      text: 'May you always have reasons to celebrate life.',
      color: 'blush' as const,
      icon: '🎀',
      desc: 'Gratitude for every sunrise',
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between pt-14 pb-20 sm:pt-18 sm:pb-16 px-3 sm:px-6 md:p-12 bg-gradient-to-b from-[#FFF5F8] via-[#FAF0F3] to-[#FFF8FB] overflow-hidden">
      {/* Header */}
      <div className="relative z-20 max-w-2xl w-full text-center mt-2 px-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/70 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-dancing tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Gentle Affirmations</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#642436] font-semibold tracking-wide">
          Little Things That Make a Day Beautiful 🌸
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[#804656] font-sans font-light">
          Six delicate wishes floating into your year ahead.
        </p>
      </div>

      {/* Floating Cards Grid */}
      <div className="relative z-20 w-full max-w-5xl my-4 sm:my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
        {cards.map((c, i) => (
          <div
            key={c.id}
            onClick={() => sound.playSparkle()}
            className="group relative p-4.5 sm:p-6 rounded-2xl sm:rounded-3xl dream-glass dream-glow border border-pink-200/80 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {/* Top decorative row */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-pink-100/60 shadow-xs">{c.icon}</span>
              <div className="w-8 h-12 sm:w-10 sm:h-14 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <TulipSingle color={c.color} size={32} sway={false} />
              </div>
            </div>

            {/* Main Wish Text */}
            <div className="my-1.5 sm:my-2">
              <p className="text-base sm:text-lg md:text-xl font-serif text-[#562232] font-medium leading-snug">
                "{c.text}"
              </p>
              <p className="text-xs text-[#874E5F] font-sans mt-1.5 sm:mt-2 italic font-light">{c.desc}</p>
            </div>

            {/* Bottom Accent */}
            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-pink-100/60 flex items-center justify-between text-xs text-pink-400">
              <span className="font-cormorant italic text-xs sm:text-sm text-pink-500">Wish {c.id} of 6</span>
              <Heart className="w-3.5 h-3.5 group-hover:fill-pink-400 group-hover:text-pink-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="relative z-20 pb-2 sm:pb-4 w-full sm:w-auto px-4 flex justify-center">
        <button
          onClick={() => {
            sound.playSparkle();
            onNext();
          }}
          className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-sm sm:text-base shadow-md hover:shadow-pink-300/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2.5"
        >
          <span>A Beautiful Goodbye</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};
