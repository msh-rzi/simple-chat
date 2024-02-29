import { Button, ButtonProps } from "@/components/ui/button";
import { ReactNode, forwardRef } from "react";

const IconButton = forwardRef<
  HTMLButtonElement,
  { children: ReactNode } & ButtonProps
>(({ children, ...props }, ref) => {
  return (
    <Button variant="ghost" className="p-2" ref={ref} {...props}>
      {children}
    </Button>
  );
});

export default IconButton;
