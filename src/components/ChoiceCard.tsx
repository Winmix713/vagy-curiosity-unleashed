
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChoiceCardProps {
  option: string;
  isSelected?: boolean;
  isResult?: boolean;
  onClick?: () => void;
  className?: string;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ 
  option, 
  isSelected = false, 
  isResult = false,
  onClick,
  className
}) => {
  return (
    <Card 
      className={cn(
        "flex items-center justify-center p-6 transition-all duration-300 cursor-pointer h-40",
        isSelected && "ring-2 ring-primary animate-pulse-slow",
        isResult && "bg-primary text-primary-foreground shadow-lg animate-float",
        !isResult && "hover:shadow-md hover:translate-y-[-5px]",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-0 text-center">
        <p className={cn(
          "text-2xl font-bold break-words",
          isResult ? "text-primary-foreground" : "text-foreground"
        )}>
          {option}
        </p>
      </CardContent>
    </Card>
  );
};

export default ChoiceCard;
