import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, notification, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import Header from '../organisms/Header';
import ThumbnailList from '../molecules/ThumbnailList';
import CustomAnnotationFooter from '../molecules/CustomAnnotationFooter';
import InteractiveImageViewer from '../molecules/InteractiveImageViewer';
import AnnotationList from '../molecules/AnnotationList';
import { Tag } from '../molecules/SessionCard/SessionTag';

// Redux actions và selectors
import {
  setActiveImage,
  addIndicator,
  selectIndicator,
  clearSelection,
  removeIndicator,
  resetImageIndicators,
  resetAllIndicators,
} from '../../store/slices/clickIndicatorSlice';

import {
  selectActiveImageId,
  selectActiveImageIndicators,
  selectSelectedIndicator,
} from '../../store/selectors/clickIndicatorSelectors';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

// Mock vehicle data
const mockVehicleData = {
  vehicleId: 'TQA-8GR5MDUDF1',
  vehicleInfo: {
    year: '2020',
    make: 'FORD',
    model: 'TRANSIT',
    trim: 'ASÜNA',
    bodyType: 'CARGO VAN-EXTENDED CARGO VAN'
  },
  images: [
    {
      id: 'photo-1',
      src: '/images/vehicles/View=1.png',
      alt: 'Front view',
    },
    {
      id: 'photo-2',
      src: '/images/vehicles/View=2.png',
      alt: 'Driver side view',
    },
    {
      id: 'photo-3',
      src: '/images/vehicles/View=3.png',
      alt: 'Passenger side view',
    },
    {
      id: 'photo-4',
      src: '/images/vehicles/View=4.png',
      alt: 'Rear view',
    },
    {
      id: 'photo-5',
      src: '/images/vehicles/View=5.png',
      alt: 'Hood view',
    },
    {
      id: 'photo-6',
      src: '/images/vehicles/View=6.png',
      alt: 'Roof view',
    },
  ]
};

// Mock damage types
const mockDamageTypes = [
  { id: 'dent', name: 'DENT', color: '#ef4444' },
  { id: 'scratch', name: 'SCRATCH', color: '#3b82f6' },
  { id: 'crack', name: 'CRACK', color: '#f97316' },
  { id: 'chip', name: 'CHIP', color: '#8b5cf6' },
  { id: 'scuff', name: 'SCUFF', color: '#10b981' }
];

// Mock components
const mockComponents = [
  { id: 'door_front_left', name: 'DOOR_FRONT_LEFT' },
  { id: 'door_rear_left', name: 'DOOR_REAR_LEFT' },
  { id: 'fender_front_left', name: 'FENDER_FRONT_LEFT' },
  { id: 'quarter_panel_left', name: 'QUARTER_PANEL_LEFT' },
  { id: 'bumper_front', name: 'BUMPER_FRONT' },
  { id: 'hood', name: 'HOOD' }
];

// Mock damage list entries from Vehicle Details
const mockDamageList = [
  {
    id: 'damage-1',
    score: 5,
    severity: 'high', // used for styling
    component: 'QUARTER_PANEL_LEFT',
    damageType: 'DENTED_MAJOR_THROUGH_PAINT',
    operator: 'Duy.Nguyen Khanh'
  },
  {
    id: 'damage-2',
    score: 3,
    severity: 'medium', // used for styling
    component: 'QUARTER_PANEL_LEFT',
    damageType: 'SCRATCH_MAJOR_THROUGH_PAINT',
    operator: 'Duy.Nguyen Khanh',
    included: true
  },
  {
    id: 'damage-3',
    score: 1,
    severity: 'low', // used for styling
    component: 'DOOR_FRONT_LEFT',
    damageType: 'SCUFF_MINOR',
    operator: 'Duy.Nguyen Khanh'
  },
];

// Damage entry component
interface DamageEntryProps {
  number: number;
  damage: {
    id: string;
    score: number;
    severity: string;
    component: string;
    damageType: string;
    operator: string;
    included?: boolean;
  };
}

