
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Settings } from 'lucide-react';
import { toast } from 'sonner';

const SettingsPanel = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {theme === 'dark' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
          <Switch
            id="dark-mode"
            checked={theme === 'dark'}
            onCheckedChange={() => {
              toggleTheme();
              toast.success(`Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`);
            }}
          />
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch id="push-notifications" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => toast.info('Settings saved successfully')}
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
