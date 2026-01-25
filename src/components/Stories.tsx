import { Plus } from "lucide-react";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";
import story5 from "@/assets/story-5.jpg";

interface Story {
  id: number;
  name: string;
  avatar: string;
  hasNewStory: boolean;
  isYourStory?: boolean;
}

const storiesData: Story[] = [
  { id: 0, name: "Você", avatar: "", hasNewStory: false, isYourStory: true },
  { id: 1, name: "Sofia", avatar: story1, hasNewStory: true },
  { id: 2, name: "Emma", avatar: story2, hasNewStory: true },
  { id: 3, name: "Luna", avatar: story3, hasNewStory: true },
  { id: 4, name: "Yuki", avatar: story4, hasNewStory: false },
  { id: 5, name: "Valentina", avatar: story5, hasNewStory: true },
];

const StoryAvatar = ({ story }: { story: Story }) => {
  if (story.isYourStory) {
    return (
      <div className="flex flex-col items-center gap-1 min-w-[70px]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 gradient-bg rounded-full flex items-center justify-center border-2 border-background">
            <Plus className="w-3 h-3 text-white" />
          </div>
        </div>
        <span className="text-xs text-muted-foreground truncate w-full text-center">
          {story.name}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer group">
      <div 
        className={`p-[2px] rounded-full ${
          story.hasNewStory 
            ? "gradient-bg" 
            : "bg-muted"
        }`}
      >
        <div className="p-[2px] rounded-full bg-background">
          <img
            src={story.avatar}
            alt={story.name}
            className="w-14 h-14 rounded-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
      <span className="text-xs text-foreground truncate w-full text-center">
        {story.name}
      </span>
    </div>
  );
};

const Stories = () => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide animate-fade-in">
      <div className="flex gap-3 px-4 py-2">
        {storiesData.map((story) => (
          <StoryAvatar key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Stories;
