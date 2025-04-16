
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
}

export type ToastActionElement = React.ReactElement<typeof ToastAction>;

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-background border border-border rounded-md shadow-lg p-4 min-w-[300px] max-w-md",
        className
      )}
      {...props}
    />
  );
});
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("font-semibold", className)} {...props} />;
});
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("text-sm opacity-90 mt-1", className)} {...props} />;
});
ToastDescription.displayName = "ToastDescription";

const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { altText: string }
>(({ className, altText, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-secondary hover:text-secondary-foreground h-8 px-3 text-xs mt-2",
        className
      )}
      {...props}
    >
      <span className="sr-only">{altText}</span>
    </button>
  );
});
ToastAction.displayName = "ToastAction";

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { altText?: string }
>(({ className, altText = "Close", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "absolute top-2 right-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2",
        className
      )}
      toast-close=""
      {...props}
    >
      <span className="sr-only">{altText}</span>
    </button>
  );
});
ToastClose.displayName = "ToastClose";

// Create proper type definitions for the Toast component and its subcomponents
interface ToastCompoundComponent extends React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> {
  Title: typeof ToastTitle;
  Description: typeof ToastDescription;
  Action: typeof ToastAction;
  Close: typeof ToastClose;
}

// Convert Toast to a compound component
const ToastComponent = Toast as ToastCompoundComponent;
ToastComponent.Title = ToastTitle;
ToastComponent.Description = ToastDescription;
ToastComponent.Action = ToastAction;
ToastComponent.Close = ToastClose;

export { 
  ToastComponent as Toast, 
  ToastTitle, 
  ToastDescription, 
  ToastAction, 
  ToastClose 
};
