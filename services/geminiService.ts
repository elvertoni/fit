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

    const result = await response.json();

    if (!response.ok) {
      // Log detailed error for debugging
      console.error("Gemini API Error:", {
        status: response.status,
        errorType: result.errorType,
        error: result.error,
      });

      // Return the error message from the server
      return result.error || `Erro ao gerar análise (${response.status})`;
    }

    return result.analysis || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Network/Fetch Error:", error);
    return "Desculpe, ocorreu um erro de conexão. Verifique sua internet e tente novamente.";
  }
};
