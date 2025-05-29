import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CalendarClock, ChevronDown } from 'lucide-react';

interface TrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const trackingData: TrackingDataPoint[] = [
  { month: 'Jan', closedWon: 65, closedLost: 40 },
  { month: 'Feb', closedWon: 59, closedLost: 48 },
  { month: 'March', closedWon: 80, closedLost: 62 }, 
  { month: 'April', closedWon: 31, closedLost: 28 },
  { month: 'May', closedWon: 56, closedLost: 90 },
  { month: 'June', closedWon: 75, closedLost: 10 }, 
  { month: 'July', closedWon: 60, closedLost: 42 },
  { month: 'August', closedWon: 95, closedLost: 30 }, 
];

interface LeadTrackingChartProps {
  className?: string;
}

const LeadTrackingChart: React.FC<LeadTrackingChartProps> = ({ className }) => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('Last 6 months');
  const filterOptions = ['Last 30 days', 'Last 6 months', 'Last 12 months', 'Year to date'] as const;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
            <div className="flex items-baseline space-x-6 mt-1">
              <div>
                <span className="text-3xl font-bold text-foreground">680</span>
                <span className="text-sm text-muted-foreground ml-1">total closed</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-foreground">70</span>
                <span className="text-sm text-muted-foreground ml-1">total lost</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="mt-2 sm:mt-0 text-muted-foreground">
                {selectedFilter} <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {filterOptions.map(option => (
                <DropdownMenuItem key={option} onClick={() => setSelectedFilter(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              dy={10}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              dx={-5}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}
              itemStyle={{ color: 'hsl(var(--card-foreground))' }}
              labelStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))' }}
              cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              formatter={(value) => <span className="text-muted-foreground text-sm ml-1">{value}</span>}
            />
            <defs>
              <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent-green))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent-green))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="hsl(var(--accent-green))" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--accent-green))' }} activeDot={{ r: 6, fill: 'hsl(var(--accent-green))', stroke: 'hsl(var(--card))' }} />
            <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--destructive))' }} activeDot={{ r: 6, fill: 'hsl(var(--destructive))', stroke: 'hsl(var(--card))' }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeadTrackingChart;
