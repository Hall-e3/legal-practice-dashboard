import React from "react";
import {
  RectangleGroupIcon,
  ClockIcon,
  DocumentIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

interface SidebarItem {
  id: number;
  icon: React.ReactNode;
  subtitle: string;
  link: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarConfig {
  title: string;
  listOne: SidebarSection[];
}

export const sidebarData: SidebarConfig = {
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
          subtitle: "TimeTracking",
          link: "/timeTracking",
        },
      ],
    },
  ],
};
