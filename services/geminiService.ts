import { AppData } from '../types';

export const generateHealthInsights = async (data: AppData): Promise<string> => {
  if (!data.profile) return "Perfil não encontrado.";

  try {
    const response = await fetch('/.netlify/functions/generate-insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.analysis || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, ocorreu um erro ao conectar com a inteligência artificial. Tente novamente mais tarde.";
  }
};
