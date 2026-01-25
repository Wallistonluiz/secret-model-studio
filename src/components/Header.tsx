import logo from "@/assets/logo.png";
import logoMobile from "@/assets/logo-mobile-text.webp";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className={`flex px-4 py-3 mt-5 ${isMobile ? "justify-center" : "justify-start"}`}>
      <div className={`flex flex-col ${isMobile ? "items-center" : "items-start"}`}>
        <img 
          src={isMobile ? logoMobile : logo} 
          alt="Secret Models" 
          className={isMobile ? "h-10 object-contain" : "w-48 h-48 object-contain"} 
        />
        {isMobile && (
          <p className="text-muted-foreground text-sm mt-1">
            Descubra modelos exclusivos
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
