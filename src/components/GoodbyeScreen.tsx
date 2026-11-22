import React from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { TulipSingle, TulipCorner } from './TulipArt';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';

interface GoodbyeScreenProps {
  onReplay: () => void;
}

export const GoodbyeScreen: React.FC<GoodbyeScreenProps> = ({ onReplay }) => {
  const triggerConfetti = () => {
    sound.playSparkle();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F9C2CD', '#F472B6', '#FCE1E7', '#F6DF9C', '#FFF'],
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between pt-14 pb-20 sm:pt-18 sm:pb-16 px-3 sm:px-6 md:p-12 bg-gradient-to-b from-[#FFF0F5] via-[#FDE8EF] to-[#FCE1E8] overflow-hidden">
      {/* Corner Tulips */}
      <TulipCorner position="top-left" />
      <TulipCorner position="top-right" />

      {/* Main Card */}
      <div className="relative z-20 max-w-3xl w-full my-auto p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl dream-glass-cream dream-glow border border-pink-200/90 shadow-2xl flex flex-col items-center text-center">
        {/* Floating Heart & Sparkle */}
        <div
          className="relative mb-2.5 sm:mb-3 cursor-pointer transform hover:scale-110 transition-transform"
          onClick={triggerConfetti}
        >
          <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white/80 animate-float-gentle" />
          </div>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 absolute -top-1 -right-1 animate-spin" />
        </div>

        {/* Small Ribbon Tag */}
        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1 rounded-full bg-white/70 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-dancing tracking-wider mb-3 sm:mb-4">
          <span>🎀 Wrapped in Prayers & Sincerity 🎀</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#642436] font-semibold tracking-wide leading-snug px-2">
          Once Again, Happy Birthday, <br />
          <span className="font-script text-3xl sm:text-5xl md:text-6xl text-[#BD3157] font-normal inline-block mt-1">
            Muniza! ♡
          </span>
        </h2>

        {/* Paragraph 1 */}
        <p className="mt-3.5 sm:mt-6 text-xs sm:text-base md:text-lg text-[#6B3746] font-sans leading-relaxed max-w-xl font-light px-2">
          "I hope this little surprise brought a smile to your face. It may just be a small
          collection of pages, flowers, words, and wishes, but every little detail was created to
          make your special day feel a little more beautiful."
        </p>

        {/* Highlighted Blessing */}
        <div className="my-4 sm:my-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-50 via-white to-pink-50 border border-pink-200/70 max-w-lg shadow-xs">
          <p className="text-sm sm:text-lg text-[#5E2232] font-cormorant italic font-medium leading-relaxed">
            "May this new chapter of your life be filled with endless happiness, beautiful
            memories, good health, and countless blessings."
          </p>
          <p className="mt-2 sm:mt-3 text-base sm:text-xl font-dancing text-[#AA2D50] font-semibold">
            Keep blooming, just like a tulip. 🌷
          </p>
        </div>

        {/* Signature */}
        <div className="mb-5 sm:mb-8 text-xs sm:text-base font-serif text-[#783F4F] italic">
          With sincere birthday wishes. 🤍
        </div>

        {/* Replay Button */}
        <button
          onClick={() => {
            sound.playSparkle();
            onReplay();
          }}
          className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-pink-300/60 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2.5"
        >
          <RotateCcw className="w-4 h-4 text-pink-100 group-hover:-rotate-90 transition-transform duration-500 shrink-0" />
          <span>Replay Your Little Surprise ↺</span>
        </button>
      </div>

      {/* Decorative Bottom Row of Tulips */}
      <div className="relative z-20 flex items-center justify-center space-x-2 sm:space-x-3 opacity-80 mb-2 scale-75 sm:scale-100 origin-bottom">
        <TulipSingle color="pink" size={40} />
        <TulipSingle color="blush" size={50} />
        <TulipSingle color="white" size={38} />
        <TulipSingle color="pink" size={50} />
        <TulipSingle color="dusty" size={40} />
      </div>
    </div>
  );
};
