import dynamic from "next/dynamic";
import { Loader } from "lucide-react";

const NoSSR = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
  loading: () => <Loader size="lg" className=" animate-spin" />,
});
