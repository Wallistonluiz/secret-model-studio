import model1 from "@/assets/model-1.jpg";
import model2 from "@/assets/model-2.jpg";
import model3 from "@/assets/model-3.jpg";

const models = [
  { id: 1, name: "Alexander", category: "Editorial", image: model1 },
  { id: 2, name: "Victoria", category: "Runway", image: model2 },
  { id: 3, name: "Quinn", category: "Commercial", image: model3 },
];

const FeaturedModels = () => {
  return (
    <section id="models" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-caps text-muted-foreground mb-4">Our Talent</p>
          <h2 className="text-elegant text-5xl md:text-7xl">
            Featured <span className="text-editorial text-accent">Models</span>
          </h2>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {models.map((model, index) => (
            <article
              key={model.id}
              className="group relative cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="text-caps text-xs bg-background/90 px-4 py-2">
                    {model.category}
                  </span>
                </div>
              </div>

              {/* Model Info */}
              <div className="mt-6 flex items-center justify-between">
                <h3 className="text-elegant text-2xl group-hover:text-accent transition-colors duration-300">
                  {model.name}
                </h3>
                <span className="text-caps text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Profile →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-caps link-underline hover-gold"
          >
            View All Models
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModels;
