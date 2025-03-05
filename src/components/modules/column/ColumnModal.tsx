"use client";

import React from "react";
import { Modal } from "@ui/Modal";
import { BodyText } from "@ui/Text";
import { Button } from "@ui/Button";
import { X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { CreateColumnBody } from "src/types/column";
import { useColumns } from "src/hooks/useColumns";
import { useAtom } from "jotai";
import { columnModalAtom } from "src/lib/store";
import { ColumnForm } from "./ColumnForm";

/**
 * ColumnModal component renders a modal for creating or editing a column.
 * It uses the `useAtom` hook to manage the modal state and the `useColumns` hook
 * to handle adding and updating columns.
 *
 * @returns {JSX.Element} The rendered ColumnModal component.
 *
 * @component
 * @example
 * // Usage example:
 * <ColumnModal />
 *
 * @remarks
 * The modal form is managed using `react-hook-form` with validation provided by `yup`.
 * The form fields are pre-filled with the column data if available.
 *
 * @function
 * @name ColumnModal
 */

const schema = Yup.object({
  label: Yup.string().required("Label is required"),
  color: Yup.string().required("Color is required"),
  description: Yup.string(),
});

export const ColumnModal = () => {
  const [{ isOpen, type, column }, setModalState] = useAtom(columnModalAtom);
  const { addColumn, updateColumn } = useColumns();

  const closeModal = () => setModalState({ isOpen: false });

  const methods = useForm<CreateColumnBody>({
    resolver: yupResolver(schema),
    values: {
      color: column?.color ?? "#007BFF",
      label: column?.label ?? "",
      description: column?.description ?? "",
    },
  });

  const onSubmit = (payload: CreateColumnBody) => {
    if (type === "edit" && column) {
      updateColumn(column.id, payload);
    } else {
      addColumn(payload);
    }
    methods.reset();
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="!w-82 !p-0 border border-gray-300"
    >
      <div className="flex justify-between p-4 items-center">
        <BodyText className="!font-bold">
          {type === "edit" ? "Edit Column" : "New Column"}
        </BodyText>
        <Button size="icon" className="!border-0" onClick={closeModal}>
          <X />
        </Button>
      </div>
      <div className="h-px bg-gray-100" />
      <ColumnForm
        methods={methods}
        onSubmit={() => onSubmit(methods.getValues())}
        onCancel={closeModal}
      />
    </Modal>
  );
};
