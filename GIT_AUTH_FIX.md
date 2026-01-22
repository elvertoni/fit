# 🔧 Corrigir Erro de Autenticação do Git

## ❌ Erro Atual

```
fatal: could not read Username for 'https://github.com': Endereço ou dispositivo inexistente
```

Este erro acontece porque o Git não consegue pedir suas credenciais do GitHub.

## ✅ Solução 1: Usar SSH (Recomendado - Mais Seguro)

### Passo 1: Gerar Chave SSH

```bash
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu_email@exemplo.com"

# Pressione Enter para aceitar o local padrão
# Pressione Enter duas vezes para não usar senha (ou crie uma)
```

### Passo 2: Adicionar Chave ao SSH Agent

```bash
# Iniciar o ssh-agent
eval "$(ssh-agent -s)"

# Adicionar sua chave
ssh-add ~/.ssh/id_ed25519
```

### Passo 3: Copiar Chave Pública

```bash
# Mostrar e copiar a chave pública
cat ~/.ssh/id_ed25519.pub
```

### Passo 4: Adicionar no GitHub

1. Acesse: https://github.com/settings/keys
2. Clique em **"New SSH key"**
3. Cole a chave pública
4. Clique em **"Add SSH key"**

### Passo 5: Mudar Remote para SSH

```bash
cd "/home/toni/Área de trabalho/fit"
git remote set-url origin git@github.com:elvertoni/fit.git
```

### Passo 6: Testar

```bash
# Testar conexão SSH
ssh -T git@github.com

# Fazer push
git push origin main
```

---

## ✅ Solução 2: Usar Personal Access Token (Mais Rápido)

### Passo 1: Criar Token no GitHub

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Dê um nome: "Evolução Fit Deploy"
4. Selecione os escopos:
   - ✅ **repo** (todos os sub-itens)
5. Clique em **"Generate token"**
6. **COPIE O TOKEN** (você não poderá vê-lo novamente!)

### Passo 2: Configurar Credential Helper

```bash
# Configurar Git para armazenar credenciais
git config --global credential.helper store
```

### Passo 3: Fazer Push com Token

```bash
cd "/home/toni/Área de trabalho/fit"

# O Git vai pedir suas credenciais
# Username: seu_usuario_github
# Password: cole_seu_token_aqui (NÃO sua senha!)
git push origin main
```

Após isso, o token ficará salvo e você não precisará digitá-lo novamente.

---

## 🚀 Qual Solução Escolher?

### Use SSH se:
- ✅ Quer a solução mais segura
- ✅ Não se importa em configurar SSH
- ✅ Usa Git frequentemente

### Use Token se:
- ✅ Quer a solução mais rápida
- ✅ É sua primeira vez configurando
- ✅ Não quer lidar com SSH

---

## ⚡ Solução Rápida (Vou Fazer Por Você)

Vou configurar SSH automaticamente. Depois você só precisa:
1. Adicionar a chave no GitHub
2. Fazer push

Aguarde...
