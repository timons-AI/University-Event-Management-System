import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  " rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        emerald: " bg-primary/10",
        success: " bg-emerald-100",
        yellow: " bg-yellow-100",
        purple: " bg-purple-100",
        rose: " bg-rose-100",
      },
      size: {
        default: " p-2",
        sm: " p-1",
      },
    },
    defaultVariants: {
      variant: "emerald",
      size: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      emerald: " text-primary",
      success: " text-emerald-700",
      yellow: " text-yellow-700",
      purple: " text-purple-700",
      rose: " text-rose-700",
    },
    size: {
      default: " h-8 w-8",
      sm: " h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "emerald",
    size: "default",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};
