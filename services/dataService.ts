import { supabase } from './supabaseClient';
import { AppData, UserProfile, WeightEntry } from '../types';

export const loadData = async (): Promise<AppData> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { profile: null, logs: [] };
    }

    // Carregar Perfil
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profileData) {
      return { profile: null, logs: [] };
    }

    // Mapear snake_case do DB para camelCase do Frontend
    const profile: UserProfile = {
      name: profileData.name,
      gender: profileData.gender,
      age: profileData.age,
      height: profileData.height,
      targetWeight: profileData.target_weight,
      startWeight: profileData.start_weight,
      startDate: profileData.start_date
    };

    // Carregar Logs
    const { data: logsData, error: logsError } = await supabase
      .from('weight_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: true });

    if (logsError) {
      console.error("Erro ao carregar logs", logsError);
      return { profile, logs: [] };
    }

    const logs: WeightEntry[] = logsData.map((log: any) => ({
      id: log.id,
      date: log.date,
      weight: log.weight,
      note: log.note
    }));

    return { profile, logs };

  } catch (e) {
    console.error("Failed to load data from Supabase", e);
    return { profile: null, logs: [] };
  }
};

export const addWeightEntry = async (weight: number): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuário não autenticado");

  const { error } = await supabase.from('weight_logs').insert([
    {
      user_id: user.id,
      weight: weight,
      date: new Date().toISOString()
    }
  ]);

  if (error) throw error;
};

export const createProfile = async (profile: UserProfile): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuário não autenticado");

  // Inserir Perfil
  const { error: profileError } = await supabase.from('profiles').insert([
    {
      id: user.id,
      name: profile.name,
      gender: profile.gender,
      age: profile.age,
      height: profile.height,
      target_weight: profile.targetWeight,
      start_weight: profile.startWeight,
      start_date: profile.startDate
    }
  ]);

  if (profileError) throw profileError;

  // Inserir Log Inicial
  const { error: logError } = await supabase.from('weight_logs').insert([
    {
      user_id: user.id,
      weight: profile.startWeight,
      date: profile.startDate
    }
  ]);

  if (logError) throw logError;
};

export const signOut = async () => {
  await supabase.auth.signOut();
};