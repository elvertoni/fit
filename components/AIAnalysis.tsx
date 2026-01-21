import React, { useState } from 'react';
import { AppData } from '../types';
import { generateHealthInsights } from '../services/geminiService';
import { Sparkles, Loader2, MessageSquareQuote } from 'lucide-react';

interface Props {
  data: AppData;
}

const AIAnalysis: React.FC<Props> = ({ data }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await generateHealthInsights(data);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-2xl border border-white/60">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-brand-teal/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-brand-teal" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/50">Analista IA</p>
            <h3 className="text-lg font-semibold text-brand-navy font-display">Insights personalizados</h3>
          </div>
        </div>
        {!analysis && !loading && (
          <button
            onClick={handleAnalyze}
            className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white text-sm font-medium rounded-xl hover:-translate-y-0.5 transition shadow-lg shadow-brand-navy/20"
          >
            <Sparkles className="w-4 h-4" />
            Gerar Análise
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 text-brand-navy">
          <Loader2 className="w-8 h-8 animate-spin mb-2 text-brand-teal" />
          <p className="text-sm font-medium text-brand-navy/70">Consultando nutricionista virtual...</p>
        </div>
      )}

      {analysis && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="bg-white/70 p-4 rounded-2xl border border-white/70 text-brand-navy/80 text-sm leading-relaxed whitespace-pre-line">
            {analysis}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAnalyze}
              className="text-xs text-brand-navy font-medium hover:text-brand-teal flex items-center gap-1"
            >
              <MessageSquareQuote className="w-3 h-3"/>
              Atualizar Análise
            </button>
          </div>
        </div>
      )}

      {!analysis && !loading && (
        <p className="text-sm text-brand-navy/70">
          Gere uma análise detalhada do seu progresso, com IMC, tendências e dicas rápidas para
          acelerar resultados.
        </p>
      )}
    </div>
  );
};

export default AIAnalysis;
