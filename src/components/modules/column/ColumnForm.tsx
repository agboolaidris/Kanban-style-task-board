"use client";

import React from "react";
import { Input } from "@ui/Input";
import { TextArea } from "@ui/TextArea";
import { ColorPicker } from "@ui/ColorPicker";
import { Controller, UseFormReturn } from "react-hook-form";
import { CreateColumnBody } from "src/types/column";
import { Button } from "@ui/Button";

/**
 * ColumnForm component renders a form for creating or editing a column.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.methods - The methods provided by react-hook-form.
 * @param {Function} props.onSubmit - The function to call when the form is submitted.
 * @param {Function} props.onCancel - The function to call when the cancel button is clicked.
 *
 * @returns {JSX.Element} The rendered ColumnForm component.
 */

type ColumnFormProps = {
  methods: UseFormReturn<CreateColumnBody>;
  onSubmit: () => void;
  onCancel: () => void;
};

export const ColumnForm = ({
  methods,
  onSubmit,
  onCancel,
}: ColumnFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  return (
    <form className="space-y-4 px-4 py-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Label"
        size="sm"
        {...register("label")}
        error={errors.label?.message}
      />
      <Controller
        control={control}
        name="color"
        render={({ field: { value, onChange } }) => (
          <ColorPicker color={value} setColor={onChange} label="Color" />
        )}
      />
      <TextArea
        label="Description"
        {...register("description")}
        error={errors.description?.message}
      />
      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  );
};
