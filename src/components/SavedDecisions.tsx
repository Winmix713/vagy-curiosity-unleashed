
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Decision, getSavedDecisions, removeDecision } from "@/utils/decisionUtils";

const SavedDecisions: React.FC = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    const loadSavedDecisions = () => {
      const savedDecisions = getSavedDecisions();
      setDecisions(savedDecisions);
    };

    loadSavedDecisions();
    
    // Add event listener for storage changes
    window.addEventListener("storage", loadSavedDecisions);
    
    return () => {
      window.removeEventListener("storage", loadSavedDecisions);
    };
  }, []);

  const handleRemove = (id: string) => {
    removeDecision(id);
    setDecisions(prevDecisions => prevDecisions.filter(decision => decision.id !== id));
  };

  if (decisions.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Saved Decisions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <div className="space-y-4">
            {decisions.map((decision) => (
              <Card key={decision.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium mb-1">
                      {decision.option1} or {decision.option2}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Decision: <span className="font-bold text-primary">{decision.result}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(decision.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(decision.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SavedDecisions;
