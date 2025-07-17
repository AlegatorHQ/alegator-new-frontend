import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal dashboard",
  openGraph: {
    title: "Dashboard | Alegator",
    description: "Access your personal dashboard on Alegator",
  },
};

export default async function Dashboard() {
  "use server";
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  const handleSignOut = async () => {
    "use server";
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (!error) {
      redirect("/login");
    } else {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <p className="text-center">Welcome, {user.email}!</p>
        <form action={handleSignOut}>
          <Button type="submit" className="w-full" variant="destructive">
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}
