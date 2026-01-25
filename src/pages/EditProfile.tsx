import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Loader2, Camera, User, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  user_type?: string | null;
  location?: string | null;
  age?: number | null;
  gender?: string | null;
}

const EditProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [userType, setUserType] = useState<"user" | "model">("user");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [gender, setGender] = useState<string | null>(null);

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
      
      // Pega metadata do usuário logado (sempre disponível)
      const meta = (user.user_metadata || {}) as {
        username?: string;
        display_name?: string;
        gender?: string;
      };
      
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      if (data) {
        // Usa dados do banco, com fallback para metadata
        setDisplayName(data.display_name || meta.display_name || "");
        setUsername(data.username || meta.username || user.email?.split("@")[0] || "");
        setBio(data.bio || "");
        setUserType((data.user_type as "user" | "model") || "user");
        setLocation(data.location || "");
        setAge(data.age?.toString() || "");
        setAvatarUrl(data.avatar_url || "");
        setGender(data.gender || meta.gender || null);
      } else {
        // Se não existir registro no banco, usa metadata diretamente
        setDisplayName(meta.display_name || "");
        setUsername(meta.username || user.email?.split("@")[0] || "");
        setGender(meta.gender || null);
      }
      setLoading(false);
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    
    const updateData: Record<string, unknown> = {
      display_name: displayName.trim() || null,
      bio: bio.trim() || null,
      user_type: userType,
    };

    // Só adiciona campos de modelo se for modelo
    if (userType === "model") {
      updateData.location = location.trim() || null;
      updateData.age = age ? parseInt(age) : null;
    } else {
      updateData.location = null;
      updateData.age = null;
    }

    const { error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível atualizar seu perfil. Tente novamente.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Perfil atualizado!",
        description: "Suas alterações foram salvas com sucesso.",
      });
      navigate("/profile");
    }
    
    setSaving(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-lg">Editar perfil</span>
          <Button 
            onClick={handleSave} 
            disabled={saving}
            variant="ghost"
            className="text-primary font-semibold"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full gradient-border p-[3px]">
              <Avatar className="w-full h-full">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="bg-muted text-3xl">
                  {(displayName || username || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <button className="text-primary text-sm font-medium">
            Alterar foto
          </button>
        </div>

        <Separator className="bg-white/10" />

        {/* Campos do Formulário */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Nome de exibição</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Seu nome"
              className="bg-white/5 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              disabled
              className="bg-white/5 border-white/10 opacity-50"
            />
            <p className="text-xs text-muted-foreground">
              O username não pode ser alterado
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              value={user?.email || ""}
              disabled
              className="bg-white/5 border-white/10 opacity-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Conte um pouco sobre você..."
              className="bg-white/5 border-white/10 min-h-[100px]"
              maxLength={150}
            />
            <p className="text-xs text-muted-foreground text-right">
              {bio.length}/150
            </p>
          </div>
        </div>

        {/* Tipo de Conta - Só mostra se for feminino */}
        {gender === "female" && (
          <>
            <Separator className="bg-white/10" />

            <div className="space-y-4">
              <Label className="text-base font-semibold">Tipo de conta</Label>
              
              <RadioGroup 
                value={userType} 
                onValueChange={(value) => setUserType(value as "user" | "model")}
                className="space-y-3"
              >
                <label 
                  htmlFor="user-type"
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    userType === "user" 
                      ? "border-primary bg-primary/10" 
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <RadioGroupItem value="user" id="user-type" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Usuário comum</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Navegue, siga modelos e interaja com conteúdos
                    </p>
                  </div>
                </label>

                <label 
                  htmlFor="model-type"
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    userType === "model" 
                      ? "border-primary bg-primary/10" 
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <RadioGroupItem value="model" id="model-type" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4" />
                      <span className="font-medium">Modelo</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Crie seu perfil de modelo e seja descoberta
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </div>
          </>
        )}

        {/* Campos extras para Modelo */}
        {userType === "model" && (
          <>
            <Separator className="bg-white/10" />
            
            <div className="space-y-4">
              <Label className="text-base font-semibold">Informações de modelo</Label>
              
              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: São Paulo, SP"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Sua idade"
                  min="18"
                  max="99"
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
          </>
        )}

        {/* Botão Salvar (mobile) */}
        <div className="pt-4">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="w-full gradient-bg"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Salvando...
              </>
            ) : (
              "Salvar alterações"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
