import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  timeInStage: string;
  color: string;
  progressValue: number;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, timeInStage: '2 days', color: 'bg-chart2', progressValue: 100 }, // #FF682C
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, timeInStage: '2 days', color: 'bg-chart4', progressValue: 50 }, // #FFC107
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, timeInStage: 'average time on this stage', color: 'bg-chart1', progressValue: 25 }, // #B392F0
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, timeInStage: '8 days', color: 'bg-chart3', progressValue: 10 }, // #23B7E5
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, timeInStage: '10 days', color: 'bg-accentGreen', progressValue: 10 }, // #0AB39C
];

interface FunnelChartProps {
  className?: string;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ className }) => {
  const totalActiveLeads = 600;

  // Calculate percentages for the combined progress bar
  const totalCountForProgressBar = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
        <div className="flex items-baseline space-x-2 mt-1">
          <span className="text-4xl font-bold text-foreground">{totalActiveLeads}</span>
          <span className="text-sm text-muted-foreground">active leads</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex w-full h-3 rounded-full overflow-hidden mb-6">
          {funnelData.map((stage) => (
            <TooltipProvider key={stage.id} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={cn('h-full', stage.color)} 
                    style={{ width: `${(stage.count / totalCountForProgressBar) * 100}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        
        <ul className="space-y-4">
          {funnelData.map((stage) => (
            <li key={stage.id} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className={cn('w-3 h-3 rounded-sm mr-2 shrink-0', stage.color)}></span>
                  <span className="text-foreground font-medium">{stage.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <span>{stage.count}</span>
                  <span className="w-16 text-right">$ {stage.value}</span>
                  <span className="w-28 text-right">{stage.timeInStage}</span>
                </div>
              </div>
              {/* Individual progress bar for each stage - not shown in image, but could be added if needed */}
              {/* <Progress value={(stage.count / totalActiveLeads) * 100} className={cn('h-1.5', stage.color)} /> */}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunnelChart;
