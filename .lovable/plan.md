

## Logo ao Lado da Barra de Pesquisa (Desktop)

### Objetivo
Reorganizar o layout do desktop para que a logomarca fique posicionada ao lado da barra de pesquisa, abaixo dos Stories.

### Novo Layout Desktop

```text
┌─────────────────────────────────────────────────────────────────┐
│           [Stories avatares centralizados...]                   │
├─────────────────────────────────────────────────────────────────┤
│   [LOGO]        [Barra de Search centralizada]                  │
├─────────────────────────────────────────────────────────────────┤
│                    [Card Modelo 1]                              │
│                    [Card Modelo 2]                              │
│                        ...                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Mudanças Técnicas

**Arquivo: `src/pages/Index.tsx`**

1. **Remover a logo do header desktop** - A logo não ficará mais no topo com posicionamento absoluto

2. **Criar container flex para Logo + Search** - Novo container horizontal que agrupa a logo e o SearchPrompt lado a lado

3. **Mover a logo para dentro do main** - A logo ficará ao lado esquerdo da barra de pesquisa

### Estrutura do Código Proposta

```tsx
{isMobile ? (
  <>
    <Header />
    <Stories />
  </>
) : (
  // Desktop: Stories centralizados no topo (sem logo)
  <div className="px-6 py-4">
    <div className="flex justify-center">
      <Stories />
    </div>
  </div>
)}

<main className="flex-1 px-4 pb-24 pt-4 overflow-y-auto">
  {/* Desktop: Logo + Search lado a lado */}
  {!isMobile && (
    <div className="flex items-center gap-6 mb-8 animate-fade-in">
      <img 
        src={logo} 
        alt="Secret Models" 
        className="w-32 h-32 object-contain flex-shrink-0" 
      />
      <div className="flex-1">
        <SearchPrompt />
      </div>
    </div>
  )}
  
  {/* Mobile: Search sozinho */}
  {isMobile && (
    <div className="mb-8 animate-fade-in">
      <SearchPrompt />
    </div>
  )}
  
  {/* Model Cards */}
  ...
</main>
```

### Resultado Esperado
- **Desktop:** Stories centralizados no topo, logo à esquerda da barra de pesquisa abaixo
- **Mobile:** Layout vertical mantido sem alterações

