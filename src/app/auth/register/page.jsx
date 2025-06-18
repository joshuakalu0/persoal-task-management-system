import React from "react";
import RegisterPage from "../_components/registerForm";

export default async function page() {
  const user = await getServerUser();

  if (!user) {
    redirect("/dashboard");
  }
  return <RegisterPage />;
}
