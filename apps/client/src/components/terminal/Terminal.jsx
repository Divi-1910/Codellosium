import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export const AnimatedSpan = ({ children, delay = 0, className, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: delay / 1000 }}
    className={cn("grid text-sm font-normal tracking-tight", className)}
    {...props}
  >
    {children}
  </motion.div>
);

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  ...props
}) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string.");
  }

  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true
  });

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
};

export const Terminal = ({ children, className, Title }) => {
  return (
    <div
      className={cn(
        "relative z-50 w-full max-w-3xl rounded-lg shadow-lg border border-gray-300 bg-white font-mono",
        className
      )}
    >
      <div className="flex justify-between space-x-2 border-b border-gray-200 bg-gray-100 rounded-t-lg">
        <div className="flex justify-start p-2 gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <span className="p-2 text-gray-700 text-sm">{Title}</span>
      </div>
      <div className="p-4 overflow-auto" style={{ maxHeight: "400px" }}>
        <pre className="whitespace-pre-wrap break-words">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};
