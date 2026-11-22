import { useState } from 'react';
import { PetalBackground } from './components/PetalBackground';
import { PasswordGate } from './components/PasswordGate';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BirthdayGarden } from './components/BirthdayGarden';
import { DuaCollection } from './components/DuaCollection';
import { LetterScreen } from './components/LetterScreen';
import { TeddyScreen } from './components/TeddyScreen';
import { LittleThings } from './components/LittleThings';
import { GoodbyeScreen } from './components/GoodbyeScreen';
import { NavigationDock } from './components/NavigationDock';

const PAGE_NAMES = [
  'Secret Gate',
  'Welcome',
  'Birthday Garden',
  'Prayers & Duas',
  'Special Letter',
  'Teddy & Cake',
  'Beautiful Wishes',
  'Final Farewell',
];

export function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [unlockedPages, setUnlockedPages] = useState<number[]>([1]);

  // Handle password unlock
  const handleUnlock = () => {
    setUnlockedPages((prev) => {
      const nextSet = new Set([...prev, 2]);
      return Array.from(nextSet);
    });
    setCurrentPage(2);
  };

  // Move to next page in sequence
  const goToNextPage = (next: number) => {
    setUnlockedPages((prev) => {
      const nextSet = new Set([...prev, next]);
      return Array.from(nextSet);
    });
    setCurrentPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Replay from beginning
  const handleReplay = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FFFDF9] selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      {/* Floating Canvas Petals & Sparkles Layer */}
      <PetalBackground />

      {/* Floating Navigation Dock & Audio Player */}
      <NavigationDock
        currentPage={currentPage}
        unlockedPages={unlockedPages}
        onSelectPage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        pageNames={PAGE_NAMES}
      />

      {/* Main Pages Flow */}
      <main className="relative z-20 w-full min-h-screen">
        {currentPage === 1 && <PasswordGate onUnlock={handleUnlock} />}
        {currentPage === 2 && <WelcomeScreen onNext={() => goToNextPage(3)} />}
        {currentPage === 3 && <BirthdayGarden onNext={() => goToNextPage(4)} />}
        {currentPage === 4 && <DuaCollection onNext={() => goToNextPage(5)} />}
        {currentPage === 5 && <LetterScreen onNext={() => goToNextPage(6)} />}
        {currentPage === 6 && <TeddyScreen onNext={() => goToNextPage(7)} />}
        {currentPage === 7 && <LittleThings onNext={() => goToNextPage(8)} />}
        {currentPage === 8 && <GoodbyeScreen onReplay={handleReplay} />}
      </main>
    </div>
  );
}

export default App;
