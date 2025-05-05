
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { SendHorizontal } from 'lucide-react';

const QuestionPanel: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('concept');
  const [previousQuestions] = useState([
    { 
      id: 1, 
      text: 'Can you explain the difference between arrays and linked lists?', 
      status: 'answered',
      answer: 'Arrays store elements in contiguous memory locations, while linked lists store elements at scattered addresses with pointers connecting them.',
      timestamp: '10:15 AM'
    },
    { 
      id: 2, 
      text: 'What\'s the time complexity of binary search?', 
      status: 'pending',
      timestamp: '10:30 AM'
    },
  ]);

  const handleSubmit = () => {
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    
    toast.success('Question submitted successfully');
    setQuestion('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask a Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={questionType} onValueChange={setQuestionType}>
          <SelectTrigger>
            <SelectValue placeholder="Question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="concept">Concept Clarification</SelectItem>
            <SelectItem value="example">Request for Example</SelectItem>
            <SelectItem value="application">Practical Application</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        
        <Textarea
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[100px]"
        />
        
        <Button 
          className="w-full" 
          onClick={handleSubmit}
        >
          <SendHorizontal className="h-4 w-4 mr-2" />
          Submit Question
        </Button>
        
        {previousQuestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Previous Questions</h3>
            <div className="space-y-3">
              {previousQuestions.map((q) => (
                <div key={q.id} className="border p-3 rounded-md">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{q.text}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      q.status === 'answered' 
                        ? 'bg-engagement-positive/20 text-engagement-positive' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {q.status === 'answered' ? 'Answered' : 'Pending'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Asked at {q.timestamp}
                  </div>
                  {q.status === 'answered' && q.answer && (
                    <div className="mt-2 text-sm bg-muted/50 p-2 rounded">
                      <span className="font-medium">Answer: </span> 
                      {q.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionPanel;
