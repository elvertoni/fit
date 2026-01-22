# Instruções de Deploy no Netlify

## Problema Resolvido

O erro "An API Key must be set when running in a browser" foi resolvido movendo a chamada da API do Google Gemini para uma função serverless do Netlify. Isso protege sua API key e evita expô-la no código do cliente.

## ⚡ IMPORTANTE: Migramos para OpenAI

O aplicativo agora usa **OpenAI** (GPT-3.5/GPT-4) ao invés do Google Gemini para evitar problemas de restrições de API key.

**➡️ Veja o guia completo:** [OPENAI_SETUP.md](OPENAI_SETUP.md)

## Configuração das Variáveis de Ambiente no Netlify

### Passo a passo:

1. Acesse seu site no Netlify Dashboard: https://app.netlify.com/
2. Selecione seu site (shimmering-llama-9010aa)
3. Vá em **Site configuration** → **Environment variables**
4. Clique em **Add a variable**
5. Adicione a seguinte variável:

   - **Key**: `OPENAI_API_KEY`
   - **Value**: Sua API key da OpenAI (começa com `sk-...`)
   - **Scopes**: Marque as opções "All deploys" e "Functions"

6. Clique em **Save**

## Como Obter a API Key da OpenAI

### Passo 1: Criar conta e adicionar créditos
1. Acesse: https://platform.openai.com/signup
2. Crie sua conta
3. Adicione créditos ($5 mínimo): https://platform.openai.com/account/billing/overview
   - **Custo estimado**: ~$0.002 por análise (500 análises = $1)

### Passo 2: Criar API Key
1. Acesse: https://platform.openai.com/api-keys
2. Clique em **"+ Create new secret key"**
3. Dê um nome: "Evolução Fit AI"
4. **Copie a chave** (começa com `sk-...`) - você não poderá vê-la novamente!

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
echo "OPENAI_API_KEY=sk-sua_chave_aqui" > .env

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

## ✅ Vantagens da OpenAI

Com a migração para OpenAI:
- ✅ **Sem problemas de restrições** - funciona para todos os usuários
- ✅ **Mais estável e confiável**
- ✅ **Melhor qualidade** de respostas (especialmente com GPT-4)
- ✅ **Fácil de monitorar** uso e custos

**Custos baixos**: Com $5 você consegue ~2500 análises com GPT-3.5-turbo!
