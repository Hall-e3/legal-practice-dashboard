import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";

export default function Cases() {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Cases Management</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p>
            Cases content goes here. This page will list all cases and provide
            management options.
          </p>

          <div className="mt-4 text-gray-500">
            This page would typically include:
            <ul className="list-disc pl-5 mt-2">
              <li>Case search and filtering</li>
              <li>Case status management</li>
              <li>Case details and client information</li>
              <li>Associated documents and time entries</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
