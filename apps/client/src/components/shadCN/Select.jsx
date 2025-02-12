import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../utils/cn";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = (props) => {
  const { className, children, ...rest } = props;
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

const SelectScrollUpButton = (props) => {
  const { className, ...rest } = props;
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...rest}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
};

const SelectScrollDownButton = (props) => {
  const { className, ...rest } = props;
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...rest}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
};

const SelectContent = (props) => {
  const { className, children, position = "popper", ...rest } = props;
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

const SelectLabel = (props) => {
  const { className, ...rest } = props;
  return (
    <SelectPrimitive.Label
      className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      {...rest}
    />
  );
};

const SelectItem = (props) => {
  const { className, children, ...rest } = props;
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...rest}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

const SelectSeparator = (props) => {
  const { className, ...rest } = props;
  return (
    <SelectPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...rest}
    />
  );
};

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
};
