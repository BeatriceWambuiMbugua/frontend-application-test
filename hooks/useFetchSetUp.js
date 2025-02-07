"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function useFetchSetup() {
  const { data: session } = useSession();
  const [setupData, setSetupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSetup = async () => {
      if (!session?.accessToken) {
        setError("No access token found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://app.axis.africa/api/setup", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch setup data");

        const data = await res.json();
        setSetupData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSetup();
  }, [session]);

  return { setupData, loading, error };
}
