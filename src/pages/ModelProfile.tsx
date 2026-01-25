import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Star, Users, Image, MapPin, Globe, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import verifiedBadge from "@/assets/verificado.webp";

import modelFeatured from "@/assets/model-featured.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";
import story5 from "@/assets/story-5.jpg";

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ModelData {
  name: string;
  age: number;
  image: string;
  bio: string;
  followers: string;
  photos: number;
  rating: number;
  gallery: string[];
  location: string;
  specialties: string[];
  languages: string[];
  availability: string;
  instagram: string;
  reviews: Review[];
}

const modelsData: Record<number, ModelData> = {
  1: {
    name: "Isabella",
    age: 23,
    image: modelFeatured,
    bio: "Modelo profissional com 5 anos de experiência em ensaios fotográficos e campanhas publicitárias. Disponível para trabalhos exclusivos e parcerias de longo prazo.",
    followers: "12.5k",
    photos: 147,
    rating: 4.9,
    gallery: [story1, story2, story3, story4, story5, modelFeatured],
    location: "São Paulo, SP",
    specialties: ["Moda", "Beleza", "Editorial"],
    languages: ["Português", "Inglês"],
    availability: "Disponível para ensaios",
    instagram: "@isabella.model",
    reviews: [
      { user: "Fotógrafo SP", rating: 5, comment: "Profissional incrível! Muito pontual e dedicada.", date: "2024-01-15" },
      { user: "Studio ABC", rating: 5, comment: "Excelente trabalho, superou expectativas.", date: "2024-01-10" },
      { user: "Marca XYZ", rating: 4, comment: "Ótima modelo, recomendo!", date: "2024-01-05" },
    ],
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
    location: "Rio de Janeiro, RJ",
    specialties: ["Lifestyle", "Fitness", "Moda Praia"],
    languages: ["Português", "Espanhol"],
    availability: "Agenda aberta",
    instagram: "@sofia.lifestyle",
    reviews: [
      { user: "Beach Brand", rating: 5, comment: "Perfeita para nossa campanha de verão!", date: "2024-01-12" },
      { user: "Fitness Studio", rating: 5, comment: "Energia contagiante nas fotos.", date: "2024-01-08" },
    ],
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
    location: "Belo Horizonte, MG",
    specialties: ["Beleza", "Editorial", "Maquiagem"],
    languages: ["Português", "Inglês", "Italiano"],
    availability: "Disponível aos finais de semana",
    instagram: "@valentina.beauty",
    reviews: [
      { user: "Revista Vogue", rating: 5, comment: "Profissionalismo exemplar.", date: "2024-01-18" },
      { user: "Makeup Brand", rating: 5, comment: "A melhor modelo que já trabalhamos.", date: "2024-01-14" },
      { user: "Fashion Week", rating: 5, comment: "Destaque no evento!", date: "2024-01-02" },
    ],
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
    location: "Curitiba, PR",
    specialties: ["Arte", "Conceitual", "Fine Art"],
    languages: ["Português", "Francês"],
    availability: "Consultar agenda",
    instagram: "@camila.art",
    reviews: [
      { user: "Galeria de Arte", rating: 5, comment: "Expressividade única!", date: "2024-01-16" },
      { user: "Fotógrafo Conceitual", rating: 4, comment: "Muito criativa e colaborativa.", date: "2024-01-09" },
    ],
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
    location: "Brasília, DF",
    specialties: ["Comercial", "Influencer", "Publicidade"],
    languages: ["Português", "Inglês", "Espanhol"],
    availability: "Disponível para campanhas",
    instagram: "@luna.influencer",
    reviews: [
      { user: "Agência Top", rating: 5, comment: "ROI incrível nas campanhas!", date: "2024-01-20" },
      { user: "E-commerce XL", rating: 5, comment: "Vendas triplicaram após a parceria.", date: "2024-01-11" },
      { user: "Marca Nacional", rating: 5, comment: "Profissional de alto nível.", date: "2024-01-06" },
    ],
  },
};

const ModelProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const modelId = parseInt(id || "1");
  const model = modelsData[modelId] || modelsData[1];

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (carouselApi && selectedPhoto !== null) {
      carouselApi.scrollTo(selectedPhoto, true);
    }
  }, [carouselApi, selectedPhoto]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "fill-primary text-primary" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/home")}
          className="text-foreground"
        >
          <ArrowLeft size={24} />
        </Button>
        <div className="flex gap-2">
          <Button
            variant={isFollowing ? "secondary" : "outline"}
            onClick={() => setIsFollowing(!isFollowing)}
            className="gap-2"
          >
            <Heart size={18} className={isFollowing ? "fill-primary text-primary" : ""} />
            {isFollowing ? "Seguindo" : "Seguir"}
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <MessageCircle size={18} className="mr-2" />
            Mensagem
          </Button>
        </div>
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
        
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin size={16} />
          <span className="text-sm">{model.location}</span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-6">
          {model.specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              {specialty}
            </Badge>
          ))}
        </div>

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

        {/* Tabs */}
        <Tabs defaultValue="galeria" className="w-full mb-8">
          <TabsList className="w-full grid grid-cols-3 glass bg-muted/50">
            <TabsTrigger value="galeria" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Galeria
            </TabsTrigger>
            <TabsTrigger value="sobre" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Sobre
            </TabsTrigger>
            <TabsTrigger value="avaliacoes" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Avaliações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="galeria" className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              {model.gallery.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPhoto(index)}
                >
                  <img
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sobre" className="mt-4 space-y-6">
            <div className="glass p-4 rounded-2xl">
              <h3 className="font-semibold text-foreground mb-2">Sobre mim</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{model.bio}</p>
            </div>

            <div className="glass p-4 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Localização</p>
                  <p className="text-sm text-foreground">{model.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe size={18} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Idiomas</p>
                  <p className="text-sm text-foreground">{model.languages.join(", ")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-[18px] h-[18px] text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <div>
                  <p className="text-xs text-muted-foreground">Instagram</p>
                  <p className="text-sm text-foreground">{model.instagram}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Star size={18} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Disponibilidade</p>
                  <p className="text-sm text-foreground">{model.availability}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="avaliacoes" className="mt-4 space-y-4">
            <div className="glass p-4 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-foreground">{model.rating}</p>
                  <div className="flex gap-0.5 mt-1">
                    {renderStars(Math.round(model.rating))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{model.reviews.length} avaliações</p>
                </div>
              </div>
            </div>

            {model.reviews.map((review, index) => (
              <div key={index} className="glass p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{review.user}</p>
                  <div className="flex gap-0.5">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                <p className="text-xs text-muted-foreground/60">{new Date(review.date).toLocaleDateString('pt-BR')}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Fullscreen Gallery Modal */}
      <Dialog open={selectedPhoto !== null} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-full w-full h-full max-h-full p-0 bg-black/95 border-none rounded-none [&>button]:hidden">
          {/* Close button */}
          <div className="absolute top-6 right-6 z-50">
            <button 
              onClick={() => setSelectedPhoto(null)} 
              className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Draggable Carousel */}
          <Carousel
            setApi={setCarouselApi}
            opts={{
              startIndex: selectedPhoto || 0,
              loop: true,
            }}
            className="w-full h-full"
          >
            <CarouselContent className="h-full ml-0">
              {model.gallery.map((photo, index) => (
                <CarouselItem key={index} className="h-full flex items-center justify-center pl-0">
                  <img
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="max-h-[90vh] max-w-full object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Position indicator (dots) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {model.gallery.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentSlide ? 'bg-white' : 'bg-white/40'
                }`} 
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelProfile;
