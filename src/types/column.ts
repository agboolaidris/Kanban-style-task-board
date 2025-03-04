export type Column = {
  id: string;
  label: string;
  description?: string;
  color: string;
};

export type CreateColumnBody = Omit<Column, "id">;
