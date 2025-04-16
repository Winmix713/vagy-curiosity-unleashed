
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { makeDecision } from "@/utils/decisionUtils";

interface DecisionFormProps {
  onDecisionMade: (option1: string, option2: string, result: string) => void;
}

const DecisionForm: React.FC<DecisionFormProps> = ({ onDecisionMade }) => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [isDeciding, setIsDeciding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!option1 || !option2) {
      return;
    }
    
    setIsDeciding(true);
    
    // Artificial delay for dramatic effect
    setTimeout(() => {
      const result = makeDecision(option1, option2);
      onDecisionMade(option1, option2, result);
      setIsDeciding(false);
    }, 1000);
  };

  const handleClear = () => {
    setOption1("");
    setOption2("");
  };

  return (
    <Card className="w-full gradient-bg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">What will it be?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="option1">Option 1</Label>
            <Input
              id="option1"
              placeholder="Enter first option..."
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              required
              className="bg-background/80"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="option2">Option 2</Label>
            <Input
              id="option2"
              placeholder="Enter second option..."
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              required
              className="bg-background/80"
            />
          </div>
          <CardFooter className="flex justify-between px-0 pt-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={handleClear}
              disabled={isDeciding}
            >
              Clear
            </Button>
            <Button 
              type="submit" 
              disabled={!option1 || !option2 || isDeciding}
              className={isDeciding ? "animate-pulse" : ""}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isDeciding ? "Deciding..." : "Decide Now!"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default DecisionForm;
