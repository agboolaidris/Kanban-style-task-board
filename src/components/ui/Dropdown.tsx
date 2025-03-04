import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { Button } from "./Button";
import { Fragment } from "react";
import { Ellipsis } from "lucide-react";

type DropdownOption = { label: string; value: string; icon: typeof Ellipsis };

type Props = {
  options: DropdownOption[];
  onChange: (value: string) => void;
};

export const Dropdown = ({ options, onChange }: Props) => {
  return (
    <Menu>
      <MenuButton as={Fragment}>
        <Button variant="secondary" size="icon">
          <Ellipsis className="w-4 h-4" />
        </Button>
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
