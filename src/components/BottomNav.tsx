import { Home, Search, Heart, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BottomNav = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Buscar avatar do usuário logado
  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user) {
        setAvatarUrl(null);
        return;
      }
      
      const { data } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      
      if (data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    };

    fetchAvatar();
  }, [user]);

  const handleNavClick = async (index: number, label: string) => {
    setActive(index);
    
    switch (label) {
      case "Início":
        navigate("/home");
        break;
      case "Explorar":
        navigate("/explorar");
        break;
      case "Favoritos":
        navigate("/favoritos");
        break;
      case "Perfil":
        if (user) {
          navigate("/profile");
        } else {
          navigate("/login");
        }
        break;
      case "Sair":
        await signOut();
        navigate("/");
        break;
    }
  };

  const navItems = user
    ? [
        { icon: Home, label: "Início" },
        { icon: Search, label: "Explorar" },
        { icon: Heart, label: "Favoritos" },
        { icon: "avatar", label: "Perfil" },
        { icon: LogOut, label: "Sair" },
      ]
    : [
        { icon: Home, label: "Início" },
        { icon: Search, label: "Explorar" },
        { icon: Heart, label: "Favoritos" },
        { icon: "avatar", label: "Perfil" },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/10">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const isActive = index === active;
          const isAvatar = item.icon === "avatar";
          
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(index, item.label)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? "text-white scale-110" 
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              }`}
            >
              {isAvatar ? (
                <div className={`transition-all duration-300 ${isActive ? "scale-110" : ""}`}>
                  <Avatar className={`${isActive ? "w-10 h-10 ring-2 ring-primary shadow-lg shadow-primary/50" : "w-8 h-8"} transition-all duration-300`}>
                    <AvatarImage src={avatarUrl || ""} alt="Perfil" />
                    <AvatarFallback className="bg-muted text-xs">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <>
                  <div className={`transition-all duration-300 ${isActive ? "scale-125 text-primary" : ""}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium transition-all duration-300 ${isActive ? "text-primary font-semibold" : ""}`}>
                    {item.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
