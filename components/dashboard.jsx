import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status, update } = useSession();

  console.log(session);

  if (status === "authenticated") {
    return (
      <div className="w-full container mx-auto mt-7" >
        <p>Welcome John</p>
      </div>
    );
  }

  return <a href="/api/auth/signin">Sign in</a>;
};

export default Dashboard;