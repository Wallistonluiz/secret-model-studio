
# Plano: Botões de Navegação com Círculo Perfeito

## Problema Identificado
Atualmente o botão usa `px-4 py-2` (padding horizontal maior que vertical), o que cria uma forma oval mesmo com `rounded-full`. Para um círculo perfeito, precisamos dimensões iguais em todos os eixos.

## Solução

Vou modificar o estilo do botão ativo para usar dimensões fixas e iguais, garantindo um círculo perfeito:

### Mudanças no arquivo `src/components/BottomNav.tsx`:

**De:**
```tsx
className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
  isActive 
    ? "gradient-bg text-white scale-110 shadow-lg shadow-primary/30" 
    : "text-muted-foreground hover:text-foreground hover:scale-105"
}`}
```

**Para:**
```tsx
className={`flex flex-col items-center justify-center transition-all duration-300 ${
  isActive 
    ? "w-14 h-14 gradient-bg text-white rounded-full scale-110 shadow-lg shadow-primary/30" 
    : "w-14 h-14 text-muted-foreground hover:text-foreground hover:scale-105"
}`}
```

### O que muda:
- Removo `gap-1 px-4 py-2` que criavam a forma oval
- Adiciono `w-14 h-14` (56px x 56px) para garantir dimensões iguais
- Adiciono `justify-center` para centralizar o conteúdo verticalmente
- O `rounded-full` agora criará um círculo perfeito porque largura = altura

### Resultado Visual:
- Círculo perfeito de 56px de diâmetro quando ativo
- Mesmas dimensões quando inativo para manter consistência
- Animação de scale continua funcionando normalmente
