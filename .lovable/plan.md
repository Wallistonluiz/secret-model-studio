
## O que está acontecendo (por que “não desce”)
Hoje o bloco que contém **logo + botão + texto** está assim:

- `position: absolute` com `inset-0` (equivale a `top:0; right:0; bottom:0; left:0;`)
- Ou seja: o container fica “esticado” ocupando a tela toda.
- Quando você coloca `mt-[300px]` (margin-top) nesse container esticado, o efeito pode ficar imperceptível/“não funcionar como esperado”, porque ele continua preso em `top: 0` e `bottom: 0`.
- E quando você tenta descer só a logo com `mt-[30px]`, como o pai está com `justify-center`, o layout pode “recentralizar” o grupo e reduzir muito o efeito visual.

Resultado: você mexe e parece que “não desceu”.

## Objetivo
1) Fazer o deslocamento vertical funcionar de forma previsível.
2) Descer a **logo** mais 30px (sem bagunçar o botão).
3) Manter logo “colada” no botão (controle fino do espaçamento).

## Solução proposta (mais confiável)
Trocar “margem” por “transform translate”, porque:
- `translate-y-[...]` funciona muito bem com elementos absolutos e com centralização
- não briga com `top/bottom` do `inset-0` do mesmo jeito que `margin-top` briga

### Mudanças planejadas (em `src/pages/Splash.tsx`)
1) **No container do grupo (logo+botão+texto)**:
   - Remover `mt-[300px]`
   - Adicionar uma centralização baseada em transform:
     - `top-1/2 -translate-y-1/2` para centralizar
     - `translate-y-[300px]` para descer o conjunto 300px

   Exemplo de classes do container:
   - `className="absolute inset-x-0 top-1/2 flex flex-col items-center z-10 -translate-y-1/2 translate-y-[300px]"`

2) **Na logo**:
   - Substituir `mt-[30px]` por `translate-y-[30px]` (mais previsível)
   - Manter o espaçamento “colado” com o botão controlando o `mb-*` (por exemplo `mb-0` ou `mb-1`)

   Exemplo:
   - `className="h-40 object-contain mb-1 translate-y-[30px]"`

3) Checagem rápida visual:
   - Confirmar no preview (`/`) se:
     - o conjunto realmente desceu 300px
     - a logo desceu mais 30px
     - a logo ficou bem colada no botão

## Observações / ajustes rápidos depois
- Se você quiser “100% colada” (sem nenhum espaço), eu troco `mb-1` por `mb-0`.
- Se o conjunto estiver “baixo demais” em telas pequenas, posso reduzir de `translate-y-[300px]` para algo responsivo (ex.: `translate-y-[180px] md:translate-y-[300px]`).

## Arquivo afetado
- `src/pages/Splash.tsx`

## Próximas melhorias (ideias)
- Adicionar animação suave de entrada (fade/slide) para logo e botão no Splash
- Tornar o deslocamento (300px) responsivo por tamanho de tela
