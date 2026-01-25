
# Guia Completo: Integrar Supabase ao Seu Projeto

## Visao Geral
Vamos conectar seu projeto Secret Models a um banco de dados Supabase externo. Isso permitira armazenar dados reais de modelos, usuarios, comentarios e curtidas.

---

## Passo 1: Criar Projeto no Supabase (se ainda nao tiver)

1. Acesse **https://supabase.com** e faca login
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: `secret-models` (ou nome de sua preferencia)
   - **Database Password**: Anote esta senha em local seguro
   - **Region**: Escolha a mais proxima (South America se disponivel)
4. Clique em **"Create new project"** e aguarde 2-3 minutos

---

## Passo 2: Obter Credenciais do Supabase

1. No dashboard do Supabase, va em **Project Settings** (icone de engrenagem)
2. Clique em **API** no menu lateral
3. Copie estas informacoes:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Uma chave longa que comeca com `eyJ...`

---

## Passo 3: Conectar Supabase ao Lovable

1. No Lovable, clique no botao **"Supabase"** no canto superior direito
2. Selecione **"Connect to Supabase"**
3. Cole as credenciais:
   - **Project URL**
   - **Anon Key**
4. Clique em **"Connect"**

---

## Passo 4: Criar Tabelas no Banco de Dados

Apos conectar, criaremos as tabelas necessarias para sua aplicacao:

### Tabela `models` (Modelos/Perfis)
```sql
create table public.models (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer not null,
  description text,
  image_url text,
  is_verified boolean default false,
  created_at timestamp with time zone default now()
);
```

### Tabela `likes` (Curtidas)
```sql
create table public.likes (
  id uuid primary key default gen_random_uuid(),
  model_id uuid references public.models(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(model_id, user_id)
);
```

### Tabela `comments` (Comentarios)
```sql
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  model_id uuid references public.models(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  text text not null,
  created_at timestamp with time zone default now()
);
```

---

## Passo 5: Configurar Seguranca (RLS)

Habilitaremos Row Level Security para proteger os dados:

```sql
-- Habilitar RLS em todas as tabelas
alter table public.models enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;

-- Politicas para models (leitura publica)
create policy "Models are viewable by everyone"
  on public.models for select
  using (true);

-- Politicas para likes
create policy "Likes are viewable by everyone"
  on public.likes for select
  using (true);

create policy "Users can insert their own likes"
  on public.likes for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own likes"
  on public.likes for delete
  using (auth.uid() = user_id);

-- Politicas para comments
create policy "Comments are viewable by everyone"
  on public.comments for select
  using (true);

create policy "Users can insert their own comments"
  on public.comments for insert
  with check (auth.uid() = user_id);
```

---

## Passo 6: Atualizar Codigo do Projeto

Apos conectar o Supabase, o Lovable criara automaticamente:
- Arquivo `src/integrations/supabase/client.ts` (cliente Supabase)
- Arquivo `src/integrations/supabase/types.ts` (tipos TypeScript)

Depois atualizaremos:
1. **ModelCard.tsx** - Buscar e salvar curtidas/comentarios do banco
2. **Index.tsx** - Carregar modelos do banco de dados
3. **ModelProfile.tsx** - Exibir dados reais do modelo

---

## Passo 7: Configurar EasyPanel (Deploy)

Para o deploy funcionar, adicione as variaveis de ambiente no EasyPanel:

1. Va em **Environment** (Ambiente) no seu servico
2. Adicione:
   - `VITE_SUPABASE_URL` = sua URL do projeto
   - `VITE_SUPABASE_ANON_KEY` = sua chave anon

---

## Resumo dos Proximos Passos

| Etapa | Acao | Onde |
|-------|------|------|
| 1 | Criar projeto Supabase | supabase.com |
| 2 | Copiar URL e Anon Key | Supabase Dashboard |
| 3 | Conectar ao Lovable | Botao Supabase no Lovable |
| 4 | Criar tabelas | SQL Editor do Supabase |
| 5 | Configurar RLS | SQL Editor do Supabase |
| 6 | Atualizar codigo | Lovable (eu farei isso) |
| 7 | Configurar deploy | EasyPanel |

---

## Voce precisa de autenticacao de usuarios?

Antes de prosseguir, preciso saber:
- **Usuarios poderao criar conta e fazer login?**
- **Voce precisa armazenar perfis de usuarios** (nome, avatar, preferencias)?

Isso definira se precisamos criar tabelas e fluxos adicionais de autenticacao.
