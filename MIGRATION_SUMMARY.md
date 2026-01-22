# 🔄 Migração: Google Gemini → OpenAI

## ✅ O Que Foi Feito

Migramos completamente de **Google Gemini** para **OpenAI GPT-3.5-turbo** para resolver o problema de restrições de API key.

### Alterações nos Arquivos:

1. ✅ **[netlify/functions/generate-insights.ts](netlify/functions/generate-insights.ts)**
   - Substituído `GoogleGenAI` por `OpenAI`
   - Variável de ambiente mudou de `GEMINI_API_KEY` para `OPENAI_API_KEY`
   - Usando modelo `gpt-3.5-turbo` (pode trocar para `gpt-4` se quiser)

2. ✅ **[package.json](package.json)**
   - Removido: `@google/genai`
   - Adicionado: `openai`

3. ✅ **Documentação Atualizada:**
   - [OPENAI_SETUP.md](OPENAI_SETUP.md) - Guia completo de configuração
   - [DEPLOY_INSTRUCTIONS.md](DEPLOY_INSTRUCTIONS.md) - Atualizado com OpenAI
   - [.env.example](.env.example) - Atualizado com `OPENAI_API_KEY`

4. ✅ **Frontend**
   - Nenhuma mudança necessária! O [services/geminiService.ts](services/geminiService.ts) continua funcionando da mesma forma

## 🚀 Próximos Passos

### 1. Obter API Key da OpenAI

**IMPORTANTE**: A OpenAI requer créditos pagos ($5 mínimo)

1. Crie conta: https://platform.openai.com/signup
2. Adicione créditos: https://platform.openai.com/account/billing/overview
3. Crie API key: https://platform.openai.com/api-keys
4. Copie a chave (começa com `sk-...`)

### 2. Configurar no Netlify

1. Vá para: https://app.netlify.com/
2. Selecione seu site (shimmering-llama-9010aa)
3. **Site configuration** → **Environment variables**
4. ⚠️ **REMOVA** a variável antiga `GEMINI_API_KEY` (se existir)
5. **Adicione nova variável**:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `sk-sua_chave_aqui`
   - **Scopes**: "All deploys" + "Functions"

### 3. Fazer Deploy

```bash
git add .
git commit -m "Migrar de Google Gemini para OpenAI"
git push origin main
```

O Netlify fará o deploy automaticamente!

### 4. Testar

1. Acesse seu site: https://shimmering-llama-9010aa.netlify.app
2. Faça login
3. Clique em **"Gerar Análise"**
4. Deve funcionar para TODOS os usuários! 🎉

## 💰 Custos

Com o modelo **gpt-3.5-turbo**:
- ~$0.002 por análise
- Com $5 você consegue ~2.500 análises
- Com $10 você consegue ~5.000 análises

**Muito mais barato que você imagina!** 😊

## 🔧 Personalizar o Modelo

Para usar **GPT-4** (melhor qualidade, mais caro):

Edite [netlify/functions/generate-insights.ts](netlify/functions/generate-insights.ts):

```typescript
// Linha ~60
model: 'gpt-4', // Era: 'gpt-3.5-turbo'
```

Faça commit e push. Pronto!

## 📊 Monitorar Uso

Acompanhe seus gastos em:
- https://platform.openai.com/usage

Configure limites em:
- https://platform.openai.com/account/billing/limits

## ❓ Problemas?

Leia o guia completo: [OPENAI_SETUP.md](OPENAI_SETUP.md)

### Erro "Invalid API Key"
- Verifique se a chave começa com `sk-`
- Confirme que a variável no Netlify é `OPENAI_API_KEY`
- Faça um novo deploy

### Erro "Insufficient Quota"
- Você precisa adicionar créditos ($5 mínimo)
- Acesse: https://platform.openai.com/account/billing/overview

## ✨ Benefícios da Migração

- ✅ **Funciona para todos os usuários** (sem restrições)
- ✅ **Mais estável** e confiável
- ✅ **Melhor qualidade** de análises
- ✅ **Fácil de monitorar** custos
- ✅ **Amplamente usado** e documentado

---

**Pronto para fazer o deploy? Siga os passos acima!** 🚀
