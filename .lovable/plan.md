
# Plano: Ícone Padrão para Usuário Deslogado

## Problema Atual
Quando o usuário não está logado, o BottomNav mostra a letra "U" dentro do avatar como fallback, o que não é intuitivo.

## Solução
Mostrar o ícone `User` do Lucide (ícone de perfil padrão) quando o usuário estiver deslogado, mantendo o avatar com foto/inicial apenas para usuários logados.

## Mudança Técnica

### Arquivo: `src/components/BottomNav.tsx`

1. Importar o ícone `User` do Lucide
2. Modificar a renderização do item de perfil para verificar se há usuário logado

```tsx
// Antes (linha 105-111):
{isAvatar ? (
  <Avatar className={`${isActive ? "w-9 h-9 ring-2 ring-white" : "w-8 h-8"}`}>
    <AvatarImage src={avatarUrl || ""} alt="Perfil" />
    <AvatarFallback className="bg-muted text-xs">
      {user?.email?.charAt(0).toUpperCase() || "U"}
    </AvatarFallback>
  </Avatar>
)

// Depois:
{isAvatar ? (
  user ? (
    <Avatar className={`${isActive ? "w-9 h-9 ring-2 ring-white" : "w-8 h-8"}`}>
      <AvatarImage src={avatarUrl || ""} alt="Perfil" />
      <AvatarFallback className="bg-muted text-xs">
        {user.email?.charAt(0).toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  ) : (
    <>
      <User className="w-5 h-5" />
      <span className="text-xs font-medium">Perfil</span>
    </>
  )
)
```

## Resultado Visual

```text
Deslogado:                    Logado:
+-------+                     +-------+
|  👤   |  ← Ícone User       |  📷   |  ← Avatar/Foto
| Perfil|                     |       |  (sem texto)
+-------+                     +-------+
```

## O que NÃO muda
- Comportamento do clique (redireciona para login se deslogado)
- Estilo do item ativo com gradiente
- Avatar do usuário logado continua igual
