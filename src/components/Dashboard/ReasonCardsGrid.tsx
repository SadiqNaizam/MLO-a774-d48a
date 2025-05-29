import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReasonData {
  percentage: number;
  reason: string;
}

const reasonsLostData: ReasonData[] = [
  { percentage: 40, reason: 'The proposal is unclear' },
  { percentage: 20, reason: 'However venture pursuit' },
  { percentage: 10, reason: 'Other' },
  { percentage: 30, reason: 'The proposal is unclear' }, // Repeated to match image with 4 items
];

interface OtherDataMetric {
  value: string;
  label: string;
  tooltip?: string;
}

const otherDataMetrics: OtherDataMetric[] = [
  { value: '900', label: 'total leads count' },
  { value: '12', label: 'days in average to convert lead' },
  { value: '30', label: 'inactive leads', tooltip: 'Leads with no activity in the last 30 days' },
];

interface ReasonCardsGridProps {
  className?: string;
}

const ReasonCardsGrid: React.FC<ReasonCardsGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-6 gap-y-8">
          {reasonsLostData.map((item, index) => (
            <div key={index}>
              <p className="text-3xl font-bold text-foreground">{item.percentage}%</p>
              <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {otherDataMetrics.map((metric, index) => (
            <div key={index}>
              <p className="text-3xl font-bold text-foreground">{metric.value}</p>
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground leading-tight">{metric.label}</p>
                {metric.tooltip && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground ml-1.5 shrink-0 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>{metric.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReasonCardsGrid;
