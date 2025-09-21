import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Bot,
  Mic,
  MicOff,
  Smartphone,
  Download,
  Shield,
  Eye,
  Sparkles,
  Zap,
  Globe,
  Lock,
  QrCode,
  Camera,
  MessageSquare,
  Send,
  Star,
  Calendar,
  MapPin,
  Users
} from "lucide-react";

const AdvancedTechFeatures = () => {
  const [isListening, setIsListening] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [showPWAInstall, setShowPWAInstall] = useState(false);
  const [showBlockchainDemo, setShowBlockchainDemo] = useState(false);
  const [showARPreview, setShowARPreview] = useState(false);

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Mock voice search functionality
    if (!isListening) {
      setTimeout(() => {
        setChatResponse("I found 5 music events near you this weekend! Check out the Jazz Night at the Student Center and the Live Band Performance at the Campus Amphitheater.");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleChatSubmit = () => {
    if (chatMessage.toLowerCase().includes("weekend")) {
      setChatResponse("🎉 Great choice! Here are the best events this weekend:\n\n• Tech Talk 2024 - Tomorrow 2:00 PM\n• Music Festival - Saturday 6:00 PM\n• Art Exhibition - Sunday 10:00 AM\n• Sports Tournament - All weekend\n\nWould you like me to RSVP you to any of these?");
    } else {
      setChatResponse("I'm here to help! I can find events, help with registrations, or answer any questions about campus activities. What would you like to know?");
    }
    setChatMessage("");
  };

  const mockBlockchainData = {
    ticketId: "TKT-2024-DEC-25-001",
    eventName: "Tech Talk 2024",
    holder: "John Doe",
    issued: "2024-12-20T10:30:00Z",
    valid: true,
    hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890"
  };

  return (
    <div className="space-y-6">
      {/* PWA Installation Card */}
      <Card className="border-2 border-blue-200/50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 shadow-2xl shadow-blue-500/10">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur-lg opacity-50"></div>
              <div className="relative p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Smartphone className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent font-bold text-xl">
                Progressive Web App
              </span>
              <p className="text-sm text-slate-300 font-normal mt-1">
                Install on your device for offline access
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-200">Installable on Mobile</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-200">Works Offline</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-200">Lightning Fast</span>
              </div>
            </div>
            <Dialog open={showPWAInstall} onOpenChange={setShowPWAInstall}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Download className="h-4 w-4 mr-2" />
                  Install App
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Install CampBuzz
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Install on Your Device</h3>
                    <p className="text-muted-foreground text-sm">
                      Get the full CampBuzz experience with offline access, push notifications, and native app performance.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Works without internet</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Push notifications</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Native app performance</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600">
                    <Download className="h-4 w-4 mr-2" />
                    Add to Home Screen
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* AI Chatbot Assistant */}
      <Card className="border-2 border-purple-200/50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl shadow-purple-500/10">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur-lg opacity-50"></div>
              <div className="relative p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
                <Bot className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent font-bold text-xl">
                AI Assistant
              </span>
              <p className="text-sm text-slate-300 font-normal mt-1">
                Smart event recommendations & assistance
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 min-h-[120px]">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">CampBuzz Assistant</p>
                  <p className="text-xs text-slate-400">Online</p>
                </div>
              </div>

              {chatResponse && (
                <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3 mb-3">
                  <p className="text-sm text-slate-200">{chatResponse}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about events..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder-slate-400"
                />
                <Button
                  onClick={handleChatSubmit}
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChatMessage("Find me the best events this weekend")}
                className="text-xs border-slate-700/50 text-slate-300 hover:bg-slate-800/50"
              >
                🎉 Weekend Events
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChatMessage("Show me music events")}
                className="text-xs border-slate-700/50 text-slate-300 hover:bg-slate-800/50"
              >
                🎵 Music Events
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Search */}
      <Card className="border-2 border-green-200/50 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 shadow-2xl shadow-green-500/10">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur-lg opacity-50"></div>
              <div className="relative p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                {isListening ? <MicOff className="h-7 w-7 text-white" /> : <Mic className="h-7 w-7 text-white" />}
              </div>
            </div>
            <div>
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent font-bold text-xl">
                Voice Search
              </span>
              <p className="text-sm text-slate-300 font-normal mt-1">
                "Show me music events near me"
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center space-y-4">
            <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
                : 'bg-green-500 hover:bg-green-600 cursor-pointer shadow-lg shadow-green-500/30'
            }`} onClick={handleVoiceSearch}>
              {isListening ? (
                <MicOff className="h-8 w-8 text-white" />
              ) : (
                <Mic className="h-8 w-8 text-white" />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-200">
                {isListening ? "Listening..." : "Click to start voice search"}
              </p>
              <p className="text-xs text-slate-400">
                Try: "Find events this weekend" or "Show me workshops"
              </p>
            </div>

            {isListening && (
              <div className="flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-8 bg-green-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Ticketing */}
      <Card className="border-2 border-orange-200/50 bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 shadow-2xl shadow-orange-500/10">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur-lg opacity-50"></div>
              <div className="relative p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <span className="bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent font-bold text-xl">
                Blockchain Security
              </span>
              <p className="text-sm text-slate-300 font-normal mt-1">
                Tamper-proof event registrations
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-200">Secure Registration</span>
              </div>
              <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-300 border-emerald-700/50">
                Verified
              </Badge>
            </div>

            <Dialog open={showBlockchainDemo} onOpenChange={setShowBlockchainDemo}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-slate-700/50 text-slate-300 hover:bg-slate-800/50">
                  <QrCode className="h-4 w-4 mr-2" />
                  View Ticket Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    Blockchain Ticket Verification
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg">
                    <div className="text-center">
                      <QrCode className="h-16 w-16 mx-auto mb-3 text-orange-600" />
                      <h3 className="font-semibold text-lg mb-2">Tech Talk 2024</h3>
                      <p className="text-sm text-muted-foreground">December 25, 2024 • 2:00 PM</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ticket ID:</span>
                      <span className="font-mono text-xs">{mockBlockchainData.ticketId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Holder:</span>
                      <span className="font-medium">{mockBlockchainData.holder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Valid
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blockchain Hash:</span>
                      <span className="font-mono text-xs">{mockBlockchainData.hash.substring(0, 20)}...</span>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700">
                        ✅ Tamper-proof verification
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      This ticket cannot be forged or duplicated
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* AR/VR Preview */}
      <Card className="border-2 border-cyan-200/50 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 shadow-2xl shadow-cyan-500/10">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-lg opacity-50"></div>
              <div className="relative p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                <Eye className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent font-bold text-xl">
                AR/VR Preview
              </span>
              <p className="text-sm text-slate-300 font-normal mt-1">
                Preview event venues in 3D
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="text-center">
              <div className="relative w-full h-32 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-slate-600/50">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                <div className="relative z-10 text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-300">3D Venue Preview</p>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-cyan-900/50 text-cyan-300 border-cyan-700/50 text-xs">
                    AR Ready
                  </Badge>
                </div>
              </div>

              <Dialog open={showARPreview} onOpenChange={setShowARPreview}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview in 3D
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-cyan-500" />
                      AR/VR Event Preview
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-6 rounded-lg text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <Camera className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Auditorium A - 3D Preview</h3>
                      <p className="text-muted-foreground mb-4">
                        Experience the Tech Talk 2024 venue before attending
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">Capacity</span>
                          </div>
                          <p className="text-muted-foreground">200 seats</p>
                        </div>
                        <div className="bg-white/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="font-medium">Location</span>
                          </div>
                          <p className="text-muted-foreground">Building C, Floor 2</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-cyan-500" />
                        <span className="font-medium text-cyan-700">Features</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>360° venue walkthrough</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Interactive seating selection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Virtual reality compatibility</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
                      <Eye className="h-4 w-4 mr-2" />
                      Launch AR Preview
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Powered by Advanced AR Technology</span>
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                Beta
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedTechFeatures;
