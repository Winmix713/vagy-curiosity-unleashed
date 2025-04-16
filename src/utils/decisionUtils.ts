
import { toast } from "@/components/ui/use-toast";

export type Decision = {
  id: string;
  option1: string;
  option2: string;
  result: string;
  timestamp: number;
};

export const makeDecision = (option1: string, option2: string): string => {
  // Simple random decision between two options
  return Math.random() < 0.5 ? option1 : option2;
};

export const saveDecision = (decision: Omit<Decision, "id" | "timestamp">): Decision => {
  const newDecision = {
    ...decision,
    id: generateId(),
    timestamp: Date.now(),
  };
  
  try {
    const savedDecisions = getSavedDecisions();
    const updatedDecisions = [newDecision, ...savedDecisions];
    
    localStorage.setItem("savedDecisions", JSON.stringify(updatedDecisions));
    toast({
      title: "Decision saved!",
      description: "Your decision has been saved successfully.",
    });
    
    return newDecision;
  } catch (error) {
    console.error("Failed to save decision:", error);
    toast({
      variant: "destructive",
      title: "Failed to save",
      description: "Could not save your decision. Please try again.",
    });
    
    return newDecision;
  }
};

export const getSavedDecisions = (): Decision[] => {
  try {
    const savedDecisions = localStorage.getItem("savedDecisions");
    return savedDecisions ? JSON.parse(savedDecisions) : [];
  } catch (error) {
    console.error("Failed to retrieve saved decisions:", error);
    return [];
  }
};

export const removeDecision = (id: string): void => {
  try {
    const savedDecisions = getSavedDecisions();
    const updatedDecisions = savedDecisions.filter(decision => decision.id !== id);
    
    localStorage.setItem("savedDecisions", JSON.stringify(updatedDecisions));
    toast({
      title: "Decision removed",
      description: "The decision has been removed from your saved list.",
    });
  } catch (error) {
    console.error("Failed to remove decision:", error);
    toast({
      variant: "destructive",
      title: "Failed to remove",
      description: "Could not remove the decision. Please try again.",
    });
  }
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
