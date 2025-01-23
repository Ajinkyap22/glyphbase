import Header from "@/components/Header";
import List from "@/components/List";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex max-h-screen flex-1 flex-col gap-4 overflow-auto">
        <Header />

        <List />
      </div>
    </main>
  );
}
