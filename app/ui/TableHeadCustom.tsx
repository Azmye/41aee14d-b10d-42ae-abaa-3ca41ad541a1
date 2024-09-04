import React from "react";

type Props = {
  headLabel: {
    id: string;
    label: string;
    align?: string;
  }[];
};

export default function TableHeadCustom({ headLabel }: Props) {
  return (
    <thead>
      <tr>
        {headLabel.map((head) => (
          <th
            key={head.id}
            className={`font-semibold hover:bg-slate-300/30 px-1 py-2 text-${head.align}`}
          >
            {head.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
