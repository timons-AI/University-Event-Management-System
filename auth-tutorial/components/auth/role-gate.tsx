"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  role: UserRole;
}

export const RoleGate: React.FC<RoleGateProps> = ({ children, role }) => {
  const currentRole = useCurrentRole();

  if (currentRole !== role) {
    return (
      <FormError message="You do not have permission to view this content" />
    );
  }

  return <>{children}</>;
};
