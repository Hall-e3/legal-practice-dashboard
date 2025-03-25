// components/layout/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeftIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  RectangleGroupIcon,
  ClockIcon,
  DocumentIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import useAuth from "@/hooks/useAuth";
import { SidebarConfig, SidebarProps } from "@/types";
import { twMerge } from "tailwind-merge";

const Sidebar = ({ setShowNav, showNav }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userInfo, signOut } = useAuth();

  const sidebarData: SidebarConfig = {
    title: "LegalTech Practice Dashboard",
    listOne: [
      {
        title: "Dashboard",
        items: [
          {
            id: 1,
            icon: <RectangleGroupIcon className="h-5 w-5" />,
            subtitle: "Dashboard",
            link: "/dashboard",
          },
          {
            id: 2,
            icon: <BriefcaseIcon className="h-5 w-5" />,
            subtitle: "Cases",
            link: "/cases",
          },
          {
            id: 3,
            icon: <DocumentIcon className="h-5 w-5" />,
            subtitle: "Documents",
            link: "/documents",
          },
          {
            id: 4,
            icon: <ClockIcon className="h-5 w-5" />,
            subtitle: "Time Tracking",
            link: "/timeTracking",
          },
          ...(userInfo?.role === "admin"
            ? [
                {
                  id: 5,
                  icon: <ChartBarIcon className="h-5 w-5" />,
                  subtitle: "Reports",
                  link: "/reports",
                },
                {
                  id: 6,
                  icon: <Cog6ToothIcon className="h-5 w-5" />,
                  subtitle: "Settings",
                  link: "/settings",
                },
              ]
            : []),
        ],
      },
    ],
  };

  const isActiveRoute = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && setShowNav) {
      setShowNav(false);
    }
  };

  const handleLogout = async () => {
    signOut();
    router.push("/login");
  };

  return (
    <div className="h-full w-full flex-shrink-0 flex flex-col justify-between py-4 transition border-r border-stroke relative bg-gray-800 text-white">
      {sidebarData && (
        <div className="flex-1 flex flex-col space-y-5">
          <div className="flex lg:space-x-2 items-center pl-3 lg:flex-col 2xl:flex-row">
            <Link href="/dashboard">
              <h1 className="text-xl font-semibold text-white text-center">
                {sidebarData.title}
              </h1>
            </Link>
          </div>

          <nav className="w-full h-full flex flex-col items-start justify-between overflow-y-auto duration-300 ease-linear">
            <div className="w-full flex flex-col space-y-6">
              {sidebarData.listOne?.map((section, sectionIndex) => (
                <div
                  className="w-full flex flex-col"
                  key={`section-${sectionIndex}-${section.title}`}
                >
                  <div className="px-4 py-2">
                    <p className="text-[15.5px] font-medium text-gray-400">
                      {section.title}
                    </p>
                  </div>
                  <div className="px-2 w-full flex flex-col cursor-pointer space-y-1 transition duration-300">
                    {section.items.map((item) => (
                      <Link
                        href={item.link}
                        key={`item-${item.id}-${item.link}`}
                        onClick={handleLinkClick}
                        className={twMerge(
                          "flex space-x-4 items-center px-4 py-2.5 rounded-md transition-colors duration-200",
                          isActiveRoute(item.link)
                            ? "bg-accent_coral text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        )}
                      >
                        <div className="text-current">{item.icon}</div>
                        <h4 className="text-[14px] duration-300 ease-in-out">
                          {item.subtitle}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full pb-10">
              <div
                onClick={handleLogout}
                className="flex items-center space-x-3 hover:bg-neutral_light px-10 py-2.5 cursor-pointer"
              >
                <p className="text-[15.5px] font-medium">Logout</p>
                <ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-accent_coral" />
              </div>
            </div>
          </nav>
        </div>
      )}

      <div
        onClick={() => setShowNav?.(!showNav)}
        className="absolute bottom-40 right-0 ring-1 ring-accent_coral shadow-lg p-2 rounded-tl-full rounded-bl-full cursor-pointer"
      >
        <ChevronLeftIcon className="h-6 w-6 cursor-pointer text-accent_coral" />
      </div>
      <div className="flex flex-col space-y-1 text-gray-400 text-sm px-4 pt-4 border-t border-gray-700">
        <p className="text-center text-md">Legal Practice Management</p>
        <p className="text-center text-[14px]">© 2025 LegalTech</p>
      </div>
    </div>
  );
};

export default Sidebar;
