import React from 'react';
import ReportTimer from '../atoms/ReportTimer';

const ReportTimerDemoPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Report/Timer Component Demo</h1>
      
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Default Variant (Report)</h2>
          <div className="flex items-center gap-4">
            <ReportTimer label="Report" />
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Timer Variant</h2>
          <div className="flex items-center gap-4">
            <ReportTimer variant="timer" label="32s" />
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">All Variants Side by Side</h2>
          <div className="flex items-center gap-4">
            <ReportTimer label="Report" />
            <ReportTimer variant="timer" label="32s" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTimerDemoPage; 