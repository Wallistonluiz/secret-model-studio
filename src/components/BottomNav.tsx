import { Home, Search, User, Heart } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Início" },
  { icon: Search, label: "Explorar" },
  { icon: Heart, label: "Favoritos" },
  { icon: User, label: "Perfil" },
];

const BottomNav = () => {
  const [active, setActive] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/10">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === active;
          
          return (
            <button
              key={item.label}
              onClick={() => setActive(index)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
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
