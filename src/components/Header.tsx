import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <img src={logo} alt="Secret Models" className="w-20 h-20 object-contain" />
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
