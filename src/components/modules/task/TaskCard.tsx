"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@ui/Button";
import { BodyText } from "@ui/Text";

import { PencilIcon, Trash2Icon } from "lucide-react";
import React, { useState, useMemo } from "react";

import { dateFormat } from "src/lib/date";
import { Task } from "src/types/task";
import { EditTask } from "./EditTask";

/**
 * TaskCard component represents a draggable and editable task card.
 *
 * @param {TaskCardProps} props - The properties for the TaskCard component.
 * @param {Object} props.task - The task object containing task details.
 * @param {Function} props.onEdit - Callback function to handle task edit.
 * @param {Function} props.onDelete - Callback function to handle task deletion.
 *
 * @returns {JSX.Element} The rendered TaskCard component.
 *
 * @component
 * @example
 * const task = { id: '1', title: 'Sample Task', created_at: '2023-10-01' };
 * const handleEdit = (id, title) => { console.log(`Edit task ${id} with title ${title}`); };
 * const handleDelete = (id) => { console.log(`Delete task ${id}`); };
 *
 * <TaskCard task={task} onEdit={handleEdit} onDelete={handleDelete} />
 */

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
    disabled: isEditing,
  });

  return (
    <div
      ref={setNodeRef}
      className="border rounded-md cursor-grab group bg-gray-200/80 hover:bg-white duration-75 relative border-gray-200 p-4 z-50"
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
            <BodyText className="!text-xs !text-gray-600">
              {dateFormat(task.created_at, "hh:mmA | DD MMM YYYY")}
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
