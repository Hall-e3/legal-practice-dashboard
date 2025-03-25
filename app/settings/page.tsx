"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Settings() {
  const router = useRouter();
  const { userInfo } = useAuth();
  useEffect(() => {
    if (userInfo && userInfo.role !== "admin") {
      router.push("/dashboard");
    }
  }, [userInfo, router]);
  if (!userInfo || userInfo.role !== "admin") {
    return null;
  }
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">System Settings</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Admin-only settings page.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="border rounded p-4">
              <h2 className="font-bold mb-2">User Management</h2>
              <p className="text-sm text-gray-600">
                Manage user accounts and permissions.
              </p>
            </div>

            <div className="border rounded p-4">
              <h2 className="font-bold mb-2">System Configuration</h2>
              <p className="text-sm text-gray-600">
                Configure system-wide settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
