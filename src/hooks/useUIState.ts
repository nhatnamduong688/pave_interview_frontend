import { useState } from 'react';

export default function useUIState() {
  // Local UI state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>('annotations');
  
  // Toggle sidebar
  const handleCollapseToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  // Handle back button
  const handleBack = () => {
    console.log('Navigate back');
    // In a real app: navigate(-1) or similar
  };
  
  // Handle report button
  const handleReport = () => {
    console.log('Report issue');
    // In a real app: open modal or navigate to report page
  };

  return {
    isSidebarCollapsed,
    activeSidebarTab,
    setActiveSidebarTab,
    handleCollapseToggle,
    handleBack,
    handleReport
  };
} 