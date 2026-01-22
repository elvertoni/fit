import { Handler } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    // Validate required data
    if (!data.profile || !data.logs || data.logs.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid data provided' }),
      };
    }

    // Initialize Gemini AI with API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API configuration error' }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });

    // Process the data
    const recentLogs = data.logs.slice(-10);
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
      ${recentLogs.map((l: any) => `- ${new Date(l.date).toLocaleDateString()}: ${l.weight}kg`).join('\n')}

      Por favor, forneça:
      1. Uma breve análise do progresso atual.
      2. Se o IMC está saudável ou em qual faixa se encontra.
      3. Três dicas práticas e curtas (bullet points) para ajudar a alcançar a meta de forma saudável baseada nos dados.
      4. Uma frase curta de motivação final.

      Mantenha o tom profissional, amigável e encorajador. Responda em Português do Brasil. Use markdown para formatar.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        analysis: response.text || 'Não foi possível gerar a análise no momento.',
      }),
    };
  } catch (error) {
    console.error('Error generating insights:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Desculpe, ocorreu um erro ao conectar com a inteligência artificial. Tente novamente mais tarde.',
      }),
    };
  }
};

export { handler };
