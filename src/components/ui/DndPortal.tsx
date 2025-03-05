"use client";

import { createPortal } from "react-dom";
import { DragOverlay } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { ColumnCard } from "src/components/modules/column/ColumnCard";
import { TaskCard } from "src/components/modules/task/TaskCard";
import { Column } from "src/types/column";
import { Task } from "src/types/task";

/**
 * DndPortal component renders a drag-and-drop overlay using React portals.
 * It mounts the overlay to the document body when the component is mounted.
 *
 * @param {DndPortalProps} props - The props for the DndPortal component.
 * @param {Column} props.activeColumn - The active column being dragged.
 * @param {Task} props.activeTask - The active task being dragged.
 *
 * @returns {React.ReactPortal | null} - Returns a React portal with the drag overlay or null if not mounted.
 */

type DndPortalProps = {
  activeColumn: Column | null;
  activeTask: Task | null;
};

export const DndPortal = ({ activeColumn, activeTask }: DndPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <DragOverlay>
      {activeColumn && <ColumnCard column={activeColumn} />}
      {activeTask && (
        <TaskCard onDelete={() => null} onEdit={() => null} task={activeTask} />
      )}
    </DragOverlay>,
    document.body
  );
};
