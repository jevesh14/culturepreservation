
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Edit, Bell, Shield, LogOut } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // If not authenticated, show the mobile auth option
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
          <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-cultural-saffron/10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cultural-saffron/10 rounded-full mb-4">
                <User className="h-8 w-8 text-cultural-saffron" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Sign in to your account</h1>
              <p className="text-gray-600">Access your profile and preferences</p>
            </div>
            
            <Button 
              onClick={() => navigate('/auth/mobile')}
              className="w-full bg-cultural-saffron hover:bg-cultural-saffron/90 text-white py-2 rounded-lg flex items-center justify-center"
            >
              <span className="flex items-center">
                Sign in with Mobile Number
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Join the community to explore and contribute to Bharat's cultural heritage.
              </p>
            </div>
          </div>
        </main>
        <Footer />
        <ChatWithAI />
      </div>
    );
  }

  // Authenticated user view
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile header */}
            <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-cultural-saffron to-cultural-maroon"></div>
              <div className="px-6 pb-6">
                <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 space-y-4 md:space-y-0 md:space-x-6">
                  <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-cultural-peacock to-cultural-blue flex items-center justify-center text-white text-3xl font-semibold">
                      U
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-2xl font-bold">User</h1>
                    <p className="text-gray-600">Cultural enthusiast</p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile content */}
            <Tabs defaultValue="account">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <Input placeholder="Your name" defaultValue="User" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <Input placeholder="Your email" defaultValue="user@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <Input placeholder="Your phone number" defaultValue="+91 98765 43210" disabled />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <Input placeholder="Your location" defaultValue="Delhi, India" />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Profile updated",
                            description: "Your profile information has been updated successfully.",
                          });
                        }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive updates about new cultural content</p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            id="email-notifications"
                            aria-describedby="email-notifications-description"
                            name="email-notifications"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-cultural-saffron focus:ring-cultural-saffron"
                            defaultChecked
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Get alerts via SMS for important updates</p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            id="sms-notifications"
                            aria-describedby="sms-notifications-description"
                            name="sms-notifications"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-cultural-saffron focus:ring-cultural-saffron"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Cultural Interests</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Scriptures', 'Dance Forms', 'Art Forms', 'Festivals', 'Music', 'Architecture'].map((interest) => (
                        <div key={interest} className="flex items-center">
                          <input
                            id={`interest-${interest}`}
                            name={`interest-${interest}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-cultural-saffron focus:ring-cultural-saffron"
                            defaultChecked={['Scriptures', 'Art Forms', 'Festivals'].includes(interest)}
                          />
                          <label htmlFor={`interest-${interest}`} className="ml-2 text-sm text-gray-700">
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Preferences updated",
                            description: "Your preferences have been updated successfully.",
                          });
                        }}
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Mobile Number</h3>
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="font-medium">+91 98765 43210</p>
                        <p className="text-sm text-gray-500">Your verified phone number</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        className="w-full flex justify-between items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setIsAuthenticated(false);
                          toast({
                            title: "Signed out",
                            description: "You have been signed out successfully.",
                          });
                        }}
                      >
                        <span>Sign Out</span>
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWithAI />
    </div>
  );
};

export default Profile;
