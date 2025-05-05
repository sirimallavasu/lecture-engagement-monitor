
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, Meh, Frown } from 'lucide-react';
import { toast } from 'sonner';

const FeedbackWidget: React.FC = () => {
  const [understandingLevel, setUnderstandingLevel] = useState<number | null>(null);
  const [paceRating, setPaceRating] = useState<string | null>(null);
  
  const handleUnderstandingSelect = (level: number) => {
    setUnderstandingLevel(level);
  };
  
  const handlePaceSelect = (pace: string) => {
    setPaceRating(pace);
  };
  
  const handleSubmit = () => {
    if (understandingLevel === null || paceRating === null) {
      toast.error('Please provide both feedback items');
      return;
    }
    
    toast.success('Feedback submitted successfully');
    
    // Reset after submission
    setUnderstandingLevel(null);
    setPaceRating(null);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate Your Understanding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">How well do you understand the current topic?</p>
          <div className="flex justify-between">
            <Button
              variant={understandingLevel === 1 ? "default" : "outline"}
              className={`flex-1 ${understandingLevel === 1 ? "bg-engagement-negative text-white" : ""}`}
              onClick={() => handleUnderstandingSelect(1)}
            >
              <Frown className="h-5 w-5 mr-1" />
              Confused
            </Button>
            <Button
              variant={understandingLevel === 2 ? "default" : "outline"}
              className={`flex-1 mx-2 ${understandingLevel === 2 ? "bg-engagement-neutral text-white" : ""}`}
              onClick={() => handleUnderstandingSelect(2)}
            >
              <Meh className="h-5 w-5 mr-1" />
              Somewhat
            </Button>
            <Button
              variant={understandingLevel === 3 ? "default" : "outline"}
              className={`flex-1 ${understandingLevel === 3 ? "bg-engagement-positive text-white" : ""}`}
              onClick={() => handleUnderstandingSelect(3)}
            >
              <Smile className="h-5 w-5 mr-1" />
              Clear
            </Button>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">How is the lecture pace?</p>
          <div className="flex justify-between">
            <Button
              variant={paceRating === 'slow' ? "default" : "outline"}
              className="flex-1"
              onClick={() => handlePaceSelect('slow')}
            >
              Too Slow
            </Button>
            <Button
              variant={paceRating === 'good' ? "default" : "outline"}
              className="flex-1 mx-2"
              onClick={() => handlePaceSelect('good')}
            >
              Just Right
            </Button>
            <Button
              variant={paceRating === 'fast' ? "default" : "outline"}
              className="flex-1"
              onClick={() => handlePaceSelect('fast')}
            >
              Too Fast
            </Button>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4" 
          onClick={handleSubmit}
          disabled={understandingLevel === null || paceRating === null}
        >
          Submit Feedback
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeedbackWidget;
