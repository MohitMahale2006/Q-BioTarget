import React from 'react';

const steps = [
  'Running AI Screening...',
  'Analyzing Genetic Compatibility...',
  'Running Quantum Simulation...',
];

const Loader = ({ stage }) => {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Analysis in progress
          </p>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">
            Preparing clinical recommendation
          </h2>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-50 text-sky-600">
          <span className="text-lg font-semibold">{stage + 1}</span>
        </div>
      </div>

      <div className="mt-7 space-y-4">
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500 transition-all duration-500"
            style={{ width: `${((stage + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="space-y-3">
          {steps.map((label, index) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`flex h-3 w-3 items-center justify-center rounded-full ${
                  index <= stage ? 'bg-teal-500' : 'bg-slate-300'
                }`}
              />
              <p className="text-sm text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
