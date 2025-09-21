import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Calendar, Trophy, TrendingUp, Plus, Menu, Bell, Search, Settings, MessageSquare, Mail, Smartphone, Megaphone, Send, Archive, Filter, Star, Activity, DollarSign, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EventRecommendations from "@/components/EventRecommendations";
import LoadingScreen from "@/components/LoadingScreen";
import DashboardSettings from "@/components/DashboardSettings";
import CalendarModal from "@/components/CalendarModal";
import AdvancedTechFeatures from "@/components/AdvancedTechFeatures";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount, setNotificationCount] = useState(5);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [notificationsViewed, setNotificationsViewed] = useState(false);
  const [hasOpenedNotifications, setHasOpenedNotifications] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Mock data
  const stats = [
    { title: "Total Members", value: "1,247", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Upcoming Events", value: "8", change: "+3", icon: Calendar, color: "text-green-600" },
    { title: "Active Clubs", value: "23", change: "+2", icon: Trophy, color: "text-purple-600" },
    { title: "Engagement Rate", value: "87%", change: "+5%", icon: TrendingUp, color: "text-orange-600" }
  ];

  const recentEvents = [
    { name: "Tech Talk 2024", club: "Computer Science Club", date: "Dec 25", attendees: 85, status: "upcoming" },
    { name: "Art Exhibition", club: "Fine Arts Society", date: "Dec 22", attendees: 120, status: "ongoing" },
    { name: "Cricket Tournament", club: "Sports Club", date: "Dec 20", attendees: 200, status: "completed" }
  ];

  const topClubs = [
    { name: "Computer Science Club", members: 245, growth: "+15%" },
    { name: "Drama Society", members: 189, growth: "+8%" },
    { name: "Photography Club", members: 156, growth: "+12%" },
    { name: "Music Club", members: 134, growth: "+6%" }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showNotificationPanel && !target.closest('.notification-container')) {
        setShowNotificationPanel(false);
      }
      if (showSettingsPanel && !target.closest('.settings-container')) {
        setShowSettingsPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotificationPanel, showSettingsPanel]);

  // Simulate new notifications (pause when panel is open)
  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount(prev => {
        // Don't add new notifications when panel is open
        if (showNotificationPanel) {
          return prev;
        }
        // Randomly increase notifications (simulating real activity)
        if (Math.random() < 0.3) { // 30% chance every 30 seconds
          // Only reset notificationsViewed if panel is closed
          if (!showNotificationPanel) {
            setNotificationsViewed(false);
          }
          return prev + 1;
        }
        return prev;
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [showNotificationPanel]);

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">CampBuzz Dashboard</h1>
                <p className="text-sm text-muted-foreground">Campus Management Hub</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-6">
                <button
                  onClick={() => scrollToSection('overview')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Overview
                </button>
                <button
                  onClick={() => scrollToSection('events')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Events
                </button>
                <button
                  onClick={() => scrollToSection('calendar')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Calendar
                </button>
                <button
                  onClick={() => scrollToSection('clubs')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clubs
                </button>
                <button
                  onClick={() => scrollToSection('analytics')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Analytics
                </button>
                <button
                  onClick={() => scrollToSection('tech-features')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tech Features
                </button>
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm bg-muted rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 w-48"
                  />
                </div>
                {/* Animated Notification Button */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative"
                    onClick={() => {
                      setShowNotificationPanel(!showNotificationPanel);
                      setHasOpenedNotifications(true);
                    }}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>

                  {/* Animated Counter Badge - disappears permanently after opening notifications */}
                  {notificationCount > 0 && !showNotificationPanel && !hasOpenedNotifications && (
                    <div className="absolute -top-2 -right-2 flex items-center justify-center">
                      <span className="relative inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                        {notificationCount}
                        {/* Pulsing ring animation */}
                        <span className="absolute inset-0 w-full h-full bg-red-500 rounded-full animate-ping opacity-75"></span>
                      </span>
                    </div>
                  )}

                  {/* Notification Dropdown Panel */}
                  {showNotificationPanel && (
                    <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-border">
                        <h3 className="font-semibold text-foreground">Notifications</h3>
                        <p className="text-sm text-muted-foreground">{notificationCount} new notifications</p>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="p-3 hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">Event starting in 30 minutes</p>
                              <p className="text-xs text-muted-foreground">Tech Talk 2024</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">New message from Sarah</p>
                              <p className="text-xs text-muted-foreground">2 minutes ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">Achievement unlocked!</p>
                              <p className="text-xs text-muted-foreground">Event Organizer badge</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">Photography Club posted new photos</p>
                              <p className="text-xs text-muted-foreground">1 hour ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-t border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setNotificationsViewed(true);
                            setNotificationCount(0); // Clear the notification count
                            setShowNotificationPanel(false);
                          }}
                        >
                          Mark All as Read
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Settings Button with Dropdown */}
                <div className="relative settings-container">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettingsPanel(!showSettingsPanel)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>

                  {/* Settings Dropdown Panel */}
                  <DashboardSettings
                    isOpen={showSettingsPanel}
                    onClose={() => setShowSettingsPanel(false)}
                  />
                </div>
                <Link to="/events/new">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <nav className="flex flex-col gap-3">
                <button
                  onClick={() => scrollToSection('overview')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Overview
                </button>
                <button
                  onClick={() => scrollToSection('events')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Events
                </button>
                <button
                  onClick={() => scrollToSection('calendar')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Calendar
                </button>
                <button
                  onClick={() => scrollToSection('clubs')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Clubs
                </button>
                <button
                  onClick={() => scrollToSection('analytics')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Analytics
                </button>
                <button
                  onClick={() => scrollToSection('tech-features')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Tech Features
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Enhanced Welcome Section */}
        <section id="overview" className="scroll-mt-20">
          <div className="space-y-8">
            {/* Personalized Welcome Header */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, John! 👋
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                Here's what's happening in your campus community today.
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <Link to="/events/new">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Event
                  </Button>
                </Link>
                <Link to="/clubs">
                  <Button variant="outline" size="lg">
                    <Users className="h-5 w-5 mr-2" />
                    Join Club
                  </Button>
                </Link>
                <Link to="/communication">
                  <Button variant="outline" size="lg">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowCalendarModal(true)}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  View Calendar
                </Button>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Events Today</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">New Messages</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </Card>
            </div>

            {/* Main Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Professional Activity Feed */}
              <Card className="lg:col-span-2 shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                        Recent Activity
                      </span>
                      <p className="text-sm text-muted-foreground font-normal mt-1">
                        Your latest campus engagements
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-r from-blue-50/50 to-blue-100/30 hover:from-blue-100/50 hover:to-blue-200/30 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-start gap-4 p-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground group-hover:text-blue-700 transition-colors">
                          You joined Photography Club
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">Club Membership</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-sm font-medium text-blue-600">2 hours ago</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-r from-green-50/50 to-green-100/30 hover:from-green-100/50 hover:to-green-200/30 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-start gap-4 p-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground group-hover:text-green-700 transition-colors">
                          RSVP'd to Tech Talk 2024
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">Event Registration</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-sm font-medium text-green-600">4 hours ago</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-r from-purple-50/50 to-purple-100/30 hover:from-purple-100/50 hover:to-purple-200/30 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-start gap-4 p-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <Trophy className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground group-hover:text-purple-700 transition-colors">
                          Achievement Unlocked: Event Organizer
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">Achievement</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-sm font-medium text-purple-600">1 day ago</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-r from-orange-50/50 to-orange-100/30 hover:from-orange-100/50 hover:to-orange-200/30 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-start gap-4 p-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground group-hover:text-orange-700 transition-colors">
                          Workshop starting in 2 hours
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">Reminder</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-sm font-medium text-orange-600">Upcoming</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Notifications & Weather */}
              <div className="space-y-4">
                {/* Notifications Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Event starting in 30 minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>New club announcement</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>3 friends attending Tech Talk</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      View All
                    </Button>
                  </CardContent>
                </Card>

                {/* Weather & Time */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="h-5 w-5" />
                      Today
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-3xl">☀️</div>
                      <p className="font-semibold">Sunny, 72°F</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Next event: 2:00 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Trophy className="h-5 w-5" />
                      Your Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Events Attended</span>
                      <Badge variant="secondary">15 this month</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Connections</span>
                      <Badge variant="secondary">23 new</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Achievements</span>
                      <Badge variant="secondary">Event Organizer</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Links Hub */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Quick Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Link to="/events">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Popular Events
                    </Button>
                  </Link>
                  <Link to="/clubs">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Your Clubs
                    </Button>
                  </Link>
                  <Link to="/recommendations">
                    <Button variant="outline" className="w-full justify-start">
                      <Trophy className="h-4 w-4 mr-2" />
                      AI Recommendations
                    </Button>
                  </Link>
                  <Link to="/budget-sponsorship">
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Budget & Sponsorship
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">All Systems Operational</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Profile: 100%</span>
                    <span>Storage: 2.1GB/10GB</span>
                    <span>Uptime: 99.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Mood Check */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  How are you feeling today?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm">😊 Great</Button>
                  <Button variant="outline" size="sm">😐 Okay</Button>
                  <Button variant="outline" size="sm">😴 Tired</Button>
                  <Button variant="outline" size="sm">🤔 Thinking</Button>
                  <Button variant="outline" size="sm">😎 Excited</Button>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-3">
                  Your mood helps us personalize your experience!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Grid */}
        <section id="analytics" className="scroll-mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-elegant hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1 font-medium">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Event Recommendations */}
        <section id="recommendations" className="scroll-mt-20">
          <EventRecommendations />
        </section>

        {/* Advanced Tech Features */}
        <section id="tech-features" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">Advanced Technology Features</h2>
            <p className="text-muted-foreground">Experience the future of campus management with cutting-edge technology</p>
          </div>
          <AdvancedTechFeatures />
        </section>

        {/* Calendar Modal */}
        <CalendarModal
          isOpen={showCalendarModal}
          onClose={() => setShowCalendarModal(false)}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Events */}
          <section id="events" className="xl:col-span-2 scroll-mt-20">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Events
                </CardTitle>
                <CardDescription>Latest activities across all clubs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{event.club}</p>
                        <p className="text-sm text-muted-foreground">{event.attendees} attendees</p>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <p className="text-sm font-medium text-foreground">{event.date}</p>
                        <Badge
                          variant={event.status === 'upcoming' ? 'default' : event.status === 'ongoing' ? 'secondary' : 'outline'}
                          className="mt-1"
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/events">
                    <Button variant="outline" className="w-full">
                      View All Events
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Top Clubs Sidebar */}
          <section id="clubs" className="scroll-mt-20">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Top Performing Clubs
                </CardTitle>
                <CardDescription>Clubs with highest engagement this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topClubs.map((club, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{club.name}</p>
                        <p className="text-xs text-muted-foreground">{club.members} members</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">{club.growth}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/clubs">
                    <Button variant="outline" className="w-full">
                      View All Clubs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
