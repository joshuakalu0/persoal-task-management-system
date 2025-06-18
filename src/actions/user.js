"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Register User
export async function registerUser({ email, name, fullName, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  // ccheck if user exit
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return {
      error: "user already exist",
    };
  }
  return await prisma.user.create({
    data: {
      email,
      name,
      fullName: name,
      hashedPassword,
    },
  });
}

// Login User
export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");
  const isValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isValid) throw new Error("Invalid credentials");
  return user;
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
