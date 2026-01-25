import Header from "@/components/Header";
import Stories from "@/components/Stories";
import SearchPrompt from "@/components/SearchPrompt";
import ModelCard from "@/components/ModelCard";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Stories */}
      <Stories />
      
      <main className="flex-1 flex flex-col px-4 pb-24 pt-4">
        {/* Search Prompt */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <SearchPrompt />
        </div>
        
        {/* Featured Model Card */}
        <div className="flex-1 flex items-center justify-center">
          <ModelCard />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;
