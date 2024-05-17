import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

const StudentLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();

  if (!role || role !== "STUDENT") {
    return redirect("/dashboard");
  }

  return <>{children}</>;
};

export default StudentLayout;
