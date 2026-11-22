import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { TulipSingle, ButterflySvg } from './TulipArt';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface BirthdayGardenProps {
  onNext: () => void;
}

interface GardenFlower {
  id: number;
  name: string;
  color: 'pink' | 'blush' | 'white' | 'dusty';
  size: number;
  wish: string;
}

export const BirthdayGarden: React.FC<BirthdayGardenProps> = ({ onNext }) => {
  const [activeWish, setActiveWish] = useState<string | null>(
    'Click on any blooming tulip in the garden to discover a little wish for you! 🌷'
  );
  const [bloomedIds, setBloomedIds] = useState<number[]>([]);

  const flowers: GardenFlower[] = [
    {
      id: 1,
      name: 'Morning Blush',
      color: 'pink',
      size: 90,
      wish: 'May your heart always remain as soft and luminous as these morning petals. 🌷',
    },
    {
      id: 2,
      name: 'Golden Grace',
      color: 'blush',
      size: 105,
      wish: 'May every step you take this year lead to happiness that comes naturally. ✨',
    },
    {
      id: 3,
      name: 'Pure Serenity',
      color: 'white',
      size: 85,
      wish: 'Wishing you genuine people who cherish your kindness and sincerity. 🤍',
    },
    {
      id: 4,
      name: 'Rose Whisper',
      color: 'dusty',
      size: 95,
      wish: 'May peace surround you effortlessly whenever life gets a little loud. 🌿',
    },
    {
      id: 5,
      name: 'Fairytale Bloom',
      color: 'pink',
      size: 110,
      wish: 'May every silent prayer in your heart find its most beautiful answer. 🕊️',
    },
    {
      id: 6,
      name: 'Peach Petal',
      color: 'blush',
      size: 90,
      wish: 'You bring gentle warmth wherever you go—never doubt your magic! 🌸',
    },
    {
      id: 7,
      name: 'Dewdrop White',
      color: 'white',
      size: 80,
      wish: 'May laughter echo in your days and memories worth treasuring follow you. 🎀',
    },
    {
      id: 8,
      name: 'Crimson Charm',
      color: 'dusty',
      size: 100,
      wish: 'May your future unfold far more beautifully than your sweetest expectations. 🦋',
    },
  ];

  const handleFlowerClick = (flower: GardenFlower) => {
    sound.playBloom();
    setActiveWish(flower.wish);
    if (!bloomedIds.includes(flower.id)) {
      setBloomedIds([...bloomedIds, flower.id]);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between pt-14 pb-20 sm:pt-18 sm:pb-16 px-3 sm:px-6 md:p-10 bg-gradient-to-b from-[#FFF5F7] via-[#FCE7EE] to-[#FAF1E6] overflow-hidden">
      {/* Playful Floating Butterflies */}
      <div className="absolute top-12 left-4 sm:left-8 md:left-24 pointer-events-none opacity-60 sm:opacity-100 scale-75 sm:scale-100">
        <ButterflySvg color="#F472B6" />
      </div>
      <div className="absolute top-20 right-4 sm:right-10 md:right-32 pointer-events-none opacity-60 sm:opacity-100 scale-75 sm:scale-100">
        <ButterflySvg color="#C06C84" />
      </div>
      <div className="absolute top-1/2 left-2 sm:left-4 md:left-12 pointer-events-none hidden sm:block">
        <ButterflySvg color="#E6A0B0" />
      </div>

      {/* Header Section */}
      <div className="relative z-20 max-w-3xl w-full text-center mt-2 px-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/70 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-dancing tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>A Blooming Wonderland</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#662235] font-semibold tracking-wide">
          A Garden of Beautiful Wishes
        </h2>

        <p className="mt-2 text-xs sm:text-base md:text-lg text-[#7A3F50] font-sans leading-relaxed max-w-2xl mx-auto px-2 font-light">
          "Some days deserve a little more beauty, a little more happiness, and a little more celebration. Today is one of those days. May your world always have reasons to bloom, just like these flowers."
        </p>
      </div>

      {/* Revealed Wish Floating Card */}
      <div className="relative z-20 my-3 sm:my-6 max-w-xl w-full px-2 sm:px-4">
        <div className="p-4 sm:p-6 rounded-2xl dream-glass-cream dream-glow border border-pink-200/90 text-center shadow-lg transition-all duration-300">
          <div className="flex items-center justify-center space-x-2 text-pink-500 mb-1">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-pink-400" />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold font-sans">
              Garden Whisper
            </span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-pink-400" />
          </div>
          <p className="text-sm sm:text-lg text-[#5E2536] font-cormorant italic font-medium leading-relaxed">
            {activeWish}
          </p>
          <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-pink-400 font-sans">
            Discovered: {bloomedIds.length} / {flowers.length} flowers
          </div>
        </div>
      </div>

      {/* Interactive Garden Flower Bed */}
      <div className="relative z-20 w-full max-w-4xl grid grid-cols-4 sm:flex sm:flex-wrap items-end justify-center gap-1 sm:gap-6 md:gap-8 pb-2 sm:pb-4">
        {flowers.map((f) => {
          const isBloomed = bloomedIds.includes(f.id);
          return (
            <button
              key={f.id}
              onClick={() => handleFlowerClick(f)}
              className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-2 focus:outline-none"
            >
              <div
                className={`scale-75 xs:scale-85 sm:scale-100 origin-bottom transition-all duration-500 ${
                  isBloomed ? 'scale-90 xs:scale-100 sm:scale-110 drop-shadow-md' : 'group-hover:scale-105 opacity-90'
                }`}
              >
                <TulipSingle color={f.color} size={f.size} />
              </div>
              <span
                className={`mt-0.5 sm:mt-1 text-[10px] sm:text-xs px-2 py-0.5 rounded-full transition-colors whitespace-nowrap ${
                  isBloomed
                    ? 'bg-pink-100 text-pink-800 font-medium'
                    : 'bg-white/60 text-pink-600/70 group-hover:bg-white'
                }`}
              >
                {isBloomed ? '✨ Bloomed' : 'Tap Me'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gentle Garden Floor / Grass Hill */}
      <div className="w-full max-w-5xl h-4 sm:h-6 bg-gradient-to-r from-emerald-100/60 via-green-100/70 to-emerald-100/60 rounded-t-[50%] blur-xs -mb-2" />

      {/* Navigation to Next Section */}
      <div className="relative z-20 mt-3 sm:mt-4 mb-2 w-full sm:w-auto px-4 flex justify-center">
        <button
          onClick={() => {
            sound.playSparkle();
            onNext();
          }}
          className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-sm sm:text-base shadow-md hover:shadow-pink-300/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2.5"
        >
          <span>A Little Collection of Duas</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};
