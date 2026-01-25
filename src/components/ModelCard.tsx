import { useState } from "react";
import modelImage from "@/assets/model-featured.jpg";
import { Heart, MessageCircle, Send } from "lucide-react";

interface ModelCardProps {
  name?: string;
  age?: number;
  image?: string;
  initialLikes?: number;
}

const ModelCard = ({ 
  name = "Isabella", 
  age = 23, 
  image = modelImage,
  initialLikes = Math.floor(Math.random() * 500) + 100
}: ModelCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <div className="relative rounded-3xl overflow-hidden aspect-[3/4] glass gradient-border">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Model info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-foreground mb-1">{name}</h3>
          <p className="text-muted-foreground">{age} anos</p>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl animate-glow pointer-events-none" />
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center gap-4 mt-3 px-2">
        <button 
          onClick={handleLike}
          className="flex items-center gap-1 transition-all duration-200 active:scale-125"
        >
          <Heart 
            size={24} 
            className={`transition-all duration-300 ${
              liked 
                ? "fill-red-500 text-red-500 scale-110" 
                : "text-foreground hover:text-red-500"
            }`}
          />
          <span className={`text-sm ${liked ? "text-red-500" : "text-muted-foreground"}`}>
            {likes}
          </span>
        </button>
        <button className="text-foreground hover:text-primary transition-colors">
          <MessageCircle size={24} />
        </button>
        <button className="text-foreground hover:text-primary transition-colors">
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ModelCard;
