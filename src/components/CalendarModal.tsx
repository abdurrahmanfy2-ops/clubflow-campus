import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  Plus,
  X
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

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
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
    },
    {
      id: '6',
      title: 'AI Workshop',
      date: new Date(2024, 11, 28), // December 28, 2024
      time: '1:00 PM',
      location: 'Computer Lab 2',
      attendees: 60,
      type: 'workshop'
    },
    {
      id: '7',
      title: 'Drama Club Meeting',
      date: new Date(2024, 11, 26), // December 26, 2024
      time: '4:00 PM',
      location: 'Theater Room',
      attendees: 30,
      type: 'meeting'
    }
  ];

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
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'academic': return 'bg-blue-500 border-blue-200';
      case 'workshop': return 'bg-green-500 border-green-200';
      case 'sports': return 'bg-orange-500 border-orange-200';
      case 'social': return 'bg-purple-500 border-purple-200';
      case 'meeting': return 'bg-gray-500 border-gray-200';
      default: return 'bg-blue-500 border-blue-200';
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
        <div key={`empty-${i}`} className="h-16 p-1">
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
        <div key={day} className="h-16 p-1">
          <div className={`
            h-full w-full rounded-lg border transition-all duration-200 cursor-pointer group
            ${isToday
              ? 'bg-primary/10 border-primary shadow-sm ring-2 ring-primary/20'
              : 'bg-card hover:bg-muted/50 border-border/50'
            }
            ${isPast && !isToday ? 'opacity-60' : ''}
          `}>
            <div className="p-2 h-full flex flex-col">
              <div className={`
                text-sm font-medium mb-1
                ${isToday ? 'text-primary' : 'text-foreground'}
              `}>
                {day}
              </div>

              {/* Event indicators */}
              <div className="flex-1 flex flex-col gap-1">
                {dayEvents.slice(0, 3).map((event, index) => (
                  <div
                    key={event.id}
                    className={`
                      w-full h-1.5 rounded-full border ${getEventTypeColor(event.type)}
                      ${index === 2 ? 'opacity-75' : ''}
                    `}
                    title={event.title}
                  />
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground font-medium">
                    +{dayEvents.length - 3}
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

  const upcomingEvents = mockEvents
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 8);

  const todayEvents = mockEvents.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === today.toDateString();
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              Campus Event Calendar
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Calendar View</CardTitle>
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

                    <h3 className="text-xl font-semibold">
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
                    <div className="grid grid-cols-7 gap-1 mb-3">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="h-10 flex items-center justify-center">
                          <span className="text-sm font-medium text-muted-foreground">
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
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-muted-foreground font-medium">Event Types:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full border border-blue-200"></div>
                      <span>Academic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full border border-green-200"></div>
                      <span>Workshop</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full border border-orange-200"></div>
                      <span>Sports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full border border-purple-200"></div>
                      <span>Social</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-500 rounded-full border border-gray-200"></div>
                      <span>Meeting</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Today's Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5" />
                    Today's Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayEvents.length > 0 ? (
                      todayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
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
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No events today</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
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
                      <div className="text-center py-6 text-muted-foreground">
                        <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No upcoming events</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Calendar Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Events</span>
                      <Badge variant="secondary">{mockEvents.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <Badge variant="secondary">
                        {mockEvents.filter(e => {
                          const eventDate = new Date(e.date);
                          const current = new Date(currentDate);
                          return eventDate.getMonth() === current.getMonth() &&
                                 eventDate.getFullYear() === current.getFullYear();
                        }).length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Today</span>
                      <Badge variant="secondary">{todayEvents.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Upcoming</span>
                      <Badge variant="secondary">{upcomingEvents.length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
