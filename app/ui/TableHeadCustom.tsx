import React, { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

type SortOrder = "asc" | "desc";

type Props = {
  headLabel: {
    id: string;
    label: string;
    align?: string;
  }[];
  onSort: (id: string, order: SortOrder) => void;
};

export default function TableHeadCustom({ headLabel, onSort }: Props) {
  const [sortConfig, setSortConfig] = useState<{
    id: string;
    order: SortOrder;
  } | null>(null);

  const handleSort = (id: string) => {
    let order: SortOrder = "asc";
    if (sortConfig?.id === id && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ id, order });
    onSort(id, order);
  };

  return (
    <thead>
      <tr>
        {headLabel.map((head) => (
          <th
            key={head.id}
            className={`font-semibold hover:bg-slate-300/30 px-1 py-2 text-${head.align} cursor-pointer`}
            onClick={() => handleSort(head.id)}
          >
            {sortConfig?.id === head.id &&
              (sortConfig.order === "asc" ? (
                <TiArrowSortedUp className="inline w-5 h-5" />
              ) : (
                <TiArrowSortedDown className="inline w-5 h-5" />
              ))}{" "}
            {head.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
