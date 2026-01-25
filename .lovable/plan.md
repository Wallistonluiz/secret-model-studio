

## Resumo
Adicionar a logomarca Secret Models no topo da pagina Splash, um botao "Entrar" para navegar para a home, e a frase "Nosso site oferece conteudo exclusivo" abaixo do botao.

---

## O que sera alterado

### Splash.tsx
- Importar a logomarca (`logo.png`)
- Importar o componente `Button` do shadcn/ui
- Adicionar a logo centralizada no topo
- Adicionar o botao "Entrar" no centro da tela
- Adicionar a frase descritiva abaixo do botao
- Remover o redirecionamento automatico (onEnded) - agora so navega ao clicar no botao

---

## Layout Visual

```text
┌─────────────────────────────────────┐
│                                     │
│       [LOGO SECRET MODELS]          │
│                                     │
│                                     │
│         [VIDEO FULLSCREEN]          │
│          (fundo)                    │
│                                     │
│                                     │
│      ┌─────────────────────┐        │
│      │       Entrar        │        │
│      └─────────────────────┘        │
│                                     │
│   "Nosso site oferece conteudo      │
│           exclusivo"                │
│                                     │
├─────────────────────────────────────┤
│  ████████████████████               │
│       [Barra de Progresso]          │
└─────────────────────────────────────┘
```

---

## Detalhes Tecnicos

### Imports a adicionar
```tsx
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
```

### Elementos a adicionar no JSX

| Elemento | Posicao | Estilo |
|----------|---------|--------|
| Logo | Topo centralizado | `absolute top-8`, altura ~16 |
| Botao "Entrar" | Centro da tela | Gradiente roxo/magenta, padding generoso |
| Frase | Abaixo do botao | Texto branco/cinza, tamanho pequeno |

### Mudanca de comportamento
- **Antes**: Video termina → redireciona automaticamente
- **Depois**: Usuario clica no botao → redireciona para `/home`

---

## Arquivo a modificar

| Arquivo | Alteracao |
|---------|-----------|
| `src/pages/Splash.tsx` | Adicionar logo, botao "Entrar" e frase descritiva |

