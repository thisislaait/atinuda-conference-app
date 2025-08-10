import React, { useState } from 'react';
import { Download, Share2, Heart, Tag, Filter, Grid, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface Photo {
  id: string;
  url: string;
  photographer: string;
  event: string;
  timestamp: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
  description: string;
}

const photos: Photo[] = [
  {
    id: '1',
    url: '📸',
    photographer: 'EventPhoto Pro',
    event: 'Opening Keynote',
    timestamp: '2 hours ago',
    tags: ['TechStart Solutions', 'Alex Johnson', 'Keynote'],
    likes: 24,
    isLiked: false,
    description: 'Great shot from the opening keynote session'
  },
  {
    id: '2',
    url: '📷',
    photographer: 'Conference Captures',
    event: 'Networking Break',
    timestamp: '4 hours ago',
    tags: ['TechStart Solutions', 'Networking', 'Coffee Break'],
    likes: 18,
    isLiked: true,
    description: 'Networking session with industry leaders'
  },
  {
    id: '3',
    url: '📹',
    photographer: 'EventPhoto Pro',
    event: 'Panel Discussion',
    timestamp: '6 hours ago',
    tags: ['Panel', 'AI Discussion', 'TechStart Solutions'],
    likes: 32,
    isLiked: false,
    description: 'Engaging panel discussion on AI trends'
  },
  {
    id: '4',
    url: '🎥',
    photographer: 'Media Team',
    event: 'Workshop Session',
    timestamp: '1 day ago',
    tags: ['Workshop', 'Hands-on', 'Learning'],
    likes: 15,
    isLiked: true,
    description: 'Interactive workshop on machine learning'
  },
  {
    id: '5',
    url: '📸',
    photographer: 'Conference Captures',
    event: 'Award Ceremony',
    timestamp: '1 day ago',
    tags: ['Awards', 'Recognition', 'Innovation'],
    likes: 45,
    isLiked: false,
    description: 'Innovation awards ceremony highlights'
  },
  {
    id: '6',
    url: '📷',
    photographer: 'EventPhoto Pro',
    event: 'Closing Reception',
    timestamp: '2 days ago',
    tags: ['Reception', 'Networking', 'Celebration'],
    likes: 28,
    isLiked: true,
    description: 'Closing reception with all attendees'
  }
];

export default function PhotoSharing() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(
    new Set(photos.filter(p => p.isLiked).map(p => p.id))
  );
  const { toast } = useToast();

  const filters = [
    'all',
    'keynote',
    'networking',
    'workshop',
    'panel',
    'awards',
    'reception'
  ];

  const handleLike = (photoId: string) => {
    setLikedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  const handleDownload = (photoId: string) => {
    toast({
      title: "Photo Downloaded",
      description: "The photo has been saved to your device.",
    });
  };

  const handleShare = (photoId: string) => {
    toast({
      title: "Photo Shared",
      description: "The photo has been shared to your social media.",
    });
  };

  const filteredPhotos = photos.filter(photo => {
    if (selectedFilter === 'all') return true;
    return photo.event.toLowerCase().includes(selectedFilter) ||
           photo.tags.some(tag => tag.toLowerCase().includes(selectedFilter));
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white p-6">
        <h1 className="text-2xl font-bold">Photo Gallery</h1>
        <p className="text-pink-100 mt-1">Your tagged conference moments</p>
      </div>

      {/* Controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className="capitalize"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Stats */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{photos.length}</p>
                <p className="text-sm text-gray-600">Total Photos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{likedPhotos.size}</p>
                <p className="text-sm text-gray-600">Liked</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {photos.reduce((sum, photo) => sum + photo.likes, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Likes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredPhotos.map((photo) => {
              const isLiked = likedPhotos.has(photo.id);
              return (
                <Card key={photo.id} className="overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
                    {photo.url}
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">{photo.event}</Badge>
                      <span className="text-xs text-gray-500">{photo.timestamp}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(photo.id)}
                        className={`p-1 ${isLiked ? 'text-red-600' : 'text-gray-600'}`}
                      >
                        <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                      </Button>
                      <span className="text-sm">{photo.likes + (isLiked && !photo.isLiked ? 1 : 0)}</span>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(photo.id)}
                        className="p-1 text-gray-600"
                      >
                        <Download size={16} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(photo.id)}
                        className="p-1 text-gray-600"
                      >
                        <Share2 size={16} />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {photo.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {photo.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{photo.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPhotos.map((photo) => {
              const isLiked = likedPhotos.has(photo.id);
              return (
                <Card key={photo.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl">
                        {photo.url}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{photo.event}</h3>
                          <span className="text-sm text-gray-500">{photo.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
                        <p className="text-xs text-gray-500 mb-3">by {photo.photographer}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(photo.id)}
                              className={`flex items-center space-x-1 ${isLiked ? 'text-red-600' : 'text-gray-600'}`}
                            >
                              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                              <span>{photo.likes + (isLiked && !photo.isLiked ? 1 : 0)}</span>
                            </Button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(photo.id)}
                            >
                              <Download size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShare(photo.id)}
                            >
                              <Share2 size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {photo.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Tag size={10} className="mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
