import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Calendar, Network, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SplashScreensProps {
  onComplete: () => void;
}

const splashData = [
  {
    id: 1,
    title: "Welcome to Atinuda",
    subtitle: "Your gateway to premium networking and learning experiences",
    description: "Connect with industry leaders, attend world-class sessions, and build meaningful professional relationships.",
    icon: Award,
    gradient: "from-purple-600 to-blue-600",
    image: "🎯"
  },
  {
    id: 2,
    title: "Network Like Never Before",
    subtitle: "Build connections that matter",
    description: "Discover attendees, follow industry peers, and engage in meaningful discussions through our social networking platform.",
    icon: Network,
    gradient: "from-blue-600 to-cyan-600",
    image: "🤝"
  },
  {
    id: 3,
    title: "Interactive Sessions & Speakers",
    subtitle: "Learn from the best in the industry",
    description: "Ask questions, send proposals, and interact with world-renowned speakers in real-time during sessions.",
    icon: Users,
    gradient: "from-cyan-600 to-teal-600",
    image: "🎤"
  },
  {
    id: 4,
    title: "Your Conference, Organized",
    subtitle: "Everything you need in one place",
    description: "Manage your schedule, access tickets, share photos, and navigate the conference with our comprehensive guide.",
    icon: Calendar,
    gradient: "from-teal-600 to-green-600",
    image: "📅"
  }
];

export default function SplashScreens({ onComplete }: SplashScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScreen < splashData.length - 1) {
        handleNext();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentScreen]);

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      if (currentScreen < splashData.length - 1) {
        setCurrentScreen(currentScreen + 1);
      } else {
        onComplete();
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleSkip = () => {
    onComplete();
  };

  const current = splashData[currentScreen];
  const IconComponent = current.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${current.gradient} flex flex-col justify-between p-6 text-white relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-white/15"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-white/10"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-white/25"></div>
      </div>

      {/* Skip Button */}
      <div className="flex justify-end z-10">
        <Button 
          variant="ghost" 
          onClick={handleSkip}
          className="text-white hover:bg-white/20"
        >
          Skip
        </Button>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col justify-center items-center text-center px-4 z-10 transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
        {/* Icon/Image */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
            <IconComponent size={64} className="text-white" />
          </div>
          <div className="text-6xl mb-4">{current.image}</div>
        </div>

        {/* Text Content */}
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            {current.title}
          </h1>
          <h2 className="text-xl font-medium mb-6 text-white/90">
            {current.subtitle}
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            {current.description}
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center z-10">
        {/* Progress Indicators */}
        <div className="flex space-x-2">
          {splashData.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentScreen 
                  ? 'bg-white scale-110' 
                  : index < currentScreen 
                    ? 'bg-white/60' 
                    : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Next/Get Started Button */}
        <Button
          onClick={handleNext}
          className="bg-white text-gray-900 hover:bg-white/90 rounded-full px-6 py-3 font-semibold flex items-center space-x-2"
        >
          <span>{currentScreen === splashData.length - 1 ? 'Get Started' : 'Next'}</span>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}
