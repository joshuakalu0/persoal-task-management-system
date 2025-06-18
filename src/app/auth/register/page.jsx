"use server";
import React from "react";
import RegisterPage from "../_components/registerForm";
import { getServerUser } from "@/lib/auth-check";

export default async function page() {
  const user = await getServerUser();

  if (!user) {
    redirect("/dashboard");
  }
  return <RegisterPage />;
}
