import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Tooltip as ShadTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'; // Aliasing for clarity

interface LeadSourceData {
  name: string;
  value: number;
  amount: number;
  percentage: number;
  color: string;
}

const leadSourcesData: LeadSourceData[] = [
  { name: 'Clutch', value: 300, amount: 3000, percentage: 50, color: 'var(--color-chart2)' }, // #FF682C
  { name: 'Behance', value: 240, amount: 1000, percentage: 40, color: 'var(--color-chart4)' }, // #FFC107
  { name: 'Instagram', value: 60, amount: 1000, percentage: 10, color: 'var(--color-chart3)' }, // #23B7E5
  { name: 'Dribbble', value: 60, amount: 1000, percentage: 10, color: 'var(--color-accent-green)' }, // #0AB39C
];

type ActiveButton = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

interface PieChartWidgetProps {
  className?: string;
}

const PieChartWidget: React.FC<PieChartWidgetProps> = ({ className }) => {
  const [activeButton, setActiveButton] = React.useState<ActiveButton>('leadsConverted');

  const chartColors = leadSourcesData.map(item => item.color);

  // This is for style override in JSX
  const tailwindColors = {
    'var(--color-chart2)': 'hsl(var(--chart2-hsl, 17 100% 58%))', // Fallback if not in tailwind.config, approx #FF682C
    'var(--color-chart4)': 'hsl(var(--chart4-hsl, 45 100% 51%))', // Fallback, approx #FFC107
    'var(--color-chart3)': 'hsl(var(--chart3-hsl, 195 84% 55%))', // Fallback, approx #23B7E5
    'var(--color-accent-green)': 'hsl(var(--accent-green))',
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <style>
          {`
            :root {
              --color-chart2: ${tailwindColors['var(--color-chart2)']};
              --color-chart4: ${tailwindColors['var(--color-chart4)']};
              --color-chart3: ${tailwindColors['var(--color-chart3)']};
              --color-accent-green: ${tailwindColors['var(--color-accent-green)']};
            }
          `}
        </style>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-[200px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                  cursor={{ fill: 'hsl(var(--muted))' }}
                />
                <Pie
                  data={leadSourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="100%"
                  innerRadius="60%"
                  fill="#8884d8"
                  dataKey="value"
                  stroke="hsl(var(--card))"
                  strokeWidth={2}
                >
                  {leadSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {leadSourcesData.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span 
                    className="w-3 h-3 rounded-sm mr-2 shrink-0"
                    style={{ backgroundColor: source.color }}
                  ></span>
                  <span className="text-foreground">{source.name}</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <span className="w-12 text-right">$ {source.amount.toLocaleString()}</span>
                  <span className="w-8 text-right">{source.percentage}%</span>
                </div>
              </div>
            ))}
            <TooltipProvider delayDuration={100}>
                <ShadTooltip>
                  <TooltipTrigger asChild>
                     <p className="text-xs text-muted-foreground text-right mt-1">from leads total</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage based on total leads value.</p>
                  </TooltipContent>
                </ShadTooltip>
              </TooltipProvider>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 justify-center sm:justify-start">
          <Button 
            variant={activeButton === 'leadsCame' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveButton('leadsCame')}
            className={cn(activeButton === 'leadsCame' && 'bg-primary text-primary-foreground')}
          >
            Leads came
          </Button>
          <Button 
            variant={activeButton === 'leadsConverted' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveButton('leadsConverted')}
            className={cn(activeButton === 'leadsConverted' && 'bg-primary text-primary-foreground')}
          >
            Leads Converted
          </Button>
          <Button 
            variant={activeButton === 'totalDealsSize' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveButton('totalDealsSize')}
            className={cn(activeButton === 'totalDealsSize' && 'bg-primary text-primary-foreground')}
          >
            Total deals size
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartWidget;
