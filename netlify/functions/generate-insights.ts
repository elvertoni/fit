import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

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

    // Initialize OpenAI with API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API configuration error' }),
      };
    }

    const openai = new OpenAI({ apiKey });

    // Process the data
    const recentLogs = data.logs.slice(-10);
    const currentWeight = recentLogs[recentLogs.length - 1].weight;
    const bmi = (currentWeight / ((data.profile.height / 100) ** 2)).toFixed(1);

    const prompt = `Atue como um nutricionista motivador e analítico.

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

Mantenha o tom profissional, amigável e encorajador. Responda em Português do Brasil. Use markdown para formatar.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Ou use 'gpt-4' para melhor qualidade
      messages: [
        {
          role: 'system',
          content: 'Você é um nutricionista especializado e motivador, que ajuda pessoas a alcançarem suas metas de saúde de forma saudável e sustentável.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const analysis = completion.choices[0]?.message?.content || 'Não foi possível gerar a análise no momento.';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        analysis,
      }),
    };
  } catch (error: any) {
    // Log detailed error information
    console.error('Error generating insights:', {
      message: error?.message,
      status: error?.status,
      code: error?.code,
      details: error?.details,
      fullError: error,
    });

    // Determine error type and provide helpful message
    let errorMessage = 'Desculpe, ocorreu um erro ao conectar com a inteligência artificial.';
    let statusCode = 500;

    if (error?.message?.includes('API key')) {
      errorMessage = 'Erro de configuração da API. Entre em contato com o administrador.';
      console.error('API Key issue detected');
    } else if (error?.status === 429 || error?.message?.includes('quota')) {
      errorMessage = 'Limite de uso da API atingido. Tente novamente mais tarde.';
      statusCode = 429;
      console.error('Quota/Rate limit exceeded');
    } else if (error?.status === 403 || error?.message?.includes('permission') || error?.message?.includes('restricted')) {
      errorMessage = 'Acesso negado pela API. Verifique as configurações de restrição da API key.';
      statusCode = 403;
      console.error('API Key restriction detected - check domain/IP restrictions');
    }

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: errorMessage,
        // Include error type for debugging (remove in production if needed)
        errorType: error?.status || error?.code || 'unknown',
      }),
    };
  }
};

export { handler };
