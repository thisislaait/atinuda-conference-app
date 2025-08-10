import React, { useState } from 'react';
import { Search, UserPlus, UserMinus, MessageCircle, Heart, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface Attendee {
  id: string;
  name: string;
  company: string;
  position: string;
  image: string;
  categories: string[];
  isFollowing: boolean;
  mutualConnections: number;
}

interface ForumPost {
  id: string;
  author: string;
  authorImage: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked: boolean;
  category: string;
}

const attendees: Attendee[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    company: 'FinTech Innovations',
    position: 'Product Director',
    image: '👩‍💼',
    categories: ['Fintech', 'Product Management'],
    isFollowing: false,
    mutualConnections: 5
  },
  {
    id: '2',
    name: 'David Okafor',
    company: 'Green Energy Solutions',
    position: 'CEO',
    image: '👨‍💼',
    categories: ['Clean Energy', 'Sustainability'],
    isFollowing: true,
    mutualConnections: 8
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    company: 'AI Dynamics',
    position: 'ML Engineer',
    image: '👩‍🔬',
    categories: ['Artificial Intelligence', 'Machine Learning'],
    isFollowing: false,
    mutualConnections: 3
  },
  {
    id: '4',
    name: 'James Wilson',
    company: 'HealthTech Pro',
    position: 'CTO',
    image: '👨‍⚕️',
    categories: ['Healthcare', 'Technology'],
    isFollowing: true,
    mutualConnections: 12
  }
];

const forumPosts: ForumPost[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    authorImage: '👩‍💼',
    content: 'What are the biggest challenges you face when implementing fintech solutions in traditional banking? Looking for insights from fellow practitioners.',
    timestamp: '2 hours ago',
    likes: 24,
    replies: 8,
    isLiked: false,
    category: 'Fintech'
  },
  {
    id: '2',
    author: 'David Okafor',
    authorImage: '👨‍💼',
    content: 'Excited to share that our clean energy project just secured Series A funding! Happy to discuss sustainable business models with anyone interested.',
    timestamp: '4 hours ago',
    likes: 45,
    replies: 15,
    isLiked: true,
    category: 'Sustainability'
  },
  {
    id: '3',
    author: 'Maria Rodriguez',
    authorImage: '👩‍🔬',
    content: 'AI ethics in healthcare - how do we balance innovation with patient privacy? This is becoming increasingly important as we scale our solutions.',
    timestamp: '6 hours ago',
    likes: 32,
    replies: 12,
    isLiked: false,
    category: 'AI & Healthcare'
  }
];

export default function SocialNetworking() {
  const [activeTab, setActiveTab] = useState<'explore' | 'forum' | 'analytics'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState('');
  const [followingList, setFollowingList] = useState<Set<string>>(
    new Set(attendees.filter(a => a.isFollowing).map(a => a.id))
  );
  const [likedPosts, setLikedPosts] = useState<Set<string>>(
    new Set(forumPosts.filter(p => p.isLiked).map(p => p.id))
  );
  const { toast } = useToast();

  const handleFollow = (attendeeId: string, attendeeName: string) => {
    setFollowingList(prev => {
      const newSet = new Set(prev);
      if (newSet.has(attendeeId)) {
        newSet.delete(attendeeId);
        toast({
          title: "Unfollowed",
          description: `You unfollowed ${attendeeName}`,
        });
      } else {
        newSet.add(attendeeId);
        toast({
          title: "Following",
          description: `You are now following ${attendeeName}`,
        });
      }
      return newSet;
    });
  };

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    toast({
      title: "Post Published",
      description: "Your post has been shared with the community.",
    });
    
    setNewPost('');
  };

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const analytics = {
    totalConnections: followingList.size,
    forumEngagement: 85,
    questionsAsked: 12,
    topResponder: true
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6">
        <h1 className="text-2xl font-bold">Social Networking</h1>
        <p className="text-pink-100 mt-1">Connect and engage with the community</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-6">
          {[
            { id: 'explore', label: 'Explore', icon: Users },
            { id: 'forum', label: 'Forum', icon: MessageCircle },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-purple-600'
                }`}
              >
                <IconComponent size={16} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        {/* Explore Tab */}
        {activeTab === 'explore' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search attendees by name, company, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Attendees Grid */}
            <div className="space-y-3">
              {filteredAttendees.map((attendee) => {
                const isFollowing = followingList.has(attendee.id);
                return (
                  <Card key={attendee.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{attendee.image}</div>
                          <div>
                            <h3 className="font-semibold">{attendee.name}</h3>
                            <p className="text-sm text-gray-600">{attendee.position}</p>
                            <p className="text-sm text-gray-500">{attendee.company}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Users size={12} className="text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {attendee.mutualConnections} mutual connections
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={isFollowing ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleFollow(attendee.id, attendee.name)}
                        >
                          {isFollowing ? (
                            <>
                              <UserMinus size={16} className="mr-1" />
                              Following
                            </>
                          ) : (
                            <>
                              <UserPlus size={16} className="mr-1" />
                              Follow
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {attendee.categories.map((category, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <div className="space-y-4">
            {/* New Post */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share with the Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Share your thoughts, ask questions, or start a discussion..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
                <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                  <MessageCircle className="mr-2" size={16} />
                  Post
                </Button>
              </CardContent>
            </Card>

            {/* Forum Posts */}
            <div className="space-y-4">
              {forumPosts.map((post) => {
                const isLiked = likedPosts.has(post.id);
                return (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{post.authorImage}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{post.author}</h4>
                            <Badge variant="outline" className="text-xs">{post.category}</Badge>
                            <span className="text-xs text-gray-500">{post.timestamp}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{post.content}</p>
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id)}
                              className={`flex items-center space-x-1 ${isLiked ? 'text-red-600' : 'text-gray-600'}`}
                            >
                              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                              <span>{post.likes + (isLiked && !post.isLiked ? 1 : isLiked || post.isLiked ? 0 : 0)}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                              <MessageCircle size={16} />
                              <span>{post.replies}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Networking Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">{analytics.totalConnections}</p>
                    <p className="text-sm text-gray-600">Total Connections</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">{analytics.forumEngagement}%</p>
                    <p className="text-sm text-gray-600">Forum Engagement</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">{analytics.questionsAsked}</p>
                    <p className="text-sm text-gray-600">Questions Asked</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-lg font-bold text-yellow-600">Top 10%</p>
                    <p className="text-sm text-gray-600">Most Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">Most Active Question Asker</span>
                  <Badge className="bg-green-600">Achievement</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">Top Forum Contributor</span>
                  <Badge className="bg-blue-600">This Week</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Networking Champion</span>
                  <Badge className="bg-purple-600">New</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
