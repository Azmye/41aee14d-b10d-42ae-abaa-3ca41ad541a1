import { Employee } from "@/app/interfaces/employee";
import React from "react";

export async function fetchEmployees() {
  try {
    const res = await fetch("http://localhost:3000/employee");

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch employees");
  }
}
