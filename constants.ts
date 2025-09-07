
import { type SimulationStep } from './types';

export const SIMULATION_STEPS: SimulationStep[] = [
  {
    title: '1. Define the Problem & Strategy',
    description: 'Clearly articulate the problem you are trying to solve and the specific strategy you want to test. What is the core question your simulation should answer?',
  },
  {
    title: '2. Identify Key Variables',
    description: 'Brainstorm all the factors and variables that could influence the outcome of your strategy. Think about resources, market conditions, customer behavior, etc.',
  },
  {
    title: '3. Map Causal Relationships (Causal Loop Diagram)',
    description: 'Visualize how the key variables influence each other. Identify feedback loops (reinforcing and balancing) that drive the system\'s behavior over time.',
  },
  {
    title: '4. Create Stocks and Flows Diagram',
    description: 'Convert your conceptual map into a more formal structure. Identify "stocks" (accumulations, like "Customers" or "Cash") and "flows" (rates of change, like "Customer Acquisition Rate" or "Revenue").',
  },
  {
    title: '5. Formulate Equations & Quantify',
    description: 'Define the mathematical relationships between the stocks, flows, and variables. Use data, research, and expert estimates to assign initial values and formulas.',
  },
  {
    title: '6. Build & Run the Simulation',
    description: 'Use simulation software or code to build the model based on your diagrams and equations. Run the simulation to see how the system behaves over time.',
  },
  {
    title: '7. Analyze Results & Test Scenarios',
    description: 'Analyze the output of the simulation. Does it behave as expected? Test different scenarios by changing assumptions and variable values (sensitivity analysis) to see how it impacts the outcome of your strategy.',
  },
];
