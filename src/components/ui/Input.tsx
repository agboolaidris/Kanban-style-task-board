import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";

import { cva, cx, VariantProps } from "class-variance-authority";
import { TriangleAlert } from "lucide-react";

const inputStyles = cva(
  "w-full !appearance-none text-brand-textBlack  rounded-md border font-normal leading-loose focus:border px-3 sm:text-sm  focus:outline-none",
  {
    defaultVariants: {
      error: false,
      intent: "normal",
      size: "md",
    },
    variants: {
      error: {
        true: "!border-rose-500",
      },
      intent: {
        fill: "bg-gray-100 border-gray-200 focus:border-brand-textInput",
        normal:
          "border-gray-200 placeholder:text-gray-200  focus:border-indigo-800 bg-transparent",
      },
      size: {
        lg: "h-16",
        md: "h-12",
        sm: "h-10",
      },
    },
  }
);

export type InputProps = Omit<VariantProps<typeof inputStyles>, "error"> & {
  label?: string;
  loading?: boolean;
  error?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  isLoading?: boolean;
} & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "size"
  >;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      intent,
      size,
      rightIcon,

      className,
      leftIcon,
      isLoading,
      ...rest
    },
    ref
  ) => {
    return (
      <label className={cx("group block")}>
        {label && (
          <p className="mb-2 block text-sm font-medium leading-6 text-gray-900">
            {label}
          </p>
        )}
        <div className="relative rounded-md">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center  justify-center text-gray-900">
              {leftIcon}
            </div>
          )}
          <input
            className={cx(
              inputStyles({ className, error: !!error, intent, size }),
              {
                "pl-8": leftIcon,
                "pr-8": rightIcon,
              }
            )}
            ref={ref}
            {...rest}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 z-20 flex items-center  justify-center text-gray-900">
              {rightIcon}
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-y-0 right-0 z-20 mr-3 flex items-center  justify-center text-gray-900">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-brand-blue" />
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 flex items-center gap-x-1 text-sm text-rose-500">
            <TriangleAlert className="h-4 w-4" />
            {error}
          </p>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";
