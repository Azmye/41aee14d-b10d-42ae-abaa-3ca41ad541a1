import React from "react";
import { FaSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdUndo } from "react-icons/md";

type Props = {
  onAdd: () => void;
  onSave: () => void;
  onUndo: () => void;
};

export default function TableActions({ onAdd, onSave, onUndo }: Props) {
  return (
    <div className="flex justify-end mb-2 gap-2">
      <button onClick={onAdd} className="hover:bg-gray-300/30 p-2 rounded-md">
        <FaPlus className="w-5 h-5" />
      </button>
      <button onClick={onSave} className="hover:bg-gray-300/30 p-2 rounded-md">
        <FaSave className="w-5 h-5" />
      </button>
      <button onClick={onUndo} className="hover:bg-gray-300/30 p-2 rounded-md">
        <MdUndo className="w-5 h-5" />
      </button>
    </div>
  );
}
