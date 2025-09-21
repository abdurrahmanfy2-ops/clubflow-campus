import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  attendees: number;
  type: 'meeting' | 'workshop' | 'social' | 'academic' | 'sports';
}

interface EventCalendarProps {
  events?: Event[];
}

const EventCalendar = ({ events = [] }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock events data
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Talk 2024',
      date: new Date(2024, 11, 25), // December 25, 2024
      time: '2:00 PM',
      location: 'Auditorium A',
      attendees: 85,
      type: 'academic'
    },
    {
      id: '2',
      title: 'Photography Workshop',
      date: new Date(2024, 11, 22), // December 22, 2024
      time: '10:00 AM',
      location: 'Art Studio',
      attendees: 45,
      type: 'workshop'
    },
    {
      id: '3',
      title: 'Basketball Tournament',
      date: new Date(2024, 11, 20), // December 20, 2024
      time: '3:00 PM',
      location: 'Sports Complex',
      attendees: 200,
      type: 'sports'
    },
    {
      id: '4',
      title: 'Study Group Session',
      date: new Date(2024, 11, 18), // December 18, 2024
      time: '6:00 PM',
      location: 'Library',
      attendees: 25,
      type: 'academic'
    },
    {
      id: '5',
      title: 'Holiday Party',
      date: new Date(2024, 11, 31), // December 31, 2024
      time: '7:00 PM',
      location: 'Student Center',
      attendees: 150,
      type: 'social'
    }
  ];

  const allEvents = [...events, ...mockEvents];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getEventsForDate = (date: Date) => {
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'academic': return 'bg-blue-500';
      case 'workshop': return 'bg-green-500';
      case 'sports': return 'bg-orange-500';
      case 'social': return 'bg-purple-500';
      case 'meeting': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 p-1">
          <div className="h-full w-full bg-muted/20 rounded-lg"></div>
        </div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

      days.push(
        <div key={day} className="h-12 p-1">
          <div className={`
            h-full w-full rounded-lg border transition-all duration-200 cursor-pointer
            ${isToday
              ? 'bg-primary/10 border-primary shadow-sm'
              : 'bg-card hover:bg-muted/50 border-border/50'
            }
            ${isPast && !isToday ? 'opacity-60' : ''}
          `}>
            <div className="p-1 h-full flex flex-col">
              <div className={`
                text-xs font-medium mb-1
                ${isToday ? 'text-primary' : 'text-foreground'}
              `}>
                {day}
              </div>

              {/* Event indicators */}
              <div className="flex-1 flex flex-col gap-0.5">
                {dayEvents.slice(0, 2).map((event, index) => (
                  <div
                    key={event.id}
                    className={`
                      w-full h-1 rounded-full ${getEventTypeColor(event.type)}
                      ${index === 1 ? 'opacity-75' : ''}
                    `}
                    title={event.title}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-muted-foreground font-medium">
                    +{dayEvents.length - 2}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingEvents = allEvents
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Event Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Link to="/events/new">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Event
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <h3 className="text-lg font-semibold">
              {formatDate(currentDate)}
            </h3>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="mb-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {day}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="text-muted-foreground">Event Types:</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Academic</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Workshop</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Sports</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Social</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className={`w-3 h-3 rounded-full mt-1 ${getEventTypeColor(event.type)}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {event.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No upcoming events</p>
                <Link to="/events/new">
                  <Button variant="outline" size="sm" className="mt-3">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Event
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;
