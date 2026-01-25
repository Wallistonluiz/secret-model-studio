import logo from "@/assets/logo.png";
import logoMobile from "@/assets/logo-mobile.png";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className={`flex px-4 py-3 ${isMobile ? "justify-center" : "justify-start"}`}>
      <div className={`flex flex-col ${isMobile ? "items-center" : "items-start"}`}>
        <img 
          src={isMobile ? logoMobile : logo} 
          alt="Secret Models" 
          className={isMobile ? "h-10 object-contain" : "w-28 h-28 object-contain"} 
        />
        <p className="text-muted-foreground text-sm mt-1">
          Descubra modelos exclusivos com IA
        </p>
      </div>
    </header>
  );
};

export default Header;
