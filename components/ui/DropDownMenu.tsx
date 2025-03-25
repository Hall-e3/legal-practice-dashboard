"use client";
import { useEffect, useRef } from "react";
import Button from "./Button";
import { PowerIcon, UserIcon } from "@heroicons/react/24/solid";

import { twMerge } from "tailwind-merge";
import useApp from "@/hooks/useApp";
import useAuth from "@/hooks/useAuth";
import { UserRole } from "@/enums";

const DropdownMenu = () => {
  const trigger = useRef<HTMLDivElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);
  const { dropDown, toggleDropDown } = useApp();
  const { userInfo, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent): void => {
      if (!dropdown.current) return;
      if (
        !dropDown ||
        (dropdown.current as HTMLElement).contains(target as Node) ||
        (trigger.current &&
          (trigger.current as HTMLElement).contains(target as Node))
      )
        return;
      toggleDropDown(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropDown, toggleDropDown]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent): void => {
      if (!dropDown || keyCode !== 27) return;
      toggleDropDown(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropDown, toggleDropDown]);

  const dropDownStyles = twMerge(
    "absolute z-999 right-2 mt-4 flex w-62.5 cursor-pointer ",
    "flex-col rounded-lg border border-stroke bg-white shadow-default",
    dropDown
      ? "visible transform scale-100  ease-in duration-100 opacity-100"
      : "invisible transform scale-95  ease-out duration-100 opacity-0"
  );

  return (
    <div>
      <div
        ref={trigger}
        onClick={() => toggleDropDown(!dropDown)}
        className="cursor-pointer flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-itemhover hover:text-accent_coral  transition ease-out duration-300"
      >
        {userInfo?.name.charAt(0)}
      </div>

      <div ref={dropdown} className={dropDownStyles}>
        <div
          onClick={() => {
            toggleDropDown(false);
          }}
          className="hover:bg-LIGHT_GREY flex items-center px-4 py-3 text-sm font-medium duration-300 ease-in-out lg:text-base"
        >
          <div className="mb-4">
            <UserIcon className="w-4 h-4 text-primary_color" />
          </div>
          <div className="flex flex-col mx-3">
            <div>
              <h3 className="text-grey_black font-bold text-[14px]">
                Account Profile
              </h3>
            </div>
            <div>
              <p className="text-[14px] font-light">
                Signed as{" "}
                <span className="text-accent_coral">{userInfo?.name}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-stroke" />
        {userInfo?.role === UserRole.admin && (
          <>
            <div className="block px-4 py-3 text-[14px] text-gray-700 hover:bg-itemhover">
              Reports
            </div>
            <div className="border-t border-stroke" />
            <div className="block px-4 py-3 text-[14px] text-gray-700 hover:bg-itemhover">
              Settings
            </div>
            <div className="border-t border-stroke" />
          </>
        )}
        <Button
          onClick={handleLogout}
          icon={<PowerIcon className="w-5 h-5" />}
          text="Log out"
          buttonStyle="hover:bg-itemhover flex items-center py-3 px-6 text-sm font-medium duration-300 ease-in-out lg:text-[15px]"
        />
      </div>
    </div>
  );
};

export default DropdownMenu;
