import { cx } from "class-variance-authority";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

/**
 * Renders a title component with customizable styles.
 *
 * @param {object} props - The properties object.
 * @param {string} props.className - Additional class names to apply to the title.
 * @param {object} rest - Additional properties to spread onto the title element.
 * @returns {JSX.Element} The rendered title component.
 */

export function Title({ className, ...rest }: Props) {
  return (
    <h2
      className={cx("text-lg font-bold text-gray-900 sm:text-2xl", className)}
      {...rest}
    />
  );
}

/**
 * A functional component that renders a paragraph (`<p>`) element with base text styling.
 *
 * @param {object} props - The properties object.
 * @param {string} props.className - Additional class names to apply to the paragraph element.
 * @param {object} props.rest - Any other properties to be spread onto the paragraph element.
 *
 * @returns {JSX.Element} The rendered paragraph element with the applied styles and properties.
 */

export function BodyText({ className, ...rest }: Props) {
  return (
    <p
      className={cx("text-base font-normal text-gray-950", className)}
      {...rest}
    />
  );
}
