"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { cx } from "class-variance-authority";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
};

/**
 * Modal component that renders a dialog with a backdrop.
 *
 * @param {boolean} isOpen - Determines if the modal is open or closed.
 * @param {() => void} onClose - Function to call when the modal is requested to be closed.
 * @param {string} [className] - Additional classes to apply to the modal.
 * @param {React.ReactNode} children - Content to be displayed inside the modal.
 *
 * @returns {JSX.Element} The rendered modal component.
 */

export const Modal = ({ isOpen, onClose, className, children }: Props) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-[1000] focus:outline-none "
      onClose={onClose}
      role="dialog"
      __demoMode
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#00000080]  transition-opacity">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={cx(
              "w-full max-w-md rounded-xl bg-white border border-gray-100  p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",
              className
            )}
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
