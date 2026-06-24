import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';

export function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar />
      <div className="flex flex-col flex-1 lg:ml-64 relative overflow-y-auto">
        {/* Main content area */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 mt-12 lg:mt-0">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
