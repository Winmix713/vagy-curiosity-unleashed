
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SplitVertical, History, QuestionMark } from "lucide-react";
import DecisionForm from "@/components/DecisionForm";
import ResultDisplay from "@/components/ResultDisplay";
import SavedDecisions from "@/components/SavedDecisions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("decide");
  const [currentDecision, setCurrentDecision] = useState<{
    option1: string;
    option2: string;
    result: string;
  } | null>(null);

  const handleDecisionMade = (option1: string, option2: string, result: string) => {
    setCurrentDecision({ option1, option2, result });
  };

  const handleReset = () => {
    setCurrentDecision(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <header className="w-full max-w-3xl text-center mb-8">
        <div className="flex items-center justify-center mb-2">
          <SplitVertical className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-4xl font-extrabold tracking-tight">vagy</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Let destiny decide when you can't
        </p>
      </header>

      <main className="w-full max-w-3xl flex-1">
        <Tabs 
          defaultValue="decide" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="decide">
              <QuestionMark className="h-4 w-4 mr-2" />
              Decide
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="decide" className="space-y-8">
              {!currentDecision ? (
                <DecisionForm onDecisionMade={handleDecisionMade} />
              ) : (
                <ResultDisplay
                  option1={currentDecision.option1}
                  option2={currentDecision.option2}
                  result={currentDecision.result}
                  onReset={handleReset}
                />
              )}
            </TabsContent>
            <TabsContent value="history">
              <SavedDecisions />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <footer className="w-full max-w-3xl mt-12 text-center text-sm text-muted-foreground">
        <Separator className="mb-4" />
        <p>vagy - The Decision Making Assistant</p>
      </footer>
    </div>
  );
};

export default Index;
