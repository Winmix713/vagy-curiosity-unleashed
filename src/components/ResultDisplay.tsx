
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, RefreshCw, Share2 } from "lucide-react";
import ChoiceCard from "./ChoiceCard";
import { saveDecision } from "@/utils/decisionUtils";
import { toast } from "@/components/ui/use-toast";

interface ResultDisplayProps {
  option1: string;
  option2: string;
  result: string;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  option1,
  option2,
  result,
  onReset,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    saveDecision({ option1, option2, result });
    setIsSaved(true);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "vagy Decision",
          text: `I had to choose between ${option1} and ${option2}, and vagy helped me decide: ${result}!`,
          url: window.location.href,
        });
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(
          `I had to choose between ${option1} and ${option2}, and vagy helped me decide: ${result}!`
        );
        toast({
          title: "Copied to clipboard!",
          description: "Share your decision with friends.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <Card className="gradient-bg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">The Decision Is...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ChoiceCard option={result} isResult className="w-full max-w-md" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            New Decision
          </Button>
          <div className="space-x-2">
            <Button 
              variant="secondary" 
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isSaved}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <ChoiceCard 
          option={option1} 
          isSelected={result === option1} 
          className="flex-1" 
        />
        <ChoiceCard 
          option={option2} 
          isSelected={result === option2} 
          className="flex-1" 
        />
      </div>
    </div>
  );
};

export default ResultDisplay;
