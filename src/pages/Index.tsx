import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedModels from "@/components/FeaturedModels";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedModels />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
