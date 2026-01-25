
# Plano: Melhorar Pagina de Perfil com Galeria Arrastavel

## Objetivo
Transformar a pagina de perfil em uma experiencia mais rica e interativa, com galeria de fotos visualizavel em tela cheia usando navegacao por arrastar (drag), sem setas.

## Melhorias Propostas

### 1. Modal de Galeria com Navegacao por Arrastar
- Ao clicar em qualquer foto da galeria, abrir um modal fullscreen
- Navegacao por arrastar (drag) para os lados - estilo Stories/TikTok
- Sem botoes de seta - apenas arraste
- Indicador de posicao (pontos ou numeros)
- Botao X para fechar no canto superior
- Utilizando Embla Carousel com `dragFree: true`

### 2. Sistema de Abas para Organizar Conteudo
Adicionar abas para separar:
- **Galeria**: Grid de fotos clicaveis
- **Sobre**: Informacoes detalhadas da modelo
- **Avaliacoes**: Comentarios e notas de usuarios

### 3. Secao "Sobre" Expandida
Novos campos de informacao:
- Localizacao (cidade/estado)
- Especialidades (moda, beleza, fitness, etc.)
- Idiomas
- Disponibilidade
- Instagram/redes sociais

### 4. Secao de Avaliacoes
- Lista de comentarios de usuarios
- Notas individuais com estrelas
- Media geral de avaliacao

### 5. Melhorias Visuais
- Animacao fade-in ao carregar
- Efeito hover nas fotos da galeria
- Badges para especialidades
- Botao "Seguir" ao lado de "Mensagem"

---

## Detalhes Tecnicos

### Arquivo: `src/pages/ModelProfile.tsx`

**Novos imports:**
```tsx
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Instagram, Heart, X } from "lucide-react";
```

**Estrutura de dados expandida:**
```tsx
const modelsData = {
  1: {
    name: "Isabella",
    age: 23,
    // ... campos existentes ...
    // Novos campos:
    location: "Sao Paulo, SP",
    specialties: ["Moda", "Beleza", "Editorial"],
    languages: ["Portugues", "Ingles"],
    availability: "Disponivel para ensaios",
    instagram: "@isabella.model",
    reviews: [
      { user: "Fotografo SP", rating: 5, comment: "Profissional incrivel!", date: "2024-01-15" },
      { user: "Studio ABC", rating: 5, comment: "Excelente trabalho", date: "2024-01-10" },
    ]
  },
  // ... outras modelos
};
```

**Modal de Galeria com Embla Carousel (arrastar):**
```tsx
const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

<Dialog open={selectedPhoto !== null} onOpenChange={() => setSelectedPhoto(null)}>
  <DialogContent className="max-w-full h-full p-0 bg-black/95 border-none">
    {/* Botao fechar */}
    <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 z-50">
      <X className="w-8 h-8 text-white" />
    </button>
    
    {/* Carousel arrastavel - SEM setas */}
    <Carousel
      opts={{
        startIndex: selectedPhoto || 0,
        dragFree: true,  // Arraste livre
        loop: true,
      }}
      className="w-full h-full"
    >
      <CarouselContent>
        {model.gallery.map((photo, index) => (
          <CarouselItem key={index} className="flex items-center justify-center">
            <img src={photo} className="max-h-[90vh] object-contain" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    
    {/* Indicador de posicao (pontos) */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
      {model.gallery.map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/40'}`} />
      ))}
    </div>
  </DialogContent>
</Dialog>
```

**Sistema de Abas:**
```tsx
<Tabs defaultValue="galeria" className="w-full">
  <TabsList className="w-full grid grid-cols-3 glass">
    <TabsTrigger value="galeria">Galeria</TabsTrigger>
    <TabsTrigger value="sobre">Sobre</TabsTrigger>
    <TabsTrigger value="avaliacoes">Avaliacoes</TabsTrigger>
  </TabsList>
  
  <TabsContent value="galeria">
    {/* Grid de fotos clicaveis */}
  </TabsContent>
  
  <TabsContent value="sobre">
    {/* Localizacao, especialidades, idiomas, etc */}
  </TabsContent>
  
  <TabsContent value="avaliacoes">
    {/* Lista de reviews com estrelas */}
  </TabsContent>
</Tabs>
```

### Componentes Utilizados
- `Dialog` - Modal fullscreen para visualizacao
- `Carousel` (Embla) - Navegacao por arrastar, sem setas
- `Tabs` - Organizacao do conteudo
- `Badge` - Especialidades da modelo

### Resultado Final
A pagina de perfil tera uma galeria fullscreen navegavel por arrastar (sem setas), informacoes organizadas em abas, avaliacoes de usuarios e visual premium mantido.
