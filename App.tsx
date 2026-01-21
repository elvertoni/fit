import React, { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import { loadData, signOut } from './services/dataService';
import { AppData } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { Session } from '@supabase/supabase-js';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Monitorar estado da autenticação
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Carregar dados quando houver sessão
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const userData = await loadData();
        setData(userData);
      } else {
        setData(null);
      }
      setLoading(false);
    };

    fetchData();
  }, [session]);

  const refreshData = async () => {
    if (session) {
      const userData = await loadData();
      setData(userData);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setData(null);
    setSession(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-panel rounded-2xl px-6 py-5 shadow-xl border border-white/60 flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full animate-spin"></div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-navy/60">Carregando</p>
            <p className="text-lg font-semibold text-brand-navy">Preparando sua jornada</p>
          </div>
        </div>
      </div>
    );
  }

  // Caso 1: Usuário não logado
  if (!session) {
    return <Auth />;
  }

  // Caso 2: Usuário logado, mas sem perfil criado
  if (!data || !data.profile) {
    return <Onboarding onComplete={refreshData} />;
  }

  // Caso 3: Usuário completo
  return (
    <Dashboard 
      data={data} 
      onUpdate={refreshData} 
      onLogout={handleLogout}
    />
  );
};

export default App;
