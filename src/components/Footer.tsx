const Footer = () => {
  return (
    <footer className="py-12 bg-secondary border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="text-elegant text-xl tracking-widest">
            SECRET MODELS
          </a>
          
          <p className="text-muted-foreground text-sm font-light">
            © {new Date().getFullYear()} Secret Models. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-caps text-xs link-underline hover-gold">
              Privacy
            </a>
            <a href="#" className="text-caps text-xs link-underline hover-gold">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
