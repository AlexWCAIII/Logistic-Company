import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { SIMULATION_STEPS } from './constants';

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleSelectStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <div className="flex h-screen font-sans bg-slate-900 text-slate-200">
      <Sidebar
        steps={SIMULATION_STEPS}
        currentStepIndex={currentStepIndex}
        onSelectStep={handleSelectStep}
      />
      <MainContent
        step={SIMULATION_STEPS[currentStepIndex]}
      />
    </div>
  );
};

export default App;
