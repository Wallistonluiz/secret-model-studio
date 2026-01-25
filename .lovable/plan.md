
# Plano: Página de Perfil da Modelo

## Objetivo
Criar uma página de perfil para cada modelo, acessível ao clicar na imagem do card. A página mostrará informações detalhadas da modelo com um visual premium, seguindo o estilo atual do app.

## O que será criado

### Nova Página de Perfil
A página de perfil terá:
- **Foto grande** da modelo no topo (estilo hero)
- **Nome e idade** com badge de verificado
- **Descrição/bio** mais detalhada
- **Estatísticas** (seguidores, fotos, avaliação)
- **Galeria de fotos** em grid
- **Botão de contato/mensagem**
- **Botão de voltar** para a home
- Layout responsivo (mobile e desktop)

### Comportamento
- Ao clicar na **imagem do card**, o usuário será redirecionado para `/model/:id`
- Os botões de curtir/comentar continuam funcionando normalmente (não redirecionam)

---

## Detalhes Tecnicos

### Arquivos a serem modificados/criados

1. **`src/pages/ModelProfile.tsx`** (novo)
   - Página completa do perfil
   - Recebe o ID do modelo via URL params
   - Exibe foto hero, informações, estatísticas e galeria
   - Botão de voltar usando `useNavigate`

2. **`src/App.tsx`**
   - Adicionar rota `/model/:id` para a página de perfil

3. **`src/components/ModelCard.tsx`**
   - Adicionar `id` nas props
   - Tornar a imagem clicavel com `useNavigate`
   - Usar `cursor-pointer` na imagem

4. **`src/pages/Index.tsx`**
   - Passar o `id` do modelo para o `ModelCard`

### Estrutura da Pagina de Perfil

```text
+----------------------------------+
|  <- Voltar          [Mensagem]   |
+----------------------------------+
|                                  |
|        [Foto Hero Grande]        |
|                                  |
+----------------------------------+
|   Nome, 23      [Verificado]     |
|   "Descrição da modelo..."       |
+----------------------------------+
|  Seguidores  |  Fotos  |  Nota   |
|     1.2k     |   45    |  4.9    |
+----------------------------------+
|   [Galeria de Fotos em Grid]     |
|   [img] [img] [img]              |
|   [img] [img] [img]              |
+----------------------------------+
```

### Dados Mockados
Por enquanto, usaremos dados fictícios para a galeria e estatísticas, já que não há backend. A galeria usará as imagens já existentes no projeto (story-1.jpg, story-2.jpg, etc).
