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

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchEmployees(query: string = "", page: string = "1") {
  try {
    const res = await fetch(
      `${baseUrl}/employee?search=${query}&page=${page}`,
      {
        cache: "no-store",
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

    const res = await fetch(`${baseUrl}/employee`, {
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
