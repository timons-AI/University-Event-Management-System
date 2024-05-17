import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();
  if (!role) {
    redirect("/auth/login");
  }
  return (
    <div className=" h-full">
      <div className=" h-[50px] inset-y-0 w-full fixed  z-50">
        <Navbar />
      </div>
      <div className=" hidden md:flex mt-[50px] h-full w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className=" md:pl-64 pt-[50px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
