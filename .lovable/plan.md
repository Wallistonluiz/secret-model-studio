
# Plano: Adicionar Link "Voltar para Home" na Tela de Login

## Problema Identificado

Quando o usuario nao esta logado e tenta acessar funcoes restritas (como perfil), ele e redirecionado para a tela de login. Porem, nao existe opcao para voltar a home (pagina de acesso livre) - o usuario fica "preso" na tela de login.

## Solucao

Adicionar um link "Continuar sem conta" ou "Voltar para Home" na parte inferior da tela de login, permitindo que o usuario retorne ao feed de modelos sem precisar fazer login.

## Alteracao Necessaria

### Login.tsx

Adicionar um link abaixo do "Nao tem conta? Cadastre-se" para voltar a home:

```text
+----------------------------------+
|           [Logo]                 |
|                                  |
|         Entrar                   |
|   Acesse sua conta para continuar|
|                                  |
|   [Email]                        |
|   [Senha]                        |
|                                  |
|   [Entrar]                       |
|                                  |
|   Nao tem conta? Cadastre-se     |
|                                  |
|   <-- Voltar para Home           |  <-- NOVO
+----------------------------------+
```

## Detalhes Tecnicos

Na linha 133, apos o link de cadastro, adicionar:

```typescript
<div className="mt-4 text-center">
  <Link 
    to="/home" 
    className="text-muted-foreground hover:text-foreground text-sm flex items-center justify-center gap-1"
  >
    <ArrowLeft className="h-4 w-4" />
    Voltar para Home
  </Link>
</div>
```

Tambem sera necessario importar o icone `ArrowLeft` do lucide-react.

## Arquivo a Ser Modificado

- `src/pages/Login.tsx` - Adicionar link de retorno para /home

## Resultado Final

- Usuario pode voltar a home sem precisar fazer login
- Melhora a experiencia do usuario que so quer navegar o feed
- O fluxo de acesso livre fica completo
