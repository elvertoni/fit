# 🔑 Configuração da API Key do Google Gemini

## Problema: Apenas Você Consegue Usar a Análise de IA

Se apenas você consegue usar a funcionalidade de análise com IA e outros usuários recebem erros, provavelmente sua **API Key tem restrições configuradas**.

## ✅ Solução: Remover Restrições da API Key

### Passo 1: Acesse o Google AI Studio

1. Vá para: https://aistudio.google.com/app/apikey
2. Faça login com sua conta Google
3. Localize sua API Key na lista

### Passo 2: Editar Restrições da API Key

1. Clique nos **três pontos (⋮)** ao lado da sua API key
2. Selecione **"Edit API Key"** ou **"API key restrictions"**
3. Você verá a página de configurações da chave

### Passo 3: Configurar Sem Restrições (Recomendado para Netlify Functions)

Existem duas opções:

#### Opção 1: Sem Restrições (Mais Simples) ⭐ RECOMENDADO

- Em **"Application restrictions"**, selecione: **"None"**
- Isso permite que a API key funcione de qualquer origem
- É seguro porque a key está protegida na função serverless do Netlify
- A key nunca é exposta ao navegador do usuário

#### Opção 2: Com Restrições de HTTP referrers (Mais Complexo)

Se você quiser manter restrições, adicione:
- `https://shimmering-llama-9010aa.netlify.app/*`
- `https://*.netlify.app/*` (para permitir preview deploys)
- `http://localhost:*` (para desenvolvimento local)

**IMPORTANTE**: Como a chamada é feita pela função serverless (não pelo navegador), HTTP referrers podem NÃO funcionar corretamente. Use "None" se tiver problemas.

### Passo 4: Salvar as Alterações

1. Clique em **"Save"**
2. Aguarde alguns minutos para as alterações serem propagadas

### Passo 5: Testar com Outro Usuário

1. Peça para outro usuário acessar seu site
2. Teste a funcionalidade "Gerar Análise"
3. Deve funcionar agora! 🎉

## 🔍 Verificar Quotas e Limites

Outra razão comum para falhas é exceder a quota gratuita:

1. Acesse: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas
2. Verifique suas quotas:
   - **Requests per minute**: Limite de requisições por minuto
   - **Requests per day**: Limite de requisições por dia
   - **Tokens per minute**: Limite de tokens processados

### Planos do Google Gemini API

- **Gratuito**: 15 requisições/minuto, 1500 requisições/dia
- **Pago**: Limites maiores e mais features

Se estiver atingindo limites, considere:
- Fazer upgrade para plano pago
- Implementar cache de respostas
- Adicionar rate limiting no frontend

## 🐛 Debug: Verificar Logs no Netlify

Para ver exatamente qual erro está ocorrendo:

1. Acesse: https://app.netlify.com/
2. Selecione seu site (shimmering-llama-9010aa)
3. Vá em **"Functions"** → **"generate-insights"**
4. Clique em **"Function log"**
5. Procure por erros como:
   - `API Key restriction detected` → Problema de restrições
   - `Quota/Rate limit exceeded` → Quota excedida
   - `API key issue detected` → API key inválida ou expirada

## ⚠️ Checklist de Problemas Comuns

- [ ] API Key configurada no Netlify (variável `GEMINI_API_KEY`)
- [ ] API Key sem restrições ou com domínio correto
- [ ] Quota da API não excedida
- [ ] Deploy feito após configurar a variável
- [ ] Aguardou alguns minutos após salvar restrições

## 🆘 Ainda Não Funciona?

Se após seguir todos os passos ainda não funcionar:

1. **Crie uma nova API Key**:
   - Vá para https://aistudio.google.com/app/apikey
   - Clique em "Create API Key"
   - Escolha "None" em restrições
   - Copie a nova chave

2. **Atualize a variável no Netlify**:
   - Vá para Netlify Dashboard
   - Site configuration → Environment variables
   - Atualize `GEMINI_API_KEY` com a nova chave
   - Faça um novo deploy (ou clique em "Trigger deploy")

3. **Verifique os logs do navegador**:
   - Abra o console do navegador (F12)
   - Tente gerar uma análise
   - Veja o erro exato que aparece
   - Compartilhe o erro para debug

## 📧 Suporte

Se precisar de ajuda adicional:
- Verifique a documentação do Google Gemini: https://ai.google.dev/gemini-api/docs
- Verifique os logs de função no Netlify
- Teste localmente com `netlify dev` para reproduzir o erro
