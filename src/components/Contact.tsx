const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-caps text-muted-foreground mb-4">Get in Touch</p>
          <h2 className="text-elegant text-5xl md:text-7xl mb-8">
            Let's Create <span className="text-editorial text-accent">Together</span>
          </h2>
          <p className="text-muted-foreground font-light text-lg mb-12 max-w-2xl mx-auto">
            Whether you're a brand seeking the perfect face for your campaign or a model 
            ready to take the next step, we'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
            <a
              href="mailto:bookings@secretmodels.com"
              className="group p-8 border border-border hover:border-accent transition-colors duration-300"
            >
              <p className="text-caps text-xs text-muted-foreground mb-3">Bookings</p>
              <p className="text-elegant text-xl group-hover:text-accent transition-colors">
                bookings@secretmodels.com
              </p>
            </a>
            <a
              href="mailto:become@secretmodels.com"
              className="group p-8 border border-border hover:border-accent transition-colors duration-300"
            >
              <p className="text-caps text-xs text-muted-foreground mb-3">Become a Model</p>
              <p className="text-elegant text-xl group-hover:text-accent transition-colors">
                become@secretmodels.com
              </p>
            </a>
          </div>

          <div className="flex justify-center gap-8">
            <a href="#" className="text-caps text-sm link-underline hover-gold">
              Instagram
            </a>
            <a href="#" className="text-caps text-sm link-underline hover-gold">
              LinkedIn
            </a>
            <a href="#" className="text-caps text-sm link-underline hover-gold">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
