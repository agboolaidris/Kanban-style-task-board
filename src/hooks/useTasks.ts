import { useAtom } from "jotai";
import { useCallback } from "react";

import { tasksAtom } from "src/lib/store";
import { CreateTaskBody } from "src/types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const addTask = useCallback(
    (payload: CreateTaskBody) => {
      setTasks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          ...payload,
          created_at: Date.now().toString(),
        },
      ]);
    },
    [setTasks]
  );
  const removeTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((column) => column.id !== id));
    },
    [setTasks]
  );
  const updateTask = useCallback(
    (id: string, payload: Partial<CreateTaskBody>) => {
      setTasks((prev) =>
        prev.map((column) =>
          column.id === id ? { ...column, ...payload } : column
        )
      );
    },
    [setTasks]
  );
  // Move task to specific index
  const moveTask = useCallback(
    (
      taskId: string,
      targetTaskId: string,
      payload?: Partial<CreateTaskBody>
    ) => {
      setTasks((prev) => {
        const currentIndex = prev.findIndex((col) => col.id === taskId);
        const targetIndex = prev.findIndex((col) => col.id === targetTaskId);

        // Ensure both tasks exist before proceeding
        if (currentIndex === -1 || targetIndex === -1) return prev;

        const newTasks = [...prev];
        const [movedTask] = newTasks.splice(currentIndex, 1); // Remove the column
        newTasks.splice(targetIndex, 0, { ...movedTask, ...payload }); // Insert it at the target index

        return newTasks;
      });
    },
    [setTasks]
  );
  return { tasks, addTask, removeTask, updateTask, moveTask };
};
