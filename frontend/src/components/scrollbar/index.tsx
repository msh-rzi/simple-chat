import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import Scrollbars, { ScrollbarProps } from "react-custom-scrollbars-2";

export type ScrollbarType = {
  children: ReactNode;
} & ScrollbarProps;

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarType>(
  ({ children, className, ...props }, ref) => {
    const scrollbarsRef = useRef<Scrollbars>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useImperativeHandle(ref, () => ({
      scrollToBottom: () => {
        if (scrollbarsRef.current) {
          scrollbarsRef.current.scrollToBottom();
        }
      },
    }));

    return (
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={1000}
        {...props}
        ref={scrollbarsRef}
        className={cn(className)}
      >
        {children}
      </Scrollbars>
    );
  }
);

export default Scrollbar;
