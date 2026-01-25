

# Plano: Adicionar Descrição da Modelo

## O que será feito

Inserir a bio/descrição da modelo logo abaixo do nome, idade e badge verificado.

## Mudança técnica

### Arquivo: `src/pages/ModelProfile.tsx`

Inserir um parágrafo com a bio após a linha 246 (fechamento do div com nome/idade):

```tsx
{/* Nome, idade, badge */}
<div className="flex items-center gap-2 mb-2">
  <h1 className="text-3xl font-bold text-foreground">{model.name}</h1>
  <span className="text-2xl text-muted-foreground">{model.age}</span>
  <img src={verifiedBadge} alt="Verificado" className="w-6 h-6" />
</div>

{/* Bio/Descrição - NOVO */}
<p className="text-sm text-muted-foreground mb-3 leading-relaxed">
  {model.bio}
</p>

{/* Localização */}
<div className="flex items-center gap-2 text-muted-foreground mb-4">
  ...
</div>
```

## Resultado visual

```text
+------------------------------------------+
|  Isabella 23 ✓                           |
|                                          |
|  Modelo profissional com 5 anos de       |  ← NOVO
|  experiência em ensaios fotográficos...  |
|                                          |
|  📍 São Paulo, SP                        |
|                                          |
|  [Seguir] [Enviar mensagem] [📱]         |
+------------------------------------------+
```

## Dados já existentes

O campo `bio` já existe nos dados de cada modelo:
- Isabella: "Modelo profissional com 5 anos de experiência..."
- Sofia: "Especialista em moda e lifestyle..."
- Valentina: "Makeup artist e modelo..."
- Camila: "Artista visual e modelo..."
- Luna: "Modelo comercial e influencer..."

## O que NÃO muda

- Todo o layout existente permanece igual
- Apenas insere a bio entre nome e localização

