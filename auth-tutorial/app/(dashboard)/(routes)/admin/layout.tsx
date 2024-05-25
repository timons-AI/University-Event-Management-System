import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();
  if (role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
};

export default AdminLayout;
