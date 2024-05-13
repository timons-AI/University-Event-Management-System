const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] bg-white">
      {children}
    </div>
  );
};

export default AuthLayout;
