import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";
interface InfoCardProps {
  numberOfItems: number;
  variant?: "success" | "yellow" | "purple" | "rose" | "emerald";
  label: string;
  icon: LucideIcon;
}
export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className=" border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className=" font-medium">{label}</p>
        <p
          className={`text-gray-500 text-sm rounded-full  px-2 py-1 bg-${variant}-100 `}
        >
          {numberOfItems}
          {/* {numberOfItems === 1 ? "Item" : "Items"} */}
        </p>
      </div>
    </div>
  );
};
