
import React from 'react';
import { type SimulationStep } from '../types';

interface SidebarProps {
  steps: SimulationStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ steps, currentStepIndex, onSelectStep }) => {
  return (
    <aside className="w-1/4 max-w-sm p-6 bg-slate-800/50 border-r border-slate-700 overflow-y-auto">
      <h1 className="text-2xl font-bold text-blue-400 mb-2">Simulation Strategizer</h1>
      <p className="text-sm text-slate-400 mb-8">Follow the steps to build a simulation model for your strategy.</p>
      <nav>
        <ul>
          {steps.map((step, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => onSelectStep(index)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentStepIndex === index
                    ? 'bg-blue-600 text-white font-semibold shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {step.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
