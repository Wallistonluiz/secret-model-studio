
# Plano: Pagina "Meu Perfil" Estilo Instagram

## Visao Geral

Criar uma pagina de perfil pessoal para usuarios logados, seguindo o layout do Instagram como referencia. O botao "Editar perfil" levara para uma pagina separada de edicao.

## Layout da Pagina (baseado na referencia do Instagram)

```text
+------------------------------------------+
|  [<-]                    [@] [=] (menu)  |
+------------------------------------------+
|                                          |
|    [AVATAR]       username               |
|     (80px)        Nome de Exibicao       |
|                                          |
|   0 posts   0 seguidores   0 seguindo    |
|                                          |
|   Bio do usuario aqui...                 |
|                                          |
+------------------------------------------+
|                                          |
|  [Editar perfil]  [Compartilhar perfil]  |
|                                          |
+------------------------------------------+
|                                          |
|  [+] Destaques (stories circulares)      |
|  Novo                                    |
|                                          |
+------------------------------------------+
|  [Grid] [Reels] [Salvos] [Marcados]      |
|  ======================================  |
|                                          |
|  +--------+ +--------+ +--------+        |
|  |        | |        | |        |        |
|  | Foto 1 | | Foto 2 | | Foto 3 |        |
|  |        | |        | |        |        |
|  +--------+ +--------+ +--------+        |
|                                          |
|  (ou mensagem: "Nenhuma foto ainda")     |
|                                          |
+------------------------------------------+
|                                          |
|  [BottomNav]                             |
+------------------------------------------+
```

## Arquivos a Serem Criados/Modificados

### 1. CRIAR: src/pages/MyProfile.tsx

Nova pagina com estrutura estilo Instagram:

**Secao Header:**
- Botao voltar (seta esquerda)
- Username do usuario
- Icone de menu/configuracoes (futuro)

**Secao Avatar + Info:**
- Avatar circular grande (80px) a esquerda
- Username e nome de exibicao a direita
- Estatisticas: posts, seguidores, seguindo (inicialmente zerados)
- Bio do usuario (se existir)

**Secao Botoes:**
- Botao "Editar perfil" (leva para /edit-profile)
- Botao "Compartilhar perfil" (ou outro secundario)

**Secao Destaques:**
- Circulo com "+" para criar novo destaque
- Lista horizontal de destaques (futuro)

**Secao Abas de Conteudo:**
- Grid de fotos (icone de grade)
- Reels (icone de video)
- Salvos (icone de bookmark)
- Marcados (icone de pessoa)
- Conteudo inicial: mensagem "Nenhuma publicacao ainda"

### 2. CRIAR: src/pages/EditProfile.tsx

Pagina de edicao do perfil (onde vai a escolha de tipo de conta):

**Campos Editaveis:**
- Foto de perfil (avatar)
- Nome de exibicao
- Username (apenas leitura ou editavel com validacao)
- Bio
- Tipo de conta (Usuario comum / Modelo)

**Campos Condicionais para Modelo:**
- Localizacao
- Idade
- Especialidades

### 3. MODIFICAR: src/App.tsx

Adicionar novas rotas:
```typescript
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";

// Rotas:
<Route path="/profile" element={<MyProfile />} />
<Route path="/edit-profile" element={<EditProfile />} />
```

### 4. MODIFICAR: src/components/BottomNav.tsx

Atualizar navegacao do botao "Perfil":
```typescript
if (label === "Perfil") {
  if (user) {
    navigate("/profile");  // Navegar para Meu Perfil
  } else {
    navigate("/login");
  }
}
```

## Alteracoes no Banco de Dados

### Adicionar campos na tabela profiles:

```sql
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'user' 
  CHECK (user_type IN ('user', 'model')),
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

## Detalhes Tecnicos

### Estrutura do MyProfile.tsx:

```typescript
const MyProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Buscar perfil do usuario
  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  // Protecao de rota
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    
    if (data) setProfile(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* Avatar + Stats */}
      {/* Bio */}
      {/* Botoes */}
      {/* Destaques */}
      {/* Tabs de conteudo */}
      <BottomNav />
    </div>
  );
};
```

### Componentes UI Utilizados:

- Avatar, AvatarImage, AvatarFallback
- Button
- Tabs, TabsList, TabsTrigger, TabsContent
- Separator
- Icons: Grid3X3, Film, Bookmark, UserCircle, Settings, Plus, ArrowLeft

### Estilizacao:

- Seguir design system existente (glass effects, cores roxa/rosa)
- Layout mobile-first
- Avatar com borda gradiente (gradient-border)
- Estatisticas em linha horizontal
- Grid de 3 colunas para fotos

## Fluxo do Usuario

1. Usuario clica em "Perfil" no BottomNav
2. Se nao logado -> vai para Login
3. Se logado -> abre MyProfile
4. Usuario ve seu perfil (avatar, nome, stats, bio)
5. Clica em "Editar perfil" -> vai para EditProfile
6. Edita informacoes e salva
7. Retorna ao MyProfile atualizado

## Resumo das Tarefas

| Ordem | Tarefa | Tipo | Arquivo |
|-------|--------|------|---------|
| 1 | Migracao SQL para novos campos | Banco | Supabase Migration |
| 2 | Criar pagina Meu Perfil | Criar | src/pages/MyProfile.tsx |
| 3 | Criar pagina Editar Perfil | Criar | src/pages/EditProfile.tsx |
| 4 | Adicionar rotas | Modificar | src/App.tsx |
| 5 | Atualizar navegacao | Modificar | src/components/BottomNav.tsx |

## Resultado Final

- Pagina de perfil estilo Instagram para usuarios logados
- Visualizacao de avatar, nome, username, bio e estatisticas
- Botao "Editar perfil" que leva para pagina de edicao
- Na pagina de edicao: escolha de tipo de conta (Usuario/Modelo)
- Campos extras condicionais para modelos
- Design consistente com o resto do app (dark mode, glassmorphism)
