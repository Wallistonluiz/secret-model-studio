

## Resumo
Criar uma página de splash/intro com o vídeo que você enviou rodando em tela cheia como fundo. Uma barra de progresso mostrará o andamento do vídeo, e quando terminar, o usuário será automaticamente redirecionado para a página principal com os modelos.

---

## O que será criado

### 1. Copiar o vídeo para o projeto
O vídeo `.webm` que você enviou será copiado para a pasta `src/assets/` do projeto.

### 2. Nova página Splash.tsx
Uma nova página será criada com:
- Vídeo em tela cheia como fundo (autoplay, sem som)
- Barra de progresso na parte inferior mostrando o andamento
- Redirecionamento automático para a página principal quando o vídeo terminar

### 3. Atualizar rotas no App.tsx
- A rota `/` passará a ser a página Splash
- A página dos modelos será movida para `/home`

---

## Layout Visual

```text
┌─────────────────────────────────────┐
│                                     │
│                                     │
│                                     │
│         [VÍDEO FULLSCREEN]          │
│          (fundo escuro)             │
│                                     │
│                                     │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  ████████████░░░░░░░░  75%          │
│       [Barra de Progresso]          │
└─────────────────────────────────────┘
         ↓ (ao terminar)
    Redireciona para /home
```

---

## Detalhes Técnicos

### Estrutura da página Splash

```tsx
// Estados
const [progress, setProgress] = useState(0);
const videoRef = useRef<HTMLVideoElement>(null);
const navigate = useNavigate();

// Atualizar progresso do vídeo
const handleTimeUpdate = () => {
  const video = videoRef.current;
  if (video) {
    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage);
  }
};

// Redirecionar quando terminar
const handleVideoEnd = () => {
  navigate("/home");
};
```

### Estilização do vídeo
- `object-cover` para preencher toda a tela
- `fixed inset-0` para posição fullscreen
- `autoPlay` e `muted` para iniciar automaticamente
- `playsInline` para compatibilidade mobile

---

## Arquivos a criar/modificar

| Arquivo | Ação |
|---------|------|
| `src/assets/intro-video.webm` | Copiar o vídeo enviado |
| `src/pages/Splash.tsx` | **Criar** - página de intro com vídeo e progresso |
| `src/App.tsx` | Atualizar rotas: `/` = Splash, `/home` = Index |

---

## Fluxo do usuário

1. Usuário acessa o app
2. Vê o vídeo de intro em tela cheia
3. Barra de progresso mostra o andamento
4. Quando o vídeo termina → vai automaticamente para a página dos modelos

