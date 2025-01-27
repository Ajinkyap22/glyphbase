"use client";

import { Suspense } from "react";

import Header from "@/components/Header";
import List from "@/components/List";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background">
      <Suspense fallback={<Loader />}>
        <Sidebar />
        <div className="flex max-h-screen flex-1 flex-col gap-4 overflow-auto">
          <Header />

          <List />
        </div>
      </Suspense>
    </main>
  );
}
