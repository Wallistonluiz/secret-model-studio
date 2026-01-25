import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import introVideo from "@/assets/intro-video.webm";

const Splash = () => {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleVideoEnd = () => {
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Progress Bar Container */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <Progress value={progress} className="h-1 bg-white/20" />
      </div>
    </div>
  );
};

export default Splash;
