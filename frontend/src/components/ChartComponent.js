import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const ChartComponent = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.name,
    "AI Score": item.ai_score,
    "Quantum Energy": item.energy_score,
  }));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Score comparison</h3>
          <p className="text-sm text-slate-500">AI score vs quantum energy across candidate drugs.</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12 }} />
            <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}
            />
            <Legend />
            <Bar dataKey="AI Score" fill="#0f766e" radius={[8, 8, 0, 0]} barSize={20} />
            <Bar dataKey="Quantum Energy" fill="#2563eb" radius={[8, 8, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;
