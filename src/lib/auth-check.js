import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";
import { prisma } from "./prisma";

export async function getServerUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const { payload, expired } = verifyJWT(token);

    if (expired || !payload) {
      return null;
    }

    // Get fresh user data from database
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Auth check error:", error);
    return null;
  }
}
