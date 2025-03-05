"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { Button } from "./Button";
import { Fragment, ReactNode } from "react";
import { Ellipsis } from "lucide-react";

/**
 * Dropdown component that renders a button which, when clicked, displays a list of options.
 * Each option is represented by a button with an icon and a label.
 *
 * @param {DropdownOption[]} options - Array of options to be displayed in the dropdown. Each option contains a label, value, and icon.
 * @param {(value: string) => void} onChange - Callback function that is called when an option is selected. The value of the selected option is passed as an argument.
 *
 * @component
 * @example
 * const options = [
 *   { label: 'Option 1', value: 'option1', icon: IconComponent1 },
 *   { label: 'Option 2', value: 'option2', icon: IconComponent2 },
 * ];
 * const handleChange = (value) => {
 *   console.log(value);
 * };
 *
 * <Dropdown options={options} onChange={handleChange} />
 */

type DropdownOption = { label: string; value: string; icon: typeof Ellipsis };

type Props = {
  options: DropdownOption[];
  onChange: (value: string) => void;
  title?: ReactNode;
};

export const Dropdown = ({ options, onChange, title }: Props) => {
  return (
    <Menu>
      <MenuButton as={Fragment}>
        {title || (
          <Button variant="secondary" size="icon">
            <Ellipsis className="w-4 h-4" />
          </Button>
        )}
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="w-44 origin-top-right z-50 relative py-2 mt-3 rounded border border-gray-200  bg-white p-1   transition duration-100 ease-out  focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {options.map(({ icon: Icon, label, value }) => (
          <MenuItem key={value}>
            <Button
              onClick={() => onChange(value)}
              variant="secondary"
              className="group w-full justify-start hover:!bg-gray-100"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
