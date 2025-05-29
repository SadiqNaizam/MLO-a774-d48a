import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarClock, ChevronDown } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');
  const [selectedFilter, setSelectedFilter] = React.useState<string>('Last 6 months');

  const filterOptions = [
    'Last 7 days',
    'Last 30 days',
    'Last 6 months',
    'Last 12 months',
    'All time',
  ] as const;

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4', className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto bg-muted">
          <TabsTrigger value="sales" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">
            Sales
          </TabsTrigger>
          <TabsTrigger value="leads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">
            Leads
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto min-w-[180px] justify-start text-left font-normal">
            <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="flex-grow">{selectedFilter}</span>
            <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          {filterOptions.map((option) => (
            <DropdownMenuItem key={option} onClick={() => setSelectedFilter(option)}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PageHeader;
