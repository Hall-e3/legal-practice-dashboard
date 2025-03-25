"use client";
import React from "react";
import {
  CaseSummaryWidget,
  RecentDocumentsWidget,
  TimeTrackingWidget,
} from "@/components";

import DashboardLayout from "@/components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import { capitalize } from "lodash";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { DashBoardType } from "@/types";

export default function Dashboard() {
  const { userInfo } = useAuth();

  const DashboardItem = ({
    icon,
    label,
    value,
    change,
    changeType,
  }: DashBoardType) => (
    <div className="rounded-lg bg-white p-5 drop-shadow-sm">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center space-x-3">
          <div className="border border-stroke rounded-md p-2">{icon}</div>
          <p className="text-sm text-gray_color">{label}</p>
        </div>
        <div className="flex items-center space-x-2 justify-between">
          <p className="font-semibold text-md">{value}</p>
          <div className="flex items-center space-x-2">
            <div className="bg-accent_coral/30 rounded-lg py-1 px-2">
              <div className="flex items-center space-x-0">
                {changeType === "positive" ? (
                  <ArrowUpIcon className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 text-red-500" />
                )}
                <p
                  className={`text-sm ${
                    changeType === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {change}%
                </p>
              </div>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              vs last month
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="h-full w-full flex flex-col space-y-10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-title-xsm font-medium text-black">
              Good morning,{" "}
              <span className="text-accent_coral font-semibold">
                {userInfo && capitalize(userInfo?.name ?? "")}!
              </span>
            </h3>
            <p className="text-gray_color text-[13px] sm:text-[15px] text-center sm:text-start">
              Welcome To the dashboard where you get visual analysis of legal
              practices.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardMetrics.map((item: DashBoardType) => (
            <DashboardItem key={item.label} {...item} />
          ))}
        </div> */}
          <CaseSummaryWidget />
          <TimeTrackingWidget />
          <div className="lg:col-span-3 md:col-span-2">
            <RecentDocumentsWidget />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
