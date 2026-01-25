

## Resumo
Adicionar botões de interação estilo Instagram embaixo de cada card de modelo: curtir (coração), comentar (balão) e compartilhar.

---

## O que será alterado

### ModelCard.tsx
- Adicionar uma barra de ações abaixo da imagem do card
- Incluir 3 ícones clicáveis usando Lucide React:
  - **Heart** (coração) - Curtir
  - **MessageCircle** (balão) - Comentar  
  - **Share2** ou **Send** - Compartilhar
- Estilizar os ícones com cor clara e efeito hover
- Manter o espaçamento consistente entre os ícones

---

## Layout Visual

```text
┌─────────────────────────────┐
│                             │
│       [Foto Modelo]         │
│                             │
│    Isabella, 23 anos        │
└─────────────────────────────┘
   ♡        💬        ➤
 Curtir  Comentar  Compartilhar
```

---

## Detalhes Técnicos

| Elemento | Ícone Lucide | Descrição |
|----------|--------------|-----------|
| Curtir | `Heart` | Ícone de coração |
| Comentar | `MessageCircle` | Balão de comentário |
| Compartilhar | `Send` | Ícone de enviar/compartilhar |

### Estrutura do código

```tsx
<div className="flex items-center gap-4 mt-3 px-2">
  <button className="hover:text-primary transition-colors">
    <Heart size={24} />
  </button>
  <button className="hover:text-primary transition-colors">
    <MessageCircle size={24} />
  </button>
  <button className="hover:text-primary transition-colors">
    <Send size={24} />
  </button>
</div>
```

---

## Arquivos a modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/components/ModelCard.tsx` | Adicionar barra de ações com ícones de curtir, comentar e compartilhar |

