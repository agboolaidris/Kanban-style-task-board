"use client";

import { createPortal } from "react-dom";
import { DragOverlay } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { ColumnCard } from "src/components/modules/column/ColumnCard";
import { TaskCard } from "src/components/modules/task/TaskCard";
import { Column } from "src/types/column";
import { Task } from "src/types/task";

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
