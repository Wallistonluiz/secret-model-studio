

## Ajustes no Header para Desktop

### Objetivo
1. Remover a frase "Descubra modelos exclusivos" **apenas na versão desktop** (mantendo no mobile)
2. Aumentar bastante o tamanho da logo na versão desktop

### Mudanças Planejadas

**Arquivo:** `src/components/Header.tsx`

1. **Ocultar a frase no desktop:**
   - Adicionar classe condicional na tag `<p>` para escondê-la quando `isMobile === false`
   - A frase continuará visível apenas no mobile

2. **Aumentar a logo no desktop:**
   - Atualmente: `w-28 h-28` (112px)
   - Novo tamanho: `w-48 h-48` (192px) - aumento significativo

### Código Resultante

```tsx
<img 
  src={isMobile ? logoMobile : logo} 
  alt="Secret Models" 
  className={isMobile ? "h-10 object-contain" : "w-48 h-48 object-contain"} 
/>
{isMobile && (
  <p className="text-muted-foreground text-sm mt-1">
    Descubra modelos exclusivos
  </p>
)}
```

### Resultado Esperado
- **Mobile:** Logo compacta + frase visível
- **Desktop:** Logo grande (192px) + sem frase

