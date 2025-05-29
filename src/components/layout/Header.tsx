import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Plus, ChevronDown } from 'lucide-react';

interface HeaderProps {
  className?: string;
  pageTitle: string;
  onToggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ className, pageTitle, onToggleMobileSidebar }) => {
  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-card text-card-foreground flex items-center justify-between px-6 border-b border-border',
        'left-0 md:left-64 z-10', // z-10 as per context TopHeader, sidebar can be z-20 (desktop) or z-40 (mobile open)
        className
      )}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onToggleMobileSidebar} className="md:hidden mr-4">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Create <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>New Lead</DropdownMenuItem>
          <DropdownMenuItem>New Contact</DropdownMenuItem>
          <DropdownMenuItem>New Proposal</DropdownMenuItem>
          <DropdownMenuItem>New Invoice</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
