
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { UserRound, Pencil, School, Mail, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  phone: string;
  dateJoined: string;
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Attempt to load user from localStorage (from signup/login)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Create a full profile using stored data + defaults
      const fullProfile: UserProfile = {
        name: parsedUser.name || 'User',
        email: parsedUser.email || 'user@example.com',
        role: parsedUser.role || 'student',
        bio: '',
        phone: '',
        dateJoined: new Date().toLocaleDateString(),
        notificationPreferences: {
          email: true,
          push: true,
          sms: false
        }
      };
      
      setProfile(fullProfile);
      setEditedProfile(fullProfile);
    } else {
      // Fallback demo data if no user in localStorage
      const demoProfile: UserProfile = {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.edu',
        role: 'student',
        bio: 'Computer Science major with interest in machine learning and data science.',
        phone: '(555) 123-4567',
        dateJoined: '01/15/2025',
        notificationPreferences: {
          email: true,
          push: true,
          sms: false
        }
      };
      
      setProfile(demoProfile);
      setEditedProfile(demoProfile);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedProfile) return;
    
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (!editedProfile) return;
    
    setEditedProfile({
      ...editedProfile,
      notificationPreferences: {
        ...editedProfile.notificationPreferences,
        [field]: checked
      }
    });
  };

  const handleSaveProfile = () => {
    if (!editedProfile) return;
    
    setProfile(editedProfile);
    setIsEditing(false);
    
    // Update localStorage
    const userToStore = {
      name: editedProfile.name,
      email: editedProfile.email,
      role: editedProfile.role
    };
    localStorage.setItem('user', JSON.stringify(userToStore));
    
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <div>
            <Button variant="outline" asChild>
              <Link to={profile?.role === 'student' ? '/student' : '/teacher'}>
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
        
        {profile && (
          <div className="space-y-6">
            {/* Profile Summary Card */}
            <Card>
              <CardHeader className="bg-primary/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserRound className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{profile.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <School className="h-4 w-4 mr-1" />
                        <span className="capitalize">{profile.role}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 pt-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={editedProfile?.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          value={editedProfile?.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={editedProfile?.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio"
                        name="bio"
                        value={editedProfile?.bio}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Notification Preferences</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="emailNotif" 
                            checked={editedProfile?.notificationPreferences.email}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('email', checked === true)
                            }
                          />
                          <Label htmlFor="emailNotif">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="pushNotif" 
                            checked={editedProfile?.notificationPreferences.push}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('push', checked === true)
                            }
                          />
                          <Label htmlFor="pushNotif">Push</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="smsNotif" 
                            checked={editedProfile?.notificationPreferences.sms}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('sms', checked === true)
                            }
                          />
                          <Label htmlFor="smsNotif">SMS</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{profile.email}</span>
                      </div>
                      
                      {profile.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Joined {profile.dateJoined}</span>
                      </div>
                    </div>
                    
                    {profile.bio && (
                      <div className="mt-4 pt-4 border-t">
                        <h3 className="font-medium mb-2">About</h3>
                        <p className="text-sm">{profile.bio}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="font-medium mb-2">Notification Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${profile.notificationPreferences.email ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span>Email: {profile.notificationPreferences.email ? 'On' : 'Off'}</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${profile.notificationPreferences.push ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span>Push: {profile.notificationPreferences.push ? 'On' : 'Off'}</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${profile.notificationPreferences.sms ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span>SMS: {profile.notificationPreferences.sms ? 'On' : 'Off'}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              
              {isEditing && (
                <CardFooter className="justify-end space-x-2 border-t pt-4">
                  <Button variant="outline" onClick={() => {
                    setIsEditing(false);
                    setEditedProfile(profile);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
