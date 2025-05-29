import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  FileStack,
  ShoppingBag,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Rocket // Placeholder for logo
} from 'lucide-react';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: '#', icon: LayoutGrid, label: 'Dashboard', isActive: true },
  { href: '#', icon: Users, label: 'Leads' },
  { href: '#', icon: UserCircle2, label: 'Customers' },
  { href: '#', icon: FileText, label: 'Proposals' },
  { href: '#', icon: FileStack, label: 'Invoices' },
  { href: '#', icon: ShoppingBag, label: 'Items' },
  { href: '#', icon: Mail, label: 'Mail' },
  { href: '#', icon: Archive, label: 'Shoebox' },
  { href: '#', icon: CalendarDays, label: 'Calendar' },
];

const secondaryNavItems: NavItem[] = [
  { href: '#', icon: HelpCircle, label: 'Help' },
  { href: '#', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  className?: string;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, isMobileOpen, onCloseMobile }) => {
  const handleNavItemClick = () => {
    if (isMobileOpen) {
      onCloseMobile();
    }
    // In a real app, you'd also navigate here
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 h-screen w-64 bg-sidebar text-secondary-foreground flex flex-col',
        'transition-transform duration-300 ease-in-out md:translate-x-0',
        isMobileOpen ? 'translate-x-0 z-40' : '-translate-x-full z-20 md:z-20',
        className
      )}
    >
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <Rocket className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-xl font-semibold text-foreground">LMD</h1>
      </div>
      <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={handleNavItemClick}
            className={cn(
              'flex items-center px-3 py-2.5 rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary cursor-pointer',
              item.isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-border space-y-1 shrink-0">
        {secondaryNavItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={handleNavItemClick}
            className={cn(
              'flex items-center px-3 py-2.5 rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary text-muted-foreground cursor-pointer'
            )}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.label}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
