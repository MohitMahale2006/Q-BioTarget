import React, { useEffect, useState } from 'react';
import PatientForm from '../components/PatientForm';
import ResultsCard from '../components/ResultsCard';
import Loader from '../components/Loader';
import ChartComponent from '../components/ChartComponent';
import { analyzePatient } from '../services/api';

const stageLabels = [
  'Running AI Screening...',
  'Analyzing Genetic Compatibility...',
  'Running Quantum Simulation...',
];

const Dashboard = () => {
  const [formData, setFormData] = useState({
    patient_id: '',
    disease: 'NSCLC',
    genetic_marker: 'EGFR',
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading) {
      setStage(0);
      return;
    }

    const interval = window.setInterval(() => {
      setStage((current) => Math.min(current + 1, stageLabels.length - 1));
    }, 850);

    return () => window.clearInterval(interval);
  }, [loading]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.patient_id.trim()) {
      setError('Please enter a valid patient ID.');
      return;
    }

    setLoading(true);
    setResults(null);
    setStage(0);

    try {
      const response = await analyzePatient(formData);
      setResults(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              Q-BioTarget Clinical Dashboard
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">
              AI + Quantum Decision Support System
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Personalized oncology recommendations with explainable scoring, binding energy insight, and clinical trust.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-6 text-slate-700 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Clinical readiness</p>
            <p className="mt-2 text-sm">Structured inputs, stable scoring, and reproducible recommendations.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <div className="space-y-6">
          <PatientForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            disabled={loading}
          />

          {error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
              <p className="font-semibold">Unable to analyze patient profile</p>
              <p className="mt-2">{error}</p>
            </div>
          ) : null}

          {loading ? <Loader stage={stage} /> : null}
        </div>

        <div className="space-y-6">
          {results ? (
            <>
              <ResultsCard result={results.recommended_drug} />

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Candidate pharmacology
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">Comparison matrix</h2>
                  </div>
                  <p className="text-sm text-slate-500">Sorted by final composite score.</p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-5 py-4">Drug Name</th>
                        <th className="px-5 py-4">AI Score</th>
                        <th className="px-5 py-4">Quantum Energy</th>
                        <th className="px-5 py-4">Final Score</th>
                        <th className="px-5 py-4">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.all_results.map((item, index) => (
                        <tr
                          key={item.name}
                          className={`border-t border-slate-100 ${
                            index === 0 ? 'bg-emerald-50 font-semibold text-slate-900' : 'bg-white text-slate-700'
                          }`}
                        >
                          <td className="px-5 py-4">{item.name}</td>
                          <td className="px-5 py-4">{item.ai_score.toFixed(3)}</td>
                          <td className="px-5 py-4">{item.energy_score.toFixed(3)}</td>
                          <td className="px-5 py-4">{item.final_score.toFixed(3)}</td>
                          <td className="px-5 py-4">{item.confidence}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ChartComponent data={results.all_results} />

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Explainability</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Each recommendation is generated by combining structured clinical scoring with a quantum-inspired binding model.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-600"></span>
                    Genetic match is evaluated against the selected biomarker to prioritize targeted therapy.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-600"></span>
                    Efficacy is weighted as the primary factor, while toxicity is penalized to improve tolerability.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-600"></span>
                    Final rankings are stable, repeatable, and structured for clinician interpretation.
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                <p>
                  This system is a clinical decision-support prototype and should not replace professional
                  medical judgment.
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
              <p className="text-lg font-semibold">Ready for analysis</p>
              <p className="mt-3 max-w-xl mx-auto text-sm leading-6">
                Complete the intake panel and run the analysis to review recommended therapies and explainable metrics.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
