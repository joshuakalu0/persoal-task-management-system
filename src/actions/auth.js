"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import { cookies } from "next/headers";

export async function registerUser(data) {
  try {
    const { name, email, password } = data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function authenticate(prevState, formData) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
    return { success: true };
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid credentials" };
    }
    throw error;
  }
}
