import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();

  if (!role || role !== "ADMIN") {
    return redirect("/dashboard");
  }

  return <>{children}</>;
};

export default AdminLayout;
