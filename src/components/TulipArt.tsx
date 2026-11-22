import React from 'react';

interface TulipProps {
  color?: 'pink' | 'blush' | 'white' | 'dusty';
  className?: string;
  size?: number;
  sway?: boolean;
}

export const TulipSingle: React.FC<TulipProps> = ({
  color = 'pink',
  className = '',
  size = 120,
  sway = true,
}) => {
  const colorGradients = {
    pink: {
      outer: ['#F9A8D4', '#F472B6', '#DB2777'],
      inner: ['#FCE7F3', '#FBCFE8', '#F472B6'],
      accent: '#FDF2F8',
    },
    blush: {
      outer: ['#FED7AA', '#F492A7', '#E05D82'],
      inner: ['#FFF0F3', '#FCE1E7', '#F492A7'],
      accent: '#FFFFFF',
    },
    white: {
      outer: ['#FFFFFF', '#FDF2F4', '#F9C2CD'],
      inner: ['#FFFFFF', '#FFF5F7', '#FCE1E7'],
      accent: '#FFFFFF',
    },
    dusty: {
      outer: ['#E2B4BD', '#D48398', '#9E4765'],
      inner: ['#F2D7DC', '#E8BDC7', '#BA6D83'],
      accent: '#FFF0F3',
    },
  }[color];

  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`relative inline-block ${sway ? 'animate-sway' : ''} ${className}`}>
      <svg
        width={size}
        height={size * 1.5}
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-sm filter"
      >
        <defs>
          <linearGradient id={`stem-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7E9F76" />
            <stop offset="50%" stopColor="#A3C699" />
            <stop offset="100%" stopColor="#67865F" />
          </linearGradient>

          <linearGradient id={`leaf-${uniqueId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B5D7AB" />
            <stop offset="50%" stopColor="#8EAF84" />
            <stop offset="100%" stopColor="#5E7D56" />
          </linearGradient>

          <linearGradient id={`petal-back-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorGradients.inner[0]} />
            <stop offset="60%" stopColor={colorGradients.inner[1]} />
            <stop offset="100%" stopColor={colorGradients.inner[2]} />
          </linearGradient>

          <linearGradient id={`petal-main-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorGradients.outer[0]} />
            <stop offset="50%" stopColor={colorGradients.outer[1]} />
            <stop offset="100%" stopColor={colorGradients.outer[2]} />
          </linearGradient>
        </defs>

        {/* Stem */}
        <path
          d="M 50,70 Q 48,110 52,148"
          stroke={`url(#stem-${uniqueId})`}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Leaves */}
        <path
          d="M 50,115 C 32,105 20,80 24,55 C 32,80 44,105 50,118"
          fill={`url(#leaf-${uniqueId})`}
          opacity="0.9"
        />
        <path
          d="M 51,128 C 65,115 80,95 78,72 C 72,92 60,118 51,130"
          fill={`url(#leaf-${uniqueId})`}
          opacity="0.85"
        />

        {/* Flower Head */}
        {/* Back Petals */}
        <path
          d="M 38,45 C 38,20 48,8 50,6 C 52,8 62,20 62,45 C 62,65 52,72 50,72 C 48,72 38,65 38,45 Z"
          fill={`url(#petal-back-${uniqueId})`}
        />

        {/* Left Side Petal */}
        <path
          d="M 32,48 C 26,30 35,16 42,12 C 40,28 42,55 50,68 C 42,68 34,62 32,48 Z"
          fill={`url(#petal-main-${uniqueId})`}
          opacity="0.95"
        />

        {/* Right Side Petal */}
        <path
          d="M 68,48 C 74,30 65,16 58,12 C 60,28 58,55 50,68 C 58,68 66,62 68,48 Z"
          fill={`url(#petal-main-${uniqueId})`}
          opacity="0.95"
        />

        {/* Center Main Tulip Petal */}
        <path
          d="M 37,35 C 37,16 47,12 50,11 C 53,12 63,16 63,35 C 63,58 56,70 50,70 C 44,70 37,58 37,35 Z"
          fill={`url(#petal-main-${uniqueId})`}
        />

        {/* Petal Highlight Shimmer */}
        <path
          d="M 47,16 C 49,26 49,45 47,58"
          stroke={colorGradients.accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.65"
        />
        <ellipse cx="50" cy="24" rx="2.5" ry="5" fill="#FFFFFF" opacity="0.35" />
      </svg>
    </div>
  );
};

export const TulipCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  hideOnMobile?: boolean;
}> = ({ position, hideOnMobile = false }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-left':
        return 'origin-top-left';
      case 'top-right':
        return 'scale-x-[-1] origin-top-right';
      case 'bottom-left':
        return 'scale-y-[-1] origin-bottom-left';
      case 'bottom-right':
        return 'scale-x-[-1] scale-y-[-1] origin-bottom-right';
    }
  };

  const getPositionClass = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
    }
  };

  return (
    <div
      className={`absolute ${getPositionClass()} pointer-events-none z-10 p-1 sm:p-3 md:p-6 opacity-60 sm:opacity-75 md:opacity-90 select-none scale-60 sm:scale-80 md:scale-100 ${getTransform()} ${
        hideOnMobile ? 'hidden sm:block' : ''
      }`}
    >
      <div className="relative w-28 h-28 md:w-44 md:h-44">
        <div className="absolute top-0 left-0 transform rotate-12 origin-bottom-left">
          <TulipSingle color="pink" size={75} sway={false} />
        </div>
        <div className="absolute top-2 left-6 transform -rotate-12 origin-bottom-left">
          <TulipSingle color="blush" size={85} sway={false} />
        </div>
        <div className="absolute top-6 left-12 transform rotate-25 origin-bottom-left">
          <TulipSingle color="white" size={65} sway={false} />
        </div>
      </div>
    </div>
  );
};

export const ButterflySvg: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#F472B6',
}) => {
  return (
    <svg
      className={`animate-butterfly ${className}`}
      width="32"
      height="32"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 50,45 C 38,20 10,25 15,50 C 20,65 35,60 50,55"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M 50,55 C 30,62 20,80 32,85 C 42,88 48,72 50,60"
        fill={color}
        opacity="0.65"
      />
      <path
        d="M 50,45 C 62,20 90,25 85,50 C 80,65 65,60 50,55"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M 50,55 C 70,62 80,80 68,85 C 58,88 52,72 50,60"
        fill={color}
        opacity="0.65"
      />
      {/* Body */}
      <ellipse cx="50" cy="53" rx="2.5" ry="12" fill="#5E404E" />
      <path d="M 49,42 Q 44,32 38,30" stroke="#5E404E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 51,42 Q 56,32 62,30" stroke="#5E404E" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
