import { Send } from "lucide-react";
import { useState } from "react";

const SearchPrompt = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="glass rounded-full p-1 gradient-border">
        <div className="flex items-center bg-background/50 rounded-full overflow-hidden">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva seu modelo ideal..."
            className="flex-1 bg-transparent px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
          />
          <button className="gradient-bg p-3 rounded-full mr-1 hover:opacity-90 transition-opacity">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPrompt;
