import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className=" w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn(
          " text-2xl  text-center uppercase text-primary font-semibold",
          font.className
        )}
      >
        Institutional Student Event Manager
      </h1>
      <Image
        className="h-20 w-auto"
        src="/makere.jpg"
        width={40}
        height={40}
        alt="ISEM LOGO"
      />
      <p className=" text-red-500 text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
