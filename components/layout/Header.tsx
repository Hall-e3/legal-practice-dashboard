"use client";
import React, { useEffect, useState } from "react";
import { DropdownMenu, SearchInput } from "@/components";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import useAuth from "@/hooks/useAuth";
import { InputType } from "@/enums";

interface HeaderProps {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ showNav, setShowNav }: HeaderProps) {
  const [show, setShow] = useState<boolean>(false);
  const { userInfo } = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div
      className={`fixed w-full h-16 z-10 ${
        show ? "shadow-lg bg-white" : "shadow-sm"
      } transition-all duration-[400ms] border-b border-stroke ${
        showNav ? "pl-64" : ""
      }`}
    >
      <div className="w-full h-full flex items-center">
        <div className="flex-1 flex items-center space-x-4">
          <div className={`${!showNav && "pl-10"}`}>
            {!showNav && (
              <div
                onClick={() => setShowNav(!showNav)}
                className="cursor-pointer bg-accent_coral rounded-md p-1"
              >
                <ChevronRightIcon className="h-5 w-5 text-white cursor-pointer" />
              </div>
            )}
          </div>
          <div className="w-full px-5">
            <SearchInput
              type={InputType.text}
              value={""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e);
              }}
              styles="h-10 px-2 bg-neutral_light rounded-md w-full"
              inputStyles="bg-neutral_light"
              placeholder="Search"
              iconLeft={
                <div className="cursor-pointer flex items-center justify-center h-6 w-7 rounded-full hover:bg-accent_coral hover:text-white transition ease-out duration-300">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
              }
            />
          </div>
        </div>
        <div className="flex-none md:flex-1 flex items-center justify-end pr-4 md:pr-8">
          <div className="flex items-center space-x-3">
            <p className="text-grey_black font-bold text-[14px]">
              {userInfo?.name}
            </p>
            <DropdownMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
