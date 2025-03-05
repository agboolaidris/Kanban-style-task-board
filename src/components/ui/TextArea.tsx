import React, {
  DetailedHTMLProps,
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

import { cva, cx, VariantProps } from "class-variance-authority";
import { TriangleAlert } from "lucide-react";

/**
 * A forward-ref TextArea component that renders a label, a textarea, and an optional error message.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.label] - The label text for the textarea.
 * @param {string} [props.error] - The error message to display.
 * @param {string} [props.intent] - The intent of the textarea (e.g., primary, secondary).
 * @param {string} [props.size] - The size of the textarea (e.g., small, medium, large).
 * @param {string} [props.className] - Additional class names to apply to the textarea.
 * @param {React.Ref<HTMLTextAreaElement>} ref - The ref to be forwarded to the textarea element.
 * @param {Object} rest - Additional properties to be spread onto the textarea element.
 *
 * @returns {JSX.Element} The rendered TextArea component.
 */

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
