import React, { useState } from 'react';
import { MapPin, Bed, FileText, Download, ExternalLink, Percent, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface Accommodation {
  id: string;
  name: string;
  type: string;
  distance: string;
  rating: number;
  priceRange: string;
  discountCode: string;
  discountPercent: number;
  amenities: string[];
  image: string;
}

interface MapLocation {
  id: string;
  name: string;
  type: 'hall' | 'room' | 'facility' | 'entrance';
  floor: string;
  description: string;
}

interface Document {
  id: string;
  title: string;
  type: 'manual' | 'presentation' | 'schedule' | 'map';
  size: string;
  lastUpdated: string;
  description: string;
}

const accommodations: Accommodation[] = [
  {
    id: '1',
    name: 'Lagos Continental Hotel',
    type: 'Luxury Hotel',
    distance: '0.1 km from venue',
    rating: 4.8,
    priceRange: '₦45,000 - ₦85,000',
    discountCode: 'CONF2024',
    discountPercent: 20,
    amenities: ['Free WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
    image: '🏨'
  },
  {
    id: '2',
    name: 'Victoria Crown Plaza',
    type: 'Business Hotel',
    distance: '0.3 km from venue',
    rating: 4.5,
    priceRange: '₦35,000 - ₦65,000',
    discountCode: 'TECH15',
    discountPercent: 15,
    amenities: ['Free WiFi', 'Business Center', 'Restaurant', 'Parking'],
    image: '🏢'
  },
  {
    id: '3',
    name: 'Island Suites',
    type: 'Apartment Hotel',
    distance: '0.5 km from venue',
    rating: 4.3,
    priceRange: '₦25,000 - ₦45,000',
    discountCode: 'STAY10',
    discountPercent: 10,
    amenities: ['Kitchenette', 'Free WiFi', 'Laundry', 'Parking'],
    image: '🏠'
  }
];

const mapLocations: MapLocation[] = [
  {
    id: '1',
    name: 'Main Hall',
    type: 'hall',
    floor: 'Ground Floor',
    description: 'Primary venue for keynotes and major sessions'
  },
  {
    id: '2',
    name: 'Workshop Room A',
    type: 'room',
    floor: 'First Floor',
    description: 'Interactive workshop sessions and hands-on activities'
  },
  {
    id: '3',
    name: 'Workshop Room B',
    type: 'room',
    floor: 'First Floor',
    description: 'Breakout sessions and small group discussions'
  },
  {
    id: '4',
    name: 'Conference Room B',
    type: 'room',
    floor: 'Second Floor',
    description: 'Panel discussions and presentations'
  },
  {
    id: '5',
    name: 'Exhibition Hall',
    type: 'hall',
    floor: 'Ground Floor',
    description: 'Sponsor booths and networking area'
  },
  {
    id: '6',
    name: 'Registration Desk',
    type: 'facility',
    floor: 'Ground Floor',
    description: 'Check-in and information center'
  },
  {
    id: '7',
    name: 'Main Entrance',
    type: 'entrance',
    floor: 'Ground Floor',
    description: 'Primary entrance with security checkpoint'
  },
  {
    id: '8',
    name: 'Rooftop Terrace',
    type: 'facility',
    floor: 'Top Floor',
    description: 'Networking events and receptions'
  }
];

const documents: Document[] = [
  {
    id: '1',
    title: 'Conference Manual 2024',
    type: 'manual',
    size: '2.5 MB',
    lastUpdated: '2024-02-10',
    description: 'Complete guide to the conference including rules, schedule, and tips'
  },
  {
    id: '2',
    title: 'Opening Keynote Slides',
    type: 'presentation',
    size: '8.2 MB',
    lastUpdated: '2024-02-15',
    description: 'Dr. Sarah Johnson\'s presentation on "The Future of Technology"'
  },
  {
    id: '3',
    title: 'AI Workshop Materials',
    type: 'presentation',
    size: '15.7 MB',
    lastUpdated: '2024-02-15',
    description: 'Hands-on materials and code samples for the ML workshop'
  },
  {
    id: '4',
    title: 'Detailed Schedule',
    type: 'schedule',
    size: '1.1 MB',
    lastUpdated: '2024-02-14',
    description: 'Complete schedule with room assignments and speaker details'
  },
  {
    id: '5',
    title: 'Venue Floor Plan',
    type: 'map',
    size: '3.8 MB',
    lastUpdated: '2024-02-12',
    description: 'Interactive map of the conference venue with all locations'
  }
];

export default function AttendeeGuide() {
  const [activeTab, setActiveTab] = useState<'accommodation' | 'map' | 'documents'>('accommodation');
  const { toast } = useToast();

  const handleDownload = (documentTitle: string) => {
    toast({
      title: "Download Started",
      description: `"${documentTitle}" is being downloaded to your device.`,
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Discount Code Copied",
      description: `Code "${code}" has been copied to your clipboard.`,
    });
  };

  const getLocationIcon = (type: MapLocation['type']) => {
    switch (type) {
      case 'hall': return '🏛️';
      case 'room': return '🚪';
      case 'facility': return '🏢';
      case 'entrance': return '🚪';
      default: return '📍';
    }
  };

  const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
      case 'manual': return '📖';
      case 'presentation': return '📊';
      case 'schedule': return '📅';
      case 'map': return '🗺️';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
        <h1 className="text-2xl font-bold">Attendee Guide</h1>
        <p className="text-emerald-100 mt-1">Everything you need for the conference</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-6">
          {[
            { id: 'accommodation', label: 'Hotels', icon: Bed },
            { id: 'map', label: 'Venue Map', icon: MapPin },
            { id: 'documents', label: 'Documents', icon: FileText }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-emerald-600'
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
        {/* Accommodation Tab */}
        {activeTab === 'accommodation' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Recommended Accommodations</h2>
              <p className="text-gray-600">Special rates for conference attendees</p>
            </div>

            {accommodations.map((hotel) => (
              <Card key={hotel.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{hotel.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{hotel.name}</h3>
                          <p className="text-gray-600">{hotel.type}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-600">{hotel.distance}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-medium">{hotel.rating}</span>
                          </div>
                          <p className="text-sm font-medium">{hotel.priceRange}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {hotel.amenities.map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-800">
                              {hotel.discountPercent}% Conference Discount
                            </p>
                            <p className="text-sm text-green-600">
                              Use code: <span className="font-mono font-bold">{hotel.discountCode}</span>
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopyCode(hotel.discountCode)}
                            >
                              <Percent size={14} className="mr-1" />
                              Copy Code
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <ExternalLink size={14} className="mr-1" />
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Map Tab */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Conference Venue Map</h2>
              <p className="text-gray-600">Navigate the conference space with ease</p>
            </div>

            {/* Interactive Map Placeholder */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Navigation size={48} className="text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Venue Map</h3>
                    <p className="text-gray-600">Tap locations below to navigate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Venue Locations</h3>
              {mapLocations.map((location) => (
                <Card key={location.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getLocationIcon(location.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{location.name}</h4>
                          <Badge variant="outline" className="text-xs">{location.floor}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{location.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Conference Documents</h2>
              <p className="text-gray-600">Access manuals, presentations, and resources</p>
            </div>

            {documents.map((document) => (
              <Card key={document.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{getDocumentIcon(document.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{document.title}</h3>
                          <p className="text-sm text-gray-600">{document.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(document.title)}
                        >
                          <Download size={14} className="mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Size: {document.size}</span>
                        <span>Updated: {document.lastUpdated}</span>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {document.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <FileText className="text-blue-600 mx-auto mb-2" size={32} />
                  <h3 className="font-medium mb-1">Need More Resources?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Additional materials will be uploaded throughout the conference
                  </p>
                  <Button variant="outline" size="sm">
                    Check for Updates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

