import { redirect } from "next/navigation";

export default async function DashboardPage() {
  redirect("/dashboard");
  return <div className="min-h-screen bg-background p-6"></div>;
}
