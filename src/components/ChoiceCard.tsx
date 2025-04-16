
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChoiceCardProps {
  option: string;
  isSelected?: boolean;
  isResult?: boolean;
  className?: string;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ 
  option, 
  isSelected = false, 
  isResult = false,
  className
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200",
        isSelected && "ring-2 ring-primary",
        isResult && "bg-primary/10",
        className
      )}
    >
      <CardContent className={cn(
        "p-6 flex items-center justify-center text-center",
        isResult && "py-8"
      )}>
        <h3 className={cn(
          "font-bold break-words",
          isResult ? "text-3xl text-primary" : "text-xl"
        )}>
          {option}
        </h3>
      </CardContent>
    </Card>
  );
};

export default ChoiceCard;
