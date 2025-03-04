import React, {
  DetailedHTMLProps,
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

import { cva, cx, VariantProps } from "class-variance-authority";
import { TriangleAlert } from "lucide-react";

const textareaStyles = cva(
  "w-full appearance-none resize-none text-brand-textBlack rounded-md border font-normal leading-loose focus:border px-3 sm:text-sm  focus:outline-none",
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
        normal:
          "border-gray-200 placeholder:text-gray-400  focus:border-indigo-700 bg-transparent",
      },
      size: {
        lg: "h-48",
        md: "h-40",
        sm: "h-16",
      },
    },
  }
);

export type TextAreaProps = Omit<
  VariantProps<typeof textareaStyles>,
  "error"
> & {
  label?: string;
  loading?: boolean;
  error?: string;
} & Omit<
    DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    "size"
  >;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, intent, size, className, ...rest }, ref) => {
    return (
      <label className={cx("group block")}>
        {label && (
          <p className="mb-2 block text-sm font-medium leading-6 text-brand-textBlack">
            {label}
          </p>
        )}
        <div className="relative rounded-md">
          <textarea
            className={cx(
              textareaStyles({ className, error: !!error, intent, size })
            )}
            ref={ref}
            {...rest}
          />
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

TextArea.displayName = "TextArea";
