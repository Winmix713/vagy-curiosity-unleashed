
export interface Decision {
  id: string;
  option1: string;
  option2: string;
  result: string;
  timestamp: number;
}

export const makeDecision = (option1: string, option2: string): string => {
  // Simple random selection
  return Math.random() < 0.5 ? option1 : option2;
};

export const saveDecision = (decision: Omit<Decision, "id" | "timestamp">): void => {
  const newDecision: Decision = {
    ...decision,
    id: generateId(),
    timestamp: Date.now(),
  };

  const savedDecisions = getSavedDecisions();
  localStorage.setItem("saved_decisions", JSON.stringify([...savedDecisions, newDecision]));
  
  // Dispatch a storage event for other components to react
  window.dispatchEvent(new Event("storage"));
};

export const getSavedDecisions = (): Decision[] => {
  const savedDecisions = localStorage.getItem("saved_decisions");
  return savedDecisions ? JSON.parse(savedDecisions) : [];
};

export const removeDecision = (id: string): void => {
  const savedDecisions = getSavedDecisions();
  const updatedDecisions = savedDecisions.filter(decision => decision.id !== id);
  localStorage.setItem("saved_decisions", JSON.stringify(updatedDecisions));
  
  // Dispatch a storage event for other components to react
  window.dispatchEvent(new Event("storage"));
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
