import { cookies } from "next/headers";

export async function POST() {
  try {
    // Clear the auth cookie
    cookies().delete("auth-token");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
