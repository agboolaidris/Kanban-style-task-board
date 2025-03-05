"use client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import React, { useMemo, useRef } from "react";
import { Column } from "src/types/column";
import { BodyText } from "@ui/Text";
import { AddTaskForm } from "../task/AddTaskForm";
import { useTasks } from "src/hooks/useTasks";
import { TaskCard } from "../task/TaskCard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "class-variance-authority";
import { Dropdown } from "@ui/Dropdown";
import { useColumns } from "src/hooks/useColumns";
import { useSetAtom } from "jotai";
import { columnModalAtom } from "src/lib/store";

/**
 * ColumnCard component represents a column in a task management board.
 * It displays the column header, a list of tasks, and a form to add new tasks.
 *
 * @param {Props} props - The properties object.
 * @param {Column} props.column - The column data.
 * @param {string} [props.className] - Additional class names for styling.
 *
 * @returns {JSX.Element} The rendered ColumnCard component.
 *
 * @component
 *
 * @example
 * <ColumnCard column={columnData} className="custom-class" />
 *
 * @remarks
 * This component uses the `useTasks`, `useSetAtom`, and `useColumns` hooks to manage tasks and columns.
 * It also utilizes the `useSortable` hook from the DnD library for drag-and-drop functionality.
 *
 * @internal
 * The `handleDropdownChange` function handles the dropdown menu actions for editing or deleting the column.
 * The `handleAddNewTask` function adds a new task to the column and scrolls to the bottom of the task list.
 *
 * @see {@link TaskCard} for the task card component used within the column.
 * @see {@link AddTaskForm} for the form component used to add new tasks.
 */

type Props = { column: Column; className?: string };

const dropdownOptions = [
  { label: "Edit", icon: PencilIcon, value: "edit" },
  { label: "Delete", icon: Trash2Icon, value: "delete" },
];

export const ColumnCard = ({ column, className }: Props) => {
  const { label, color, id } = column;
  const { tasks, addTask, removeTask, updateTask } = useTasks();
  const setColumnModal = useSetAtom(columnModalAtom);
  const { removeColumn } = useColumns();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Get tasks sorted by creation order (new tasks appear at the bottom)
  const columnTasks = useMemo(
    () =>
      tasks
        .filter(({ columnId }) => columnId === id)
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
    [id, tasks]
  );

  const columnTaskIds = useMemo(
    () => columnTasks.map(({ id }) => id),
    [columnTasks]
  );

  const {
    setNodeRef,
    transition,
    transform,
    attributes,
    listeners,
    isDragging,
  } = useSortable({
    id,
    data: { type: "Column", column: useMemo(() => column, [column]) },
  });

  const handleDropdownChange = (value: string) => {
    if (value === "edit") {
      setColumnModal({ isOpen: true, column, type: "edit" });
    } else if (value === "delete") {
      removeColumn(id);
    }
  };

  const handleAddNewTask = (title: string) => {
    addTask({ title, columnId: id });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cx(
          "h-full border border-gray-200 rounded-md p-1 relative overflow-hidden",
          className
        )}
        {...listeners}
        {...attributes}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx(
        "h-full border border-gray-200 rounded-md bg-gray-100 p-1 relative overflow-hidden flex flex-col",
        className
      )}
      {...listeners}
      {...attributes}
    >
      {/* Column Header */}
      <div className="flex items-center gap-2 p-2 ">
        <div
          style={{ background: `${color}20` }}
          className="p-2 rounded cursor-grab flex flex-1 items-center gap-1"
        >
          <BodyText className="!font-medium !text-sm">{label}</BodyText>
          <div
            style={{ background: color }}
            className="w-8 h-5 ml-auto rounded flex justify-center items-center text-sm"
          >
            {columnTasks.length}
          </div>
        </div>
        <Dropdown options={dropdownOptions} onChange={handleDropdownChange} />
      </div>

      {/* Task List */}
      <div className="pt-5 space-y-4 p-2 h-full overflow-auto pb-32 flex-1">
        <SortableContext items={columnTaskIds}>
          {columnTasks.map((task) => (
            <TaskCard
              onDelete={removeTask}
              onEdit={(id, title) => updateTask(id, { title })}
              key={task.id}
              task={task}
            />
          ))}
        </SortableContext>
        <div ref={bottomRef} />
      </div>

      {/* Add Task Form */}
      <div className="w-full p-2">
        <AddTaskForm onSubmit={handleAddNewTask} />
      </div>
    </div>
  );
};
