import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Sparkles, Music, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

interface NavigationDockProps {
  currentPage: number;
  unlockedPages: number[];
  onSelectPage: (page: number) => void;
  pageNames: string[];
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  currentPage,
  unlockedPages,
  onSelectPage,
  pageNames,
}) => {
  const [isPlaying, setIsPlaying] = useState(sound.getIsPlaying());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMusic = () => {
    const active = sound.toggleMusic();
    setIsPlaying(active);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      sound.playSparkle();
      onSelectPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < 8 && unlockedPages.includes(currentPage + 1)) {
      sound.playSparkle();
      onSelectPage(currentPage + 1);
    }
  };

  // If on page 1 (password gate) and locked, keep UI minimal
  if (currentPage === 1 && !unlockedPages.includes(2)) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          title={isPlaying ? 'Mute Music' : 'Play Music'}
          className="p-3 rounded-full dream-glass shadow-md text-pink-600 hover:text-pink-700 transition-all hover:scale-105 cursor-pointer flex items-center justify-center border border-pink-200"
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5 opacity-70" />}
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Floating Top Bar */}
      <header className="fixed top-3 inset-x-0 z-40 px-3 md:px-8 flex items-center justify-between pointer-events-none">
        {/* Left: Little World Logo / Title */}
        <div className="pointer-events-auto flex items-center space-x-2 px-3.5 py-1.5 rounded-full dream-glass shadow-xs border border-pink-200/80">
          <span className="text-base">🌷</span>
          <span className="text-xs md:text-sm font-serif font-medium text-[#6B283C] tracking-wide">
            Muniza's World
          </span>
          <span className="hidden sm:inline text-xs text-pink-400 font-sans">
            • {currentPage} / 8
          </span>
        </div>

        {/* Center: Quick navigation pill (hidden on small mobile, available via drawer) */}
        <div className="hidden lg:flex pointer-events-auto items-center space-x-1.5 px-3 py-1.5 rounded-full dream-glass-cream shadow-xs border border-pink-200/80">
          {pageNames.map((name, idx) => {
            const pageNum = idx + 1;
            const isUnlocked = unlockedPages.includes(pageNum);
            const isCurrent = currentPage === pageNum;

            return (
              <button
                key={pageNum}
                disabled={!isUnlocked}
                onClick={() => {
                  sound.playSparkle();
                  onSelectPage(pageNum);
                }}
                className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-pink-500 text-white font-medium shadow-xs'
                    : isUnlocked
                    ? 'text-pink-800 hover:bg-pink-100/70'
                    : 'text-gray-300 cursor-not-allowed opacity-40'
                }`}
              >
                {pageNum}. {name}
              </button>
            );
          })}
        </div>

        {/* Right: Sound & Drawer toggles */}
        <div className="pointer-events-auto flex items-center space-x-1.5 sm:space-x-2">
          {/* Audio toggle button with cute animated music waves */}
          <button
            onClick={toggleMusic}
            title={isPlaying ? 'Mute Music' : 'Play Music'}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full dream-glass shadow-xs text-pink-700 hover:text-pink-800 border border-pink-200/80 flex items-center space-x-1.5 sm:space-x-2 transition-all hover:scale-105 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 animate-bounce" />
                <span className="hidden sm:inline text-xs font-sans font-medium text-pink-600">
                  Melody
                </span>
                <span className="flex space-x-0.5 items-end h-2.5 sm:h-3">
                  <span className="w-0.5 sm:w-1 bg-pink-400 rounded-full animate-pulse h-2 sm:h-3" />
                  <span className="w-0.5 sm:w-1 bg-pink-400 rounded-full animate-pulse h-1.5 sm:h-2" />
                  <span className="w-0.5 sm:w-1 bg-pink-400 rounded-full animate-pulse h-2.5 sm:h-3.5" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400" />
                <span className="hidden sm:inline text-xs font-sans text-pink-500">Play Music</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Navigation Menu"
            className="lg:hidden p-2 rounded-full dream-glass shadow-xs text-pink-700 hover:text-pink-800 border border-pink-200/80 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div 
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex justify-end animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-72 max-w-[85vw] h-full bg-[#FFFDF9] shadow-2xl p-5 sm:p-6 flex flex-col justify-between border-l border-pink-200"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-pink-100">
                <div className="flex items-center space-x-2">
                  <span>🌷</span>
                  <span className="font-serif font-semibold text-[#662235]">Muniza's World</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full text-pink-500 hover:bg-pink-100 min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-col space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)]">
                {pageNames.map((name, idx) => {
                  const pageNum = idx + 1;
                  const isUnlocked = unlockedPages.includes(pageNum);
                  const isCurrent = currentPage === pageNum;

                  return (
                    <button
                      key={pageNum}
                      disabled={!isUnlocked}
                      onClick={() => {
                        sound.playSparkle();
                        onSelectPage(pageNum);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-pink-500 text-white font-medium shadow-xs'
                          : isUnlocked
                          ? 'text-[#5B2333] hover:bg-pink-50'
                          : 'text-gray-300 cursor-not-allowed opacity-40'
                      }`}
                    >
                      <span className="truncate pr-2">
                        {pageNum}. {name}
                      </span>
                      {isCurrent && <Sparkles className="w-4 h-4 text-pink-100 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-pink-100 text-center">
              <p className="text-xs text-pink-400 font-dancing text-base">
                Happy Birthday, Muniza! 🎀
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation Arrows (Page flip shortcuts) */}
      <nav className="fixed bottom-2.5 sm:bottom-3 inset-x-0 z-40 px-2 sm:px-4 flex items-center justify-between pointer-events-none max-w-4xl mx-auto">
        {currentPage > 1 ? (
          <button
            onClick={handlePrev}
            className="pointer-events-auto px-3 sm:px-4 py-2 min-w-[38px] min-h-[38px] sm:min-w-[44px] rounded-full dream-glass shadow-md text-pink-700 hover:text-pink-900 border border-pink-200/80 flex items-center justify-center space-x-1 sm:space-x-1.5 text-xs sm:text-sm font-medium transition-all hover:-translate-x-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Back</span>
          </button>
        ) : (
          <div className="w-[38px] sm:w-[44px]" />
        )}

        {/* Page Dots Indicator */}
        <div className="pointer-events-auto flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full dream-glass shadow-xs border border-pink-200/70">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <button
              key={num}
              onClick={() => {
                if (unlockedPages.includes(num)) {
                  sound.playSparkle();
                  onSelectPage(num);
                }
              }}
              disabled={!unlockedPages.includes(num)}
              aria-label={`Go to page ${num}`}
              className={`rounded-full transition-all ${
                currentPage === num
                  ? 'w-4 sm:w-6 h-1.5 sm:h-2 bg-pink-500'
                  : unlockedPages.includes(num)
                  ? 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-300 hover:bg-pink-400 cursor-pointer'
                  : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-200 cursor-not-allowed opacity-50'
              }`}
            />
          ))}
        </div>

        {currentPage < 8 && unlockedPages.includes(currentPage + 1) ? (
          <button
            onClick={handleNext}
            className="pointer-events-auto px-3 sm:px-4 py-2 min-w-[38px] min-h-[38px] sm:min-w-[44px] rounded-full dream-glass shadow-md text-pink-700 hover:text-pink-900 border border-pink-200/80 flex items-center justify-center space-x-1 sm:space-x-1.5 text-xs sm:text-sm font-medium transition-all hover:translate-x-1 cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        ) : (
          <div className="w-[38px] sm:w-[44px]" />
        )}
      </nav>
    </>
  );
};
