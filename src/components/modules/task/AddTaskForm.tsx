"use client";

import { Button } from "@ui/Button";
import { TextArea } from "@ui/TextArea";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useOutsideClick } from "src/hooks/useOutsideClick";

type Props = {
  onSubmit: (value: string) => void;
};

export const AddTaskForm = ({ onSubmit }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit(title);
    setTitle("");
    setIsOpen(false);
  };

  const formRef = useOutsideClick<HTMLFormElement>(
    () => isOpen && handleSubmit()
  );

  useEffect(() => {
    if (isOpen) document.getElementById("task-title-input")?.focus();
  }, [isOpen]);

  return (
    <div>
      {isOpen ? (
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-2 bg-white rounded-md p-2"
        >
          <TextArea
            id="task-title-input"
            className="!bg-gray-50"
            size="sm"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="w-max ml-auto space-x-2">
            <Button type="button" onClick={() => setIsOpen(false)} size="sm">
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              variant="primary"
              disabled={!title.trim()}
            >
              Save
            </Button>
          </div>
        </form>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          variant="secondary"
          className="!bg-gray-200 !w-full hover:bg-gray-300"
        >
          <Plus /> Add Task
        </Button>
      )}
    </div>
  );
};
