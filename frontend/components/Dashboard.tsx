import React, { useState } from 'react';
import { MessageCircle, Send, Clock, MapPin, Star, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  topics: string[];
  sessions: {
    title: string;
    date: string;
    time: string;
    location: string;
  }[];
  rating: number;
  expertise: string[];
}

const speakers: Speaker[] = [
  {
    id: '1',
    name: 'Seyi Tinubu',
    title: 'Chief Technology Officer',
    company: 'TechCorp Global',
    bio: 'Leading expert in AI and machine learning with 15+ years of experience in enterprise technology solutions.',
    image: '👩‍💼',
    topics: ['Artificial Intelligence', 'Machine Learning', 'Digital Transformation'],
    sessions: [
      {
        title: 'The Future of AI in Enterprise',
        date: '2024-02-15',
        time: '10:00 AM',
        location: 'Main Hall'
      },
      {
        title: 'ML Workshop: Practical Applications',
        date: '2024-02-16',
        time: '02:00 PM',
        location: 'Workshop Room A'
      }
    ],
    rating: 4.8,
    expertise: ['AI Strategy', 'Team Leadership', 'Innovation']
  },
  {
    id: '2',
    name: 'Lilian Olubi',
    title: 'Founder & CEO',
    company: 'StartupVentures',
    bio: 'Serial entrepreneur and investor with successful exits in fintech and healthtech sectors.',
    image: '👨‍💼',
    topics: ['Entrepreneurship', 'Venture Capital', 'Startup Strategy'],
    sessions: [
      {
        title: 'Building Scalable Startups',
        date: '2024-02-15',
        time: '02:30 PM',
        location: 'Conference Room B'
      }
    ],
    rating: 4.9,
    expertise: ['Fundraising', 'Product Strategy', 'Market Expansion']
  },
  {
    id: '3',
    name: 'TY Bello',
    title: 'Head of Innovation',
    company: 'African Development Bank',
    bio: 'Driving financial inclusion across Africa through innovative fintech solutions and policy development.',
    image: '👩‍🔬',
    topics: ['Fintech', 'Financial Inclusion', 'African Markets'],
    sessions: [
      {
        title: 'Fintech Revolution in Africa',
        date: '2024-02-16',
        time: '09:00 AM',
        location: 'Main Hall'
      }
    ],
    rating: 4.7,
    expertise: ['Policy Development', 'Financial Services', 'Market Research']
  }
];

export default function SpeakerSystem() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [proposalText, setProposalText] = useState('');
  const [activeTab, setActiveTab] = useState<'question' | 'proposal'>('question');
  const { toast } = useToast();

  const handleSubmitQuestion = async () => {
    if (!questionText.trim() || !selectedSpeaker) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Question Submitted!",
        description: `Your question has been sent to ${selectedSpeaker.name}. You'll be notified when they respond.`,
      });
      
      setQuestionText('');
      setSelectedSpeaker(null);
    } catch (error) {
      console.error('Error submitting question:', error);
      toast({
        title: "Error",
        description: "Failed to submit question. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitProposal = async () => {
    if (!proposalText.trim() || !selectedSpeaker) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Proposal Sent!",
        description: `Your business proposal has been sent to ${selectedSpeaker.name}.`,
      });
      
      setProposalText('');
      setSelectedSpeaker(null);
    } catch (error) {
      console.error('Error submitting proposal:', error);
      toast({
        title: "Error",
        description: "Failed to send proposal. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (selectedSpeaker) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedSpeaker(null)}
            className="text-white hover:bg-white/20 mb-4"
          >
            ← Back to Speakers
          </Button>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{selectedSpeaker.image}</div>
            <div>
              <h1 className="text-2xl font-bold">{selectedSpeaker.name}</h1>
              <p className="text-purple-100">{selectedSpeaker.title}</p>
              <p className="text-purple-200">{selectedSpeaker.company}</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Speaker Details */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Star className="text-yellow-500" size={16} />
                <span className="font-medium">{selectedSpeaker.rating}/5.0</span>
                <span className="text-gray-500">• Expert Rating</span>
              </div>
              <p className="text-gray-700 mb-4">{selectedSpeaker.bio}</p>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSpeaker.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Speaking Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSpeaker.topics.map((topic, index) => (
                    <Badge key={index} variant="outline">{topic}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedSpeaker.sessions.map((session, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-medium">{session.title}</h4>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{session.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Interaction Tabs */}
          <Card>
            <CardHeader>
              <div className="flex space-x-4">
                <Button
                  variant={activeTab === 'question' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('question')}
                  className="flex items-center space-x-2"
                >
                  <MessageCircle size={16} />
                  <span>Ask Question</span>
                </Button>
                <Button
                  variant={activeTab === 'proposal' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('proposal')}
                  className="flex items-center space-x-2"
                >
                  <Briefcase size={16} />
                  <span>Send Proposal</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'question' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Question</label>
                    <Textarea
                      placeholder="Ask a question about their expertise, session topics, or industry insights..."
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleSubmitQuestion} className="w-full">
                    <Send className="mr-2" size={16} />
                    Submit Question
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Proposal</label>
                    <Textarea
                      placeholder="Describe your business proposal, collaboration idea, or partnership opportunity..."
                      value={proposalText}
                      onChange={(e) => setProposalText(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleSubmitProposal} className="w-full">
                    <Send className="mr-2" size={16} />
                    Send Proposal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <h1 className="text-2xl font-bold">Featured Speakers</h1>
        <p className="text-purple-100 mt-1">Connect with industry experts</p>
      </div>

      <div className="p-4 space-y-4">
        {speakers.map((speaker) => (
          <Card key={speaker.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4" onClick={() => setSelectedSpeaker(speaker)}>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{speaker.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{speaker.name}</h3>
                  <p className="text-gray-600">{speaker.title}</p>
                  <p className="text-sm text-gray-500">{speaker.company}</p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="text-yellow-500" size={14} />
                    <span className="text-sm font-medium">{speaker.rating}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{speaker.sessions.length} sessions</span>
                  </div>

                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {speaker.topics.slice(0, 2).map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {speaker.topics.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{speaker.topics.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
