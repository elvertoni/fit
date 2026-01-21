import React, { useState } from 'react';
import { UserProfile, Gender } from '../types';
import { createProfile } from '../services/dataService';
import { Scale, Ruler, User, Target, Loader2 } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    startWeight: '',
    targetWeight: '',
    gender: Gender.MALE
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profile: UserProfile = {
        name: formData.name,
        age: Number(formData.age),
        height: Number(formData.height),
        startWeight: Number(formData.startWeight),
        targetWeight: Number(formData.targetWeight),
        gender: formData.gender,
        startDate: new Date().toISOString()
      };
      await createProfile(profile);
      onComplete();
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Erro ao criar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel rounded-3xl p-8 shadow-2xl border border-white/60">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-brand-teal/15 w-12 h-12 rounded-2xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-brand-teal" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/60">Perfil inicial</p>
              <h1 className="text-3xl font-semibold text-brand-navy font-display">Configure sua base</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">Nome</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-brand-navy/40" />
                <input
                  required
                  name="name"
                  type="text"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/70 bg-white/80 text-brand-navy shadow-sm focus:ring-2 focus:ring-brand-teal/40 focus:border-transparent outline-none transition placeholder:text-brand-navy/40"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Idade</label>
                <input
                  required
                  name="age"
                  type="number"
                  min="1"
                  className="w-full px-4 py-3 rounded-xl border border-white/70 bg-white/80 text-brand-navy shadow-sm focus:ring-2 focus:ring-brand-teal/40 outline-none placeholder:text-brand-navy/40"
                  placeholder="Anos"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Sexo</label>
                <select
                  name="gender"
                  className="w-full px-4 py-3 rounded-xl border border-white/70 bg-white/80 text-brand-navy shadow-sm focus:ring-2 focus:ring-brand-teal/40 outline-none"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  {Object.values(Gender).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">Altura (cm)</label>
              <div className="relative">
                <Ruler className="absolute left-3 top-3 w-5 h-5 text-brand-navy/40" />
                <input
                  required
                  name="height"
                  type="number"
                  min="50"
                  max="300"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/70 bg-white/80 text-brand-navy shadow-sm focus:ring-2 focus:ring-brand-teal/40 outline-none placeholder:text-brand-navy/40"
                  placeholder="Ex: 175"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Peso Atual (kg)</label>
                <input
                  required
                  name="startWeight"
                  type="number"
                  step="0.1"
                  className="w-full px-4 py-3 rounded-xl border border-white/70 bg-white/80 text-brand-navy shadow-sm focus:ring-2 focus:ring-brand-teal/40 outline-none placeholder:text-brand-navy/40"
                  placeholder="0.0"
                  value={formData.startWeight}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Meta (kg)</label>
                <div className="relative">
                  <Target className="absolute left-3 top-3 w-4 h-4 text-brand-navy/40" />
                  <input
                    required
                    name="targetWeight"
                    type="number"
                    step="0.1"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/70 bg-white/80 text-brand-navy shadow-sm focus:ring-2 focus:ring-brand-teal/40 outline-none placeholder:text-brand-navy/40"
                    placeholder="0.0"
                    value={formData.targetWeight}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-brand-navy text-white font-semibold py-3 rounded-xl shadow-lg shadow-brand-navy/20 transition duration-200 flex justify-center items-center hover:-translate-y-0.5 hover:shadow-xl"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Começar Jornada'}
            </button>
          </form>
        </div>

        <div className="rounded-3xl bg-brand-navy text-white p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Personalização</p>
            <h2 className="mt-4 text-3xl font-display font-semibold">Metas reais, evolução visível.</h2>
            <p className="mt-4 text-white/75">
              Preencha seus dados para liberar métricas inteligentes, insights de IA e alertas
              de progresso.
            </p>
          </div>
          <div className="mt-8 space-y-4 text-sm">
            {[
              { icon: <Ruler className="w-4 h-4 text-brand-gold" />, label: 'Cálculo automático de IMC' },
              { icon: <Target className="w-4 h-4 text-brand-gold" />, label: 'Meta com barra de evolução' },
              { icon: <User className="w-4 h-4 text-brand-gold" />, label: 'Dashboard personalizado' }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
