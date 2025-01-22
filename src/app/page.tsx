import Header from "@/components/Header";
import List from "@/components/List";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pb-6 flex flex-col gap-4 max-h-screen overflow-auto">
        <Header />

        <List />
      </div>
    </main>
  );
}
