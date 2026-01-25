

# Plano: Duplo Clique para Curtir nos Cards

## Objetivo
Implementar um sistema onde:
- **1 clique** = Navega para o perfil da modelo
- **2 cliques rápidos (duplo clique)** = Curte automaticamente (estilo Instagram)

## Solução Técnica

### Lógica de Detecção de Clique

Vou usar um sistema baseado em **timeout** para distinguir clique simples de duplo clique:

1. No primeiro clique, inicia um timer de ~300ms
2. Se houver segundo clique antes do timer expirar = duplo clique (curtir)
3. Se o timer expirar sem segundo clique = clique simples (navegar)

### Mudanças no `src/components/ModelCard.tsx`:

**1. Adicionar ref para controlar o timer:**
```tsx
import { useState, useRef } from "react";
// ...
const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
```

**2. Criar nova função de duplo clique para curtir:**
```tsx
const handleDoubleTapLike = () => {
  if (!user) {
    toast({
      title: "Login necessário",
      description: "Faça login para curtir este perfil",
    });
    navigate("/login");
    return;
  }
  
  // Só curte se ainda não tiver curtido
  if (!liked) {
    setLiked(true);
    setLikes(prev => prev + 1);
    // Opcional: feedback visual (animação de coração)
  }
};
```

**3. Substituir `onClick` por lógica de detecção:**
```tsx
const handleCardInteraction = () => {
  if (clickTimeoutRef.current) {
    // Segundo clique rápido = duplo clique
    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = null;
    handleDoubleTapLike();
  } else {
    // Primeiro clique - aguarda para ver se vem outro
    clickTimeoutRef.current = setTimeout(() => {
      clickTimeoutRef.current = null;
      handleCardClick(); // Navega para o perfil
    }, 300); // 300ms de intervalo
  }
};
```

**4. Limpar timer no unmount:**
```tsx
import { useState, useRef, useEffect } from "react";

useEffect(() => {
  return () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
  };
}, []);
```

**5. Atualizar o elemento div principal:**
```tsx
<div 
  className="relative w-full max-w-sm mx-auto animate-fade-in-up cursor-pointer" 
  style={{ animationDelay: "0.2s" }}
  onClick={handleCardInteraction}  // Mudança aqui
>
```

## Resultado Esperado

| Ação | Comportamento |
|------|---------------|
| 1 clique (espera 300ms) | Navega para `/model/:id` |
| 2 cliques rápidos | Curte a foto (coração fica vermelho) |
| Duplo clique sem login | Mostra toast e redireciona para login |
| Duplo clique já curtido | Não faz nada (evita descurtir acidentalmente) |

## Detalhes Adicionais

- O delay de 300ms é padrão para detecção de duplo clique
- Funciona bem tanto em desktop quanto em mobile (touch)
- A lógica existente de verificação de login é reaproveitada
- Os botões de ação (curtir, comentar, compartilhar) continuam funcionando normalmente com `stopPropagation`

