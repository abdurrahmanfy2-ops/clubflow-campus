import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  Rocket
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

const EventRecommendations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Event[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    interests: ['Technology', 'AI', 'Machine Learning', 'Web Development'],
    pastEvents: ['Tech Talk 2024', 'AI Workshop', 'React Conference'],
    college: 'Computer Science',
    skills: ['JavaScript', 'React', 'Python', 'Machine Learning'],
    preferredCategories: ['Technology', 'Workshops', 'Conferences'],
    preferredDifficulty: ['Beginner', 'Intermediate'],
    preferredTimeSlots: ['Evening', 'Weekend']
  });

  // Mock events database
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Advanced React Patterns Workshop',
      description: 'Learn advanced React patterns and best practices from industry experts.',
      date: 'Dec 28, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'Tech Building Room 301',
      category: 'Technology',
      club: 'Computer Science Club',
      attendees: 45,
      maxAttendees: 60,
      tags: ['React', 'JavaScript', 'Advanced', 'Workshop'],
      difficulty: 'Advanced',
      duration: '3 hours'
    },
    {
      id: '2',
      title: 'AI Ethics and Society Discussion',
      description: 'Explore the ethical implications of artificial intelligence in modern society.',
      date: 'Dec 30, 2024',
      time: '4:00 PM - 6:00 PM',
      location: 'Philosophy Hall Auditorium',
      category: 'AI & Ethics',
      club: 'AI Ethics Society',
      attendees: 78,
      maxAttendees: 100,
      tags: ['AI', 'Ethics', 'Discussion', 'Society'],
      difficulty: 'Intermediate',
      duration: '2 hours'
    },
    {
      id: '3',
      title: 'Machine Learning Bootcamp',
      description: 'Intensive 2-day bootcamp covering ML fundamentals and practical applications.',
      date: 'Jan 5, 2025',
      time: '9:00 AM - 4:00 PM',
      location: 'Innovation Center Lab 1',
      category: 'Machine Learning',
      club: 'Data Science Club',
      attendees: 120,
      maxAttendees: 150,
      tags: ['Machine Learning', 'Python', 'Data Science', 'Bootcamp'],
      difficulty: 'Intermediate',
      duration: '2 days'
    },
    {
      id: '4',
      title: 'Digital Art & Design Workshop',
      description: 'Create stunning digital artwork using modern design tools and techniques.',
      date: 'Dec 27, 2024',
      time: '1:00 PM - 4:00 PM',
      location: 'Arts Building Studio 2',
      category: 'Arts & Design',
      club: 'Digital Arts Club',
      attendees: 25,
      maxAttendees: 40,
      tags: ['Digital Art', 'Design', 'Creative', 'Workshop'],
      difficulty: 'Beginner',
      duration: '3 hours'
    },
    {
      id: '5',
      title: 'Startup Pitch Competition',
      description: 'Present your innovative startup ideas and compete for funding and mentorship.',
      date: 'Jan 10, 2025',
      time: '6:00 PM - 9:00 PM',
      location: 'Business School Auditorium',
      category: 'Entrepreneurship',
      club: 'Entrepreneurship Club',
      attendees: 200,
      maxAttendees: 300,
      tags: ['Startup', 'Pitch', 'Business', 'Competition'],
      difficulty: 'Intermediate',
      duration: '3 hours'
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

  // Generate recommendations
  const generateRecommendations = () => {
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const scoredEvents = mockEvents.map(event => ({
        event,
        ...calculateRecommendationScore(event, userPreferences)
      }));

      // Sort by score and take top recommendations
      const topRecommendations = scoredEvents
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(item => item.event);

      setRecommendations(topRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    generateRecommendations();
  }, []);

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Technology': Rocket,
      'AI & Ethics': Brain,
      'Machine Learning': Target,
      'Arts & Design': Palette,
      'Entrepreneurship': Lightbulb,
      'Music': Music,
      'Photography': Camera,
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

  if (isLoading) {
    return (
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Event Recommendations
              </CardTitle>
              <CardDescription>Analyzing your preferences...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Event Recommendations
              </CardTitle>
              <CardDescription>
                Personalized suggestions based on your interests and past activities
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={generateRecommendations}>
            <Zap className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((event) => {
            const IconComponent = getCategoryIcon(event.category);
            const attendancePercentage = (event.attendees / event.maxAttendees) * 100;

            return (
              <div key={event.id} className="group p-4 border border-border rounded-lg hover:border-purple-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <IconComponent className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-purple-700 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        by {event.club}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {event.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-3">
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

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees}/{event.maxAttendees}</span>
                    </div>
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all"
                        style={{ width: `${attendancePercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {Math.round(Math.random() * 30 + 70)}% match
                      </span>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              <span>Based on your interests in Technology, AI, and Web Development</span>
            </div>
            <Link to="/recommendations">
              <Button variant="outline" size="sm">
                View All Recommendations
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventRecommendations;
