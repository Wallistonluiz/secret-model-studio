

## Adicionar Ícone de Usuário Verificado no Card da Modelo

### Objetivo
Adicionar o ícone de "usuário verificado" (enviado pelo usuário) no canto superior direito do card da modelo Isabella.

### O que será feito

1. **Copiar a imagem** do ícone para a pasta `src/assets/` com o nome `usuario-verificado.png`

2. **Importar a imagem** no componente `ModelCard.tsx`

3. **Adicionar o ícone** posicionado no canto superior direito do card, dentro do container que possui `relative` e `rounded-3xl`

### Detalhes Técnicos

**Arquivo:** `src/components/ModelCard.tsx`

**Posicionamento do ícone:**
- Usar `position: absolute` com `top-3 right-3` para posicionar no canto superior direito
- Tamanho de aproximadamente 32-40px (`w-8 h-8` ou `w-10 h-10`)
- Z-index para garantir que fique sobre a imagem

**Estrutura do código a ser adicionado:**
```tsx
{/* Verified badge */}
<img 
  src={verifiedIcon} 
  alt="Usuário verificado" 
  className="absolute top-3 right-3 w-8 h-8 z-10"
/>
```

### Resultado Esperado
O ícone de verificação aparecerá no canto superior direito do card, indicando que a modelo é uma usuária verificada na plataforma.

