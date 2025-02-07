"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";
import Dashboard from "@/components/dashboard";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  // If the user is logged in, display the dashboard page
  if (session) {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }

  // While redirecting, show a loading state
  return <Loading />;
}