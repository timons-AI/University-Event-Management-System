import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { currentRole } from "@/lib/auth";
import { Poppins } from "next/font/google";
import { RoleGate } from "@/components/auth/role-gate";
import { redirect } from "next/navigation";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default async function Home() {
  const role = await currentRole();
  if (role === "ADMIN") {
    redirect("/admin/dashboard");
  }
  if (role === "STUDENT") {
    redirect("/student/dashboard");
  }
  if (role === "LEADER") {
    redirect("/leader/dashboard");
  }

  if (role)
    return (
      <main className=" flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <div className=" space-y-6 text-center">
          <h1
            className={cn(
              " text-6xl font-semibold text-white drop-shadow-md",
              font.className
            )}
          >
            🔐 Current role is <p className=" text-4xl">{role}</p>
          </h1>
          <p className=" text-white text-lg">
            This page is public and does not require authentication.
          </p>
          <RoleGate role="ADMIN">
            <p className=" text-white text-lg">
              This content is only visible to admins.
            </p>
          </RoleGate>
          <div>
            <LoginButton>
              <Button variant="secondary">Sign in</Button>
            </LoginButton>
          </div>
        </div>
      </main>
    );
}
