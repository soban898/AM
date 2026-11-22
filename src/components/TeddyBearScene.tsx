import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface TeddyBearProps {
  type: 'pink-bow' | 'cream-bow';
  isBlowing?: boolean;
  isFeeding?: boolean;
  isReceiving?: boolean;
  isCelebrating?: boolean;
  isWaving?: boolean;
  className?: string;
}

export const TeddyBearFigure: React.FC<TeddyBearProps> = ({
  type,
  isBlowing = false,
  isFeeding = false,
  isReceiving = false,
  isCelebrating = false,
  isWaving = false,
  className,
}) => {
  const isPinkBow = type === 'pink-bow';
  const bowColor = isPinkBow ? '#F472B6' : '#E6C56E';
  const bowAccent = isPinkBow ? '#FBCFE8' : '#FAF5EB';

  return (
    <div
      className={`relative transition-all duration-700 select-none ${
        isBlowing
          ? isPinkBow
            ? 'translate-x-3 sm:translate-x-6 rotate-6 scale-105'
            : '-translate-x-2 sm:-translate-x-3'
          : ''
      } ${isCelebrating ? 'animate-bounce' : ''}`}
    >
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`filter drop-shadow-md overflow-visible ${className || 'w-24 h-28 sm:w-36 sm:h-44 md:w-48 md:h-56'}`}
      >
        <defs>
          {/* Fur Gradient */}
          <radialGradient id={`fur-${type}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#F5DFBE" />
            <stop offset="65%" stopColor="#E5BE90" />
            <stop offset="100%" stopColor="#C99B66" />
          </radialGradient>

          {/* Muzzle Gradient */}
          <radialGradient id={`muzzle-${type}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFF7EC" />
            <stop offset="100%" stopColor="#F2DFC2" />
          </radialGradient>

          {/* Ear Inner Pink */}
          <radialGradient id={`ear-pink-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FCD6DF" />
            <stop offset="100%" stopColor="#F492A7" />
          </radialGradient>

          {/* Soft Cheek Blush */}
          <radialGradient id={`cheek-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- BODY --- */}
        {/* Soft rounded tummy */}
        <ellipse cx="100" cy="170" rx="58" ry="52" fill={`url(#fur-${type})`} />
        {/* Cream tummy patch */}
        <ellipse cx="100" cy="172" rx="38" ry="36" fill={`url(#muzzle-${type})`} opacity="0.85" />
        {/* Tummy stitch */}
        <path d="M 100,148 L 100,192" stroke="#B88A58" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Feet / Paws */}
        <ellipse cx="60" cy="216" rx="24" ry="18" fill={`url(#fur-${type})`} />
        <ellipse cx="60" cy="217" rx="14" ry="10" fill={`url(#ear-pink-${type})`} opacity="0.65" />
        <ellipse cx="140" cy="216" rx="24" ry="18" fill={`url(#fur-${type})`} />
        <ellipse cx="140" cy="217" rx="14" ry="10" fill={`url(#ear-pink-${type})`} opacity="0.65" />

        {/* --- EARS --- */}
        {/* Left Ear */}
        <circle cx="56" cy="48" r="24" fill={`url(#fur-${type})`} />
        <circle cx="56" cy="48" r="14" fill={`url(#ear-pink-${type})`} />
        {/* Right Ear */}
        <circle cx="144" cy="48" r="24" fill={`url(#fur-${type})`} />
        <circle cx="144" cy="48" r="14" fill={`url(#ear-pink-${type})`} />

        {/* --- HEAD --- */}
        <ellipse cx="100" cy="92" rx="58" ry="50" fill={`url(#fur-${type})`} />

        {/* Cheeks */}
        <circle cx="68" cy="104" r="14" fill={`url(#cheek-${type})`} />
        <circle cx="132" cy="104" r="14" fill={`url(#cheek-${type})`} />

        {/* Muzzle */}
        <ellipse cx="100" cy="108" rx="26" ry="20" fill={`url(#muzzle-${type})`} />

        {/* Button Nose */}
        <path
          d="M 94,99 C 94,95 106,95 106,99 C 106,104 102,106 100,106 C 98,106 94,104 94,99 Z"
          fill="#3B231D"
        />
        <ellipse cx="98" cy="98" rx="2" ry="1" fill="#FFFFFF" opacity="0.6" />

        {/* Smile or Sweet expression */}
        {isReceiving ? (
          // Joyful open happy mouth eating cake
          <path
            d="M 92,109 Q 100,122 108,109 Z"
            fill="#C0392B"
            stroke="#3B231D"
            strokeWidth="1.5"
          />
        ) : isBlowing ? (
          // Cute round "O" mouth blowing
          <ellipse cx="100" cy="114" rx="4.5" ry="5.5" fill="#3B231D" />
        ) : (
          // Gentle sweet bear smile
          <path
            d="M 94,106 Q 97,113 100,107 Q 103,113 106,106"
            stroke="#3B231D"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* EYES */}
        {isReceiving ? (
          // Happy closed eye crescents ^ ^
          <>
            <path
              d="M 72,88 Q 78,81 84,88"
              stroke="#3B231D"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 116,88 Q 122,81 128,88"
              stroke="#3B231D"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : (
          // Sparkly espresso eyes
          <>
            <ellipse cx="78" cy="85" rx="6" ry="7.5" fill="#2E1B15" />
            <circle cx="76" cy="82" r="2.5" fill="#FFFFFF" />
            <circle cx="80" cy="87" r="1.2" fill="#FFFFFF" />

            <ellipse cx="122" cy="85" rx="6" ry="7.5" fill="#2E1B15" />
            <circle cx="120" cy="82" r="2.5" fill="#FFFFFF" />
            <circle cx="124" cy="87" r="1.2" fill="#FFFFFF" />
          </>
        )}

        {/* --- BOW TIE / RIBBON --- */}
        <g transform="translate(100, 136)">
          {/* Left loop */}
          <path
            d="M 0,0 C -18,-15 -25,0 -22,10 C -18,18 0,4 0,0 Z"
            fill={bowColor}
          />
          {/* Right loop */}
          <path
            d="M 0,0 C 18,-15 25,0 22,10 C 18,18 0,4 0,0 Z"
            fill={bowColor}
          />
          {/* Ribbon tails */}
          <path
            d="M -3,3 Q -10,22 -14,24 L -7,22 L 0,6"
            fill={bowAccent}
          />
          <path
            d="M 3,3 Q 10,22 14,24 L 7,22 L 0,6"
            fill={bowAccent}
          />
          {/* Knot */}
          <circle cx="0" cy="0" r="5" fill={bowColor} stroke={bowAccent} strokeWidth="1" />
        </g>

        {/* --- ARMS / PAWS --- */}
        {/* Left Arm */}
        {isWaving && isPinkBow ? (
          // Waving up high
          <g className="animate-sway origin-bottom-left">
            <ellipse
              cx="38"
              cy="128"
              rx="15"
              ry="28"
              transform="rotate(35 38 128)"
              fill={`url(#fur-${type})`}
            />
            <circle cx="28" cy="110" r="10" fill={`url(#ear-pink-${type})`} opacity="0.6" />
          </g>
        ) : isFeeding && isPinkBow ? (
          // Extended arm holding fork towards the other bear!
          <g className="transition-all duration-700 transform translate-x-12 -translate-y-4">
            <ellipse
              cx="60"
              cy="150"
              rx="24"
              ry="14"
              transform="rotate(25 60 150)"
              fill={`url(#fur-${type})`}
            />
            {/* Golden fork */}
            <path
              d="M 80,154 L 105,146"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Fork prongs */}
            <path d="M 103,143 L 109,141" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M 105,146 L 111,144" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M 106,149 L 112,147" stroke="#D4AF37" strokeWidth="1.5" />
            {/* Delicious strawberry cake bite on fork! */}
            <rect x="110" y="136" width="12" height="10" rx="2" fill="#F472B6" />
            <path d="M 110,136 L 122,136" stroke="#FFF" strokeWidth="2" />
            <circle cx="116" cy="133" r="3.5" fill="#EF4444" />
          </g>
        ) : (
          <ellipse
            cx="48"
            cy="165"
            rx="16"
            ry="26"
            transform="rotate(18 48 165)"
            fill={`url(#fur-${type})`}
          />
        )}

        {/* Right Arm */}
        {isWaving && !isPinkBow ? (
          // Waving up high
          <g className="animate-sway origin-bottom-right">
            <ellipse
              cx="162"
              cy="128"
              rx="15"
              ry="28"
              transform="rotate(-35 162 128)"
              fill={`url(#fur-${type})`}
            />
            <circle cx="172" cy="110" r="10" fill={`url(#ear-pink-${type})`} opacity="0.6" />
          </g>
        ) : isReceiving ? (
          // Excited little paws near mouth
          <g className="animate-pulse">
            <ellipse
              cx="138"
              cy="146"
              rx="15"
              ry="22"
              transform="rotate(-25 138 146)"
              fill={`url(#fur-${type})`}
            />
          </g>
        ) : (
          <ellipse
            cx="152"
            cy="165"
            rx="16"
            ry="26"
            transform="rotate(-18 152 165)"
            fill={`url(#fur-${type})`}
          />
        )}
      </svg>
    </div>
  );
};

