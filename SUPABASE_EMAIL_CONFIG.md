# 📧 Configuração de Email no Supabase

## Configurar Redirect após Verificação de Email

Para que os usuários sejam redirecionados automaticamente para o seu site após confirmarem o email, siga estes passos:

### Passo 1: Acessar o Dashboard do Supabase

1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto
3. No menu lateral, clique em **Authentication** → **URL Configuration**

### Passo 2: Configurar Site URL

1. Em **"Site URL"**, adicione:
   ```
   https://shimmering-llama-9010aa.netlify.app
   ```

2. Em **"Redirect URLs"**, adicione:
   ```
   https://shimmering-llama-9010aa.netlify.app/**
   http://localhost:5173/**
   ```

   ⚠️ O `/**` no final é importante para permitir qualquer path!

3. Clique em **"Save"**

### Passo 3: Configurar Template de Email (Opcional)

Para personalizar o email de confirmação:

1. No Supabase Dashboard, vá em **Authentication** → **Email Templates**
2. Selecione **"Confirm signup"**
3. Personalize o template (opcional)
4. Certifique-se de que o link `{{ .ConfirmationURL }}` está presente

### Passo 4: Testar

1. Faça o deploy no Netlify
2. Acesse o site e crie uma nova conta
3. Verifique se recebe o email
4. Clique no link de confirmação
5. Você deve ser redirecionado automaticamente para o site e logado!

## Como Funciona

Quando um usuário se cadastra:
1. ✅ Mostramos a tela de verificação de email ([EmailVerification.tsx](components/EmailVerification.tsx))
2. 📧 O Supabase envia um email com o link de confirmação
3. 🔗 O link redireciona para `https://shimmering-llama-9010aa.netlify.app`
4. ✨ O Supabase automaticamente loga o usuário
5. 🎉 O App.tsx detecta a sessão e mostra o Dashboard/Onboarding

## Desenvolvimento Local

Para testar localmente:

1. Configure também o localhost nas Redirect URLs:
   ```
   http://localhost:5173/**
   http://localhost:8888/**
   ```

2. No código ([Auth.tsx:27](components/Auth.tsx#L27)), usamos:
   ```typescript
   emailRedirectTo: `${window.location.origin}`
   ```

   Isso automaticamente detecta se está em produção ou local!

## Desabilitar Confirmação de Email (Não Recomendado)

Se quiser desabilitar a confirmação de email (para testes):

1. Supabase Dashboard → **Authentication** → **Settings**
2. Desmarque **"Enable email confirmations"**
3. ⚠️ **NÃO recomendado para produção!**

## Problemas Comuns

### Email não chega
- Verifique a caixa de spam
- Verifique se o email está correto
- Use o botão "Reenviar email" na tela de verificação

### Redirect não funciona
- Verifique se a Site URL e Redirect URLs estão configuradas
- Certifique-se de que o `/**` está no final das URLs
- Aguarde alguns minutos após salvar as configurações

### "Email rate limit exceeded"
- O Supabase limita emails para evitar spam
- Aguarde alguns minutos antes de tentar novamente

## Personalizar Mensagens de Email

Você pode personalizar os emails em:
**Authentication** → **Email Templates**

Templates disponíveis:
- **Confirm signup** - Email de confirmação de cadastro
- **Magic Link** - Login sem senha
- **Change Email Address** - Mudança de email
- **Reset Password** - Recuperação de senha

Edite o HTML e use variáveis como:
- `{{ .ConfirmationURL }}` - Link de confirmação
- `{{ .SiteURL }}` - URL do seu site
- `{{ .Token }}` - Token de verificação

## ✅ Checklist de Configuração

- [ ] Site URL configurada no Supabase
- [ ] Redirect URLs configuradas (com `/**`)
- [ ] Deploy feito no Netlify
- [ ] Testado criação de conta
- [ ] Email recebido e link funciona
- [ ] Usuário redirecionado e logado automaticamente

Pronto! Agora seus usuários terão uma experiência fluida de cadastro e verificação! 🎉
