import { CircleIcon, CircleCheckBig } from "lucide-react";
import React from "react";

const colors = [
  "#007BFF", // Blue (Primary, professional)
  "#28A745", // Green (Success, completed tasks)
  "#DC3545", // Red (Urgent, blocked tasks)
  "#FFC107", // Yellow (Pending, in-progress)
  "#6F42C1", // Purple (Review, feedback)
  "#20C997", // Teal (Optional, backlog)
  "#FD7E14", // Orange (High priority, next up)
  "#6C757D", // Gray (Low priority, ideas)
];

type Props = {
  label: string;
  color: string;
  setColor: (value: string) => void;
};

export const ColorPicker = ({
  label,
  color: selectedColors,
  setColor,
}: Props) => {
  return (
    <div>
      {label && (
        <p className="mb-2 block text-sm font-medium leading-6 text-gray-900">
          {label}
        </p>
      )}

      <div className="flex gap-1">
        {colors.map((color, idx) => (
          <button
            type="button"
            key={idx}
            className="p-1 rounded"
            style={{ backgroundColor: color + "10" }}
            onClick={() => setColor(color)}
          >
            {selectedColors === color ? (
              <CircleCheckBig className="w-5 h-5" color={color} />
            ) : (
              <CircleIcon className="w-5 h-5" color={color} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
