const About = () => {
  return (
    <section id="about" className="py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div>
            <p className="text-caps text-muted-foreground mb-4">About Us</p>
            <h2 className="text-elegant text-5xl md:text-6xl mb-8">
              Crafting <span className="text-editorial text-accent">Iconic</span> Careers
            </h2>
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Secret Models represents an elite selection of talent that defines the future of fashion. 
                Our agency is built on the foundation of discovering unique beauty and nurturing 
                extraordinary careers.
              </p>
              <p>
                With decades of combined experience in the industry, we connect our models with 
                the world's most prestigious brands, photographers, and creative directors.
              </p>
            </div>

            <div className="mt-12 flex gap-12">
              <div>
                <p className="text-elegant text-5xl text-accent">50+</p>
                <p className="text-caps text-sm text-muted-foreground mt-2">Elite Models</p>
              </div>
              <div>
                <p className="text-elegant text-5xl text-accent">200+</p>
                <p className="text-caps text-sm text-muted-foreground mt-2">Brand Partners</p>
              </div>
              <div>
                <p className="text-elegant text-5xl text-accent">15</p>
                <p className="text-caps text-sm text-muted-foreground mt-2">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right Content - Decorative */}
          <div className="relative">
            <div className="aspect-square bg-muted/50 flex items-center justify-center">
              <div className="text-center p-12">
                <blockquote className="text-editorial text-3xl md:text-4xl text-foreground leading-relaxed">
                  "Excellence is not a destination, it's a continuous journey of pushing boundaries."
                </blockquote>
                <cite className="block mt-8 text-caps text-sm text-muted-foreground not-italic">
                  — Secret Models
                </cite>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-accent opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
