
# Plano: Remover Ícone do Topo do Card

## Objetivo
Remover o ícone de usuário verificado que aparece no canto superior direito do card da modelo.

## O que será alterado

### Arquivo: `src/components/ModelCard.tsx`

1. **Remover o import** do `verifiedIcon` (linha 4)
2. **Remover o elemento `<img>`** que exibe o ícone no topo direito (linhas 100-105)

O badge de verificado ao lado do nome (na parte inferior) será mantido, pois só estamos removendo o ícone do topo.

---

## Detalhes Tecnicos

### Codigo a ser removido

**Import (linha 4):**
```tsx
import verifiedIcon from "@/assets/usuario-verificado.png";
```

**Elemento (linhas 100-105):**
```tsx
{/* Verified badge */}
<img 
  src={verifiedIcon} 
  alt="Usuário verificado" 
  className="absolute top-3 right-3 w-8 h-8 z-10 pointer-events-none"
/>
```

### Resultado
O card ficará mais limpo, com apenas o badge de verificado ao lado do nome na parte inferior.
