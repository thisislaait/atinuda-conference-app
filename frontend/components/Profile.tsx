import React, { useState } from 'react';
import { User, Building, Lightbulb, QrCode, Download, Edit, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface ProfileData {
  fullName: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  funFacts: string[];
  profileImage: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Alex Johnson',
    company: 'TechStart Solutions',
    position: 'Senior Product Manager',
    email: 'alex.johnson@techstart.com',
    phone: '+234 801 234 5678',
    funFacts: [
      'I can solve a Rubik\'s cube in under 2 minutes',
      'I\'ve traveled to 15 countries for work',
      'I collect vintage tech gadgets'
    ],
    profileImage: '👨‍💼'
  });
  const [editData, setEditData] = useState<ProfileData>(profileData);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfileData(editData);
      setIsEditing(false);
      
      toast({
        title: "Profile Updated!",
        description: "Your conference card has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const updateFunFact = (index: number, value: string) => {
    const newFacts = [...editData.funFacts];
    newFacts[index] = value;
    setEditData({ ...editData, funFacts: newFacts });
  };

  const generateQRCode = () => {
    // In a real app, this would generate an actual QR code
    const contactInfo = `BEGIN:VCARD
VERSION:3.0
FN:${profileData.fullName}
ORG:${profileData.company}
TITLE:${profileData.position}
EMAIL:${profileData.email}
TEL:${profileData.phone}
END:VCARD`;
    
    toast({
      title: "QR Code Generated",
      description: "Your business contact QR code is ready for sharing.",
    });
    
    return contactInfo;
  };

  const downloadCard = () => {
    toast({
      title: "Card Downloaded",
      description: "Your conference card has been saved to your device.",
    });
  };

  const shareToSocial = () => {
    toast({
      title: "Shared Successfully",
      description: "Your conference card has been shared to social media.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-teal-100 mt-1">Manage your conference card</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsEditing(!isEditing)}
            className="text-white hover:bg-white/20"
          >
            {isEditing ? <X size={20} /> : <Edit size={20} />}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Conference Card Preview */}
        <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{profileData.profileImage}</div>
                <div>
                  <h2 className="text-xl font-bold">{profileData.fullName}</h2>
                  <p className="text-blue-100">{profileData.position}</p>
                  <p className="text-blue-200">{profileData.company}</p>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                <QrCode className="text-white" size={32} />
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-4">
              <h3 className="font-semibold mb-2">Fun Facts:</h3>
              <ul className="space-y-1 text-sm text-blue-100">
                {profileData.funFacts.map((fact, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-300">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Card Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" onClick={generateQRCode} className="flex flex-col items-center py-4">
            <QrCode size={20} className="mb-1" />
            <span className="text-xs">QR Code</span>
          </Button>
          <Button variant="outline" onClick={downloadCard} className="flex flex-col items-center py-4">
            <Download size={20} className="mb-1" />
            <span className="text-xs">Download</span>
          </Button>
          <Button variant="outline" onClick={shareToSocial} className="flex flex-col items-center py-4">
            <User size={20} className="mb-1" />
            <span className="text-xs">Share</span>
          </Button>
        </div>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User size={20} />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                value={isEditing ? editData.fullName : profileData.fullName}
                onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <Input
                value={isEditing ? editData.company : profileData.company}
                onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <Input
                value={isEditing ? editData.position : profileData.position}
                onChange={(e) => setEditData({ ...editData, position: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={isEditing ? editData.email : profileData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                value={isEditing ? editData.phone : profileData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb size={20} />
              <span>Fun Facts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(isEditing ? editData.funFacts : profileData.funFacts).map((fact, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-1">Fun Fact {index + 1}</label>
                <Textarea
                  value={fact}
                  onChange={(e) => updateFunFact(index, e.target.value)}
                  disabled={!isEditing}
                  rows={2}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex space-x-3">
            <Button onClick={handleSave} className="flex-1">
              <Save className="mr-2" size={16} />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              <X className="mr-2" size={16} />
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
