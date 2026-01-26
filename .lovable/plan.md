
# Plano: Galeria com Carrossel Horizontal

## Mudança

Alterar a navegação da galeria fullscreen de **vertical** (arrastar cima/baixo) para **horizontal** (arrastar para os lados), estilo Instagram/TikTok fotos.

## O que será alterado

### Arquivo: `src/pages/ModelProfile.tsx`

Modificar o componente `Carousel` dentro do Dialog (linhas 433-456):

**Antes (vertical):**
```tsx
<Carousel
  orientation="vertical"
  opts={{
    dragFree: false,
    containScroll: "trimSnaps",
  }}
>
  <CarouselContent className="h-[100dvh] flex-col">
    <CarouselItem className="h-[100dvh] pt-0 basis-full">
```

**Depois (horizontal):**
```tsx
<Carousel
  orientation="horizontal"
  opts={{
    startIndex: selectedPhoto || 0,
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
    align: "center",
  }}
>
  <CarouselContent className="-ml-0">
    <CarouselItem className="pl-0 basis-full flex items-center justify-center h-[100dvh]">
```

## Resultado Visual

```text
Antes (vertical):          Depois (horizontal):
     ↑                         ←  [FOTO]  →
  [FOTO]                       Arrasta pro lado
     ↓
Arrasta cima/baixo
```

## Indicador de Posição

Os dots (bolinhas) na parte inferior continuam funcionando, indicando qual foto está sendo visualizada.

## Benefícios

- Navegação mais natural e familiar (igual Instagram Stories/Reels)
- Melhor usabilidade em smartphones
- Gesto de swipe lateral é mais intuitivo para galerias de fotos
