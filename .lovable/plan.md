

## Resumo
Criar um modal de comentários estilo Instagram que abre ao clicar no ícone de comentário, exibindo uma lista de comentários existentes e um campo para adicionar novos comentários.

---

## O que sera alterado

### 1. ModelCard.tsx
- Adicionar estado para controlar abertura/fechamento do modal de comentários
- Adicionar estado para armazenar lista de comentários
- Adicionar estado para o texto do novo comentário
- Integrar o Dialog component da shadcn/ui ao botão de comentário
- Criar funcionalidade para adicionar novos comentários

### 2. Estrutura do Modal de Comentarios

O modal tera:
- **Header**: Titulo "Comentarios" com contador
- **Lista de comentarios**: Scrollable com avatar, nome e texto
- **Footer**: Campo de input + botao de enviar

---

## Layout Visual

```text
┌────────────────────────────────────┐
│  Comentários (3)              [X]  │
├────────────────────────────────────┤
│  ┌──┐ @maria                       │
│  │  │ Que linda! 😍                │
│  └──┘                              │
│                                    │
│  ┌──┐ @joao                        │
│  │  │ Perfeita demais!             │
│  └──┘                              │
│                                    │
│  ┌──┐ @ana                         │
│  │  │ Maravilhosa ❤️               │
│  └──┘                              │
│                                    │
├────────────────────────────────────┤
│  ┌──────────────────────┐  [Enviar]│
│  │ Adicione um comentário│          │
│  └──────────────────────┘          │
└────────────────────────────────────┘
```

---

## Dados Iniciais de Comentarios

Cada modelo tera comentarios iniciais aleatorios para parecer mais realista:

| Usuario | Comentario |
|---------|------------|
| @maria | "Que linda! 😍" |
| @joao | "Perfeita demais!" |
| @ana | "Maravilhosa ❤️" |
| @carlos | "Incrivel!" |
| @julia | "Arrasou! 🔥" |

---

## Detalhes Tecnicos

### Interface de Comentario
```tsx
interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
}
```

### Estados a adicionar
```tsx
const [isCommentsOpen, setIsCommentsOpen] = useState(false);
const [comments, setComments] = useState<Comment[]>(initialComments);
const [newComment, setNewComment] = useState("");
```

### Componentes utilizados
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` (shadcn/ui)
- `Input` (shadcn/ui)
- `Button` (shadcn/ui)
- `ScrollArea` (shadcn/ui) para lista scrollavel
- `Avatar` (shadcn/ui) para foto do usuario

---

## Arquivos a modificar

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/ModelCard.tsx` | Adicionar modal de comentarios com lista, input e funcionalidade de envio |

