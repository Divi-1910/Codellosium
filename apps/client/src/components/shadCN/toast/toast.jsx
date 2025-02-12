import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "../../../utils/cn";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = ({ className, ...props }) => (
  <ToastPrimitives.Viewport
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
);

const Toast = ({ className, variant = "default", ...props }) => {
  const toastVariants = {
    default: "border bg-background text-foreground",
    destructive:
      "destructive group border-destructive bg-destructive text-destructive-foreground"
  };

  return (
    <ToastPrimitives.Root
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        toastVariants[variant],
        className
      )}
      {...props}
    />
  );
};

const ToastAction = ({ className, ...props }) => (
  <ToastPrimitives.Action
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const ToastClose = ({ className, ...props }) => (
  <ToastPrimitives.Close
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
);

const ToastTitle = ({ className, ...props }) => (
  <ToastPrimitives.Title
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
);

const ToastDescription = ({ className, ...props }) => (
  <ToastPrimitives.Description
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
);

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction
};
