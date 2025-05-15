
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BackButton = () => {
  return (
    <div className="absolute top-4 left-4 z-10">
      <Button variant="outline" size="sm" asChild>
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
};

export default BackButton;
