"use client";
import useAuth from "@/hooks/useAuth";
import Dashboard from "./dashboard/page";
import Login from "./login/page";
import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const { navigation, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.push("/dashboard");
    } else {
      navigation.push("/login");
    }
  }, [isAuthenticated, navigation]);
  return (
    <div>
      <Head>
        <title>Legal Practice Management</title>
      </Head>
      <main className="h-full w-full overflow-x-hidden flex flex-col">
        <Dashboard />
        <Login />
      </main>
    </div>
  );
}
