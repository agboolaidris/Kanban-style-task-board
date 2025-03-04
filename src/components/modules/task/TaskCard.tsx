"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@ui/Button";
import { BodyText } from "@ui/Text";
import { TextArea } from "@ui/TextArea";
import { PencilIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { dateFormat } from "src/lib/date";
import { Task } from "src/types/task";

type EditTaskProps = {
  task: Task;
  onSave: (title: string) => void;
  onCancel: () => void;
};

const EditTask = ({ task, onSave, onCancel }: EditTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const formRef = useOutsideClick<HTMLFormElement>(onCancel);

  useEffect(() => {
    document.getElementById("task-title-input-edit")?.focus();
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (title.trim()) onSave(title);
      }}
      className="space-y-2 rounded-md"
    >
      <TextArea
        id="task-title-input-edit"
        className="!bg-gray-50"
        size="sm"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (title.trim()) onSave(title);
          }
        }}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} size="sm">
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
  );
};

type TaskCardProps = {
  task: Task;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    setNodeRef,
    transition,
    transform,
    attributes,
    listeners,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task: useMemo(() => task, [task]) },
  });

  return (
    <div
      ref={setNodeRef}
      className="border rounded-md group bg-gray-100 hover:bg-white duration-75 relative border-gray-200 p-4 z-50"
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      {...listeners}
      {...attributes}
    >
      {isEditing ? (
        <EditTask
          task={task}
          onSave={(title) => {
            onEdit(task.id, title);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          {isDragging && <div className="bg-gray-200 absolute inset-0 z-20" />}
          <BodyText className="!text-sm break-words !font-medium">
            {task.title}
          </BodyText>
          <div className="mt-3 flex justify-between items-center h-10">
            <BodyText className="!text-xs text-gray-500">
              {dateFormat(task.created_at, "DD/MM/YYYY")}
            </BodyText>
            <div className="hidden group-hover:flex ">
              <Button
                variant="secondary"
                className="size-7"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <PencilIcon className="text-green-700" />
              </Button>
              <Button
                variant="secondary"
                className="size-7"
                size="icon"
                onClick={() => onDelete(task.id)}
              >
                <Trash2Icon className="text-red-700" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
