import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  index: number;
};

export default function TableInputRow({ name, index }: Props) {
  const { control, getFieldState, formState } = useFormContext();

  const fieldState = (prop: string) =>
    getFieldState(`${name}.${index}.${prop}`, formState);

  return (
    <tr className="hover:bg-gray-100/30">
      <td
        className={`group border-b-2 focus-within:border-b-2 focus-within:border-b-blue-500 ${
          fieldState("firstName").isTouched &&
          fieldState("firstName").isDirty &&
          "bg-green-300/30"
        }`}
      >
        <Controller
          name={`${name}.${index}.firstName`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full bg-transparent outline-none px-1 py-2"
            />
          )}
        />
      </td>
      <td
        className={`group border-b-2 focus-within:border-b-2 focus-within:border-b-blue-500 ${
          fieldState("lastName").isTouched &&
          fieldState("lastName").isDirty &&
          "bg-green-300/30"
        }`}
      >
        <Controller
          name={`${name}.${index}.lastName`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full bg-transparent outline-none px-1 py-2"
            />
          )}
        />
      </td>
      <td
        className={`group border-b-2 focus-within:border-b-2 focus-within:border-b-blue-500 ${
          fieldState("position").isTouched &&
          fieldState("position").isDirty &&
          "bg-green-300/30"
        }`}
      >
        <Controller
          name={`${name}.${index}.position`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full bg-transparent outline-none px-1 py-2"
            />
          )}
        />
      </td>
      <td
        className={`group border-b-2 focus-within:border-b-2 focus-within:border-b-blue-500 ${
          fieldState("phone").isTouched &&
          fieldState("phone").isDirty &&
          "bg-green-300/30"
        }`}
      >
        <Controller
          name={`${name}.${index}.phone`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full bg-transparent outline-none px-1 py-2"
            />
          )}
        />
      </td>
      <td
        className={`group border-b-2 focus-within:border-b-2 focus-within:border-b-blue-500 ${
          fieldState("email").isTouched &&
          fieldState("email").isDirty &&
          "bg-green-300/30"
        }`}
      >
        <Controller
          name={`${name}.${index}.email`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full bg-transparent outline-none px-1 py-2"
            />
          )}
        />
      </td>
    </tr>
  );
}
