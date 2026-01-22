# Instruções de Deploy no Netlify

## Problema Resolvido

O erro "An API Key must be set when running in a browser" foi resolvido movendo a chamada da API do Google Gemini para uma função serverless do Netlify. Isso protege sua API key e evita expô-la no código do cliente.

## Configuração das Variáveis de Ambiente no Netlify

Para fazer o deploy funcionar, você precisa configurar a variável de ambiente no Netlify:

### Passo a passo:

1. Acesse seu site no Netlify Dashboard: https://app.netlify.com/
2. Selecione seu site (shimmering-llama-9010aa)
3. Vá em **Site configuration** → **Environment variables**
4. Clique em **Add a variable**
5. Adicione a seguinte variável:

   - **Key**: `GEMINI_API_KEY`
   - **Value**: Sua API key do Google Gemini (comece com `AIza...`)
   - **Scopes**: Marque as opções "All deploys" e "Functions"

6. Clique em **Save**

## Como Obter a API Key do Google Gemini

Se você ainda não tem a API key:

1. Acesse: https://aistudio.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

## Fazer o Deploy

Depois de configurar a variável de ambiente:

```bash
# Commit as mudanças
git add .
git commit -m "Migrar API Gemini para Netlify Function"

# Push para o repositório
git push origin main
```

O Netlify detectará automaticamente as mudanças e fará o deploy.

## Testar Localmente (Opcional)

Para testar as funções Netlify localmente:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Criar arquivo .env na raiz do projeto
echo "GEMINI_API_KEY=sua_api_key_aqui" > .env

# Executar localmente com suporte a functions
netlify dev
```

## Estrutura de Arquivos Criada

```
fit/
├── netlify/
│   └── functions/
│       └── generate-insights.ts   # Função serverless que protege a API key
├── services/
│   └── geminiService.ts           # Atualizado para chamar a função Netlify
└── netlify.toml                   # Configuração atualizada
```

## Verificação

Após o deploy, acesse seu site e teste a funcionalidade "Gerar Análise" no Dashboard. A análise agora é gerada de forma segura através da função serverless.
