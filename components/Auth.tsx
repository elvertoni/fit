import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Lock, Mail, ChevronRight, Loader2 } from 'lucide-react';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        else {
          alert('Conta criada com sucesso! Você já pode fazer login.');
          setIsLogin(true); // Switch to login after signup
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel rounded-3xl p-8 shadow-2xl border border-white/60">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 rounded-2xl bg-brand-teal/15 flex items-center justify-center">
              <Lock className="w-6 h-6 text-brand-teal" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/60">Evolução Fit</p>
              <h1 className="text-3xl font-semibold text-brand-navy font-display">Sua jornada, com clareza</h1>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-brand-navy/40" />
                <input
                  required
                  type="email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/70 bg-white/80 text-brand-navy shadow-sm focus:ring-2 focus:ring-brand-teal/40 focus:border-transparent outline-none transition placeholder:text-brand-navy/40"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-brand-navy/40" />
                <input
                  required
                  type="password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/70 bg-white/80 text-brand-navy shadow-sm focus:ring-2 focus:ring-brand-teal/40 focus:border-transparent outline-none transition placeholder:text-brand-navy/40"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy text-white font-semibold py-3 rounded-xl shadow-lg shadow-brand-navy/20 transition duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-brand-navy/60 hover:text-brand-teal transition"
            >
              {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-brand-navy text-white p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Experiência premium</p>
            <h2 className="mt-4 text-3xl font-display font-semibold leading-tight">
              Visual limpo, insights diários e progresso real.
            </h2>
            <p className="mt-4 text-white/75">
              Organize seus dados, acompanhe métricas essenciais e use a análise IA para manter
              a motivação em alta.
            </p>
          </div>
          <div className="mt-10 space-y-3">
            {['Painel inteligente', 'Gráficos de evolução', 'Metas claras'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <span className="h-2 w-2 rounded-full bg-brand-gold"></span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
