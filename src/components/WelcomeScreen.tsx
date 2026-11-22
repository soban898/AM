import React from 'react';
import { sound } from '../utils/audio';
import { TulipSingle, TulipCorner } from './TulipArt';
import { TeddyBearFigure } from './TeddyBearScene';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-16 pb-20 sm:pt-20 sm:pb-16 px-4 sm:px-6 bg-gradient-to-b from-[#FFFDF9] via-[#FCECEF] to-[#FFF0F4] overflow-hidden">
      {/* Delicate Corner Decorations */}
      <TulipCorner position="top-left" />
      <TulipCorner position="top-right" />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-2xl w-full flex flex-col items-center text-center my-auto">
        {/* Adorable Animated Waving Bear */}
        <div
          className="relative mb-2 cursor-pointer transform hover:scale-105 transition-transform"
          onClick={() => sound.playSparkle()}
        >
          <div className="w-28 h-32 sm:w-36 sm:h-40 md:w-44 md:h-48 flex items-center justify-center">
            <TeddyBearFigure type="pink-bow" isWaving={true} />
          </div>
          {/* Floating tiny heart */}
          <div className="absolute -top-1 -right-1 text-pink-400 animate-float-gentle">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-pink-300" />
          </div>
        </div>

        {/* Small decorative badge */}
        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/70 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-dancing tracking-wider mb-3 sm:mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>A Special Day for a Special Soul</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        </div>

        {/* Grand Typography */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#662235] font-semibold tracking-tight leading-tight md:leading-snug px-2">
          Happy Birthday, <br />
          <span className="font-script text-4xl sm:text-6xl md:text-7xl text-[#C93B62] font-normal inline-block mt-1">
            Muniza! ♡
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-[#824456] font-cormorant italic max-w-lg leading-relaxed px-4">
          "Today, a little corner of the world is decorated just for you."
        </p>

        {/* Floral Arrangement Garland */}
        <div className="my-4 sm:my-6 flex items-center justify-center space-x-1 sm:space-x-3 scale-80 sm:scale-100 origin-center">
          <TulipSingle color="blush" size={48} />
          <TulipSingle color="pink" size={62} />
          <TulipSingle color="white" size={52} />
          <TulipSingle color="pink" size={62} />
          <TulipSingle color="dusty" size={48} />
        </div>

        {/* Next Button */}
        <button
          onClick={() => {
            sound.playSparkle();
            onNext();
          }}
          className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-medium text-sm sm:text-base md:text-lg shadow-lg hover:shadow-pink-300/60 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2.5 sm:space-x-3"
        >
          <span>Let's Begin Your Little Surprise</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-pink-100 group-hover:translate-x-1.5 transition-transform shrink-0" />
        </button>

        {/* Gentle note */}
        <p className="mt-4 sm:mt-5 text-xs text-pink-400/80 font-sans tracking-wide">
          Tap anywhere or press the button to step into the garden 🌷
        </p>
      </div>
    </div>
  );
};
