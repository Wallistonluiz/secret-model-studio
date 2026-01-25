import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import logoMobile from "@/assets/logo-mobile.png";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <img 
          src={isMobile ? logoMobile : logo} 
          alt="Secret Models" 
          className={isMobile ? "h-10 object-contain" : "w-28 h-28 object-contain"} 
        />
      </div>
      
      <Button 
        variant="ghost" 
        size="sm"
        className="glass rounded-full px-4 hover:bg-white/10"
      >
        <User className="w-4 h-4 mr-2" />
        Log in
      </Button>
    </header>
  );
};

export default Header;
