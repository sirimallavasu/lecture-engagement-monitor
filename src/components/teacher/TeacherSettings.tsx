
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Bell, Moon, Sun, Mail, AlertTriangle, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const TeacherSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [distractionAlerts, setDistractionAlerts] = useState(true);
  const [appUsageAlerts, setAppUsageAlerts] = useState(true);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load settings from localStorage or user preferences
  useEffect(() => {
    const savedSettings = localStorage.getItem('teacherSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setEmailNotifications(settings.emailNotifications ?? true);
      setDistractionAlerts(settings.distractionAlerts ?? true);
      setAppUsageAlerts(settings.appUsageAlerts ?? true);
      setNotificationEmail(settings.notificationEmail ?? '');
    }
    if (user?.email) {
      setNotificationEmail(user.email);
    }
  }, [user]);

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      const settings = {
        emailNotifications,
        distractionAlerts,
        appUsageAlerts,
        notificationEmail
      };
      
      localStorage.setItem('teacherSettings', JSON.stringify(settings));
      
      // You could also save to Supabase if you want server-side storage
      // await supabase.from('teacher_settings').upsert({
      //   teacher_id: user.id,
      //   ...settings
      // });
      
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {theme === 'dark' ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
            Appearance
          </CardTitle>
          <CardDescription>
            Customize your interface appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure how you receive alerts about student activity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email alerts for important events
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <Label htmlFor="distraction-alerts" className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
                  Distraction Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when students appear distracted or disengaged
                </p>
              </div>
              <Switch
                id="distraction-alerts"
                checked={distractionAlerts}
                onCheckedChange={setDistractionAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <Label htmlFor="app-usage-alerts" className="flex items-center">
                  <Monitor className="w-4 h-4 mr-2 text-blue-500" />
                  Application Usage Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when students use non-educational applications
                </p>
              </div>
              <Switch
                id="app-usage-alerts"
                checked={appUsageAlerts}
                onCheckedChange={setAppUsageAlerts}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="notification-email" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Notification Email
              </Label>
              <Input
                id="notification-email"
                type="email"
                placeholder="your-email@example.com"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Email address where notifications will be sent
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={saveSettings} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert Types Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Types</CardTitle>
          <CardDescription>
            Examples of notifications you'll receive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <div>
                  <h4 className="font-medium">Student Distraction Alert</h4>
                  <p className="text-sm text-muted-foreground">
                    When a student's engagement score drops below 60%
                  </p>
                </div>
              </div>
              <Badge variant={distractionAlerts ? "default" : "secondary"}>
                {distractionAlerts ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="w-5 h-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">Non-Educational App Usage</h4>
                  <p className="text-sm text-muted-foreground">
                    When a student uses games, social media, or other non-educational apps
                  </p>
                </div>
              </div>
              <Badge variant={appUsageAlerts ? "default" : "secondary"}>
                {appUsageAlerts ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherSettings;