export const BirthdayCake: React.FC<{
  candlesLit: boolean;
  smokeRising: boolean;
  className?: string;
}> = ({ candlesLit, smokeRising, className }) => {
  return (
    <div className="relative select-none z-10 flex flex-col items-center">
      <svg
        viewBox="0 0 220 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`filter drop-shadow-xl overflow-visible ${className || 'w-28 h-30 sm:w-40 sm:h-44 md:w-52 md:h-56'}`}
      >
        <defs>
          <linearGradient id="cake-pink" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FDE2E8" />
            <stop offset="50%" stopColor="#FFF0F3" />
            <stop offset="100%" stopColor="#F9C2CD" />
          </linearGradient>

          <linearGradient id="cake-ivory" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFF9EB" />
            <stop offset="50%" stopColor="#FFFEF9" />
            <stop offset="100%" stopColor="#F7ECD4" />
          </linearGradient>

          <linearGradient id="frosting-rose" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#F9A8D4" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>

          <linearGradient id="gold-plate" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF3B0" />
            <stop offset="100%" stopColor="#AA820A" />
          </linearGradient>
        </defs>

        {/* Golden Cake Stand */}
        <ellipse cx="110" cy="226" rx="98" ry="12" fill="url(#gold-plate)" />
        <path d="M 85,226 L 80,238 L 140,238 L 135,226 Z" fill="url(#gold-plate)" />
        <ellipse cx="110" cy="238" rx="35" ry="4" fill="#AA820A" />

        {/* TIER 1 - BOTTOM (Width: 170, Height: 52) */}
        <rect x="25" y="166" width="170" height="52" rx="10" fill="url(#cake-pink)" />
        <ellipse cx="110" cy="166" rx="85" ry="12" fill="#FCE1E7" />
        {/* Scalloped pink dripping frosting */}
        <path
          d="M 25,172 Q 35,188 45,174 Q 55,190 65,174 Q 75,192 85,174 Q 95,192 105,174 Q 115,190 125,174 Q 135,192 145,174 Q 155,190 165,174 Q 175,188 185,174 Q 192,184 195,172 L 195,166 L 25,166 Z"
          fill="url(#frosting-rose)"
        />
        {/* Sugar pearls on base */}
        {[38, 62, 86, 110, 134, 158, 182].map((x, i) => (
          <circle key={i} cx={x} cy="210" r="3" fill="#FFFFFF" opacity="0.9" />
        ))}

        {/* TIER 2 - MIDDLE (Width: 130, Height: 44) */}
        <rect x="45" y="118" width="130" height="44" rx="8" fill="url(#cake-ivory)" />
        <ellipse cx="110" cy="118" rx="65" ry="10" fill="#FFFBF2" />
        {/* Middle frosting ribbons */}
        <path
          d="M 45,124 Q 56,138 67,126 Q 78,140 89,126 Q 100,140 111,126 Q 122,140 133,126 Q 144,140 155,126 Q 166,138 175,124 L 175,118 L 45,118 Z"
          fill="#FBCFE8"
        />
        {/* Little strawberries on middle tier */}
        {[58, 88, 110, 132, 162].map((x, i) => (
          <g key={i} transform={`translate(${x - 6}, 138)`}>
            <path d="M 6,0 C 0,0 -2,8 6,12 C 14,8 12,0 6,0 Z" fill="#EF4444" />
            <polygon points="6,-1 4,-4 6,-3 8,-4" fill="#22C55E" />
            <circle cx="4" cy="4" r="0.8" fill="#FDE047" />
            <circle cx="8" cy="4" r="0.8" fill="#FDE047" />
            <circle cx="6" cy="8" r="0.8" fill="#FDE047" />
          </g>
        ))}

        {/* TIER 3 - TOP (Width: 90, Height: 38) */}
        <rect x="65" y="76" width="90" height="38" rx="7" fill="url(#cake-pink)" />
        <ellipse cx="110" cy="76" rx="45" ry="8" fill="#FDE2E8" />
        {/* Top frosting rosettes */}
        <path
          d="M 65,82 Q 74,94 83,83 Q 92,95 101,83 Q 110,95 119,83 Q 128,95 137,83 Q 146,94 155,82 L 155,76 L 65,76 Z"
          fill="url(#frosting-rose)"
        />

        {/* 3 CANDLES ON TOP */}
        {[
          { x: 86, color: '#F472B6', delay: '0s' },
          { x: 110, color: '#FBBF24', delay: '0.2s' },
          { x: 134, color: '#F472B6', delay: '0.4s' },
        ].map((candle, idx) => (
          <g key={idx}>
            {/* Candle stick */}
            <rect
              x={candle.x - 3}
              y="50"
              width="6"
              height="26"
              rx="2"
              fill={candle.color}
            />
            {/* Candle spiral stripes */}
            <line
              x1={candle.x - 3}
              y1="56"
              x2={candle.x + 3}
              y2="59"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <line
              x1={candle.x - 3}
              y1="64"
              x2={candle.x + 3}
              y2="67"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            {/* Wick */}
            <line
              x1={candle.x}
              y1="50"
              x2={candle.x}
              y2="44"
              stroke="#4A383F"
              strokeWidth="1.5"
            />

            {/* Glowing Flame */}
            {candlesLit ? (
              <g
                className="animate-candle"
                style={{
                  transformOrigin: `${candle.x}px 40px`,
                  animationDelay: candle.delay,
                }}
              >
                {/* Flame Halo */}
                <ellipse
                  cx={candle.x}
                  cy="38"
                  rx="9"
                  ry="12"
                  fill="#FDE68A"
                  opacity="0.3"
                />
                {/* Outer flame */}
                <path
                  d={`M ${candle.x},26 C ${candle.x + 6},34 ${candle.x + 5},42 ${candle.x},44 C ${candle.x - 5},42 ${candle.x - 6},34 ${candle.x},26 Z`}
                  fill="#F59E0B"
                />
                {/* Inner white-hot flame */}
                <path
                  d={`M ${candle.x},30 C ${candle.x + 3},36 ${candle.x + 2},42 ${candle.x},43 C ${candle.x - 2},42 ${candle.x - 3},36 ${candle.x},30 Z`}
                  fill="#FFFBEB"
                />
              </g>
            ) : smokeRising ? (
              // Delicate rising smoke wisps
              <g className="animate-pulse">
                <path
                  d={`M ${candle.x},44 Q ${candle.x - 4},34 ${candle.x + 2},24 Q ${candle.x + 8},14 ${candle.x},6`}
                  stroke="rgba(240, 210, 220, 0.7)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

export const TeddyBearScene: React.FC<{ onComplete?: () => void }> = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [smokeRising, setSmokeRising] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [isFeeding, setIsFeeding] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [storyStep, setStoryStep] = useState(0);

  // Handle candle blow interaction
  const handleBlowCandles = () => {
    if (!candlesLit) return;

    // Step 1: Bear leans forward to blow
    setIsBlowing(true);
    sound.playBlowCandle();

    setTimeout(() => {
      // Step 2: Candles extinguish, smoke rises
      setCandlesLit(false);
      setSmokeRising(true);

      // Step 3: Sparkles & celebratory confetti explosion!
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#FBCFE8', '#FDE68A', '#FFF', '#E6C56E'],
      });

      setTimeout(() => {
        setIsBlowing(false);
        setIsCelebrating(true);
        setSmokeRising(false);
        setStoryStep(1);

        // Step 4: Left bear feeds cake to right bear!
        setTimeout(() => {
          setIsFeeding(true);
          sound.playSparkle();

          setTimeout(() => {
            setIsReceiving(true);
            setStoryStep(2);

            // Step 5: Both bears wave happily to Muniza!
            setTimeout(() => {
              setIsFeeding(false);
              setIsReceiving(false);
              setIsWaving(true);
              setStoryStep(3);
            }, 3200);
          }, 1800);
        }, 2200);
      }, 1200);
    }, 900);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setIsBlowing(false);
    setIsFeeding(false);
    setIsReceiving(false);
    setIsCelebrating(false);
    setIsWaving(false);
    setStoryStep(0);
    sound.playSparkle();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-2 sm:p-4 md:p-8">
      {/* Fairytale Room Garland & Fairy Lights */}
      <div className="w-full flex items-center justify-between px-2 sm:px-6 mb-2 pointer-events-none opacity-80">
        <div className="flex space-x-1.5 sm:space-x-3 text-lg sm:text-2xl">
          <span className="animate-bounce">🎈</span>
          <span className="animate-pulse">✨</span>
          <span>🎀</span>
        </div>
        <div className="text-xs sm:text-sm font-dancing text-pink-400 tracking-wider">
          ✦ Happy Birthday Muniza ✦
        </div>
        <div className="flex space-x-1.5 sm:space-x-3 text-lg sm:text-2xl">
          <span>🎀</span>
          <span className="animate-pulse">✨</span>
          <span className="animate-bounce">🎈</span>
        </div>
      </div>

      {/* Main Fairytale Stage */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 dream-glass-cream dream-glow border border-pink-200/80 overflow-hidden flex flex-col items-center">
        {/* Soft background room elements */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-pink-100/40 via-cream-100/20 to-transparent pointer-events-none" />

        {/* Floating affection hearts when feeding / receiving */}
        {(isReceiving || isCelebrating) && (
          <div className="absolute top-12 sm:top-24 flex space-x-4 sm:space-x-6 z-20 pointer-events-none">
            <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-pink-400 fill-pink-300 animate-float-gentle drop-shadow-md" />
            <Heart className="w-6 h-6 sm:w-9 sm:h-9 text-rose-400 fill-rose-300 animate-bounce drop-shadow-md" />
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 fill-pink-400 animate-float-gentle drop-shadow-md" />
          </div>
        )}

        {/* The Table and Characters Container */}
        <div className="relative flex items-end justify-center w-full max-w-2xl min-h-[170px] xs:min-h-[210px] sm:min-h-[280px] md:min-h-[340px] pt-2 sm:pt-4">
          {/* LEFT TEDDY BEAR (Pastel Pink Bow) */}
          <div className="z-10 -mr-4 xs:-mr-6 sm:-mr-8 md:-mr-10 transform translate-y-2 sm:translate-y-4">
            <TeddyBearFigure
              type="pink-bow"
              isBlowing={isBlowing}
              isFeeding={isFeeding}
              isCelebrating={isCelebrating}
              isWaving={isWaving}
            />
            <div className="text-center text-[10px] sm:text-xs font-serif text-pink-500/80 mt-0.5 sm:mt-1 italic">
              Bella ♡
            </div>
          </div>

          {/* THREE-TIER BIRTHDAY CAKE */}
          <div className="z-20 transform translate-y-1 sm:translate-y-2">
            <BirthdayCake candlesLit={candlesLit} smokeRising={smokeRising} />
          </div>

          {/* RIGHT TEDDY BEAR (Cream/Champagne Bow) */}
          <div className="z-10 -ml-4 xs:-ml-6 sm:-ml-8 md:-ml-10 transform translate-y-2 sm:translate-y-4">
            <TeddyBearFigure
              type="cream-bow"
              isBlowing={false}
              isReceiving={isReceiving}
              isCelebrating={isCelebrating}
              isWaving={isWaving}
            />
            <div className="text-center text-[10px] sm:text-xs font-serif text-amber-600/80 mt-0.5 sm:mt-1 italic">
              Barnaby ♡
            </div>
          </div>
        </div>

        {/* Table cloth base */}
        <div className="w-full max-w-[260px] xs:max-w-xs sm:max-w-md md:max-w-xl h-5 sm:h-8 bg-gradient-to-r from-pink-200 via-cream-200 to-pink-200 rounded-full shadow-inner border border-pink-300/40 -mt-1 sm:-mt-2 z-0" />

        {/* Dynamic Story Commentary Box */}
        <div className="mt-5 sm:mt-8 text-center min-h-[60px] sm:min-h-[70px] flex flex-col items-center justify-center px-2">
          {storyStep === 0 && (
            <>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-pink-900 font-semibold tracking-wide">
                Make a wish, Muniza! 🎂
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-pink-700/80 mt-1 font-sans">
                May life always give you sweet little moments to remember.
              </p>
            </>
          )}

          {storyStep === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-pink-800 font-semibold">
                Wish Granted! ✨
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-pink-600 mt-1">
                Both teddy bears are cheering for your happiest year yet!
              </p>
            </div>
          )}

          {storyStep === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-rose-800 font-semibold flex items-center justify-center gap-1.5 sm:gap-2">
                Sharing Sweetness 🍰 ♡
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-pink-700 mt-1">
                Bella feeds a delicious slice of strawberry cake to Barnaby!
              </p>
            </div>
          )}

          {storyStep === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-pink-900 font-semibold">
                Waving with Love to Muniza! 👋🧸
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-pink-600 mt-1 font-dancing text-lg sm:text-xl">
                "May your day be as sweet and joyful as can be!"
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4 items-center justify-center z-20 w-full">
          {candlesLit ? (
            <button
              onClick={handleBlowCandles}
              disabled={isBlowing}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white font-medium shadow-lg hover:shadow-pink-300/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-2.5 cursor-pointer text-sm sm:text-base"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 animate-spin" />
              <span>Blow Out the Candles ✨</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-pink-800 text-xs sm:text-sm font-medium border border-pink-200 shadow-sm transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Relight Candles 🕯️</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
