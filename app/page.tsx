import React from "react";
import TableForm from "./ui/TableForm";
import { fetchEmployees } from "./lib/actions/employee";
import { Employee } from "./interfaces/employee";

export default async function Home() {
  const initialData: { data: Employee[] } = await fetchEmployees();

  return (
    <main className="mx-auto container w-full py-5">
      <TableForm initialData={initialData.data} />
    </main>
  );
}
