"use client";

import { cn } from "#/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import CircleSpin from "../circle-spinning";

const buttonVariants = cva(
  "inline-flex items-center active:opacity-80 justify-center rounded font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark",
        negative: "bg-state-negative text-white hover:bg-state-negative-dark",
        positive: "bg-state-positive text-white hover:bg-state-positive-dark",
      },
      outline: {
        primary:
          "border border-primary bg-white text-primary hover:bg-primary hover:text-white",
        secondary:
          "border border-neutral-lighter bg-white text-color hover:bg-primary hover:text-white hover:border-primary",
        negative:
          "bg-white border border-state-negative text-state-negative hover:bg-state-negative hover:text-white",
        positive:
          "border border-state-positive bg-white text-state-positive hover:bg-state-positive hover:text-white",
      },
      ghost: {
        primary:
          "bg-transparent text-primary hover:bg-primary hover:text-white",
        secondary:
          "bg-transparent text-neutral-lighter hover:bg-primary hover:text-white",
        negative:
          "bg-transparent text-state-negative hover:bg-state-negative hover:text-white",
        positive:
          "bg-transparent text-state-positive hover:bg-state-positive hover:text-white",
      },
      size: {
        sm: "h-[32px] text-[12px] px-5 py-1",
        default: "text-[14px] h-[40px] px-6 py-1",
        lg: "px-7 py-1 text-[16px] h-[48px] font-bold",
      },
      disable: {
        default: "bg-neutral-lighter text-neutral-tints pointer-events-none",
      },
    },
    compoundVariants: [
      {
        size: ["sm", "default", "lg"],
        className: "rounded-md",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const spinVariants = cva("border-none", {
  variants: {
    variant: {
      default: "text-white",
      negative: " text-white",
      positive: " text-white",
    },
    outline: {
      primary: "  text-primary ",
      secondary: " text-neutral-lighter",
      negative: " text-state-negative ho",
      positive: " text-state-positive",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  name: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      outline,
      ghost,
      size,
      disable,
      loading,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        {...props}
        className={cn(
          buttonVariants({ variant, outline, ghost, size, disable, className })
        )}
        ref={ref}
        disabled={loading || props.disabled}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && (
              <CircleSpin
                className={cn(
                  spinVariants({ variant: variant, outline: outline })
                )}
              />
            )}
            {children}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
