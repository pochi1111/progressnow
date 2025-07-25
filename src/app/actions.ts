"use server";
import { auth } from "@/auth";

export async function createProject({ title }: { title: string }) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;
  if (!userId) {
    throw new Error("User ID not found in session");
  }
  const url = `http://${process.env.API_SERVER_URL}:8000/projects/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      project_name: title,
      admin_id: userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Error creating project");
  }

  return response.json();
}
