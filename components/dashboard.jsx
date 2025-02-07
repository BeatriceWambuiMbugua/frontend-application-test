import { useSession } from "next-auth/react";
import Setup from "@/components/setup";
import SetupDisplay from "@/components/setup";

const Dashboard = () => {
  const { data: session, status, update } = useSession();

  console.log(session);

  if (status === "authenticated") {
    return (
      <div className="w-full container mx-auto mt-7" >
        <p> 🤗 Welcome {session.user.name}</p>
        <SetupDisplay/>
      </div>
    );
  }

  return <a href="/api/auth/signin">Sign in</a>;
};

export default Dashboard;