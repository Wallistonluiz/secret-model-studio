
# Plano: Tela Inicial Secret Models

## Resumo
Criar uma tela inicial moderna estilo TikTok para o app "Secret Models", baseada na imagem de referência. O design terá tema escuro com acentos em roxo/magenta, visual sofisticado e mobile-first.

---

## O que será criado

### 1. Design System (Cores e Estilos)
- Tema escuro como padrão
- Cor primária: gradiente roxo/magenta (#A855F7 para #EC4899)
- Fundo: tons escuros de roxo (#0F0A1A, #1A0F2E)
- Bordas e cards com efeito glassmorphism (vidro fosco)
- Animações suaves de entrada

### 2. Componentes da Tela

**Header (Topo)**
- Logo "Secret Models" estilizado à esquerda
- Botão "Log in" à direita com ícone

**Área Principal**
- Título grande "Secret Models" com gradiente roxo
- Subtítulo descritivo
- Campo de busca/prompt com estilo pill e botão de enviar

**Card de Modelo em Destaque**
- Foto grande ocupando a maior parte da tela
- Nome e idade sobrepostos na parte inferior
- Cantos arredondados e sombra suave

**Navegação Inferior**
- Barra fixa na parte inferior
- 3-4 ícones de navegação (Home, Explorar, Perfil, etc.)
- Ícone ativo destacado em roxo

---

## Arquivos a serem criados/modificados

| Arquivo | Ação |
|---------|------|
| `src/index.css` | Atualizar com tema escuro roxo e animações |
| `tailwind.config.ts` | Adicionar cores customizadas e animações |
| `src/components/Header.tsx` | Criar header com logo e login |
| `src/components/ModelCard.tsx` | Criar card de modelo em destaque |
| `src/components/BottomNav.tsx` | Criar navegação inferior |
| `src/components/SearchPrompt.tsx` | Criar campo de busca estilizado |
| `src/pages/Index.tsx` | Montar a tela inicial com todos os componentes |

---

## Detalhes Técnicos

### Paleta de Cores
```text
Background Principal: #0F0A1A (roxo muito escuro)
Background Secundário: #1A0F2E
Primário (gradiente): #A855F7 → #EC4899
Texto Principal: #FFFFFF
Texto Secundário: #A0A0B0
Borda/Glass: rgba(255, 255, 255, 0.1)
```

### Estrutura do Layout
```text
┌─────────────────────────────┐
│ [Logo]        [Log in] │
├─────────────────────────────┤
│                             │
│     SECRET MODELS           │
│     Subtítulo               │
│                             │
│  ┌─────────────────────┐    │
│  │ Buscar...       [→] │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │                     │    │
│  │    [Foto Modelo]    │    │
│  │                     │    │
│  │  Nome               │    │
│  │  Idade              │    │
│  └─────────────────────┘    │
│                             │
├─────────────────────────────┤
│  [🏠]    [🔍]    [👤]       │
└─────────────────────────────┘
```

### Recursos Visuais
- Efeito glassmorphism nos cards e inputs
- Gradientes em textos e botões
- Sombras suaves com tom roxo
- Animações de fade-in ao carregar
- Design responsivo (mobile-first, mas funciona em desktop)

---

## Resultado Esperado
Uma tela inicial elegante e moderna, com visual dark/roxo estilo TikTok, pronta para ser expandida com mais funcionalidades como login, galeria de modelos, e sistema de busca.
