import Navbar from "../components/common/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
}