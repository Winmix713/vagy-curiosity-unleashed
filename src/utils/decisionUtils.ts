
export interface Decision {
  id: string;
  option1: string;
  option2: string;
  result: string;
  timestamp: number;
}

export const makeDecision = (option1: string, option2: string): string => {
  // Simple 50/50 decision
  return Math.random() < 0.5 ? option1 : option2;
};

export const saveDecision = (decision: { option1: string; option2: string; result: string }): void => {
  const savedDecisions = getSavedDecisions();
  const newDecision: Decision = {
    id: generateId(),
    option1: decision.option1,
    option2: decision.option2,
    result: decision.result,
    timestamp: Date.now()
  };
  
  savedDecisions.push(newDecision);
  localStorage.setItem('vagy-decisions', JSON.stringify(savedDecisions));
  
  // Trigger storage event for other components
  window.dispatchEvent(new Event('storage'));
};

export const getSavedDecisions = (): Decision[] => {
  const savedDecisionsString = localStorage.getItem('vagy-decisions');
  if (!savedDecisionsString) return [];
  
  try {
    return JSON.parse(savedDecisionsString);
  } catch (error) {
    console.error('Failed to parse saved decisions', error);
    return [];
  }
};

export const removeDecision = (id: string): void => {
  const savedDecisions = getSavedDecisions();
  const filteredDecisions = savedDecisions.filter(decision => decision.id !== id);
  localStorage.setItem('vagy-decisions', JSON.stringify(filteredDecisions));
  
  // Trigger storage event for other components
  window.dispatchEvent(new Event('storage'));
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
