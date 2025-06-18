"use server";
import React from "react";
import LoginPage from "../_components/LoginFom";
import { getServerUser } from "@/lib/auth-check";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getServerUser();

  if (user) {
    redirect("/dashboard");
  }
  return <LoginPage />;
}
