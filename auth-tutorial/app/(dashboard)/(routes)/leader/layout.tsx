import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

const LeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();

  if (!role || role !== "LEADER") {
    return redirect("/dashboard");
  }

  return <>{children}</>;
};

export default LeaderLayout;
