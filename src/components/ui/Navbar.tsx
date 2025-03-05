"use client";
import React from "react";
import { Button } from "./Button";
import {
  Keyboard,
  LogOut,
  Plus,
  Settings,
  SlidersHorizontal,
  User2Icon,
} from "lucide-react";
import { BodyText, Title } from "./Text";
import { useSetAtom } from "jotai";
import { columnModalAtom } from "src/lib/store";
import { useColumns } from "src/hooks/useColumns";
import { Dropdown } from "./Dropdown";
import { useTasks } from "src/hooks/useTasks";

/**
 * The `Navbar` component renders a navigation bar for the Task Management application.
 * It includes a title and several buttons for adding a column, filtering tasks, and switching boards.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */

const dropdownOptions = [
  { label: "Settings", icon: Settings, value: "edit" },
  { label: "Logout", icon: LogOut, value: "delete" },
];

export const Navbar = () => {
  const setColumnModal = useSetAtom(columnModalAtom);
  const { columns } = useColumns();
  const { tasks } = useTasks();
  return (
    <nav>
      <div className="py-2 wrapper flex justify-between gap-4 flex-wrap">
        <Title>Task Management</Title>

        <div>
          <Dropdown
            title={
              <Button className="!rounded-full bg-gray-50" size="icon">
                <User2Icon />
              </Button>
            }
            options={dropdownOptions}
            onChange={() => null}
          />
        </div>
      </div>
      <div className="h-px bg-gray-100" />
      <div className="py-2 wrapper flex gap-5 items-center">
        <div className="flex items-center gap-2">
          <BodyText className="font-semibold flex items-center">
            columns:{"   "}
            {"  "}
            <span className="text-indigo-800">{columns.length} </span>
          </BodyText>

          <BodyText className="font-semibold flex items-center">
            Tasks:{"   "}
            {"  "}
            <span className="text-indigo-800">{tasks.length} </span>
          </BodyText>
        </div>
        <div className="flex gap-4 justify-end ml-auto">
          <Button onClick={() => setColumnModal({ isOpen: true, type: "add" })}>
            <Plus className="w-5 h-5" />
            Column
          </Button>
          <Button>
            <SlidersHorizontal />
            Filter
          </Button>
          <Button>
            <Keyboard />
            Board
          </Button>
        </div>
      </div>
      <div className="h-px bg-gray-100" />
    </nav>
  );
};
