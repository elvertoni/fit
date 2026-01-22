import { GoogleGenAI } from "@google/genai";
import { AppData } from '../types';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const generateHealthInsights = async (data: AppData): Promise<string> => {
  if (!data.profile) return "Perfil não encontrado.";

  const recentLogs = data.logs.slice(-10); // Analyze last 10 entries
  const currentWeight = recentLogs[recentLogs.length - 1].weight;
  const bmi = (currentWeight / ((data.profile.height / 100) ** 2)).toFixed(1);

  const prompt = `
    Atue como um nutricionista motivador e analítico.
    Dados do usuário:
    - Nome: ${data.profile.name}
    - Idade: ${data.profile.age}
    - Sexo: ${data.profile.gender}
    - Altura: ${data.profile.height}cm
    - Peso Inicial: ${data.profile.startWeight}kg
    - Peso Atual: ${currentWeight}kg
    - Meta: ${data.profile.targetWeight}kg
    - IMC Atual: ${bmi}

    Histórico recente de peso (Data: Peso):
    ${recentLogs.map(l => `- ${new Date(l.date).toLocaleDateString()}: ${l.weight}kg`).join('\n')}

    Por favor, forneça:
    1. Uma breve análise do progresso atual.
    2. Se o IMC está saudável ou em qual faixa se encontra.
    3. Três dicas práticas e curtas (bullet points) para ajudar a alcançar a meta de forma saudável baseada nos dados.
    4. Uma frase curta de motivação final.

    Mantenha o tom profissional, amigável e encorajador. Responda em Português do Brasil. Use markdown para formatar.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, ocorreu um erro ao conectar com a inteligência artificial. Tente novamente mais tarde.";
  }
};
