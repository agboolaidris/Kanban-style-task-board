"use client";
import React from "react";
import { Button } from "./Button";
import { Keyboard, Plus, SlidersHorizontal } from "lucide-react";
import { Title } from "./Text";
import { useSetAtom } from "jotai";
import { columnModalAtom } from "src/lib/store";

export const Navbar = () => {
  const setColumnModal = useSetAtom(columnModalAtom);
  return (
    <div className="">
      <div className="py-2 wrapper">
        <Title>Task Management</Title>
      </div>
      <div className="h-px bg-gray-100" />
      <div className="py-2 wrapper flex gap-4 justify-end">
        <Button onClick={() => setColumnModal({ isOpen: true, type: "add" })}>
          <Plus className="w-5 h-5" />
          Column
        </Button>
        <Button>
          <SlidersHorizontal />
          Filter
        </Button>
        <Button>
          <Keyboard />
          Board
        </Button>
      </div>
      <div className="h-px bg-gray-100" />
    </div>
  );
};
