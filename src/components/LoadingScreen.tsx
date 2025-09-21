import { useState, useEffect } from "react";
import { Users, Calendar, Trophy, Activity, Sparkles, Zap, BookOpen, Heart, Star, Shield, Globe, Cpu } from "lucide-react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([]);

  const loadingTexts = [
    "Initializing CampBuzz System...",
    "Establishing secure connection...",
    "Authenticating user credentials...",
    "Loading campus database...",
    "Synchronizing event schedules...",
    "Configuring user preferences...",
    "Finalizing system setup..."
  ];

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setCurrentText(0);
      setParticles([]);
      return;
    }

    // Create floating particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 3 + 2
    }));
    setParticles(newParticles);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.2;
      });
    }, 35);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.id * 0.15}s`,
              animationDuration: `${particle.speed}s`
            }}
          />
        ))}

        {/* Professional Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/8 to-indigo-600/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/8 to-pink-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-slate-600/5 to-slate-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Corporate Header */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              {/* Professional Logo */}
              <div className="relative">
                {/* Outer Corporate Ring */}
                <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-2xl animate-pulse"></div>

                {/* Main Corporate Logo */}
                <div className="relative w-32 h-32 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-full shadow-2xl flex items-center justify-center border border-slate-600/50 backdrop-blur-sm">
                  <Users className="h-16 w-16 text-blue-400" />

                  {/* Corporate Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center border-2 border-slate-800">
                    <Shield className="h-4 w-4 text-white" />
                  </div>

                  {/* Professional Glow */}
                  <div className="absolute inset-4 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Corporate Branding */}
            <div className="space-y-4">
              <h1 className="text-6xl font-light tracking-tight">
                <span className="bg-gradient-to-r from-slate-100 via-blue-100 to-slate-100 bg-clip-text text-transparent">
                  CAMPBUZZ
                </span>
              </h1>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto"></div>
              <p className="text-slate-400 text-xl font-light tracking-wide">Campus Management Platform</p>
            </div>
          </div>

          {/* Professional Progress Section */}
          <div className="mb-12">
            <div className="relative w-full max-w-md mx-auto mb-6">
              {/* Progress Container */}
              <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  {/* Professional Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

                  {/* Corporate Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-600/30 blur-sm"></div>
                </div>

                {/* Progress Markers */}
                {[25, 50, 75].map((marker) => (
                  <div
                    key={marker}
                    className="absolute top-0 w-px h-full bg-slate-600/50"
                    style={{ left: `${marker}%` }}
                  />
                ))}
              </div>

              {/* Progress Stats */}
              <div className="flex justify-between items-center text-sm mt-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-300 font-medium">{progress.toFixed(1)}% Complete</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-medium">Processing...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Status Messages */}
          <div className="mb-16 min-h-[3rem]">
            <div className="inline-flex items-center space-x-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg px-6 py-3">
              <Globe className="h-5 w-5 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
              <p className="text-slate-200 text-lg font-medium transition-all duration-1000 ease-in-out">
                {loadingTexts[currentText]}
              </p>
            </div>
          </div>

          {/* Corporate Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Calendar, label: "Event Management", color: "from-blue-500 to-cyan-500", status: "Active" },
              { icon: Trophy, label: "Club Administration", color: "from-purple-500 to-pink-500", status: "Ready" },
              { icon: Activity, label: "Activity Tracking", color: "from-emerald-500 to-teal-500", status: "Online" },
              { icon: BookOpen, label: "Learning Portal", color: "from-orange-500 to-red-500", status: "Syncing" }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <item.icon className="h-8 w-8 text-white" />
                      <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-200 text-sm font-medium mb-1">{item.label}</p>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-400 text-xs font-medium">{item.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Loading Indicator */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg"
                style={{
                  animation: `bounce 1.4s ease-in-out infinite both`,
                  animationDelay: `${index * 0.16}s`
                }}
              />
            ))}
          </div>

          {/* Corporate Footer */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-slate-500">
                <Shield className="h-4 w-4" />
                <span>Enterprise Security</span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Globe className="h-4 w-4" />
                <span>Global Infrastructure</span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Zap className="h-4 w-4" />
                <span>High Performance</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-slate-600">
              <span>© 2024 CampBuzz. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Corner Accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-blue-400/30"></div>
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-purple-400/30"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-indigo-400/30"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-emerald-400/30"></div>
    </div>
  );
};

export default LoadingScreen;