const DamageEntry: React.FC<DamageEntryProps> = ({ number, damage }) => {
  // Get color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return { bg: 'bg-red-100', text: 'text-red-600' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-600' };
      case 'low': return { bg: 'bg-blue-100', text: 'text-blue-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  const colors = getSeverityColor(damage.severity);

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden mb-4">
      <div className="flex items-center px-3 py-2 bg-gray-50">
        <div className={`flex items-center justify-center h-6 w-6 rounded-full ${colors.bg} ${colors.text} text-xs font-medium mr-2`}>
          {number.toString().padStart(2, '0')}
        </div>
        <div className="flex-1 text-sm">
          SCORE={damage.score}{damage.included ? '(included)' : ''}
        </div>
      </div>
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center mb-1">
          <span className="inline-block h-4 w-4 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M7 7h.01" />
              <path d="M17 7h.01" />
              <path d="M7 17h.01" />
              <path d="M17 17h.01" />
            </svg>
          </span>
          <span className="text-sm text-gray-500">[C]{damage.component}</span>
        </div>
        <h3 className="font-medium mb-1">{damage.damageType}</h3>
        <div className="text-xs text-gray-500">{damage.operator}</div>
      </div>
    </div>
  );
};

const VehicleDamageAnnotationV2: React.FC = () => {
  const { id: vehicleIdFromUrl } = useParams<{ id?: string }>();
  const vehicleId = vehicleIdFromUrl || mockVehicleData.vehicleId;
  
  // Redux hooks
  const dispatch = useAppDispatch();
  const activeImageId = useAppSelector(selectActiveImageId);
  const indicators = useAppSelector(selectActiveImageIndicators);
  const selectedIndicator = useAppSelector(selectSelectedIndicator);
  
  // Local state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isAnnotationMode, setIsAnnotationMode] = useState<boolean>(false);
  const [activeDamageType, setActiveDamageType] = useState(mockDamageTypes[0]);
  const [activeComponent, setActiveComponent] = useState(mockComponents[0]);
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>('annotations');
  
  // Set active image on component mount if not already set
  useEffect(() => {
    if (!activeImageId && mockVehicleData.images.length > 0) {
      dispatch(setActiveImage(mockVehicleData.images[0].id));
    }
  }, [dispatch, activeImageId]);
  
  // Get current active image
  const activeImage = mockVehicleData.images.find(img => img.id === activeImageId) || mockVehicleData.images[0];
  
  // Event handlers
  const handleImageClick = (x: number, y: number) => {
    if (!isAnnotationMode || !activeImageId) return;
    
    dispatch(addIndicator({ 
      imageId: activeImageId, 
      x, 
      y, 
      damageType: activeDamageType.id,
      component: activeComponent.id,
      color: activeDamageType.color
    }));
    
    notification.success({
      message: 'Annotation Added',
      description: `Added ${activeDamageType.name} on ${activeComponent.name}`
    });
  };
  
  const handleIndicatorClick = (id: string) => {
    if (activeImageId) {
      dispatch(selectIndicator({ imageId: activeImageId, indicatorId: id }));
    }
  };
  
  const handleRemoveIndicator = (id: string) => {
    if (activeImageId) {
      dispatch(removeIndicator({ imageId: activeImageId, indicatorId: id }));
      notification.success({
        message: 'Annotation Removed',
        description: 'The annotation has been removed successfully.'
      });
    }
  };
  
  const handleClearSelection = () => {
    dispatch(clearSelection());
  };
  
  const handleResetCurrentImage = () => {
    if (activeImageId) {
      dispatch(resetImageIndicators(activeImageId));
      notification.info({
        message: 'Annotations Cleared',
        description: 'All annotations for this image have been cleared.'
      });
    }
  };
  
  const handleResetAllImages = () => {
    dispatch(resetAllIndicators());
    notification.warning({
      message: 'All Annotations Cleared',
      description: 'All annotations for all images have been cleared.'
    });
  };
  
  const handleThumbnailClick = (id: string) => {
    dispatch(setActiveImage(id));
  };
  
  const handleToggleAnnotationMode = () => {
    setIsAnnotationMode(!isAnnotationMode);
    // Clear selection when toggling mode
    dispatch(clearSelection());
  };
  
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
  
  const handleToolbarAction = (action: string) => {
    if (action === 'move') {
      setIsAnnotationMode(false);
    } else if (action === 'annotate') {
      setIsAnnotationMode(true);
    }
  };
  
  const handleSelectDamageType = (damageTypeId: string) => {
    const damageType = mockDamageTypes.find(dt => dt.id === damageTypeId);
    if (damageType) {
      setActiveDamageType(damageType);
    }
  };
  
  const handleSelectComponent = (componentId: string) => {
    const component = mockComponents.find(c => c.id === componentId);
    if (component) {
      setActiveComponent(component);
    }
  };
  
  // Format session ID from vehicle info
  const sessionId = `${mockVehicleData.vehicleInfo.year}-${mockVehicleData.vehicleInfo.make}-${mockVehicleData.vehicleInfo.model}`;

  // Create tags based on vehicle info
  const tags: Tag[] = [];

  // Add trim tag if available
  if (mockVehicleData.vehicleInfo.trim) {
    tags.push({ text: mockVehicleData.vehicleInfo.trim, type: "yellow" });
  }

  // Add default P1 tag
  tags.push({ text: "P1", type: "blue" });

  // QC timestamp
  const timestamp = "2 days ago, 3:03:58 PM";

  // Define extra thumbnails for the footer
  const extraThumbnails = mockVehicleData.images.slice(0, 3).map(img => ({
    id: img.id,
    src: img.src,
    alt: img.alt
  }));
  
  // Caption text based on vehicle info
  const captionText = `${mockVehicleData.vehicleInfo.year} ${mockVehicleData.vehicleInfo.make}\n${mockVehicleData.vehicleInfo.model}`;
  
  // Custom toolbar items including Annotate
  const toolbarButtons = [
    { 
      id: 'move', 
      icon: '↕️', 
      label: 'Move',
      active: !isAnnotationMode
    },
    { 
      id: 'annotate', 
      icon: '📌', 
      label: 'Annotate',
      active: isAnnotationMode
    },
    { id: 'zoom', icon: '🔍', label: 'Zoom' },
    { id: 'rotate', icon: '🔄', label: 'Rotate' },
    { id: 'reset', icon: '↩️', label: 'Reset View' },
  ];
  
  // Rich view detail for sidebar
  const getActiveViewDetail = () => {
    switch (activeImage?.id) {
      case 'photo-1': return 'FRONT VIEW';
      case 'photo-2': return 'LEFT VIEW';
      case 'photo-3': return 'RIGHT VIEW';
      case 'photo-4': return 'REAR VIEW';
      case 'photo-5': return 'HOOD VIEW';
      case 'photo-6': return 'ROOF VIEW';
      default: return 'CURRENT VIEW';
    }
  };
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Main content area (left part) */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'mr-0' : 'mr-[300px]'}`}>
        {/* Header */}
        <div className="flex-none h-16 px-4 border-b border-gray-200 bg-white z-10">
          <Header
            // Use empty title to trigger SessionCardSVG
            title=""
            sessionId={sessionId}
            tags={tags}
            timestamp={timestamp}
            onBack={handleBack}
            onReport={handleReport}
            onCollapseToggle={handleCollapseToggle}
          />
        </div>

        {/* Center content with left sidebar and main viewer */}
        <div className="flex flex-1 overflow-hidden pl-[12px] items-center">
          {/* Sidebar Left - Thumbnail List */}
          <div className="w-[84px] bg-white flex flex-col justify-center">
            <ThumbnailList
              thumbnails={mockVehicleData.images}
              activeId={activeImageId || ''}
              onSelect={handleThumbnailClick}
            />
          </div>

          {/* Main Viewer with annotation capability */}
          <div className="flex-1 overflow-auto flex items-center justify-center py-2">
            <InteractiveImageViewer
              src={activeImage?.src || ''}
              alt={activeImage?.alt}
              indicators={indicators}
              isInteractionEnabled={isAnnotationMode}
              onImageClick={handleImageClick}
              onIndicatorClick={handleIndicatorClick}
            />
          </div>
        </div>

        {/* Footer with annotation controls - using CustomAnnotationFooter */}
        <div className="flex-none border-t border-gray-200">
          <CustomAnnotationFooter
            captionText={captionText}
            extraThumbnails={extraThumbnails}
            onThumbnailClick={handleThumbnailClick}
            onToolbarAction={handleToolbarAction}
            toolbarButtons={toolbarButtons}
            isAnnotationMode={isAnnotationMode}
          />
        </div>
      </div>

      {/* Enhanced Sidebar Right with tabs - Full height with fixed footer */}
      <div className={`absolute top-0 right-0 w-[300px] h-full flex flex-col border-l border-gray-200 bg-white transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'translate-x-full' : 'translate-x-0'}`}>
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Title with view state */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">{getActiveViewDetail()}</h2>
            <div className="flex items-center">
              <span className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </span>
            </div>
          </div>

          {/* Damage selection controls */}
          <div className="space-y-3 py-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-700">Damage Selection</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Damage Type</label>
              <div className="grid grid-cols-2 gap-2">
                {mockDamageTypes.map((damageType) => (
                  <button
                    key={damageType.id}
                    className={`py-2 px-3 text-xs rounded-md border transition-colors ${
                      activeDamageType.id === damageType.id
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectDamageType(damageType.id)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: damageType.color }}
                      ></div>
                      {damageType.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Component</label>
              <div className="grid grid-cols-1 gap-2">
                {mockComponents.map((component) => (
                  <button
                    key={component.id}
                    className={`py-2 px-3 text-xs text-left rounded-md border transition-colors ${
                      activeComponent.id === component.id
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectComponent(component.id)}
                  >
                    {component.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Annotation mode toggle */}
            <div className="pt-3">
              <button
                className={`w-full py-2 px-4 rounded-md text-white text-sm font-medium transition-colors ${
                  isAnnotationMode ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                onClick={handleToggleAnnotationMode}
              >
                {isAnnotationMode ? 'Exit Annotation Mode' : 'Enter Annotation Mode'}
              </button>
            </div>
          </div>

          {/* Damage list from annotations */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Damage List</h3>

            {/* Show message when no annotations */}
            {indicators.length === 0 ? (
              <div className="text-center p-4 text-gray-500">
                <p className="text-sm">No damage annotations yet</p>
                <p className="text-xs mt-1">Click on the image in annotation mode to add damage</p>
              </div>
            ) : (
              <div className="space-y-4">
                {indicators.map((indicator, index) => (
                  <div 
                    key={indicator.id}
                    className={`rounded-md border border-gray-200 overflow-hidden cursor-pointer ${
                      indicator.isHighlighted ? 'ring-2 ring-blue-300' : ''
                    }`}
                    onClick={() => handleIndicatorClick(indicator.id)}
                  >
                    <div className="flex items-center px-3 py-2 bg-gray-50">
                      <div 
                        className="flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium mr-2" 
                        style={{ 
                          backgroundColor: `${indicator.color}20`, 
                          color: indicator.color 
                        }}
                      >
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="flex-1 text-sm">
                        {indicator.damageType ? 
                          mockDamageTypes.find(dt => dt.id === indicator.damageType)?.name || 'DAMAGE' :
                          'DAMAGE'
                        }
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveIndicator(indicator.id);
                        }}
                        className="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      {indicator.component && (
                        <div className="flex items-center mb-1">
                          <span className="inline-block h-4 w-4 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <path d="M7 7h.01" />
                              <path d="M17 7h.01" />
                              <path d="M7 17h.01" />
                              <path d="M17 17h.01" />
                            </svg>
                          </span>
                          <span className="text-sm text-gray-500">
                            [C]{mockComponents.find(c => c.id === indicator.component)?.name || 'COMPONENT'}
                          </span>
                        </div>
                      )}
                      <div className="text-xs text-gray-600">
                        Position: ({indicator.x.toFixed(1)}%, {indicator.y.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vehicle info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Vehicle Information</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{mockVehicleData.vehicleInfo.year} {mockVehicleData.vehicleInfo.make} {mockVehicleData.vehicleInfo.model}</p>
                <p>{mockVehicleData.vehicleInfo.trim} • {mockVehicleData.vehicleInfo.bodyType}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {vehicleId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed footer with buttons */}
        <div className="flex-none p-4 border-t border-gray-200">
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition"
            onClick={indicators.length > 0 ? handleResetCurrentImage : undefined}
            disabled={indicators.length === 0}
          >
            {indicators.length > 0 ? 'Finish [F]' : 'No Annotations'}
          </button>
          
          {indicators.length > 0 && (
            <button 
              className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm transition"
              onClick={handleResetCurrentImage}
            >
              Clear All for Current View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleDamageAnnotationV2; 