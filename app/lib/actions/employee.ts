import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export const CreateUpdateSchema = z.object({
  employees: z.array(
    z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      position: z.string(),
      phone: z.string(),
      email: z.string(),
    })
  ),
});

export async function fetchEmployees(query: string = "", page: string = "1") {
  try {
    const res = await fetch(
      `http://localhost:3000/employee?search=${query}&page=${page}`,
      {
        cache: "no-store",
        // next: { tags: ["employees"] },
      }
    );

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch employees");
  }
}

export async function createUpdateEmployees(
  params: z.infer<typeof CreateUpdateSchema>
) {
  try {
    const payload = params;

    const res = await fetch("http://localhost:3000/employee", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to save employees");
    }

    // revalidateTag("employees");
  } catch (err) {
    console.error("Error saving employees:", err);
    throw new Error(`Failed to save employees`);
  }
}
