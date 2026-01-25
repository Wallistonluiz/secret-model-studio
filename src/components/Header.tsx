import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="text-lg font-semibold text-foreground">Secret Models</span>
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
