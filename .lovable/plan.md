
# Plano: Sistema de Autenticação Completo

## Resumo
Implementar autenticação de usuários com páginas de Login e Cadastro, contexto de autenticação global, e proteção de rotas.

---

## O que será criado

### 1. Arquivos Novos

| Arquivo | Descrição |
|---------|-----------|
| `src/pages/Login.tsx` | Página de login com email/senha |
| `src/pages/Register.tsx` | Página de cadastro com username, email e senha |
| `src/contexts/AuthContext.tsx` | Contexto global de autenticação |
| `src/components/ProtectedRoute.tsx` | Componente para proteger rotas |

### 2. Arquivos Modificados

| Arquivo | Modificação |
|---------|-------------|
| `src/App.tsx` | Adicionar rotas de login/cadastro e provider de auth |
| `src/components/BottomNav.tsx` | Adicionar botão de perfil/logout |
| `src/pages/Splash.tsx` | Redirecionar para /home se já logado |

---

## Fluxo de Autenticação

```text
Usuário abre o app
       |
       v
  [Splash Page]
       |
       +---> Logado? ---> [/home]
       |
       +---> Não logado ---> [Botão "Entrar"]
                               |
                               v
                           [/login]
                               |
                 +-------------+-------------+
                 |                           |
                 v                           v
        [Fazer Login]              [Ir para /register]
                 |                           |
                 v                           v
           [/home]                  [Criar Conta]
                                             |
                                             v
                                       [/home]
```

---

## Detalhes das Páginas

### Página de Login (`/login`)
- Campo de email
- Campo de senha
- Botão "Entrar"
- Link para cadastro ("Não tem conta? Cadastre-se")
- Mensagens de erro amigáveis
- Design consistente com o tema roxo/rosa do app

### Página de Cadastro (`/register`)
- Campo de username
- Campo de nome de exibição
- Campo de email
- Campo de senha (mínimo 6 caracteres)
- Botão "Criar Conta"
- Link para login ("Já tem conta? Faça login")
- Validação de formulário

---

## Contexto de Autenticação

O `AuthContext` irá:
- Gerenciar o estado do usuário logado
- Fornecer funções: `signIn`, `signUp`, `signOut`
- Usar `onAuthStateChange` do Supabase para sincronização
- Carregar sessão existente ao iniciar o app

---

## Segurança

- Senhas nunca são armazenadas localmente
- Sessão gerenciada pelo Supabase
- Tokens de autenticação seguros
- Perfil criado automaticamente via trigger no banco

---

## Detalhes Técnicos

### Dependências utilizadas
- `@supabase/supabase-js` (já incluído via integração Lovable)
- `react-hook-form` + `zod` (validação de formulários)
- Componentes UI existentes (Button, Input, Form, Card)

### Estrutura do AuthContext
```text
AuthContext
├── user: User | null
├── session: Session | null
├── loading: boolean
├── signIn(email, password)
├── signUp(email, password, metadata)
└── signOut()
```

### Rotas do App
```text
/           -> Splash (tela inicial com vídeo)
/login      -> Login
/register   -> Cadastro
/home       -> Feed de modelos
/model/:id  -> Perfil da modelo
```

---

## Ordem de Implementação

1. Criar cliente Supabase (`src/integrations/supabase/client.ts`)
2. Criar `AuthContext` com toda a lógica de autenticação
3. Criar página de Login com formulário validado
4. Criar página de Cadastro com formulário validado
5. Atualizar `App.tsx` com novas rotas e AuthProvider
6. Atualizar `BottomNav` com indicador de usuário logado
7. Testar fluxo completo

---

## Resultado Final

Após a implementação:
- Usuários poderão criar conta e fazer login
- Sessão persistida entre visitas
- Perfil criado automaticamente no banco
- Interface responsiva e consistente com o design atual
