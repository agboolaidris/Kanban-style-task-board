import { Button } from "@ui/Button";
import { TextArea } from "@ui/TextArea";
import { useEffect, useState } from "react";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { Task } from "src/types/task";

/**
 * EditTask component allows users to edit the title of a task.
 *
 * @param {EditTaskProps} props - The properties for the EditTask component.
 * @param {Task} props.task - The task object containing the current title.
 * @param {function} props.onSave - Callback function to handle saving the edited title.
 * @param {function} props.onCancel - Callback function to handle canceling the edit.
 *
 * @returns {JSX.Element} The rendered EditTask component.
 *
 * @component
 * @example
 * const task = { title: "Sample Task" };
 * const handleSave = (newTitle) => { console.log(newTitle); };
 * const handleCancel = () => { console.log("Edit canceled"); };
 *
 * <EditTask task={task} onSave={handleSave} onCancel={handleCancel} />
 */

type EditTaskProps = {
  task: Task;
  onSave: (title: string) => void;
  onCancel: () => void;
};

export const EditTask = ({ task, onSave, onCancel }: EditTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const formRef = useOutsideClick<HTMLFormElement>(onCancel);

  useEffect(() => {
    document.getElementById("task-title-input-edit")?.focus();
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (title.trim()) onSave(title);
      }}
      className="space-y-2 rounded-md"
    >
      <TextArea
        id="task-title-input-edit"
        className="!bg-gray-50"
        size="sm"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (title.trim()) onSave(title);
          }
        }}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} size="sm">
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          variant="primary"
          disabled={!title.trim()}
        >
          Save
        </Button>
      </div>
    </form>
  );
};
