import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { TulipCorner } from './TulipArt';
import { Sparkles, KeyRound } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isBoxOpening, setIsBoxOpening] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim() === '2006') {
      // Correct password!
      setErrorMsg('');
      setIsBoxOpening(true);
      sound.playUnlock();
      sound.startMusic(); // Begin soothing background music

      // Confetti burst with soft pinks, roses, and gold
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F9C2CD', '#F472B6', '#FCE1E7', '#F6DF9C', '#FFF'],
      });

      // Smooth transition after box opens
      setTimeout(() => {
        onUnlock();
      }, 1600);
    } else {
      // Incorrect password
      setIsShaking(true);
      setErrorMsg('Oops! This little surprise is still waiting for the right key. ♡');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#FFF5F7] via-[#FCE7EB] to-[#FFF0F3] overflow-hidden">
      {/* Corner Tulips */}
      <TulipCorner position="top-left" />
      <TulipCorner position="top-right" />
      <TulipCorner position="bottom-left" hideOnMobile={true} />
      <TulipCorner position="bottom-right" hideOnMobile={true} />

      {/* Center Gift Card Container */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl dream-glass dream-glow shadow-2xl flex flex-col items-center text-center transition-all duration-500 border border-pink-200/90 my-auto ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Animated Gift Box */}
        <div className="relative mb-4 sm:mb-6 cursor-pointer group" onClick={() => sound.playSparkle()}>
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 relative transition-transform duration-700 ${
              isBoxOpening ? 'scale-110' : 'group-hover:scale-105 animate-float-gentle'
            }`}
          >
            <svg
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full filter drop-shadow-lg"
            >
              <defs>
                <linearGradient id="box-body" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FDE2E8" />
                  <stop offset="50%" stopColor="#F492A7" />
                  <stop offset="100%" stopColor="#E05D82" />
                </linearGradient>
                <linearGradient id="box-lid" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF0F3" />
                  <stop offset="50%" stopColor="#F9A8D4" />
                  <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
                <linearGradient id="gold-ribbon" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#FFF2B2" />
                  <stop offset="100%" stopColor="#B38914" />
                </linearGradient>
              </defs>

              {/* Lower Box Body */}
              <rect x="25" y="55" width="90" height="70" rx="8" fill="url(#box-body)" />
              {/* Golden vertical ribbon */}
              <rect x="62" y="55" width="16" height="70" fill="url(#gold-ribbon)" />

              {/* Box Lid (animates off when unlocked) */}
              <g
                className={`transition-all duration-700 ${
                  isBoxOpening ? '-translate-y-12 -rotate-12 opacity-80' : ''
                }`}
                style={{ transformOrigin: '70px 48px' }}
              >
                <rect x="20" y="42" width="100" height="18" rx="5" fill="url(#box-lid)" />
                <rect x="62" y="42" width="16" height="18" fill="url(#gold-ribbon)" />

                {/* Bow on top */}
                {/* Left loop */}
                <path
                  d="M 70,42 C 45,22 35,38 70,42 Z"
                  fill="url(#gold-ribbon)"
                  stroke="#AA820A"
                  strokeWidth="0.8"
                />
                {/* Right loop */}
                <path
                  d="M 70,42 C 95,22 105,38 70,42 Z"
                  fill="url(#gold-ribbon)"
                  stroke="#AA820A"
                  strokeWidth="0.8"
                />
                {/* Center Knot */}
                <circle cx="70" cy="42" r="5" fill="#FFF2B2" stroke="#AA820A" strokeWidth="1" />
              </g>

              {/* Magic rays shining out if opened */}
              {isBoxOpening && (
                <g className="animate-spin" style={{ transformOrigin: '70px 50px' }}>
                  <circle cx="70" cy="50" r="30" fill="url(#gold-ribbon)" opacity="0.35" />
                </g>
              )}
            </svg>
          </div>

          {/* Sparkle badge */}
          <div className="absolute -bottom-2 -right-2 bg-white/80 p-1.5 rounded-full shadow-sm text-pink-500">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-2xl md:text-3xl font-serif text-[#6D283E] font-medium tracking-wide leading-snug">
          A Little Surprise Awaits You...
        </h1>
        <p className="mt-2 text-sm md:text-base text-[#8B4C5F] font-sans font-light leading-relaxed max-w-xs">
          Some little worlds are made for special people.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-7 w-full flex flex-col items-center">
          <div className="relative w-full max-w-xs">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Enter the secret code..."
              className="w-full px-5 py-3.5 pl-11 rounded-2xl bg-white/80 border border-pink-200/90 text-center font-sans tracking-widest text-[#5E2B38] placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all text-base shadow-sm"
              maxLength={12}
            />
            <KeyRound className="w-4 h-4 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="mt-3 text-xs md:text-sm text-rose-600 font-sans font-medium px-4 py-1.5 bg-rose-50/90 rounded-full border border-rose-200 animate-fadeIn">
              {errorMsg}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-5 w-full max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-base shadow-md hover:shadow-pink-300/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Unlock Your Surprise ♡</span>
          </button>
        </form>

        {/* Subtle decorative bottom hint */}
        <div className="mt-6 flex items-center space-x-2 text-xs text-pink-400/80">
          <span>🌷</span>
          <span className="font-cormorant italic text-sm">Created with love & sincerity</span>
          <span>🌷</span>
        </div>
      </div>
    </div>
  );
};
