export type Task = {
  id: string;
  title: string;
  columnId: string;
  created_at: string;
};

export type CreateTaskBody = Pick<Task, "title" | "columnId">;
