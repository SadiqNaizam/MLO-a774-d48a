import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ 
  children,
  pageTitle = "Leads Overview" // Default based on Project Info targetPage
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState<boolean>(false);

  const toggleMobileSidebar = React.useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  const closeMobileSidebar = React.useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  return (
    <div className={cn('min-h-screen bg-background flex flex-col md:flex-row')}>
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onCloseMobile={closeMobileSidebar} 
      />
      
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col flex-1 md:ml-64">
        <Header 
          pageTitle={pageTitle} 
          onToggleMobileSidebar={toggleMobileSidebar} 
        />
        <main 
          className={cn(
            'flex-grow pt-16 min-w-0 overflow-y-auto', // pt-16 for header height
            'p-6' // Inner padding for content area
            // 'min-h-[calc(100vh-4rem)]' was considered but flex-grow handles height better in flex context
          )}
        >
          {/* As per Layout Requirements mainContent.container: "flex flex-col gap-6" */}
          {/* This can be applied by the children or a wrapper within children if universally needed */}
          {/* For now, children are rendered directly. Add wrapper if needed: */}
          {/* <div className="flex flex-col gap-6">{children}</div> */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
