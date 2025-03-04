import { useAtom } from "jotai";
import { useCallback } from "react";
import { columnsAtom } from "src/lib/store";
import { CreateColumnBody } from "src/types/column";

export const useColumns = () => {
  const [columns, setColumns] = useAtom(columnsAtom);

  // Add a new column
  const addColumn = useCallback(
    (payload: CreateColumnBody) => {
      setColumns((prev) => [...prev, { id: crypto.randomUUID(), ...payload }]);
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
