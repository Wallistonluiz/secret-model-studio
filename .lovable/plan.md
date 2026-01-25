
# Plano: Corrigir Erro de Build do Docker

## Problema Identificado
O comando `npm ci` no Dockerfile está falhando porque o `package-lock.json` provavelmente não foi sincronizado corretamente com o GitHub, ou há alguma inconsistência no arquivo.

## Solução
Modificar o Dockerfile para usar `npm install` em vez de `npm ci`. Esta é uma abordagem mais robusta para deploys:

### Alteração no Dockerfile

**Antes (linha 10):**
```dockerfile
RUN npm ci
```

**Depois:**
```dockerfile
RUN npm install --legacy-peer-deps
```

## Por que esta solução funciona
- `npm install` é mais flexível e não exige um `package-lock.json` sincronizado
- `--legacy-peer-deps` evita conflitos de dependências que podem ocorrer durante o build
- Esta é uma prática comum para builds Docker em projetos React/Vite

## Passos de Implementação
1. Modificar o arquivo `Dockerfile` na linha 10
2. Salvar e aguardar sincronização automática com GitHub
3. No EasyPanel, clicar em **Deploy** novamente

## Resultado Esperado
O build Docker deve completar com sucesso e sua aplicação ficará disponível.
