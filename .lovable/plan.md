

## Resumo
Adicionar múltiplos cards de modelos na página inicial com rolagem vertical, cada um com imagem, nome e idade diferentes.

---

## O que será alterado

### 1. Criar dados de modelos
Criar um array de dados com informações de cada modelo (nome, idade, imagem). Por enquanto, podemos reutilizar a imagem existente ou as imagens dos Stories, e você pode posteriormente fazer upload de novas imagens para cada modelo.

### 2. Index.tsx
- Substituir o card único por uma lista de cards em um container com rolagem
- Mapear o array de modelos para renderizar múltiplos `ModelCard`
- Ajustar o layout para exibir os cards em coluna com espaçamento

---

## Dados iniciais dos modelos

| Nome | Idade | Imagem |
|------|-------|--------|
| Isabella | 23 | model-featured.jpg |
| Sofia | 21 | story-1.jpg |
| Valentina | 25 | story-2.jpg |
| Camila | 22 | story-3.jpg |
| Luna | 24 | story-4.jpg |

---

## Resultado Visual

```text
┌─────────────────────────────┐
│      [Logo Secret Models]   │
│  Descubra modelos exclusivos│
├─────────────────────────────┤
│     [Stories avatares]      │
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │ Buscar...       [→] │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │    Isabella, 23     │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │    Sofia, 21        │    │  ← Rolagem
│  └─────────────────────┘    │     vertical
│                             │
│  ┌─────────────────────┐    │
│  │    Valentina, 25    │    │
│  └─────────────────────┘    │
│          ...                │
└─────────────────────────────┘
```

---

## Arquivos a modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/Index.tsx` | Criar array de modelos e renderizar múltiplos cards com espaçamento vertical |

---

## Observação

Você pode fazer upload de novas imagens para cada modelo a qualquer momento. Basta anexar as fotos aqui no chat e eu atualizo os cards com as imagens corretas!

