import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";
import SliderImage from "../carosel";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image
                className="h-10 w-auto"
                src="/logo.jpg"
                width={40}
                height={40}
                alt="ISEM LOGO"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Not a member?{" "}
                <a
                  href="/auth/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Click here to register
                </a>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden w-0 flex-1 lg:block">
          <SliderImage />
        </div>
      </div>
    </>
  );
}
