import heroImage from "@/assets/hero-model.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Secret Models - High Fashion"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-caps text-muted-foreground mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Exclusive Model Management
        </p>
        
        <h1 className="text-elegant text-6xl md:text-8xl lg:text-9xl mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <span className="block">Where Beauty</span>
          <span className="block text-editorial text-accent">Becomes Art</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 font-light opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          Representing the world's most captivating faces for fashion, editorial, and commercial excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
          <a
            href="#models"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground text-caps tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
          >
            Discover Models
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 border border-foreground text-caps tracking-widest transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-caps text-xs text-muted-foreground">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
