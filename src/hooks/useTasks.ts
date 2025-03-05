import { useAtom } from "jotai";
import { useCallback } from "react";
import { generateUniqueId } from "src/lib/generateId";

import { tasksAtom } from "src/lib/store";
import { CreateTaskBody } from "src/types/task";

/**
 * Custom hook to manage tasks.
 *
 * @returns {Object} An object containing the tasks and functions to manipulate them.
 * @returns {Array} tasks - The current list of tasks.
 * @returns {Function} addTask - Function to add a new task.
 * @param {CreateTaskBody} payload - The data for the new task.
 * @returns {void}
 * @returns {Function} removeTask - Function to remove a task by its ID.
 * @param {string} id - The ID of the task to remove.
 * @returns {void}
 * @returns {Function} updateTask - Function to update a task by its ID.
 * @param {string} id - The ID of the task to update.
 * @param {Partial<CreateTaskBody>} payload - The data to update the task with.
 * @returns {void}
 * @returns {Function} moveTask - Function to move a task to a specific index.
 * @param {string} taskId - The ID of the task to move.
 * @param {string} targetTaskId - The ID of the target task to move the task before.
 * @param {Partial<CreateTaskBody>} [payload] - Optional data to update the task with during the move.
 * @returns {void}
 */

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const addTask = useCallback(
    (payload: CreateTaskBody) => {
      setTasks((prev) => [
        ...prev,
        {
          id: generateUniqueId(),
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
