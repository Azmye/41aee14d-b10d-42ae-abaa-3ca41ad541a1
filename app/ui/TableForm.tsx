"use client";

import React, { useEffect, useMemo, useState } from "react";
import TableInputRow from "./TableInputRow";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import TableHeadCustom from "./TableHeadCustom";
import TableActions from "./TableActions";
import { Employee } from "../interfaces/employee";
import TablePagination from "./TablePagination";

const TABLE_HEAD = [
  { id: "firstName", label: "First Name", align: "left" },
  { id: "lastName", label: "Last Name", align: "left" },
  { id: "position", label: "Position", align: "left" },
  { id: "phone", label: "Phone", align: "left" },
  { id: "email", label: "Email", align: "left" },
];

export default function TableForm({
  initialData,
}: {
  initialData: {
    data: Employee[];
    totalPages: number;
  };
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const [employees, setEmployees] = useState<Employee[]>(initialData.data);

  const defaultValues = useMemo(
    () => ({
      employees: employees.map((item) => ({
        ...item,
      })),
    }),
    [employees]
  );

  const methods = useForm({
    defaultValues,
  });

  const { control, reset, watch } = methods;

  useEffect(() => {
    setEmployees(initialData.data);
  }, [initialData.data]);

  useEffect(() => {
    reset(defaultValues);
  }, [employees]);

  const { fields, prepend } = useFieldArray({
    control,
    name: "employees",
  });

  const handleAdd = () => {
    prepend({
      firstName: "",
      lastName: "",
      position: "",
      phone: "",
      email: "",
    });
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        <TableActions
          onAdd={handleAdd}
          onSave={() => {}}
          onUndo={handleReset}
        />
        <table className="w-full border table-auto rounded-md bg-gray-300/30 mx-auto overflow-hidden">
          <TableHeadCustom headLabel={TABLE_HEAD} onSort={() => {}} />

          <tbody className="bg-white">
            {fields.map((item, index) => (
              <TableInputRow key={item.id} index={index} name="employees" />
            ))}
          </tbody>
        </table>
      </FormProvider>

      <div className="mt-4 flex justify-end">
        <TablePagination totalPages={initialData.totalPages} />
      </div>
    </>
  );
}
