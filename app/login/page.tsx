"use client";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="h-screen w-full">
      <div className="grid grid-cols-1 h-full w-full ">
        <div className="h-full w-full flex justify-center items-center sm:col-span-5 px-8 sm:px-0 sm:bg-back4">
          <div className="flex flex-col space-y-5 sm:space-y-8 sm:px-0 w-full sm:w-[60%] md:w-[50%] lg:[w-40%] xl:w-[40%] 2xl:w-[25%]">
            <div className="flex flex-col space-y-5">
              <div className="flex w-max gap-3 items-center">
                <h2 className={`text-title-md2 font-semibold text-grey_black`}>
                  Legal Practice
                </h2>
              </div>
              <div>
                <div>
                  <p className="text-title-xsm font-medium text-grey_black">
                    Welcome to your Dashboard
                  </p>
                </div>
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
