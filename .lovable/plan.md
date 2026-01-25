

## Resumo
Reorganizar o layout para evitar repetição do nome "Secret Models" e posicionar o subtítulo descritivo abaixo da logo no header.

---

## O que será alterado

### 1. Header.tsx
- Adicionar o subtítulo "Descubra modelos exclusivos com IA" abaixo da logo
- Envolver a logo e o subtítulo em um container flex vertical
- Manter a centralização no mobile e alinhamento à esquerda no desktop

### 2. Index.tsx  
- Remover completamente a seção "Hero Section" que contém:
  - O título "Secret Models" (repetido)
  - O subtítulo "Descubra modelos exclusivos com IA" (será movido para o header)

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
│  │    [Foto Modelo]    │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

---

## Arquivos a modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/components/Header.tsx` | Adicionar subtítulo abaixo da logo |
| `src/pages/Index.tsx` | Remover a seção Hero Section |

