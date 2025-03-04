"use client";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { useSetAtom } from "jotai";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";

// DND Kit imports
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Components
import { Navbar } from "@ui/Navbar";
import { Button } from "@ui/Button";
import { ColumnCard } from "src/components/modules/column/ColumnCard";
import { DndPortal } from "@ui/DndPortal";
import { ColumnModal } from "src/components/modules/column/ColumnModal";

// Hooks & State Management
import { useColumns } from "src/hooks/useColumns";
import { useTasks } from "src/hooks/useTasks";
import { columnModalAtom } from "src/lib/store";
import { Column } from "src/types/column";
import { Task } from "src/types/task";

// Dynamically load DND wrapper to disable SSR
const DndWrapper = dynamic(
  () =>
    Promise.resolve(({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    )),
  { ssr: false }
);

export default function KanbanBoard() {
  // State Management
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const setOpenAddColumn = useSetAtom(columnModalAtom);

  // Data Hooks
  const { columns, moveColumn } = useColumns();
  const { moveTask, updateTask } = useTasks();

  // Memoized Values
  const columnsId = useMemo(() => columns.map(({ id }) => id), [columns]);

  // Drag Throttling Refs
  const lastPosition = useRef<{ activeId: string; overId: string } | null>(
    null
  );
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  // Cleanup throttle timeout on unmount
  useEffect(() => {
    return () => {
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, []);

  // Sensor Configuration
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  );

  /**
   * Handles drag start event for both columns and tasks
   */
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;

    if (data?.type === "Column") setActiveColumn(data.column);
    if (data?.type === "Task") setActiveTask(data.task);
  }, []);

  /**
   * Handles drag over events with throttling and position validation
   */
  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id.toString();
      const overId = over.id.toString();

      // Prevent duplicate updates
      if (
        lastPosition.current?.activeId === activeId &&
        lastPosition.current?.overId === overId
      ) {
        return;
      }

      // Throttle updates to 50ms
      if (!throttleTimeout.current) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null;
        }, 50);

        lastPosition.current = { activeId, overId };

        // Skip same element interactions
        if (activeId === overId) return;

        // Handle task movements
        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";

        if (isActiveTask) {
          if (isOverTask) {
            moveTask(activeId, overId, {
              columnId: over.data.current?.task?.columnId,
            });
          } else {
            updateTask(activeId, { columnId: overId });
          }
        }
      }
    },
    [moveTask, updateTask]
  );

  /**
   * Handles drag end events with position validation
   */
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveColumn(null);
      setActiveTask(null);

      if (!over) return;

      // Handle column movements
      if (active.data.current?.type === "Column") {
        const originalIndex = columns.findIndex((c) => c.id === active.id);
        const newIndex = columns.findIndex((c) => c.id === over.id);

        if (originalIndex !== newIndex) {
          moveColumn(active.id.toString(), over.id.toString());
        }
      }
    },
    [columns, moveColumn]
  );

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <DndWrapper>
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
        >
          {/* Columns Container */}
          <div className="flex gap-2 overflow-x-scroll h-full py-2 wrapper pb-3">
            <SortableContext
              items={columnsId}
              strategy={verticalListSortingStrategy}
            >
              {columns.map((column) => (
                <ColumnCard
                  key={column.id}
                  column={column}
                  className="w-72 shrink-0 h-full"
                />
              ))}
            </SortableContext>

            {/* Add Column Button */}
            <Button
              variant="secondary"
              className="!bg-gray-100"
              onClick={() => setOpenAddColumn({ isOpen: true, type: "add" })}
              aria-label="Add new column"
            >
              <Plus />
            </Button>
          </div>

          {/* Drag Preview Portal */}
          <DndPortal activeColumn={activeColumn} activeTask={activeTask} />
        </DndContext>
      </DndWrapper>

      {/* Column Management Modal */}
      <ColumnModal />
    </div>
  );
}
