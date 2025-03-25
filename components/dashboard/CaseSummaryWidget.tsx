"use client";
import React, { useEffect } from "react";
import { Card, Spinner } from "@/components";
import useCase from "@/hooks/useCase";

export default function CaseSummaryWidget() {
  const { summary, getCases, isLoading } = useCase();

  useEffect(() => {
    getCases();
  }, [getCases]);

  if (isLoading)
    return (
      <Card title="Case Summary">
        <div className="flex justify-center items-center h-full">
          <Spinner styles="h-4 w-4 border-2 border-primary_color" />
        </div>
      </Card>
    );
  return (
    <Card title="Case Summary">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-600">
            {summary?.active || 0}
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">
            Active Cases
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {summary?.pending || 0}
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">
            Pending Cases
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600">
            {summary?.closed || 0}
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">
            Closed Cases
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            30-day comparison
          </span>
          <span
            className={`text-sm font-medium ${
              summary?.trend && summary.trend > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {summary?.trend && summary.trend > 0 ? "+" : ""}
            {summary?.trend || 0}%
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              summary?.trend && summary.trend > 0
                ? "bg-green-500"
                : "bg-red-500"
            }`}
            style={{ width: `${Math.abs(summary?.trend || 0)}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
}
