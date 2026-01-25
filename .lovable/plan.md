
# Plano: Novo Fluxo de Navegacao com Acesso Livre e Restricoes para Usuarios Logados

## Resumo do Novo Fluxo

```text
                                    +------------------+
                                    |      Splash      |
                                    | (Video + Termos) |
                                    +--------+---------+
                                             |
                                    Clica "Entrar"
                                             |
                                             v
                        +--------------------+--------------------+
                        |                  HOME                   |
                        |          (Acesso Livre para Todos)      |
                        +--------------------+--------------------+
                                             |
                    +------------------------+------------------------+
                    |                        |                        |
                    v                        v                        v
           Ver Feed de Modelos       Clicar em "Perfil"        Interagir (Curtir,
           (Livre)                   no BottomNav              Comentar, Ver Perfil)
                                             |                        |
                                             v                        v
                                    +--------+--------+       +-------+-------+
                                    |   Logado?       |       |   Logado?     |
                                    +--------+--------+       +-------+-------+
                                    Sim |         | Nao       Sim |       | Nao
                                        v         v               v       v
                                    Pagina     Tela de       Acao     Redireciona
                                    Perfil     Login/        Permitida para Login
                                    Usuario    Cadastro
```

## O Que Sera Bloqueado para Usuarios Nao Logados

| Funcionalidade | Sem Login | Com Login |
|----------------|-----------|-----------|
| Ver Home/Feed de modelos | Permitido | Permitido |
| Curtir modelo | Bloqueado | Permitido |
| Comentar | Bloqueado | Permitido |
| Acessar pagina de perfil da modelo (/model/:id) | Bloqueado | Permitido |
| Botao "Perfil" no BottomNav | Redireciona para Login | Abre perfil do usuario |

## Alteracoes Necessarias

### 1. Splash.tsx
- Remover o redirect automatico para `/home` quando usuario esta logado
- O botao "Entrar" agora vai direto para `/home` (acesso livre)
- O video com termos sera visto por TODOS antes de entrar

### 2. Register.tsx  
- Apos cadastro bem-sucedido, redirecionar para `/login` em vez de `/home`

### 3. Login.tsx
- Apos login bem-sucedido, redirecionar para `/home` (nao mais para Splash)

### 4. ModelCard.tsx
- Adicionar verificacao de autenticacao nos botoes de curtir e comentar
- Se nao logado, redirecionar para `/login` ao tentar interagir
- Exibir toast informando que precisa fazer login

### 5. ModelProfile.tsx
- Proteger a pagina inteira: se usuario nao estiver logado, redirecionar para `/login`
- Adicionar useAuth() para verificar status de login

### 6. BottomNav.tsx
- O botao "Perfil" ja redireciona para `/login` se nao logado (ja implementado)
- Manter comportamento atual

---

## Detalhes Tecnicos

### Splash.tsx
Remover o useEffect que faz redirect automatico (linhas 14-19) e alterar o botao "Entrar" para ir para `/home`:

```typescript
// REMOVER:
useEffect(() => {
  if (!loading && user) {
    navigate("/home");
  }
}, [user, loading, navigate]);

// ALTERAR handleEnter:
const handleEnter = () => {
  navigate("/home"); // Ir direto para home (acesso livre)
};
```

### Register.tsx (linha 63)
```typescript
// De:
navigate('/home');

// Para:
navigate('/login');
```

### Login.tsx (linha 48)
```typescript
// De:
navigate('/home');

// Para:
navigate('/home'); // Manter assim (ja esta correto apos login)
```

### ModelCard.tsx
Adicionar verificacao de auth e redirecionamento:

```typescript
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Dentro do componente:
const { user } = useAuth();
const { toast } = useToast();

const handleLike = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (!user) {
    toast({
      title: "Login necessario",
      description: "Faca login para curtir este perfil",
    });
    navigate("/login");
    return;
  }
  // ... logica existente
};

const handleOpenComments = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (!user) {
    toast({
      title: "Login necessario", 
      description: "Faca login para ver os comentarios",
    });
    navigate("/login");
    return;
  }
  setIsCommentsOpen(true);
};

const handleCardClick = () => {
  if (!user) {
    toast({
      title: "Login necessario",
      description: "Faca login para ver o perfil completo",
    });
    navigate("/login");
    return;
  }
  navigate(`/model/${id}`);
};
```

### ModelProfile.tsx
Adicionar protecao de rota no inicio do componente:

```typescript
import { useAuth } from "@/contexts/AuthContext";

// Dentro do componente:
const { user, loading } = useAuth();

// Redirect se nao logado
useEffect(() => {
  if (!loading && !user) {
    navigate("/login");
  }
}, [user, loading, navigate]);

// Mostrar loading enquanto verifica auth
if (loading) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
```

---

## Arquivos a Serem Modificados

1. `src/pages/Splash.tsx` - Remover redirect automatico, manter botao indo para /home
2. `src/pages/Register.tsx` - Alterar redirect pos-cadastro para /login
3. `src/components/ModelCard.tsx` - Adicionar verificacao de auth nas interacoes
4. `src/pages/ModelProfile.tsx` - Proteger pagina inteira com verificacao de auth

## Resultado Final

- Qualquer pessoa pode ver o video de termos e acessar a home
- O feed de modelos e visivel para todos
- Curtir, comentar ou clicar no card da modelo exige login
- A pagina de perfil da modelo so e acessivel para usuarios logados
- O botao "Perfil" no menu inferior leva para login se nao logado
