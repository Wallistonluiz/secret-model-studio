import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Star, Users, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import verifiedBadge from "@/assets/verificado.webp";

import modelFeatured from "@/assets/model-featured.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";
import story5 from "@/assets/story-5.jpg";

// Dados mockados das modelos
const modelsData: Record<number, {
  name: string;
  age: number;
  image: string;
  bio: string;
  followers: string;
  photos: number;
  rating: number;
  gallery: string[];
}> = {
  1: {
    name: "Isabella",
    age: 23,
    image: modelFeatured,
    bio: "Modelo profissional com 5 anos de experiência em ensaios fotográficos e campanhas publicitárias. Disponível para trabalhos exclusivos e parcerias de longo prazo.",
    followers: "12.5k",
    photos: 147,
    rating: 4.9,
    gallery: [story1, story2, story3, story4, story5, modelFeatured],
  },
  2: {
    name: "Sofia",
    age: 21,
    image: story1,
    bio: "Especialista em moda e lifestyle. Trabalho com as principais marcas do Brasil. Apaixonada por fotografia e arte.",
    followers: "8.2k",
    photos: 89,
    rating: 4.8,
    gallery: [story2, story3, story4, story5, modelFeatured, story1],
  },
  3: {
    name: "Valentina",
    age: 25,
    image: story2,
    bio: "Makeup artist e modelo. Especialista em beleza e moda editorial. Disponível para ensaios criativos.",
    followers: "15.1k",
    photos: 203,
    rating: 5.0,
    gallery: [story1, story3, story4, story5, modelFeatured, story2],
  },
  4: {
    name: "Camila",
    age: 22,
    image: story3,
    bio: "Artista visual e modelo. Amo explorar conceitos artísticos em cada ensaio. Fotografia é minha paixão.",
    followers: "6.7k",
    photos: 56,
    rating: 4.7,
    gallery: [story1, story2, story4, story5, modelFeatured, story3],
  },
  5: {
    name: "Luna",
    age: 24,
    image: story4,
    bio: "Modelo comercial e influencer. Trabalho com grandes marcas em campanhas publicitárias nacionais.",
    followers: "22.3k",
    photos: 312,
    rating: 4.9,
    gallery: [story1, story2, story3, story5, modelFeatured, story4],
  },
};

const ModelProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const modelId = parseInt(id || "1");
  const model = modelsData[modelId] || modelsData[1];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-foreground"
        >
          <ArrowLeft size={24} />
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <MessageCircle size={18} className="mr-2" />
          Mensagem
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[3/4] max-h-[60vh] overflow-hidden">
        <img
          src={model.image}
          alt={model.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Model Info */}
      <div className="px-6 -mt-16 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold text-foreground">{model.name}</h1>
          <span className="text-2xl text-muted-foreground">{model.age}</span>
          <img src={verifiedBadge} alt="Verificado" className="w-6 h-6" />
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6">{model.bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl glass mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <Users size={18} />
            </div>
            <p className="text-xl font-bold text-foreground">{model.followers}</p>
            <p className="text-xs text-muted-foreground">Seguidores</p>
          </div>
          <div className="text-center border-x border-border/50">
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <Image size={18} />
            </div>
            <p className="text-xl font-bold text-foreground">{model.photos}</p>
            <p className="text-xs text-muted-foreground">Fotos</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <Star size={18} />
            </div>
            <p className="text-xl font-bold text-foreground">{model.rating}</p>
            <p className="text-xs text-muted-foreground">Avaliação</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Galeria</h2>
          <div className="grid grid-cols-3 gap-2">
            {model.gallery.map((photo, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelProfile;
