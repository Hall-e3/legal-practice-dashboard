// components/layout/DashboardLayout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useAuth from "@/hooks/useAuth";
import { twMerge } from "tailwind-merge";

interface WindowWithInnerWidth extends Window {
  innerWidth: number;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showNav, setShowNav] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();
  const { isAuthenticated, userInfo, isLoading, checkIsAuthenticated } =
    useAuth();

  function handleSize() {
    if (typeof window !== "undefined") {
      const { innerWidth } = window as WindowWithInnerWidth;
      if (innerWidth <= 640) {
        setShowNav(false);
        setIsMobile(true);
      } else {
        setShowNav(true);
        setIsMobile(false);
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleSize();
      window.addEventListener("resize", handleSize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleSize);
      }
    };
  }, []);

  useEffect(() => {
    const checkUserAuth = async () => {
      checkIsAuthenticated();
      if (!isAuthenticated && !isLoading) {
        router.push("/login");
      }
    };

    checkUserAuth();
  }, [checkIsAuthenticated, isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !userInfo) {
    return null;
  }

  const mainStyles = twMerge(
    "h-full w-full  transition-all duration-[400ms] duration mx-auto bg-neutral_light overflow-x-hidden",
    showNav && !isMobile && "pl-64"
  );

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div
        className={`fixed w-64 h-full bg-primary_color z-20 shadow-lg transform transition-transform duration-300 ease-in-out ${
          showNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar setShowNav={setShowNav} showNav={showNav} />
      </div>

      {isMobile && showNav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ease-in-out"
          onClick={() => setShowNav(false)}
        />
      )}

      <div className="h-full w-full flex flex-col space-y-16">
        <Header showNav={showNav} setShowNav={setShowNav} />
        <main className={mainStyles}>
          <div className="h-full w-full p-8 py lg:px-12 xl:m-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
