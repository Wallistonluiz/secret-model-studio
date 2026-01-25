

## Layout Desktop Reorganizado: Logo + Stories no Topo

### Objetivo
Reorganizar o layout no desktop para que a logo e os Stories fiquem na mesma linha no topo, com a barra de Search logo abaixo, seguida pelos cards das modelos.

### Layout Final

**Desktop:**
```text
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO 192px]        [Stories avatares em linha...]            │
├─────────────────────────────────────────────────────────────────┤
│              [Barra de Search centralizada]                     │
├─────────────────────────────────────────────────────────────────┤
│                    [Card Modelo 1]                              │
│                    [Card Modelo 2]                              │
│                        ...                                      │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile (sem alterações):**
- Logo centralizada
- Stories em carrossel abaixo
- Search abaixo
- Cards abaixo

### Mudanças Técnicas

**1. Arquivo: `src/pages/Index.tsx`**
- Importar o hook `useIsMobile`
- Criar layout condicional:
  - **Desktop:** Container flex com Logo + Stories lado a lado, depois Search, depois Cards
  - **Mobile:** Manter estrutura atual vertical

**2. Arquivo: `src/components/Header.tsx`**
- Exportar apenas a logo para ser usada separadamente no Index (desktop)
- Ou criar um componente `Logo` reutilizável

**3. Arquivo: `src/components/Stories.tsx`**
- No desktop, ajustar para que os avatares fiquem alinhados à direita/centro da logo

### Estrutura do Código (Index.tsx)

```tsx
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/assets/logo.png";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {isMobile ? (
        // Mobile: Layout vertical original
        <>
          <Header />
          <Stories />
        </>
      ) : (
        // Desktop: Logo + Stories lado a lado
        <div className="flex items-center px-6 py-4 gap-8">
          <img 
            src={logo} 
            alt="Secret Models" 
            className="w-48 h-48 object-contain flex-shrink-0" 
          />
          <div className="flex-1">
            <Stories />
          </div>
        </div>
      )}
      
      <main className="flex-1 px-4 pb-24 pt-4 overflow-y-auto">
        {/* Search Prompt - sempre abaixo */}
        <div className="mb-8 animate-fade-in">
          <SearchPrompt />
        </div>
        
        {/* Model Cards */}
        <div className="flex flex-col gap-6">
          {models.map((model) => (
            <ModelCard key={model.id} {...model} />
          ))}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};
```

### Resultado Esperado
- **Desktop:** Logo grande à esquerda com Stories ao lado na mesma linha, Search centralizada abaixo, seguida pelos cards
- **Mobile:** Layout vertical mantido sem alterações

