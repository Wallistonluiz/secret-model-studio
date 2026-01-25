import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import introVideo from "@/assets/intro-video.webm";
import logo from "@/assets/logo.png";

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

  const handleEnter = () => {
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
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Logo at Top */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
        <img src={logo} alt="Secret Models" className="h-16 object-contain" />
      </div>

      {/* Enter Button and Description */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <Button
          onClick={handleEnter}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105"
        >
          Entrar
        </Button>
        <p className="mt-4 text-white/70 text-sm text-center px-8">
          Nosso site oferece conteúdo exclusivo
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <Progress value={progress} className="h-1 bg-white/20" />
      </div>
    </div>
  );
};

export default Splash;
