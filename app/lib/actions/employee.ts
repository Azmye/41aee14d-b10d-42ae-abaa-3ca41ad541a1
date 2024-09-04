export async function fetchEmployees(query: string = "", page: string = "1") {
  try {
    const res = await fetch(
      `http://localhost:3000/employee?search=${query}&page=${page}`
    );

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch employees");
  }
}
