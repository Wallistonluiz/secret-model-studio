
## Resumo
Corrigir o posicionamento para que apenas a logomarca desça 50 pixels, sem afetar o botão "Entrar" e a frase.

---

## Problema Atual
O `mt-[50px]` na logo está dentro de um container flexbox centralizado, o que empurra todos os elementos (botão e texto) para baixo junto com a logo.

---

## Solução
Separar a logo do container do botão, posicionando-a de forma independente usando posicionamento absoluto.

---

## Mudanças em Splash.tsx

1. **Remover a logo do container central** (que contém o botão e texto)
2. **Criar um container separado para a logo** com posicionamento absoluto no topo
3. **Ajustar a posição da logo** para ficar 50px mais abaixo do que estava originalmente

---

## Estrutura Visual

```text
┌─────────────────────────────────────┐
│                                     │
│       [LOGO - posição absoluta]     │  ← Container separado, top ajustável
│                                     │
│                                     │
│      ┌─────────────────────┐        │
│      │       Entrar        │        │  ← Container central (não muda)
│      └─────────────────────┘        │
│   "Nosso site oferece conteudo..."  │
│                                     │
└─────────────────────────────────────┘
```

---

## Codigo Proposto

```tsx
{/* Logo - posição independente */}
<div className="absolute top-0 left-0 right-0 flex justify-center z-10 pt-[180px]">
  <img src={logo} alt="Secret Models" className="h-40 object-contain" />
</div>

{/* Botão e descrição - posição centralizada (sem a logo) */}
<div className="absolute inset-0 flex flex-col items-center justify-center z-10">
  <Button ...>Entrar</Button>
  <p>Nosso site oferece conteúdo exclusivo</p>
</div>
```

---

## Arquivo a modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/Splash.tsx` | Separar logo em container próprio com posição absoluta |
