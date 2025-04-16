
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  delayDuration?: number;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ 
  children, 
  delayDuration, 
  ...props 
}) => {
  return <div {...props}>{children}</div>;
};
TooltipProvider.displayName = "TooltipProvider";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  className, 
  content, 
  ...props 
}) => {
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      {children}
      <div className="absolute z-50 px-2 py-1 text-xs bg-background border rounded shadow-md top-full mt-1">
        {content}
      </div>
    </div>
  );
};
Tooltip.displayName = "Tooltip";

const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("inline-block", className)} {...props} />
));
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "z-50 px-2 py-1 text-xs bg-background border rounded shadow-md",
      className
    )} 
    {...props} 
  />
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
