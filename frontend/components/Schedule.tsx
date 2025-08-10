import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface Session {
  id: string;
  title: string;
  speaker: string;
  time: string;
  duration: string;
  location: string;
  type: 'keynote' | 'workshop' | 'panel' | 'breakout' | 'networking';
  description: string;
  capacity?: number;
  registered?: number;
  isRegistered?: boolean;
}

interface DaySchedule {
  date: string;
  day: string;
  sessions: Session[];
}

const schedule: DaySchedule[] = [
  {
    date: '2024-02-15',
    day: 'Day 1',
    sessions: [
      {
        id: '1',
        title: 'Opening Keynote: The Future of Technology',
        speaker: 'Dr. Sarah Johnson',
        time: '09:00',
        duration: '60 min',
        location: 'Main Hall',
        type: 'keynote',
        description: 'Exploring emerging technologies and their impact on business transformation.',
      },
      {
        id: '2',
        title: 'AI Workshop: Hands-on Machine Learning',
        speaker: 'Dr. Sarah Johnson',
        time: '10:30',
        duration: '90 min',
        location: 'Workshop Room A',
        type: 'workshop',
        description: 'Interactive workshop on implementing ML solutions in enterprise environments.',
        capacity: 30,
        registered: 18,
      },
      {
        id: '3',
        title: 'Networking Coffee Break',
        speaker: 'All Attendees',
        time: '12:00',
        duration: '30 min',
        location: 'Lobby',
        type: 'networking',
        description: 'Connect with fellow attendees over coffee and light refreshments.',
      },
      {
        id: '4',
        title: 'Startup Funding Panel',
        speaker: 'Michael Chen & Others',
        time: '14:00',
        duration: '75 min',
        location: 'Conference Room B',
        type: 'panel',
        description: 'Panel discussion on securing funding for early-stage startups.',
      },
      {
        id: '5',
        title: 'Digital Marketing Breakout',
        speaker: 'Marketing Experts',
        time: '15:30',
        duration: '45 min',
        location: 'Breakout Room 1',
        type: 'breakout',
        description: 'Small group session on modern digital marketing strategies.',
        capacity: 20,
        registered: 12,
      }
    ]
  },
  {
    date: '2024-02-16',
    day: 'Day 2',
    sessions: [
      {
        id: '6',
        title: 'Fintech Revolution in Africa',
        speaker: 'Dr. Amara Okafor',
        time: '09:00',
        duration: '60 min',
        location: 'Main Hall',
        type: 'keynote',
        description: 'How fintech is transforming financial services across the African continent.',
      },
      {
        id: '7',
        title: 'Blockchain Workshop',
        speaker: 'Tech Experts',
        time: '10:30',
        duration: '120 min',
        location: 'Workshop Room B',
        type: 'workshop',
        description: 'Deep dive into blockchain technology and cryptocurrency applications.',
        capacity: 25,
        registered: 20,
      },
      {
        id: '8',
        title: 'Innovation Showcase',
        speaker: 'Startup Founders',
        time: '14:00',
        duration: '90 min',
        location: 'Exhibition Hall',
        type: 'panel',
        description: 'Emerging startups present their innovative solutions.',
      },
      {
        id: '9',
        title: 'Closing Networking Reception',
        speaker: 'All Attendees',
        time: '16:00',
        duration: '120 min',
        location: 'Rooftop Terrace',
        type: 'networking',
        description: 'Final networking opportunity with drinks and entertainment.',
      }
    ]
  }
];

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [registeredSessions, setRegisteredSessions] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleRegister = async (sessionId: string, sessionTitle: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRegisteredSessions(prev => new Set([...prev, sessionId]));
      
      toast({
        title: "Registration Successful!",
        description: `You've been registered for "${sessionTitle}".`,
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error registering for this session. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUnregister = async (sessionId: string, sessionTitle: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRegisteredSessions(prev => {
        const newSet = new Set(prev);
        newSet.delete(sessionId);
        return newSet;
      });
      
      toast({
        title: "Unregistered",
        description: `You've been removed from "${sessionTitle}".`,
      });
    } catch (error) {
      console.error('Unregistration error:', error);
      toast({
        title: "Error",
        description: "There was an error unregistering from this session.",
        variant: "destructive"
      });
    }
  };

  const getSessionTypeColor = (type: Session['type']) => {
    switch (type) {
      case 'keynote': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'panel': return 'bg-purple-100 text-purple-800';
      case 'breakout': return 'bg-orange-100 text-orange-800';
      case 'networking': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentSchedule = schedule[selectedDay];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <h1 className="text-2xl font-bold">Event Schedule</h1>
        <p className="text-indigo-100 mt-1">Plan your conference experience</p>
      </div>

      {/* Day Selector */}
      <div className="p-4">
        <div className="flex space-x-2 mb-6">
          {schedule.map((day, index) => (
            <Button
              key={index}
              variant={selectedDay === index ? 'default' : 'outline'}
              onClick={() => setSelectedDay(index)}
              className="flex-1"
            >
              <Calendar className="mr-2" size={16} />
              {day.day}
            </Button>
          ))}
        </div>

        {/* Sessions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{currentSchedule.day}</h2>
            <Badge variant="outline">{currentSchedule.date}</Badge>
          </div>

          {currentSchedule.sessions.map((session) => {
            const isRegistered = registeredSessions.has(session.id);
            const canRegister = session.type === 'workshop' || session.type === 'breakout';
            const isFull = session.capacity && session.registered && session.registered >= session.capacity;

            return (
              <Card key={session.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getSessionTypeColor(session.type)}>
                          {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                        </Badge>
                        {isRegistered && (
                          <Badge variant="default" className="bg-green-600">
                            <Check size={12} className="mr-1" />
                            Registered
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <p className="text-gray-600">{session.speaker}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{session.time} ({session.duration})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{session.location}</span>
                    </div>
                  </div>

                  {session.capacity && (
                    <div className="flex items-center space-x-2 mb-3">
                      <Users size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {session.registered}/{session.capacity} registered
                      </span>
                      {isFull && <Badge variant="destructive" className="text-xs">Full</Badge>}
                    </div>
                  )}

                  <p className="text-gray-700 mb-4">{session.description}</p>

                  {canRegister && (
                    <div className="flex space-x-2">
                      {isRegistered ? (
                        <Button
                          variant="outline"
                          onClick={() => handleUnregister(session.id, session.title)}
                          className="flex items-center space-x-2"
                        >
                          <Check size={16} />
                          <span>Registered</span>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleRegister(session.id, session.title)}
                          disabled={isFull}
                          className="flex items-center space-x-2"
                        >
                          <Plus size={16} />
                          <span>{isFull ? 'Session Full' : 'Register'}</span>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
