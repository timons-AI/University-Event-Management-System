import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-full">
      <div className=" h-[50px] inset-y-0 w-full fixed  z-50">
        <Navbar />
      </div>

      <main className="  pt-[50px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
