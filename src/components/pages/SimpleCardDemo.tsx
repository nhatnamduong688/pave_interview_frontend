import React from 'react';
import MainLayout from '../templates/MainLayout';
import { SimpleCard } from '../molecules/SimpleCard';

const SimpleCardDemo: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-lg mx-auto py-12">
        <SimpleCard
          productId="TOA-8GASMDUDFT"
          tags={[
            { text: "AMZ", type: "yellow" },
            { text: "P1", type: "blue" }
          ]}
          qcStatus="QC Passed:"
          qcTimestamp="2 days ago, 3:03:58 PM"
        />
      </div>
    </MainLayout>
  );
};

export default SimpleCardDemo; 