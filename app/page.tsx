import React from "react";
import TableForm from "./ui/TableForm";
import { fetchEmployees } from "./lib/actions/employee";
import { Employee } from "./interfaces/employee";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const initialData: { data: Employee[]; totalPages: number; size: number } =
    await fetchEmployees();

  return (
    <main className="mx-auto container w-full py-5">
      <TableForm searchParams={searchParams} initialData={initialData} />
    </main>
  );
}
