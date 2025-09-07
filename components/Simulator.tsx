import React, { useState, useMemo } from 'react';

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const ValueBox = ({ title, value, isGoalMet }: { title: string; value: string | number; isGoalMet?: boolean | null }) => (
  <div className={`p-4 rounded-lg text-center ${isGoalMet === true ? 'bg-green-500/10 border-green-500/50' : isGoalMet === false ? 'bg-red-500/10 border-red-500/50' : 'bg-slate-700/50 border-slate-600'} border`}>
    <p className="text-sm text-slate-400">{title}</p>
    <p className={`text-2xl font-bold ${isGoalMet === true ? 'text-green-400' : isGoalMet === false ? 'text-red-400' : 'text-blue-300'}`}>{value}</p>
  </div>
);

const SliderInput = ({ label, value, min, max, step, onChange, unit = '' }: { label: string, value: number, min: number, max: number, step: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, unit?: string }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">{label}: <span className="font-bold text-blue-300">{value}{unit}</span></label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
    />
  </div>
);

const Simulator: React.FC = () => {
    // --- STATE FOR LEVERS ---
    const [jobsPerDay, setJobsPerDay] = useState(15);
    const [zoneAMix, setZoneAMix] = useState(50);
    const [zoneBMix, setZoneBMix] = useState(30);
    const [asapMix, setAsapMix] = useState(20);
    const [expressMix, setExpressMix] = useState(30);
    const [avgMilesPerJob, setAvgMilesPerJob] = useState(8);
    const [costPerMile, setCostPerMile] = useState(0.65);
    const [monthlyFixedCosts, setMonthlyFixedCosts] = useState(200);

    // --- CONSTANTS & TARGETS ---
    const REVENUE_TARGET = 150000;
    const PROFIT_MARGIN_TARGET = 30;
    const OPERATING_DAYS_PER_YEAR = 4 * 52;
    const OPERATING_HOURS_PER_DAY = 10;
    const PRICING = { zoneA: 25, zoneB: 35, zoneC: 45, asapAddon: 25, expressAddon: 15 };

    // --- DERIVED CALCULATIONS ---
    const calculatedMetrics = useMemo(() => {
        const zoneCMix = Math.max(0, 100 - zoneAMix - zoneBMix);
        const sameDayMix = Math.max(0, 100 - asapMix - expressMix);

        const avgBasePrice = (PRICING.zoneA * (zoneAMix / 100)) + (PRICING.zoneB * (zoneBMix / 100)) + (PRICING.zoneC * (zoneCMix / 100));
        const avgAddonPrice = (PRICING.asapAddon * (asapMix / 100)) + (PRICING.expressAddon * (expressMix / 100));
        const avgPricePerJob = avgBasePrice + avgAddonPrice;

        const annualRevenue = jobsPerDay * OPERATING_DAYS_PER_YEAR * avgPricePerJob;
        const annualVariableCosts = jobsPerDay * OPERATING_DAYS_PER_YEAR * avgMilesPerJob * costPerMile;
        const annualFixedCosts = monthlyFixedCosts * 12;
        const totalAnnualCosts = annualVariableCosts + annualFixedCosts;
        const annualProfit = annualRevenue - totalAnnualCosts;
        const profitMargin = annualRevenue > 0 ? (annualProfit / annualRevenue) * 100 : 0;
        const jobsPerHour = jobsPerDay / OPERATING_HOURS_PER_DAY;

        return { annualRevenue, annualProfit, profitMargin, totalAnnualCosts, jobsPerHour, avgPricePerJob };
    }, [jobsPerDay, zoneAMix, zoneBMix, asapMix, expressMix, avgMilesPerJob, costPerMile, monthlyFixedCosts]);
    
    // --- RENDER ---
    return (
        <div className="space-y-8">
            {/* --- RESULTS PANEL --- */}
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-slate-200 mb-4">Key Performance Indicators</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ValueBox title="Annual Revenue" value={formatCurrency(calculatedMetrics.annualRevenue)} isGoalMet={calculatedMetrics.annualRevenue >= REVENUE_TARGET} />
                    <ValueBox title="Annual Profit" value={formatCurrency(calculatedMetrics.annualProfit)} />
                    <ValueBox title="Profit Margin" value={`${calculatedMetrics.profitMargin.toFixed(1)}%`} isGoalMet={calculatedMetrics.profitMargin >= PROFIT_MARGIN_TARGET} />
                    <ValueBox title="Jobs Per Hour" value={calculatedMetrics.jobsPerHour.toFixed(2)} />
                </div>
            </div>

            {/* --- LEVERS PANEL --- */}
            <div className="p-6 bg-slate-800/70 rounded-lg border border-slate-700">
                 <h3 className="text-xl font-semibold text-slate-200 mb-6">Strategic Levers</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Demand & Pricing */}
                    <div className="space-y-6 p-4 border border-slate-700 rounded-lg">
                        <h4 className="font-bold text-blue-400">Demand & Service Mix</h4>
                        <SliderInput label="Average Jobs Per Day" value={jobsPerDay} min={1} max={40} step={1} onChange={(e) => setJobsPerDay(Number(e.target.value))} />
                        <SliderInput label="Zone A Mix" value={zoneAMix} min={0} max={100} step={5} unit="%" onChange={(e) => { const val = Number(e.target.value); setZoneAMix(val); if (val + zoneBMix > 100) setZoneBMix(100 - val); }} />
                        <SliderInput label="Zone B Mix" value={zoneBMix} min={0} max={100} step={5} unit="%" onChange={(e) => { const val = Number(e.target.value); setZoneBMix(val); if (val + zoneAMix > 100) setZoneAMix(100 - val); }} />
                        <SliderInput label="ASAP Urgency Mix" value={asapMix} min={0} max={100} step={5} unit="%" onChange={(e) => { const val = Number(e.target.value); setAsapMix(val); if (val + expressMix > 100) setExpressMix(100 - val); }} />
                        <SliderInput label="Express Urgency Mix" value={expressMix} min={0} max={100} step={5} unit="%" onChange={(e) => { const val = Number(e.target.value); setExpressMix(val); if (val + asapMix > 100) setAsapMix(100 - val); }} />
                    </div>
                     {/* Operations & Costs */}
                    <div className="space-y-6 p-4 border border-slate-700 rounded-lg">
                         <h4 className="font-bold text-blue-400">Operations & Costs</h4>
                         <SliderInput label="Average Miles Per Job" value={avgMilesPerJob} min={2} max={20} step={1} unit=" mi" onChange={(e) => setAvgMilesPerJob(Number(e.target.value))} />
                         <SliderInput label="Cost Per Mile" value={costPerMile} min={0.30} max={1.50} step={0.05} unit="/mi" onChange={(e) => setCostPerMile(Number(e.target.value))} />
                         <SliderInput label="Monthly Fixed Costs" value={monthlyFixedCosts} min={50} max={1000} step={25} unit="/mo" onChange={(e) => setMonthlyFixedCosts(Number(e.target.value))} />
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default Simulator;
