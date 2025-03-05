"use client";
import * as React from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

/**
 * Button component with various styles and sizes.
 *
 * @param {string} className - Additional class names to apply to the button.
 * @param {string} variant - The variant of the button. Can be "default", "primary", or "secondary".
 * @param {string} size - The size of the button. Can be "default", "sm", "lg", or "icon".
 * @param {React.ComponentProps<"button">} props - Additional props to pass to the button element.
 *
 * @returns {JSX.Element} The styled button component.
 */

const buttonVariants = cva(
  "inline-flex items-center  justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "border border-gray-200 hover:opacity-75",
        primary: "bg-indigo-800  text-white hover:bg-indigo-600 duration-75",
        secondary: "bg-transparent hover:bg-gray-200",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,

  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {}) {
  return (
    <button
      data-slot="button"
      className={cx(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
