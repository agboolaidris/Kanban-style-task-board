import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Column } from "../types/column";
import { Task } from "../types/task";
import defaultTasks from "../data/tasks.json";
import defaultColumns from "../data/columns.json";

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
