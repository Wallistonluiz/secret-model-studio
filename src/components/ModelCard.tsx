import { useState } from "react";
import modelImage from "@/assets/model-featured.jpg";
import verifiedIcon from "@/assets/usuario-verificado.png";
import verifiedBadge from "@/assets/verificado.webp";
import { Heart, MessageCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
}

const initialComments: Comment[] = [
  { id: "1", username: "maria", text: "Que linda! 😍", timestamp: new Date() },
  { id: "2", username: "joao", text: "Perfeita demais!", timestamp: new Date() },
  { id: "3", username: "ana", text: "Maravilhosa ❤️", timestamp: new Date() },
];

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
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: "voce",
        text: newComment.trim(),
        timestamp: new Date(),
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <div className="relative rounded-3xl overflow-hidden aspect-[3/4] glass gradient-border">
        {/* Verified badge */}
        <img 
          src={verifiedIcon} 
          alt="Usuário verificado" 
          className="absolute top-3 right-3 w-8 h-8 z-10"
        />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Model info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-foreground">{name}</h3>
            <img 
              src={verifiedBadge} 
              alt="Verificado" 
              className="w-7 h-7"
            />
          </div>
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
        <button 
          onClick={() => setIsCommentsOpen(true)}
          className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
        >
          <MessageCircle size={24} />
          <span className="text-sm text-muted-foreground">{comments.length}</span>
        </button>
        <button className="text-foreground hover:text-primary transition-colors">
          <Send size={24} />
        </button>
      </div>

      {/* Comments Modal */}
      <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Comentários ({comments.length})</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-64 pr-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/20 text-primary">
                      {comment.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">@{comment.username}</p>
                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Adicione um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleAddComment} size="sm">
              Enviar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelCard;
