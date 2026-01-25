

# Guia Completo: Deploy no EasyPanel (Passo a Passo para Iniciantes)

## O Que Vamos Fazer?
Vamos colocar seu site no ar em um servidor próprio (VPS), usando:
- **GitHub**: Para guardar e sincronizar o código
- **EasyPanel**: Painel simples para gerenciar o servidor
- **Docker**: "Caixa" que empacota seu site para rodar em qualquer lugar

---

## PARTE 1: Preparar os Arquivos (eu faço isso para você)

Vou criar 3 arquivos no seu projeto:

### Arquivo 1: `Dockerfile`
Este arquivo ensina o servidor a construir e rodar seu site.

### Arquivo 2: `nginx.conf`  
Configuração do servidor web que vai servir as páginas.

### Arquivo 3: `.dockerignore`
Lista de arquivos que não precisam ir para o servidor.

---

## PARTE 2: Conectar GitHub ao Lovable

### Passo 1: Abrir configurações do GitHub
1. No Lovable, clique no botão **"GitHub"** no canto superior direito
2. Clique em **"Connect to GitHub"**

### Passo 2: Autorizar o Lovable
1. Uma janela do GitHub vai abrir
2. Clique em **"Authorize Lovable"** (botão verde)
3. Escolha sua conta do GitHub

### Passo 3: Criar o Repositório
1. Volte ao Lovable
2. Clique em **"Create Repository"**
3. Escolha um nome (ex: `secretmodels-vip`)
4. Pronto! Seu código está no GitHub

---

## PARTE 3: Configurar sua VPS

### Passo 1: Contratar uma VPS
Provedores recomendados (baratos e bons):
- **Hostinger VPS**: A partir de R$25/mês
- **Contabo**: A partir de $5/mês
- **DigitalOcean**: A partir de $6/mês

Requisitos mínimos:
- 1 CPU
- 1GB RAM
- 20GB SSD
- Ubuntu 22.04

### Passo 2: Acessar sua VPS
1. Você vai receber um **IP** e **senha** por email
2. No Windows, baixe o programa **PuTTY** (gratuito)
3. No Mac/Linux, abra o **Terminal**
4. Digite: `ssh root@SEU_IP_AQUI`
5. Digite a senha quando pedir

---

## PARTE 4: Instalar o EasyPanel

### Passo 1: Instalar com um comando
No terminal da VPS, cole este comando e aperte Enter:

```
curl -sSL https://get.easypanel.io | sh
```

Aguarde 2-3 minutos até aparecer "EasyPanel installed successfully"

### Passo 2: Acessar o EasyPanel
1. No navegador, acesse: `http://SEU_IP_AQUI:3000`
2. Crie uma conta de administrador
3. Defina uma senha forte

---

## PARTE 5: Criar o App no EasyPanel

### Passo 1: Criar novo projeto
1. No EasyPanel, clique em **"+ Create Project"**
2. Dê um nome: `secretmodels`
3. Clique em **"Create"**

### Passo 2: Adicionar o App
1. Dentro do projeto, clique em **"+ Create Service"**
2. Escolha **"App"**
3. Dê um nome: `website`

### Passo 3: Conectar ao GitHub
1. Na aba **"Source"**, clique em **"GitHub"**
2. Clique em **"Connect GitHub Account"**
3. Autorize o EasyPanel a acessar seu GitHub
4. Selecione o repositório que criamos (`secretmodels-vip`)

### Passo 4: Configurar o Build
1. Em **"Build"**, selecione **"Dockerfile"**
2. Em **"Dockerfile Path"**, deixe: `Dockerfile`
3. Em **"Port"**, digite: `80`

### Passo 5: Fazer o Deploy
1. Clique no botão **"Deploy"**
2. Aguarde 2-5 minutos (vai aparecer um log)
3. Quando aparecer "Deployed successfully", está pronto!

---

## PARTE 6: Configurar seu Domínio

### Passo 1: Adicionar domínio no EasyPanel
1. Vá em **"Domains"** dentro do app
2. Clique em **"+ Add Domain"**
3. Digite seu domínio: `seudominio.com.br`
4. Ative **"HTTPS"** (SSL gratuito)

### Passo 2: Configurar DNS do domínio
No painel do seu registrador de domínio (ex: Registro.br, GoDaddy):

1. Encontre **"DNS"** ou **"Gerenciar DNS"**
2. Adicione um registro **tipo A**:
   - Nome: `@`
   - Valor: `IP_DA_SUA_VPS`
3. Adicione outro registro **tipo A**:
   - Nome: `www`
   - Valor: `IP_DA_SUA_VPS`
4. Aguarde até 24h para propagar

---

## PARTE 7: Deploy Automático

### Configurar Auto-Deploy
1. No EasyPanel, vá em **"Source"**
2. Ative **"Auto Deploy"**
3. Agora, toda vez que você fizer mudanças no Lovable, o site atualiza sozinho!

---

## Resumo do Fluxo

```text
┌─────────────┐     ┌──────────┐     ┌───────────┐     ┌─────────┐
│   Lovable   │ --> │  GitHub  │ --> │ EasyPanel │ --> │   VPS   │
│  (editar)   │     │ (codigo) │     │  (deploy) │     │ (site)  │
└─────────────┘     └──────────┘     └───────────┘     └─────────┘
```

---

## Arquivos que Vou Criar

| Arquivo | Descrição |
|---------|-----------|
| `Dockerfile` | Instrucoes para construir o container |
| `nginx.conf` | Configuracao do servidor web |
| `.dockerignore` | Arquivos a ignorar no build |

---

## Proximo Passo

Quando você aprovar este plano, vou criar os 3 arquivos necessários. Depois, é só seguir os passos acima para:
1. Conectar o GitHub
2. Instalar o EasyPanel na VPS
3. Fazer o deploy

