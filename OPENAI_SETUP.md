# 🤖 Configuração da OpenAI API

## Por Que OpenAI?

Migramos de Google Gemini para OpenAI porque:
- ✅ **Sem problemas de restrições** de domínio/IP
- ✅ **Funciona perfeitamente** em funções serverless
- ✅ **Mais estável** e amplamente usado
- ✅ **Melhor qualidade** de respostas (especialmente com GPT-4)

## 🔑 Como Obter uma API Key da OpenAI

### Passo 1: Criar uma Conta

1. Acesse: https://platform.openai.com/signup
2. Crie sua conta (pode usar Google, Microsoft ou email)
3. Verifique seu email se necessário

### Passo 2: Adicionar Créditos

⚠️ **IMPORTANTE**: A OpenAI requer créditos pagos para uso da API.

1. Acesse: https://platform.openai.com/account/billing/overview
2. Clique em **"Add payment method"**
3. Adicione um cartão de crédito
4. Adicione créditos (mínimo $5.00)

**Custos estimados:**
- **GPT-3.5-turbo**: ~$0.002 por análise (500 análises = $1)
- **GPT-4**: ~$0.03 por análise (33 análises = $1)

💡 **Dica**: Comece com $5-10 de crédito. Isso deve durar meses com uso moderado.

### Passo 3: Criar a API Key

1. Acesse: https://platform.openai.com/api-keys
2. Clique em **"+ Create new secret key"**
3. Dê um nome: "Evolução Fit AI"
4. Clique em **"Create secret key"**
5. **⚠️ COPIE A CHAVE AGORA** - ela começa com `sk-...`
6. Você não poderá ver a chave novamente!

## 🚀 Configurar no Netlify

### Passo 1: Adicionar Variável de Ambiente

1. Acesse: https://app.netlify.com/
2. Selecione seu site (shimmering-llama-9010aa)
3. Vá em **Site configuration** → **Environment variables**
4. Clique em **"Add a variable"**
5. Configure:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Sua chave que começa com `sk-...`
   - **Scopes**: Marque "All deploys" e "Functions"
6. Clique em **"Save"**

### Passo 2: Fazer o Deploy

```bash
git add .
git commit -m "Migrar de Gemini para OpenAI"
git push origin main
```

O Netlify fará o deploy automaticamente!

## 🎯 Escolher o Modelo

Por padrão, o código usa **GPT-3.5-turbo** (mais rápido e barato).

### Para usar GPT-4 (melhor qualidade):

Edite o arquivo [netlify/functions/generate-insights.ts](netlify/functions/generate-insights.ts) na linha do modelo:

```typescript
// Linha ~60
model: 'gpt-4', // Era: 'gpt-3.5-turbo'
```

### Comparação de Modelos:

| Modelo | Velocidade | Qualidade | Custo/Análise |
|--------|-----------|-----------|---------------|
| gpt-3.5-turbo | ⚡⚡⚡ Muito rápido | ⭐⭐⭐ Boa | ~$0.002 |
| gpt-4 | ⚡⚡ Moderado | ⭐⭐⭐⭐⭐ Excelente | ~$0.03 |
| gpt-4-turbo | ⚡⚡⚡ Rápido | ⭐⭐⭐⭐⭐ Excelente | ~$0.01 |

💡 **Recomendação**: Use `gpt-3.5-turbo` no início. Mude para `gpt-4` se quiser análises mais detalhadas.

## 📊 Monitorar Uso e Custos

### Ver Quanto Você Gastou:

1. Acesse: https://platform.openai.com/usage
2. Veja o gráfico de uso diário
3. Monitore seus créditos restantes

### Configurar Limites de Gastos:

1. Acesse: https://platform.openai.com/account/billing/limits
2. Configure **"Soft limit"** (você recebe aviso)
3. Configure **"Hard limit"** (API para se atingir o limite)

💡 **Dica**: Configure um hard limit de $10-20 para evitar surpresas.

## 🔒 Segurança

A API key da OpenAI está protegida porque:
- ✅ Fica apenas na função serverless do Netlify
- ✅ Nunca é exposta ao navegador do usuário
- ✅ Não aparece no código do GitHub
- ✅ Usuários não podem ver ou roubar a chave

## ⚙️ Testar Localmente (Opcional)

Para testar localmente com Netlify CLI:

### 1. Instalar Netlify CLI:
```bash
npm install -g netlify-cli
```

### 2. Criar arquivo .env:
```bash
echo "OPENAI_API_KEY=sk-sua_chave_aqui" > .env
```

### 3. Executar localmente:
```bash
netlify dev
```

Acesse: http://localhost:8888

## ❓ Problemas Comuns

### "Invalid API Key"
- Verifique se copiou a chave completa (começa com `sk-`)
- Confirme que a variável no Netlify está como `OPENAI_API_KEY`
- Faça um novo deploy após adicionar a variável

### "Insufficient Quota"
- Você precisa adicionar créditos na sua conta OpenAI
- Acesse: https://platform.openai.com/account/billing/overview
- Adicione pelo menos $5

### "Rate Limit Exceeded"
- Você atingiu o limite de requisições por minuto
- Aguarde 1 minuto e tente novamente
- Considere fazer upgrade do plano

## 📞 Suporte OpenAI

- **Documentação**: https://platform.openai.com/docs
- **Status da API**: https://status.openai.com/
- **Suporte**: https://help.openai.com/

## 🎉 Pronto!

Agora todos os usuários do seu app poderão usar a análise de IA sem problemas de restrições!
