import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Calendar,
  Users,
  TrendingUp,
  Star,
  Clock,
  MapPin,
  Heart,
  Bookmark,
  ChevronRight,
  Brain,
  Target,
  Zap,
  Award,
  BookOpen,
  Music,
  Palette,
  Gamepad2,
  Camera,
  Dumbbell,
  Globe,
  Lightbulb,
  Rocket,
  Filter,
  Search,
  RefreshCw,
  Settings,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";

// Types for our recommendation system
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  club: string;
  attendees: number;
  maxAttendees: number;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image?: string;
  rating?: number;
  reviews?: number;
}

interface UserPreferences {
  interests: string[];
  pastEvents: string[];
  college: string;
  skills: string[];
  preferredCategories: string[];
  preferredDifficulty: string[];
  preferredTimeSlots: string[];
}

interface RecommendationScore {
  eventId: string;
  score: number;
  reasons: string[];
  confidence: number;
}

const Recommendations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allRecommendations, setAllRecommendations] = useState<Event[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [activeTab, setActiveTab] = useState("all");

  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    interests: ['Technology', 'AI', 'Machine Learning', 'Web Development'],
    pastEvents: ['Tech Talk 2024', 'AI Workshop', 'React Conference'],
    college: 'Computer Science',
    skills: ['JavaScript', 'React', 'Python', 'Machine Learning'],
    preferredCategories: ['Technology', 'Workshops', 'Conferences'],
    preferredDifficulty: ['Beginner', 'Intermediate'],
    preferredTimeSlots: ['Evening', 'Weekend']
  });

  // Expanded mock events database
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Advanced React Patterns Workshop',
      description: 'Learn advanced React patterns and best practices from industry experts. This hands-on workshop covers hooks, context, performance optimization, and testing strategies.',
      date: 'Dec 28, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'Tech Building Room 301',
      category: 'Technology',
      club: 'Computer Science Club',
      attendees: 45,
      maxAttendees: 60,
      tags: ['React', 'JavaScript', 'Advanced', 'Workshop', 'Frontend'],
      difficulty: 'Advanced',
      duration: '3 hours',
      rating: 4.8,
      reviews: 23
    },
    {
      id: '2',
      title: 'AI Ethics and Society Discussion',
      description: 'Explore the ethical implications of artificial intelligence in modern society. Discuss bias, privacy, job displacement, and responsible AI development.',
      date: 'Dec 30, 2024',
      time: '4:00 PM - 6:00 PM',
      location: 'Philosophy Hall Auditorium',
      category: 'AI & Ethics',
      club: 'AI Ethics Society',
      attendees: 78,
      maxAttendees: 100,
      tags: ['AI', 'Ethics', 'Discussion', 'Society', 'Philosophy'],
      difficulty: 'Intermediate',
      duration: '2 hours',
      rating: 4.6,
      reviews: 45
    },
    {
      id: '3',
      title: 'Machine Learning Bootcamp',
      description: 'Intensive 2-day bootcamp covering ML fundamentals and practical applications. Learn supervised/unsupervised learning, neural networks, and real-world case studies.',
      date: 'Jan 5, 2025',
      time: '9:00 AM - 4:00 PM',
      location: 'Innovation Center Lab 1',
      category: 'Machine Learning',
      club: 'Data Science Club',
      attendees: 120,
      maxAttendees: 150,
      tags: ['Machine Learning', 'Python', 'Data Science', 'Bootcamp', 'Neural Networks'],
      difficulty: 'Intermediate',
      duration: '2 days',
      rating: 4.9,
      reviews: 67
    },
    {
      id: '4',
      title: 'Digital Art & Design Workshop',
      description: 'Create stunning digital artwork using modern design tools and techniques. Learn Photoshop, Illustrator, and digital painting fundamentals.',
      date: 'Dec 27, 2024',
      time: '1:00 PM - 4:00 PM',
      location: 'Arts Building Studio 2',
      category: 'Arts & Design',
      club: 'Digital Arts Club',
      attendees: 25,
      maxAttendees: 40,
      tags: ['Digital Art', 'Design', 'Creative', 'Workshop', 'Adobe'],
      difficulty: 'Beginner',
      duration: '3 hours',
      rating: 4.4,
      reviews: 18
    },
    {
      id: '5',
      title: 'Startup Pitch Competition',
      description: 'Present your innovative startup ideas and compete for funding and mentorship. Network with investors and successful entrepreneurs.',
      date: 'Jan 10, 2025',
      time: '6:00 PM - 9:00 PM',
      location: 'Business School Auditorium',
      category: 'Entrepreneurship',
      club: 'Entrepreneurship Club',
      attendees: 200,
      maxAttendees: 300,
      tags: ['Startup', 'Pitch', 'Business', 'Competition', 'Investment'],
      difficulty: 'Intermediate',
      duration: '3 hours',
      rating: 4.7,
      reviews: 89
    },
    {
      id: '6',
      title: 'Photography Masterclass: Street Photography',
      description: 'Master the art of street photography with professional photographer Maria Santos. Learn composition, lighting, and storytelling techniques.',
      date: 'Jan 8, 2025',
      time: '10:00 AM - 3:00 PM',
      location: 'Photography Studio & City Center',
      category: 'Photography',
      club: 'Photography Club',
      attendees: 15,
      maxAttendees: 25,
      tags: ['Photography', 'Street Photography', 'Composition', 'Masterclass'],
      difficulty: 'Intermediate',
      duration: '5 hours',
      rating: 4.9,
      reviews: 34
    },
    {
      id: '7',
      title: 'Game Development with Unity',
      description: 'Build your first 3D game using Unity game engine. Learn C# scripting, 3D modeling, physics, and game design principles.',
      date: 'Jan 12, 2025',
      time: '1:00 PM - 6:00 PM',
      location: 'Game Dev Lab',
      category: 'Game Development',
      club: 'Game Development Club',
      attendees: 35,
      maxAttendees: 50,
      tags: ['Unity', 'Game Development', 'C#', '3D Modeling', 'Gaming'],
      difficulty: 'Beginner',
      duration: '5 hours',
      rating: 4.5,
      reviews: 28
    },
    {
      id: '8',
      title: 'Public Speaking & Presentation Skills',
      description: 'Overcome stage fright and master the art of public speaking. Learn presentation techniques, body language, and audience engagement.',
      date: 'Jan 15, 2025',
      time: '3:00 PM - 5:00 PM',
      location: 'Communication Center Room 201',
      category: 'Communication',
      club: 'Toastmasters Club',
      attendees: 60,
      maxAttendees: 80,
      tags: ['Public Speaking', 'Presentation', 'Communication', 'Confidence'],
      difficulty: 'Beginner',
      duration: '2 hours',
      rating: 4.6,
      reviews: 52
    }
  ];

  // AI Recommendation Algorithm
  const calculateRecommendationScore = (event: Event, preferences: UserPreferences): RecommendationScore => {
    let score = 0;
    let reasons: string[] = [];
    let confidence = 0;

    // Category matching (40% weight)
    if (preferences.preferredCategories.includes(event.category)) {
      score += 40;
      reasons.push(`Matches your preferred category: ${event.category}`);
      confidence += 30;
    }

    // Past interests matching (25% weight)
    const matchingInterests = event.tags.filter(tag =>
      preferences.interests.some(interest =>
        tag.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(tag.toLowerCase())
      )
    );
    if (matchingInterests.length > 0) {
      score += 25;
      reasons.push(`Matches your interests: ${matchingInterests.slice(0, 2).join(', ')}`);
      confidence += 25;
    }

    // Skills matching (20% weight)
    const matchingSkills = event.tags.filter(tag =>
      preferences.skills.some(skill =>
        tag.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(tag.toLowerCase())
      )
    );
    if (matchingSkills.length > 0) {
      score += 20;
      reasons.push(`Relevant to your skills: ${matchingSkills.slice(0, 2).join(', ')}`);
      confidence += 20;
    }

    // Difficulty level matching (10% weight)
    if (preferences.preferredDifficulty.includes(event.difficulty)) {
      score += 10;
      reasons.push(`Matches your preferred difficulty: ${event.difficulty}`);
      confidence += 15;
    }

    // Past event attendance bonus (5% weight)
    const attendedSimilar = preferences.pastEvents.some(pastEvent =>
      event.title.toLowerCase().includes(pastEvent.toLowerCase().split(' ')[0]) ||
      event.tags.some(tag => pastEvent.toLowerCase().includes(tag.toLowerCase()))
    );
    if (attendedSimilar) {
      score += 5;
      reasons.push('Similar to events you\'ve attended before');
      confidence += 10;
    }

    // Popularity bonus (trending events)
    const attendanceRate = event.attendees / event.maxAttendees;
    if (attendanceRate > 0.7) {
      score += 5;
      reasons.push('Trending event with high attendance');
      confidence += 5;
    }

    return {
      eventId: event.id,
      score: Math.min(score, 100),
      reasons,
      confidence: Math.min(confidence, 100)
    };
  };

  // Generate all recommendations
  const generateAllRecommendations = () => {
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const scoredEvents = mockEvents.map(event => ({
        event,
        ...calculateRecommendationScore(event, userPreferences)
      }));

      // Sort by score and take all recommendations
      const allRecs = scoredEvents
        .sort((a, b) => b.score - a.score)
        .map(item => item.event);

      setAllRecommendations(allRecs);
      setFilteredRecommendations(allRecs);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    generateAllRecommendations();
  }, []);

  // Filter and sort recommendations
  useEffect(() => {
    let filtered = [...allRecommendations];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(event => event.difficulty === selectedDifficulty);
    }

    // Apply sorting
    switch (sortBy) {
      case "relevance":
        filtered.sort((a, b) => {
          const aScore = calculateRecommendationScore(a, userPreferences).score;
          const bScore = calculateRecommendationScore(b, userPreferences).score;
          return bScore - aScore;
        });
        break;
      case "date":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "popularity":
        filtered.sort((a, b) => (b.attendees / b.maxAttendees) - (a.attendees / a.maxAttendees));
        break;
    }

    setFilteredRecommendations(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy, allRecommendations, userPreferences]);

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Technology': Rocket,
      'AI & Ethics': Brain,
      'Machine Learning': Target,
      'Arts & Design': Palette,
      'Entrepreneurship': Lightbulb,
      'Photography': Camera,
      'Game Development': Gamepad2,
      'Communication': MessageSquare,
      'Music': Music,
      'Sports': Dumbbell,
      'Gaming': Gamepad2,
      'Literature': BookOpen,
      'Cultural': Globe
    };
    return iconMap[category] || Award;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const categories = ['all', ...Array.from(new Set(mockEvents.map(event => event.category)))];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Filters Skeleton */}
          <div className="flex flex-wrap gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-40" />
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI Event Recommendations</h1>
                <p className="text-muted-foreground">
                  Personalized event suggestions powered by artificial intelligence
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={generateAllRecommendations}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Recommendations</p>
                <p className="text-2xl font-bold">{allRecommendations.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Match Events</p>
                <p className="text-2xl font-bold">
                  {allRecommendations.filter(e => calculateRecommendationScore(e, userPreferences).score > 70).length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Eye className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events, topics, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Levels' : difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({filteredRecommendations.length})</TabsTrigger>
            <TabsTrigger value="high-match">
              High Match ({filteredRecommendations.filter(e => calculateRecommendationScore(e, userPreferences).score > 70).length})
            </TabsTrigger>
            <TabsTrigger value="trending">
              Trending ({filteredRecommendations.filter(e => (e.attendees / e.maxAttendees) > 0.7).length})
            </TabsTrigger>
            <TabsTrigger value="new">
              New ({filteredRecommendations.filter(e => new Date(e.date) > new Date()).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredRecommendations.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 bg-muted rounded-full">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">No events found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedDifficulty("all");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRecommendations.map((event) => {
                  const IconComponent = getCategoryIcon(event.category);
                  const attendancePercentage = (event.attendees / event.maxAttendees) * 100;
                  const recommendationScore = calculateRecommendationScore(event, userPreferences);

                  return (
                    <Card key={event.id} className="group hover:shadow-lg transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                              <IconComponent className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg group-hover:text-purple-700 transition-colors line-clamp-2">
                                {event.title}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                by {event.club}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.category}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(event.difficulty)}`}>
                            {event.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.duration}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span className="text-xs">{event.attendees}/{event.maxAttendees}</span>
                            </div>
                            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-500 rounded-full transition-all"
                                style={{ width: `${attendancePercentage}%` }}
                              />
                            </div>
                          </div>
                          {event.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{event.rating}</span>
                              <span className="text-xs text-muted-foreground">({event.reviews})</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">
                                {recommendationScore.score}% match
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                View Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                          {recommendationScore.reasons.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground">
                                💡 {recommendationScore.reasons[0]}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recommendations;
