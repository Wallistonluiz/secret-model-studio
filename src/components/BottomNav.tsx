import { Home, Search, User, Heart, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const BottomNav = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleNavClick = async (index: number, label: string) => {
    setActive(index);
    
    if (label === "Perfil") {
      if (user) {
        // TODO: Navigate to profile page when implemented
      } else {
        navigate("/login");
      }
    } else if (label === "Sair") {
      await signOut();
      navigate("/");
    }
  };

  const navItems = user
    ? [
        { icon: Home, label: "Início" },
        { icon: Search, label: "Explorar" },
        { icon: Heart, label: "Favoritos" },
        { icon: User, label: "Perfil" },
        { icon: LogOut, label: "Sair" },
      ]
    : [
        { icon: Home, label: "Início" },
        { icon: Search, label: "Explorar" },
        { icon: Heart, label: "Favoritos" },
        { icon: User, label: "Perfil" },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/10">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === active;
          
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(index, item.label)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? "gradient-bg text-white" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
