import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-elegant text-2xl tracking-widest">
            SECRET MODELS
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#models" className="text-caps link-underline hover-gold">
              Models
            </a>
            <a href="#about" className="text-caps link-underline hover-gold">
              About
            </a>
            <a href="#contact" className="text-caps link-underline hover-gold">
              Contact
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-60 mt-6' : 'max-h-0'}`}>
          <div className="flex flex-col gap-4 pb-4">
            <a href="#models" className="text-caps hover-gold py-2">
              Models
            </a>
            <a href="#about" className="text-caps hover-gold py-2">
              About
            </a>
            <a href="#contact" className="text-caps hover-gold py-2">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
