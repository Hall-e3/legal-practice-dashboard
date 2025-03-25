"use client";
import React, { useEffect } from "react";
import { RecentDocumentsWidget, TimeTrackingWidget } from "@/components";

import DashboardLayout from "@/components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import { capitalize } from "lodash";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BriefcaseIcon,
  ClockIcon,
  DocumentTextIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { DashBoardType } from "@/types";
import useCase from "@/hooks/useCase";
import useDocument from "@/hooks/useDocument";
import useTime from "@/hooks/useTime";

export default function Dashboard() {
  const { userInfo } = useAuth();
  const { getDocuments } = useDocument();
  const { getTimeTracking, timeEntries, isLoading: timeLoading } = useTime();
  const {
    getCaseSummary,
    summary: caseSummary,
    isLoading: casesLoading,
  } = useCase();

  const totalBillableHours =
    timeEntries?.reduce(
      (total, entry) => total + (entry.billable ? entry.hours : 0),
      0
    ) || 0;

  useEffect(() => {
    getCaseSummary();
    getDocuments();
    getTimeTracking();
  }, [getCaseSummary, getDocuments, getTimeTracking]);

  const getDashboardMetrics = () => {
    return [
      {
        icon: <BriefcaseIcon className="h-5 w-5 text-blue-600" />,
        label: "Active Cases",
        value: caseSummary?.active ?? 0,
        change: caseSummary?.trend ?? 0,
        changeType: (caseSummary?.trend || 0) >= 0 ? "positive" : "negative",
        isLoading: casesLoading,
      },
      {
        icon: <ScaleIcon className="h-5 w-5 text-yellow-600" />,
        label: "Pending Cases",
        value: caseSummary?.pending ?? 0,
        change: 5,
        changeType: (caseSummary?.trend || 0) >= 0 ? "positive" : "negative",
        isLoading: casesLoading,
      },
      {
        icon: <DocumentTextIcon className="h-5 w-5 text-green-600" />,
        label: "Closed Cases",
        value: caseSummary?.closed ?? 0,
        change: 12,
        changeType: (caseSummary?.trend || 0) >= 0 ? "positive" : "negative",
        isLoading: casesLoading,
      },
      {
        icon: <ClockIcon className="h-5 w-5 text-purple-600" />,
        label: "Billable Hours",
        value: totalBillableHours,
        change: 8,
        changeType: "positive",
        isLoading: timeLoading,
      },
    ];
  };

  const DashboardItem = ({
    icon,
    label,
    value,
    change,
    changeType,
    isLoading,
  }: DashBoardType & { isLoading?: boolean }) => (
    <div className="rounded-lg bg-white p-5 drop-shadow-sm">
      {isLoading ? (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 h-10 w-10 rounded-md"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="border border-stroke rounded-md p-2">{icon}</div>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">{value}</p>
            <div className="flex items-center space-x-2">
              <div
                className={`rounded-lg py-1 px-2 ${
                  changeType === "positive"
                    ? "bg-green-100"
                    : changeType === "neutral"
                    ? "bg-gray-100"
                    : "bg-red-100"
                }`}
              >
                <div className="flex items-center space-x-1">
                  {changeType === "positive" ? (
                    <ArrowUpIcon className="w-3 h-3 text-green-500" />
                  ) : changeType === "negative" ? (
                    <ArrowDownIcon className="w-3 h-3 text-red-500" />
                  ) : null}
                  <p
                    className={`text-sm ${
                      changeType === "positive"
                        ? "text-green-500"
                        : changeType === "neutral"
                        ? "text-gray-500"
                        : "text-red-500"
                    }`}
                  >
                    {change}%
                  </p>
                </div>
              </div>
              <span className="text-gray-500 text-sm whitespace-nowrap">
                vs last month
              </span>
            </div>
          </div>
        </div>
      )}
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
              Welcome to your legal practice dashboard where you can monitor
              case status and performance.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getDashboardMetrics().map((item) => (
            <DashboardItem key={`${item.label}`} {...item} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TimeTrackingWidget />
          <div className="">
            <RecentDocumentsWidget />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
