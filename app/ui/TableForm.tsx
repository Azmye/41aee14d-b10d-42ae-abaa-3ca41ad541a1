"use client";

import React, { useEffect, useMemo, useState } from "react";
import TableInputRow from "./TableInputRow";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import TableHeadCustom from "./TableHeadCustom";
import TableActions from "./TableActions";
import { Employee } from "../interfaces/employee";
import TablePagination from "./TablePagination";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUpdateEmployees,
  CreateUpdateSchema,
  fetchEmployees,
} from "../lib/actions/employee";

const TABLE_HEAD = [
  { id: "firstName", label: "First Name", align: "left" },
  { id: "lastName", label: "Last Name", align: "left" },
  { id: "position", label: "Position", align: "left" },
  { id: "phone", label: "Phone", align: "left" },
  { id: "email", label: "Email", align: "left" },
];

export default function TableForm({
  initialData,
  searchParams,
}: {
  initialData: {
    data: Employee[];
    totalPages: number;
    size: number;
  };
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const [employees, setEmployees] = useState<Employee[]>(initialData.data);

  const defaultValues = useMemo<z.infer<typeof CreateUpdateSchema>>(
    () => ({
      employees: employees.map((item) => ({
        ...item,
      })),
    }),
    [employees]
  );

  const methods = useForm<z.infer<typeof CreateUpdateSchema>>({
    defaultValues,
    resolver: zodResolver(CreateUpdateSchema),
  });

  const { control, reset, handleSubmit } = methods;

  const refetch = async () => {
    try {
      const res = await fetchEmployees(
        searchParams?.search,
        searchParams?.page
      );
      setEmployees(res.data);
    } catch (err) {
      console.error("Error refetching employees:", err);
    }
  };

  useEffect(() => {
    refetch();
  }, [searchParams]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const { fields, prepend } = useFieldArray({
    control,
    name: "employees",
  });

  const handleAdd = () => {
    prepend({
      id: initialData.size + 1,
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

  const onSubmit = async (data: z.infer<typeof CreateUpdateSchema>) => {
    try {
      await createUpdateEmployees(data);
      refetch();
    } catch (err) {
      console.error("Error saving employees:", err);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <TableActions
          onAdd={handleAdd}
          onSave={handleSubmit(onSubmit)}
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
