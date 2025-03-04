import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Column } from "src/types/column";
import { Task } from "src/types/task";
import defaultTasks from "src/data/tasks.json";
import defaultColumns from "src/data/columns.json";

export const columnsAtom = atomWithStorage<Column[]>(
  "columnsAtom",
  defaultColumns
);

export const tasksAtom = atomWithStorage<Task[]>("tasksAtom", defaultTasks);

export const columnModalAtom = atom<{
  isOpen: boolean;
  type?: "add" | "edit";
  column?: Column;
}>({
  isOpen: false,
});
