import logo from "@/assets/logo.png";
import logoMobile from "@/assets/logo-mobile.png";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className={`flex items-center px-4 py-3 ${isMobile ? "justify-center" : "justify-start"}`}>
      <img 
        src={isMobile ? logoMobile : logo} 
        alt="Secret Models" 
        className={isMobile ? "h-10 object-contain" : "w-28 h-28 object-contain"} 
      />
    </header>
  );
};

export default Header;
