
# Plano: Autenticacao por Username + Senha

## Visao Geral

Remover o campo de email visivel e usar username + senha para autenticacao. Internamente, o sistema vai gerar um email automatico baseado no username para satisfazer os requisitos do Supabase Auth.

## Como Vai Funcionar

```text
CADASTRO:
Usuario digita: username, nome, genero, senha
Sistema gera: username@secretmodels.app (invisivel)
Supabase recebe: email gerado + senha

LOGIN:
Usuario digita: username + senha
Sistema converte: username -> username@secretmodels.app
Supabase valida: email gerado + senha
```

## Arquivos a Modificar

### 1. src/pages/Register.tsx

**Remover:**
- Campo de email do formulario
- Validacao de email no schema

**Modificar:**
- Schema com apenas: username, displayName, gender, password (todos obrigatorios)
- No onSubmit: gerar email automatico `${username}@secretmodels.app`

```typescript
// Schema atualizado
const registerSchema = z.object({
  username: z.string().trim()
    .min(3, { message: 'Username deve ter no minimo 3 caracteres' })
    .max(20, { message: 'Username deve ter no maximo 20 caracteres' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username so pode conter letras, numeros e underscore' }),
  displayName: z.string().trim()
    .min(2, { message: 'Nome deve ter no minimo 2 caracteres' })
    .max(50, { message: 'Nome deve ter no maximo 50 caracteres' }),
  gender: z.enum(['male', 'female'], { required_error: 'Selecione seu genero' }),
  password: z.string().min(6, { message: 'Senha deve ter no minimo 6 caracteres' }),
});

// No onSubmit
const generatedEmail = `${data.username.toLowerCase()}@secretmodels.app`;
await signUp(generatedEmail, data.password, { ... });
```

### 2. src/pages/Login.tsx

**Modificar:**
- Trocar campo "Email" por "Username"
- Schema validar username ao inves de email
- No onSubmit: converter username para email gerado

```typescript
// Schema atualizado
const loginSchema = z.object({
  username: z.string().trim()
    .min(3, { message: 'Username deve ter no minimo 3 caracteres' }),
  password: z.string().min(6, { message: 'Senha deve ter no minimo 6 caracteres' }),
});

// No onSubmit
const generatedEmail = `${data.username.toLowerCase()}@secretmodels.app`;
await signIn(generatedEmail, data.password);

// Mensagem de erro atualizada
setError('Username ou senha incorretos');
```

## Campos do Formulario de Cadastro (ordem)

| Campo | Label | Tipo | Obrigatorio |
|-------|-------|------|-------------|
| username | Username | text | Sim |
| displayName | Nome de Exibicao | text | Sim |
| gender | Genero | radio (Feminino/Masculino) | Sim |
| password | Senha | password | Sim |

## Campos do Formulario de Login

| Campo | Label | Tipo |
|-------|-------|------|
| username | Username | text |
| password | Senha | password |

## Detalhes Tecnicos

### Geracao de Email Automatico
- Formato: `{username}@secretmodels.app`
- Username convertido para minusculas para consistencia
- Email gerado nao e visivel para o usuario em nenhum momento

### Tratamento de Erros
- "already registered" -> "Este username ja esta cadastrado"
- "Invalid login credentials" -> "Username ou senha incorretos"

## Resumo das Alteracoes

| Arquivo | Alteracao |
|---------|-----------|
| src/pages/Register.tsx | Remover campo email, gerar email automatico do username |
| src/pages/Login.tsx | Trocar campo email por username, converter para email no login |

## Resultado Final

- Usuario ve apenas: Username, Nome, Genero, Senha no cadastro
- Usuario ve apenas: Username, Senha no login
- Email e gerado automaticamente e fica invisivel
- Sistema funciona normalmente com Supabase Auth
