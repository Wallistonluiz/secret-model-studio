import Header from "@/components/Header";
import Stories from "@/components/Stories";
import SearchPrompt from "@/components/SearchPrompt";
import ModelCard from "@/components/ModelCard";
import BottomNav from "@/components/BottomNav";

import modelFeatured from "@/assets/model-featured.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";

const models = [
  { id: 1, name: "Isabella", age: 23, image: modelFeatured },
  { id: 2, name: "Sofia", age: 21, image: story1 },
  { id: 3, name: "Valentina", age: 25, image: story2 },
  { id: 4, name: "Camila", age: 22, image: story3 },
  { id: 5, name: "Luna", age: 24, image: story4 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Stories */}
      <Stories />
      
      <main className="flex-1 px-4 pb-24 pt-4 overflow-y-auto">
        {/* Search Prompt */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <SearchPrompt />
        </div>
        
        {/* Model Cards */}
        <div className="flex flex-col gap-6">
          {models.map((model, index) => (
            <ModelCard
              key={model.id}
              name={model.name}
              age={model.age}
              image={model.image}
            />
          ))}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;
