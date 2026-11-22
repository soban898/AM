import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { TulipSingle } from './TulipArt';
import { Sparkles, ArrowRight, MailOpen } from 'lucide-react';

interface LetterScreenProps {
  onNext: () => void;
}

export const LetterScreen: React.FC<LetterScreenProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    sound.playSparkle();
    setIsOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between pt-14 pb-20 sm:pt-18 sm:pb-16 px-3 sm:px-6 md:p-12 bg-gradient-to-b from-[#FFFDF8] via-[#FAF4EA] to-[#FCECEC] overflow-hidden">
      {/* Header */}
      <div className="relative z-20 max-w-2xl w-full text-center mt-2 px-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/70 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-dancing tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Handwritten with Sincerity</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#632738] font-semibold tracking-wide">
          A Little Letter, Just for You
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[#844959] font-sans font-light">
          Words penned softly to celebrate the wonderful person you are.
        </p>
      </div>

      {/* Sealed Envelope / Opened Letter Container */}
      <div className="relative z-20 w-full max-w-2xl my-4 sm:my-6 flex flex-col items-center">
        {!isOpen ? (
          // Sealed Envelope
          <div className="flex flex-col items-center animate-float-gentle w-full max-w-xs sm:max-w-md px-2">
            <div
              onClick={handleOpenLetter}
              className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[390px] aspect-[380/240] rounded-2xl bg-gradient-to-b from-[#FFF3F5] to-[#F7D8DF] shadow-xl border border-pink-200/80 flex items-center justify-center cursor-pointer group transition-transform hover:scale-105"
            >
              {/* Envelope flap lines */}
              <svg
                viewBox="0 0 380 240"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Lower pocket triangles */}
                <path d="M 0,240 L 190,140 L 380,240 Z" fill="#F4CBD4" opacity="0.6" />
                <path d="M 0,0 L 190,135 L 0,240 Z" fill="#FCE1E7" opacity="0.45" />
                <path d="M 380,0 L 190,135 L 380,240 Z" fill="#F9D4DC" opacity="0.45" />
                {/* Top Flap */}
                <path
                  d="M 0,0 L 190,130 L 380,0 Z"
                  fill="#FFF8FA"
                  stroke="#E8BDC7"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Pink Wax Seal in Center */}
              <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-[#E66282] via-[#CC3F63] to-[#992241] shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform border-2 border-[#F9C2CD]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-pink-300/40 flex items-center justify-center">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-amber-100 italic drop-shadow-sm">
                    M
                  </span>
                </div>
              </div>

              {/* Envelope Label */}
              <div className="absolute bottom-3 sm:bottom-4 font-cormorant italic text-xs sm:text-sm text-[#7D3F51]">
                To: Muniza 🌷
              </div>
            </div>

            <button
              onClick={handleOpenLetter}
              className="mt-5 sm:mt-6 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-medium text-sm sm:text-base shadow-md hover:shadow-pink-300/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center space-x-2.5"
            >
              <MailOpen className="w-4 h-4 text-pink-100 shrink-0" />
              <span>Open Your Letter ♡</span>
            </button>
          </div>
        ) : (
          // Unfolded Elegant Letter on Parchment
          <div className="relative w-full p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#FFFDF8] shadow-2xl border border-amber-200/70 transition-all duration-700 animate-fadeIn">
            {/* Corner Floral Accents */}
            <div className="hidden xs:block absolute top-3 left-4 transform -rotate-12 pointer-events-none opacity-60 sm:opacity-80">
              <TulipSingle color="blush" size={32} sway={false} />
            </div>
            <div className="hidden xs:block absolute top-3 right-4 transform rotate-12 scale-x-[-1] pointer-events-none opacity-60 sm:opacity-80">
              <TulipSingle color="blush" size={32} sway={false} />
            </div>
            <div className="hidden xs:block absolute bottom-3 left-4 transform rotate-12 pointer-events-none opacity-60 sm:opacity-80">
              <TulipSingle color="pink" size={28} sway={false} />
            </div>
            <div className="hidden xs:block absolute bottom-3 right-4 transform -rotate-12 scale-x-[-1] pointer-events-none opacity-60 sm:opacity-80">
              <TulipSingle color="pink" size={28} sway={false} />
            </div>

            {/* Letter Content */}
            <div className="relative z-10 max-w-xl mx-auto text-[#4A323B]">
              <div className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-[#662335] mb-4 sm:mb-6">
                Dear Muniza,
              </div>

              <div className="space-y-3 sm:space-y-4 font-sans text-sm sm:text-base md:text-lg leading-relaxed text-[#543843] font-light">
                <p>
                  On your special day, I just wanted to create a little something different for you.
                  Something filled with beautiful wishes, thoughtful words, and sincere prayers.
                </p>

                <p>
                  Life has its own way of bringing different experiences, different lessons, and
                  unexpected moments. Through everything, I hope you never lose the beautiful parts
                  of yourself.
                </p>

                <p className="font-normal text-[#63293B]">
                  May you always find happiness in the little things, strength during difficult
                  days, and countless reasons to smile.
                </p>

                <p>
                  I hope the coming year brings you closer to your dreams, surrounds you with
                  genuine people, and gives you memories worth keeping forever.
                </p>

                <p>Never stop believing in the beautiful possibilities that life holds for you.</p>

                <p className="italic font-cormorant text-lg sm:text-xl text-[#7E2941]">
                  Keep smiling, keep growing, and always take care of yourself.
                </p>
              </div>

              {/* Sign-off */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-pink-200/70 flex flex-col items-end">
                <div className="text-xs sm:text-sm font-sans text-[#7A4050]">With lots of sincere wishes,</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-script text-[#B8385C] mt-1">
                  A Little Birthday Wish ♡
                </div>
              </div>
            </div>
          </div>
        )}
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
          <span>Meet the Teddy Bears & Cake Surprise</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};
