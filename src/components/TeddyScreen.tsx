import React from 'react';
import { sound } from '../utils/audio';
import { TeddyBearScene } from './TeddyBearScene';
import { TulipCorner } from './TulipArt';
import { ArrowRight, Sparkles } from 'lucide-react';

interface TeddyScreenProps {
  onNext: () => void;
}

export const TeddyScreen: React.FC<TeddyScreenProps> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between pt-14 pb-20 sm:pt-18 sm:pb-16 px-3 sm:px-6 md:p-10 bg-gradient-to-b from-[#FFF5F8] via-[#FCECEF] to-[#FAF3E8] overflow-hidden">
      {/* Corner Tulips */}
      <TulipCorner position="top-left" />
      <TulipCorner position="top-right" />

      {/* Header */}
      <div className="relative z-20 max-w-2xl w-full text-center mt-2 px-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/70 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-dancing tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>A Fairytale Tea Party</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#642436] font-semibold tracking-wide">
          The Birthday Cake Surprise 🧸🎂
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[#804656] font-sans font-light max-w-md mx-auto">
          Bella & Barnaby have gathered around the strawberry cake to celebrate Muniza!
        </p>
      </div>

      {/* Interactive Fairytale Teddy Bear Scene */}
      <div className="relative z-20 w-full my-auto flex justify-center py-2 sm:py-4">
        <TeddyBearScene />
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
          <span>Little Things That Make a Day Beautiful</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};
