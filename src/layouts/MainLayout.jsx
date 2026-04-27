import Navbar from "../components/common/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-appBg">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}