import React from 'react';

const diseaseOptions = [
  { label: 'Lung Cancer', value: 'NSCLC' },
  { label: 'Breast Cancer', value: 'Breast' },
  { label: 'Blood Cancer', value: 'CML' },
];

const markerOptions = [
  { label: 'EGFR', value: 'EGFR' },
  { label: 'HER2', value: 'HER2' },
  { label: 'BCR-ABL', value: 'BCR-ABL' },
];

const PatientForm = ({ formData, onChange, onSubmit, disabled }) => {
  return (
    <form
      className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={onSubmit}
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Patient intake</h2>
        <p className="mt-2 text-sm text-slate-500">
          Enter patient identifiers and select the relevant cancer profile.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Patient ID</span>
          <input
            type="text"
            name="patient_id"
            value={formData.patient_id}
            onChange={onChange}
            placeholder="P-0001"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Disease type</span>
          <select
            name="disease"
            value={formData.disease}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500"
          >
            {diseaseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Genetic marker</span>
        <select
          name="genetic_marker"
          value={formData.genetic_marker}
          onChange={onChange}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500"
        >
          {markerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Analyze patient profile
      </button>
    </form>
  );
};

export default PatientForm;
