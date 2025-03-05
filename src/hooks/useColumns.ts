import { useAtom } from "jotai";
import { useCallback } from "react";
import { generateUniqueId } from "src/lib/generateId";
import { columnsAtom } from "src/lib/store";
import { CreateColumnBody } from "src/types/column";

/**
 * Custom hook to manage columns state.
 *
 * @returns {Object} An object containing the columns state and functions to manipulate it.
 * @returns {Array} columns - The current state of columns.
 * @returns {Function} addColumn - Function to add a new column.
 * @param {CreateColumnBody} payload - The data for the new column.
 * @returns {Function} removeColumn - Function to remove a column by its ID.
 * @param {string} id - The ID of the column to remove.
 * @returns {Function} updateColumn - Function to update a column's label.
 * @param {string} id - The ID of the column to update.
 * @param {Partial<CreateColumnBody>} payload - The new data for the column.
 * @returns {Function} moveColumn - Function to move a column to a specific index.
 * @param {string} columnId - The ID of the column to move.
 * @param {string} targetColumnId - The ID of the column to move to.
 */

export const useColumns = () => {
  const [columns, setColumns] = useAtom(columnsAtom);

  // Add a new column
  const addColumn = useCallback(
    (payload: CreateColumnBody) => {
      setColumns((prev) => [...prev, { id: generateUniqueId(), ...payload }]);
    },
    [setColumns]
  );

  // Remove a column
  const removeColumn = useCallback(
    (id: string) => {
      setColumns((prev) => prev.filter((column) => column.id !== id));
    },
    [setColumns]
  );

  // Update column label
  const updateColumn = useCallback(
    (id: string, payload: Partial<CreateColumnBody>) => {
      setColumns((prev) =>
        prev.map((column) =>
          column.id === id ? { ...column, ...payload } : column
        )
      );
    },
    [setColumns]
  );

  // Move column to specific index
  const moveColumn = useCallback(
    (columnId: string, targetColumnId: string) => {
      setColumns((prev) => {
        const currentIndex = prev.findIndex((col) => col.id === columnId);
        const targetIndex = prev.findIndex((col) => col.id === targetColumnId);

        // Ensure both columns exist before proceeding
        if (currentIndex === -1 || targetIndex === -1) return prev;

        const newColumns = [...prev];
        const [movedColumn] = newColumns.splice(currentIndex, 1); // Remove the column
        newColumns.splice(targetIndex, 0, movedColumn); // Insert it at the target index

        return newColumns;
      });
    },
    [setColumns]
  );

  return { columns, addColumn, removeColumn, updateColumn, moveColumn };
};
