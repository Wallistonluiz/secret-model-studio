import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Settings, 
  Grid3X3, 
  Film, 
  Bookmark, 
  UserCircle,
  Plus,
  Share2,
  Camera
} from "lucide-react";
import { Loader2 } from "lucide-react";

interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  bio?: string | null;
  avatar_url?: string | null;
}

const MyProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Proteção de rota
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Buscar perfil do usuário
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const displayName = profile?.display_name || profile?.username || "Usuário";
  const username = profile?.username || user?.email?.split("@")[0] || "usuario";
  const bio = profile?.bio || "";
  const avatarUrl = profile?.avatar_url;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-lg">@{username}</span>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Avatar e Info */}
        <div className="flex items-start gap-6 mb-4">
          {/* Avatar com borda gradiente */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full gradient-border p-[3px]">
              <Avatar className="w-full h-full">
                <AvatarImage src={avatarUrl || ""} alt={displayName} />
                <AvatarFallback className="bg-muted text-2xl">
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="flex-1">
            <div className="flex justify-around text-center">
              <div>
                <p className="font-bold text-lg">0</p>
                <p className="text-xs text-muted-foreground">posts</p>
              </div>
              <div>
                <p className="font-bold text-lg">0</p>
                <p className="text-xs text-muted-foreground">seguidores</p>
              </div>
              <div>
                <p className="font-bold text-lg">0</p>
                <p className="text-xs text-muted-foreground">seguindo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nome e Bio */}
        <div className="mb-4">
          <h2 className="font-semibold">{displayName}</h2>
          {bio && <p className="text-sm text-muted-foreground mt-1">{bio}</p>}
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-2 mb-6">
          <Button 
            onClick={() => navigate("/edit-profile")}
            variant="secondary" 
            className="flex-1 bg-white/10 hover:bg-white/20 border-0"
          >
            Editar perfil
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1 bg-white/10 hover:bg-white/20 border-0"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>

        {/* Destaques */}
        <div className="mb-6">
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="flex flex-col items-center gap-1 min-w-fit">
              <button className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center hover:border-primary transition-colors">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </button>
              <span className="text-xs">Novo</span>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-2" />

        {/* Tabs de Conteúdo */}
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="w-full bg-transparent border-b border-white/10 rounded-none h-12">
            <TabsTrigger 
              value="grid" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Grid3X3 className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger 
              value="reels" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Film className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger 
              value="saved" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Bookmark className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger 
              value="tagged" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <UserCircle className="w-5 h-5" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-4">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Camera className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-1">Compartilhe fotos</h3>
              <p className="text-sm text-muted-foreground">
                Quando você compartilhar fotos, elas aparecerão no seu perfil.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reels" className="mt-4">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Film className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-1">Seus reels</h3>
              <p className="text-sm text-muted-foreground">
                Seus reels aparecerão aqui.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-4">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bookmark className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-1">Itens salvos</h3>
              <p className="text-sm text-muted-foreground">
                Salve fotos e vídeos para ver aqui.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="tagged" className="mt-4">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <UserCircle className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-1">Fotos com você</h3>
              <p className="text-sm text-muted-foreground">
                Quando alguém marcar você, as fotos aparecerão aqui.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default MyProfile;
