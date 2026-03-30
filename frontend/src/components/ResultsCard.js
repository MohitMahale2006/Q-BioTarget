import React from 'react';

const ResultsCard = ({ result }) => {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-600">
            Recommended drug
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">{result.name}</h2>
        </div>

        <div className="rounded-3xl bg-emerald-50 px-5 py-4 text-center">
          <p className="text-sm font-semibold text-emerald-700">Confidence</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{result.confidence}%</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-600">{result.reason}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Indication</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{result.indication}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Target</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{result.target}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Final score</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{result.final_score}</p>
        </div>
      </div>

      <div className="mt-7 rounded-3xl bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">Why this drug?</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-teal-600"></span>
            Balanced efficacy and genetic compatibility for personalized therapy.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-teal-600"></span>
            Quantum-inspired binding energy supports stable target engagement.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-teal-600"></span>
            Designed to minimize toxicity while preserving clinical benefit.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsCard;
