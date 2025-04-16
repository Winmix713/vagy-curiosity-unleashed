
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProviderProps extends React.HTMLAttributes<HTMLDivElement> {}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
TooltipProvider.displayName = "TooltipProvider";

export { TooltipProvider };
