import { useState } from 'react';

export const useUIState = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>('annotations');
  
  const handleCollapseToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  const handleBack = () => {
    console.log('Navigate back');
    // In a real app: navigate(-1) or similar
  };
  
  const handleReport = () => {
    console.log('Report issue');
    // In a real app: open modal or navigate to report page
  };

  const getActiveViewDetail = (imageId?: string) => {
    switch (imageId) {
      case 'photo-1': return 'FRONT VIEW';
      case 'photo-2': return 'LEFT VIEW';
      case 'photo-3': return 'RIGHT VIEW';
      case 'photo-4': return 'REAR VIEW';
      case 'photo-5': return 'HOOD VIEW';
      case 'photo-6': return 'ROOF VIEW';
      default: return 'CURRENT VIEW';
    }
  };

  return {
    // State
    isSidebarCollapsed,
    activeSidebarTab,
    
    // Actions
    setIsSidebarCollapsed,
    setActiveSidebarTab,
    handleCollapseToggle,
    handleBack,
    handleReport,
    getActiveViewDetail
  };
}; 