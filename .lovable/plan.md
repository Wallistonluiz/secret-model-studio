
# Guia Completo: Integrar Supabase ao Seu Projeto

## Visão Geral
Conectar o Secret Models a um banco de dados Supabase externo com autenticação de usuários.

---

## Passo 1: Criar Projeto no Supabase

1. Acesse **https://supabase.com** e faça login
2. Clique em **"New Project"**
3. Preencha os dados e aguarde 2-3 minutos

---

## Passo 2: Obter Credenciais

No Supabase Dashboard → **Project Settings** → **API**:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: `eyJ...`

---

## Passo 3: Conectar ao Lovable

1. No Lovable, clique no botão **"Supabase"** (canto superior direito)
2. Selecione **"Connect to Supabase"**
3. Cole as credenciais e clique **"Connect"**

---

## Passo 4: Criar Tabelas (Execute no SQL Editor do Supabase)

### 4.1 Tabela `profiles` (Perfis de Usuários)
```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### 4.2 Tabela `models` (Modelos/Perfis das Modelos)
```sql
create table public.models (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer not null,
  description text,
  image_url text,
  is_verified boolean default false,
  location text,
  specialties text[],
  languages text[],
  availability text,
  created_at timestamp with time zone default now()
);
```

### 4.3 Tabela `likes` (Curtidas)
```sql
create table public.likes (
  id uuid primary key default gen_random_uuid(),
  model_id uuid references public.models(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  unique(model_id, user_id)
);
```

### 4.4 Tabela `comments` (Comentários)
```sql
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  model_id uuid references public.models(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  text text not null,
  created_at timestamp with time zone default now()
);
```

### 4.5 Trigger para criar perfil automaticamente
```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'username',
    new.raw_user_meta_data ->> 'display_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## Passo 5: Configurar RLS (Row Level Security)

```sql
-- Habilitar RLS
alter table public.profiles enable row level security;
alter table public.models enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;

-- Profiles: usuário só edita o próprio perfil
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Models: leitura pública
create policy "Models are viewable by everyone"
  on public.models for select using (true);

-- Likes
create policy "Likes are viewable by everyone"
  on public.likes for select using (true);

create policy "Users can insert their own likes"
  on public.likes for insert with check (auth.uid() = user_id);

create policy "Users can delete their own likes"
  on public.likes for delete using (auth.uid() = user_id);

-- Comments
create policy "Comments are viewable by everyone"
  on public.comments for select using (true);

create policy "Users can insert their own comments"
  on public.comments for insert with check (auth.uid() = user_id);

create policy "Users can delete their own comments"
  on public.comments for delete using (auth.uid() = user_id);
```

---

## Passo 6: Próximos Passos

Após conectar o Supabase ao Lovable:

1. ✅ O Lovable criará automaticamente `src/integrations/supabase/`
2. Eu implementarei:
   - Páginas de Login e Cadastro
   - Contexto de autenticação
   - Integração das curtidas/comentários com o banco
   - Carregamento de modelos do banco de dados

---

## Resumo

| Etapa | Ação | Status |
|-------|------|--------|
| 1 | Criar projeto Supabase | ⏳ Você |
| 2 | Copiar credenciais | ⏳ Você |
| 3 | Conectar ao Lovable | ⏳ Você |
| 4 | Criar tabelas (SQL acima) | ⏳ Você |
| 5 | Configurar RLS (SQL acima) | ⏳ Você |
| 6 | Implementar código | 🔜 Eu faço |

---

**👉 Próximo passo:** Crie o projeto no Supabase, execute os SQLs acima e conecte ao Lovable. Me avise quando estiver pronto!
