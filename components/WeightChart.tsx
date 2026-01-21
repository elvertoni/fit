import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { WeightEntry } from '../types';

interface Props {
  data: WeightEntry[];
  targetWeight: number;
}

const WeightChart: React.FC<Props> = ({ data, targetWeight }) => {
  const formattedData = data.map(entry => ({
    ...entry,
    displayDate: new Date(entry.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    fullDate: new Date(entry.date).toLocaleDateString('pt-BR')
  }));

  // Calculate domain for Y axis to make chart look good (not starting at 0)
  const weights = data.length > 0 ? data.map((d) => d.weight) : [targetWeight];
  const minWeight = Math.min(...weights, targetWeight);
  const maxWeight = Math.max(...weights, targetWeight);
  const padding = 2; // kg buffer

  const BRAND_TEAL = '#14b8a6';
  const BRAND_NAVY = '#0b1f3a';

  return (
    <div className="w-full h-[320px] glass-panel p-6 rounded-3xl shadow-2xl border border-white/60">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/50">Tendência</p>
          <h3 className="text-lg font-semibold text-brand-navy font-display">Evolução do peso</h3>
        </div>
        <span className="text-xs text-brand-navy/60">{data.length} registros</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="displayDate" 
            tick={{fontSize: 12, fill: '#64748b'}} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={[Math.floor(minWeight - padding), Math.ceil(maxWeight + padding)]} 
            tick={{fontSize: 12, fill: '#64748b'}}
            tickLine={false}
            axisLine={false}
            tickCount={6}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -8px rgb(15 23 42 / 0.2)' }}
            labelFormatter={(label, payload) => {
               if (payload && payload.length > 0) return payload[0].payload.fullDate;
               return label;
            }}
          />
          <ReferenceLine y={targetWeight} stroke={BRAND_TEAL} strokeDasharray="5 5" label={{ value: 'Meta', position: 'right', fill: BRAND_TEAL, fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke={BRAND_NAVY}
            strokeWidth={3}
            dot={{ r: 4, fill: BRAND_NAVY, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, stroke: BRAND_TEAL, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;
