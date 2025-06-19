"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { signJWT } from "@/lib/jwt";
import { redirect } from "next/navigation";

// Register User
export async function registerUser({ email, name, password }) {
  try {
    const cookie = await cookies();
    const hashedPassword = await bcrypt.hash(password, 10);

    // ccheck if user exit
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return {
        error: "user already exist",
      };
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = signJWT({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    cookie.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return redirect("/dashboard");
  } catch (error) {
    return { error: "An error occured" };
  }
}

// Login User
export async function loginUser({ email, password }) {
  try {
    const cookie = await cookies();
    console.log("here", email);
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });
    console.log(user);
    if (!user || !user.password) {
      return { error: "Invalid credentials" };
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { error: "Invalid credentials" };
    }

    const token = signJWT({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    console.log(token);

    cookie.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return redirect("/dashboard");
  } catch (error) {
    return { error: "An error occured" };
  }
}

// Get User by ID
async function getUserById(userId) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      projectsOwned: true,
      projectMembers: true,
      tasksAssigned: true,
    },
  });
}

// Get User by Email
async function getUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

// Update Profile
async function updateUserProfile(userId, data) {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
}

// Change Password
async function changePassword(userId, currentPassword, newPassword) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const isMatch = await bcrypt.compare(currentPassword, user.hashedPassword);
  if (!isMatch) throw new Error("Incorrect current password");
  const newHash = await bcrypt.hash(newPassword, 10);
  return await prisma.user.update({
    where: { id: userId },
    data: { hashedPassword: newHash },
  });
}

// Create Verification Token
async function createVerificationToken(email) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  return await prisma.verificationToken.create({
    data: { email, token, expiresAt },
  });
}

// Verify Email
async function verifyEmail(token) {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });
  if (!record || record.expiresAt < new Date())
    throw new Error("Token invalid/expired");
  await prisma.user.update({
    where: { email: record.email },
    data: { isVerified: true },
  });
  await prisma.verificationToken.delete({ where: { token } });
}

// Create Password Reset Token
async function createPasswordResetToken(email) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
  return await prisma.passwordResetToken.create({
    data: { email, token, expiresAt },
  });
}

// Reset Password
async function resetPassword(token, newPassword) {
  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
  });
  if (!record || record.expiresAt < new Date())
    throw new Error("Invalid or expired token");
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email: record.email },
    data: { hashedPassword },
  });
  await prisma.passwordResetToken.delete({ where: { token } });
}
