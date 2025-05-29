import React from 'react';

// Layout
import MainAppLayout from '../components/layout/MainAppLayout';

// Dashboard Sections/Widgets
import PageHeader from '../components/Dashboard/PageHeader';
import FunnelChart from '../components/Dashboard/FunnelChart';
import PieChartWidget from '../components/Dashboard/PieChartWidget';
import LeadTrackingChart from '../components/Dashboard/LeadTrackingChart';
import ReasonCardsGrid from '../components/Dashboard/ReasonCardsGrid';

const Index: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Leads Overview">
      {/* 
        Main content container.
        As per Layout Requirements, mainContent.container should be "flex flex-col gap-6".
        MainAppLayout handles the overall page structure, header, sidebar, and base padding/scrolling for the main content area.
        This div arranges the dashboard components within that main content area.
      */}
      <div className="flex flex-col gap-6">
        <PageHeader />
        
        {/* First row of dashboard widgets: Funnel Chart and Pie Chart. 
            They appear side-by-side on larger screens (lg and up) and stacked on smaller screens. 
            'items-start' ensures cards align at their top edge if they have different heights. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <FunnelChart />
          <PieChartWidget />
        </div>
        
        {/* Second row: Lead Tracking Chart, typically spans full width. */}
        <LeadTrackingChart />
        
        {/* Third row: Reason Cards Grid, also typically spans full width. 
            This component itself might contain an internal grid. */}
        <ReasonCardsGrid />
      </div>
    </MainAppLayout>
  );
};

export default Index;
