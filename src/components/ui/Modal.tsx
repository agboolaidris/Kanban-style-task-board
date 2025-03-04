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

export const Modal = ({ isOpen, onClose, className, children }: Props) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-[1000] focus:outline-none "
      onClose={onClose}
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
