import React, { useState } from 'react';
import { AppData } from '../types';
import { addWeightEntry } from '../services/dataService';
import WeightChart from './WeightChart';
import AIAnalysis from './AIAnalysis';
import { Plus, TrendingDown, TrendingUp, Target, Loader2, LogOut } from 'lucide-react';

interface Props {
  data: AppData;
  onUpdate: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<Props> = ({ data, onUpdate, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [saving, setSaving] = useState(false);

  if (!data.profile) return null;

  const currentWeight = data.logs.length > 0 ? data.logs[data.logs.length - 1].weight : data.profile.startWeight;
  const startWeight = data.profile.startWeight;
  const targetWeight = data.profile.targetWeight;
  
  const totalLost = startWeight - currentWeight;
  const remaining = currentWeight - targetWeight;
  const progress = Math.min(100, Math.max(0, (totalLost / (startWeight - targetWeight)) * 100));
  
  // BMI Calculation
  const heightInMeters = data.profile.height / 100;
  const bmi = currentWeight / (heightInMeters * heightInMeters);

  const handleAddWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;
    setSaving(true);
    try {
      await addWeightEntry(Number(newWeight));
      onUpdate(); // Trigger data refresh
      setNewWeight('');
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
      alert('Erro ao salvar peso');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-20">
        <div className="glass-panel border-b border-white/60">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-teal/15 p-2 rounded-2xl">
                <TrendingDown className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/60">Evolução Fit</p>
                <h1 className="text-xl font-semibold text-brand-navy font-display">Olá, {data.profile.name}</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-navy text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition shadow-lg shadow-brand-navy/20 hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Registrar Peso</span>
                <span className="sm:hidden">Peso</span>
              </button>
              <button
                onClick={onLogout}
                className="bg-white/80 border border-white/70 text-brand-navy px-3 py-2 rounded-xl text-sm font-medium transition hover:bg-white"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="glass-panel rounded-3xl p-6 md:p-8 shadow-2xl border border-white/60">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/60">Resumo diário</p>
            <div className="mt-4 flex flex-col gap-3">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-navy">
                {progress.toFixed(0)}% rumo à sua meta
              </h2>
              <p className="text-brand-navy/70 max-w-xl">
                Você está a {remaining > 0 ? remaining.toFixed(1) : 0}kg da meta. Continue registrando
                para manter a evolução consistente.
              </p>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm text-brand-navy/70">
                <span>Início: {startWeight}kg</span>
                <span>Meta: {targetWeight}kg</span>
              </div>
              <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden mt-2">
                <div
                  className="bg-gradient-to-r from-brand-teal to-brand-sky h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-brand-navy text-white p-6 md:p-8 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Status IMC</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-4xl font-display font-semibold">{bmi.toFixed(1)}</span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${bmi < 25 ? 'bg-emerald-400/20 text-emerald-200' : bmi < 30 ? 'bg-amber-400/20 text-amber-100' : 'bg-rose-400/20 text-rose-100'}`}>
                {bmi < 18.5 ? 'Baixo' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Sobrepeso' : 'Obesidade'}
              </span>
            </div>
            <p className="mt-4 text-white/70 text-sm">
              IMC calculado com base na sua altura e peso atual. Use como referência para ajustes.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-2xl shadow-lg border border-white/60">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/50 mb-2">Peso Atual</p>
            <p className="text-2xl font-semibold text-brand-navy">{currentWeight} <span className="text-sm text-brand-navy/50 font-normal">kg</span></p>
          </div>
          <div className="glass-panel p-4 rounded-2xl shadow-lg border border-white/60">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/50 mb-2">Perda Total</p>
            <div className="flex items-center gap-2">
              {totalLost > 0 ? <TrendingDown className="w-4 h-4 text-emerald-400"/> : <TrendingUp className="w-4 h-4 text-rose-400"/>}
              <p className={`text-2xl font-semibold ${totalLost > 0 ? 'text-emerald-500' : 'text-brand-navy'}`}>
                {Math.abs(totalLost).toFixed(1)} <span className="text-sm text-brand-navy/50 font-normal">kg</span>
              </p>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl shadow-lg border border-white/60">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/50 mb-2">Falta Pouco</p>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-brand-teal"/>
              <p className="text-2xl font-semibold text-brand-navy">{remaining > 0 ? remaining.toFixed(1) : 0} <span className="text-sm text-brand-navy/50 font-normal">kg</span></p>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl shadow-lg border border-white/60">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/50 mb-2">Peso Inicial</p>
            <p className="text-2xl font-semibold text-brand-navy">{startWeight} <span className="text-sm text-brand-navy/50 font-normal">kg</span></p>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
          <WeightChart data={data.logs} targetWeight={targetWeight} />
          <AIAnalysis data={data} />
        </section>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-navy/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-white/70">
            <h2 className="text-xl font-semibold text-brand-navy mb-4">Registrar Peso de Hoje</h2>
            <form onSubmit={handleAddWeight}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-brand-navy mb-2">Peso (kg)</label>
                <input
                  autoFocus
                  type="number"
                  step="0.1"
                  required
                  className="w-full px-4 py-3 text-lg rounded-xl border border-white/70 bg-white/80 text-brand-navy shadow-sm focus:ring-2 focus:ring-brand-teal/40 focus:border-transparent outline-none placeholder:text-brand-navy/40"
                  placeholder="Ex: 75.5"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 text-brand-navy/70 bg-white/70 hover:bg-white rounded-lg font-medium transition border border-white/70"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-brand-navy text-white rounded-lg font-medium transition flex items-center justify-center gap-2 shadow-lg shadow-brand-navy/20"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
