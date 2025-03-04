import { cx } from "class-variance-authority";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type TitleProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export function Title({ className, ...rest }: TitleProps) {
  return (
    <h2
      className={cx("text-lg font-bold text-gray-900 sm:text-2xl", className)}
      {...rest}
    />
  );
}

export function BodyText({ className, ...rest }: TitleProps) {
  return (
    <p
      className={cx("text-base font-normal text-gray-950", className)}
      {...rest}
    />
  );
}
