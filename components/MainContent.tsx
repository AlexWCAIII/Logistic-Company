import React from 'react';
import { type SimulationStep } from '../types';
import Simulator from './Simulator';

interface MainContentProps {
  step: SimulationStep;
}

const MainContent: React.FC<MainContentProps> = ({ step }) => {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <h2 className="text-3xl font-bold text-blue-400 mb-2">{step.title}</h2>
          <p className="text-slate-400">{step.description}</p>
        </header>
        
        <Simulator />

      </div>
    </main>
  );
};

export default MainContent;
