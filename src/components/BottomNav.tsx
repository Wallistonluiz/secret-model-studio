import { Home, Search, Heart, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Determina qual item está ativo baseado na rota atual
  const getActiveIndex = () => {
    const path = location.pathname;
    if (path === "/home" || path === "/") return 0;
    if (path === "/explorar") return 1;
    if (path === "/favoritos") return 2;
    if (path === "/profile" || path === "/edit-profile") return 3;
    return 0;
  };

  const activeIndex = getActiveIndex();

  const handleNavClick = async (label: string) => {
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
        navigate("/home");
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
          const isActive = index === activeIndex;
          const isAvatar = item.icon === "avatar";
          
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.label)}
              className={`flex flex-col items-center justify-center w-14 h-14 transition-all duration-300 ${
                isActive 
                  ? "gradient-bg text-white rounded-full scale-110 shadow-lg shadow-primary/30" 
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              }`}
            >
              {isAvatar ? (
                user ? (
                  <Avatar className={`${isActive ? "w-9 h-9 ring-2 ring-white" : "w-8 h-8"}`}>
                    <AvatarImage src={avatarUrl || ""} alt="Perfil" />
                    <AvatarFallback className="bg-muted text-xs">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <>
                    <User className="w-5 h-5" />
                    <span className="text-xs font-medium">Perfil</span>
                  </>
                )
              ) : (
                <>
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
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
