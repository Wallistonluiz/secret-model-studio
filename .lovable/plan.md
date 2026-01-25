

## Resumo
Abaixar a logomarca, o botão "Entrar" e o texto descritivo em 300 pixels para baixo, mantendo-os alinhados entre si.

---

## Solução
Unificar todos os elementos (logo, botão e texto) em um único container centralizado e adicionar um `padding-top` ou `margin-top` de 300px para deslocar o conjunto inteiro.

---

## Estrutura Visual

```text
┌─────────────────────────────────────┐
│                                     │
│                                     │
│                                     │
│                                     │
│           [LOGO]                    │
│      ┌─────────────────────┐        │  ← Conjunto descido 300px
│      │       Entrar        │        │
│      └─────────────────────┘        │
│   "Nosso site oferece conteudo..."  │
│                                     │
│         [Progress Bar]              │
└─────────────────────────────────────┘
```

---

## Mudanças em Splash.tsx

1. **Remover o container separado da logo** (linhas 38-41)
2. **Mover a logo para dentro do container do botão/texto** (linhas 43-54)
3. **Adicionar `mt-[300px]`** ao container unificado para descer todos os elementos juntos

---

## Código Proposto

```tsx
{/* Logo, Botão e descrição - todos juntos, descidos 300px */}
<div className="absolute inset-0 flex flex-col items-center justify-center z-10 mt-[300px]">
  <img src={logo} alt="Secret Models" className="h-40 object-contain mb-8" />
  <Button
    onClick={handleEnter}
    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105"
  >
    Entrar
  </Button>
  <p className="mt-4 text-white/70 text-sm text-center px-8">
    Nosso site oferece conteúdo exclusivo
  </p>
</div>
```

---

## Arquivo a modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/Splash.tsx` | Unificar logo com botão/texto em um container e adicionar `mt-[300px]` |

