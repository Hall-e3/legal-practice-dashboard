"use client";
import useTime from "@/hooks/useTime";
import React, { useEffect } from "react";
import { Card, Spinner } from "@/components";

export default function TimeTrackingWidget() {
  const { timeEntries, getTimeTracking, isLoading } = useTime();
  useEffect(() => {
    getTimeTracking();
  }, [getTimeTracking]);

  if (isLoading)
    return (
      <Card title="Recent Documents">
        <Spinner styles="h-4 w-4 border-2" />
      </Card>
    );

  const attorneyTotals = timeEntries.reduce((acc, entry) => {
    acc[entry.attorney] = (acc[entry.attorney] || 0) + entry.hours;
    return acc;
  }, {} as Record<string, number>);

  const sortedAttorneys = Object.keys(attorneyTotals).sort(
    (a, b) => attorneyTotals[b] - attorneyTotals[a]
  );

  const totalHours = Object.values(attorneyTotals).reduce(
    (sum, hours) => sum + hours,
    0
  );
  return (
    <Card title="Time Tracking">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500">
          Billable Hours by Attorney
        </h3>
        <p className="text-2xl font-bold text-gray-800">
          {totalHours.toFixed(1)} hours
        </p>
      </div>

      <div className="space-y-4">
        {sortedAttorneys.map((attorney) => {
          const hours = attorneyTotals[attorney];
          const percentage = (hours / totalHours) * 100;

          return (
            <div key={attorney}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {attorney}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {hours.toFixed(1)} hrs ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
