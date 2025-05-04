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
  updateIndicator,
} from '../../store/slices/clickIndicatorSlice';

import {
  selectActiveImageId,
  selectActiveImageIndicators,
  selectSelectedIndicator,
} from '../../store/selectors/clickIndicatorSelectors';

import { v4 as uuidv4 } from 'uuid';

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

// POPUP COMPONENTS
// Sample data - Sử dụng tên và giá trị từ hình mẫu
const componentTypes = [
  { id: 'door_front_left', label: 'DOOR_FRONT_LEFT', value: 'DFL' },
  { id: 'door_rear_left', label: 'DOOR_REAR_LEFT', value: 'DRL' },
  { id: 'fender_front_left', label: 'FENDER_FRONT_LEFT', value: 'FFL' },
  { id: 'quarter_panel_left', label: 'QUARTER_PANEL_LEFT', value: 'QPL' },
  { id: 'bumper_front', label: 'BUMPER_FRONT', value: 'BF' },
  { id: 'hood', label: 'HOOD', value: 'HD' },
];

const materialTypes = [
  { id: 'paint', label: 'PAINT', value: 'PT' },
  { id: 'metal', label: 'METAL', value: 'MT' },
  { id: 'aluminum', label: 'ALUMINUM', value: 'AL' },
  { id: 'plastic', label: 'PLASTIC', value: 'PL' },
  { id: 'glass', label: 'GLASS', value: 'GL' },
];

const damageTypeOptions = [
  { id: 'dent', label: 'DENT', value: 'DT', color: '#ef4444' },
  { id: 'scratch', label: 'SCRATCH', value: 'SC', color: '#3b82f6' },
  { id: 'crack', label: 'CRACK', value: 'CR', color: '#f97316' },
  { id: 'chip', label: 'CHIP', value: 'CH', color: '#8b5cf6' },
  { id: 'scuff', label: 'SCUFF', value: 'SF', color: '#10b981' },
  { id: 'bent', label: 'BENT', value: 'BT', color: '#64748b' },
  { id: 'broken', label: 'BROKEN', value: 'BR', color: '#ef4444' },
  { id: 'chipped', label: 'CHIPPED', value: 'CP', color: '#8b5cf6' },
  { id: 'severe_damage', label: 'SEVERE DAMAGE', value: 'SD', color: '#ef4444' },
  { id: 'gouged', label: 'GOUGED', value: 'GD', color: '#f97316' },
  { id: 'hail_damage', label: 'HAIL DAMAGE', value: 'HD', color: '#8b5cf6' },
];

// Option Item for popup
interface OptionItemProps {
  id: string | number;
  label: string;
  value?: string | number;
  isSelected: boolean;
  onClick: () => void;
}

const OptionItem: React.FC<OptionItemProps> = ({
  id,
  label,
  value,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`w-full px-4 py-3 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
        isSelected ? 'bg-gray-50' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {isSelected && (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        )}
        <span className="font-mono text-sm font-semibold text-gray-900">{label}</span>
      </div>
      {value && <span className="text-gray-500 font-mono text-sm">[{value}]</span>}
    </div>
  );
};

// Enhanced Selector Popup
interface EnhancedSelectorPopupProps {
  title: string;
  options: any[];
  selectedOption: string | null;
  onSelect: (id: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  showSearch?: boolean;
  showSeverity?: boolean;
  showThroughPaint?: boolean;
  severity?: string;
  throughPaint?: boolean;
  onSeverityChange?: (severity: string) => void;
  onThroughPaintToggle?: () => void;
  position?: { x: number; y: number };
  type?: 'damageType' | 'component';
  selectedItems?: string[];
}

const EnhancedSelectorPopup: React.FC<EnhancedSelectorPopupProps> = ({
  title,
  options,
  selectedOption,
  onSelect,
  onCancel,
  onConfirm,
  showSearch = true,
  showSeverity = false,
  showThroughPaint = false,
  severity = 'maj',
  throughPaint = false,
  onSeverityChange,
  onThroughPaintToggle,
  position,
  type = 'damageType',
  selectedItems = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter options based on search query
  const filteredOptions = searchQuery 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;
  
  // Determine position styling
  const getPositionStyle = () => {
    if (!position) return {};
    
    // Sử dụng vị trí tương đối trong main view, thêm một chút offset để không che điểm annotation
    return {
      position: 'absolute' as const,
      left: `${position.x + 5}%`,
      top: `${position.y - 5}%`,
      transform: 'translate(0, -50%)',
      zIndex: 1000,
    };
  };
  
  const showCheckmarks = type === 'damageType';
  
  return (
    <div 
      className="absolute" 
      style={{ 
        pointerEvents: 'none' as const,
        ...getPositionStyle()
      }}
    >
      {/* Popup */}
      <div 
        className="bg-white rounded-md shadow-lg border border-gray-200 w-[250px]"
        style={{ 
          pointerEvents: 'auto' as const 
        }}
      >
        {/* Header */}
        <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xs font-mono font-bold uppercase">{title}</h2>
        </div>
        
        {/* Search input - thu nhỏ */}
        {showSearch && (
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-7 pr-2 py-1 border border-gray-300 rounded-md text-xs bg-gray-50 placeholder-gray-500 focus:outline-none"
                placeholder="Search.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* Severity Options - thu nhỏ */}
        {showSeverity && (
          <div className="px-3 py-2 border-b border-gray-200">
            <span className="font-mono text-[10px] font-bold text-gray-800 block mb-1">SEVERITY</span>
            <div className="flex gap-1">
              <button 
                className={`rounded-full px-2 py-1 text-[10px] font-mono ${severity === 'min' 
                  ? 'bg-gray-200 border border-gray-400' 
                  : 'bg-gray-100 border border-gray-300'}`}
                onClick={() => onSeverityChange && onSeverityChange('min')}
              >
                Min
              </button>
              <button 
                className={`rounded-full px-2 py-1 text-[10px] font-mono ${severity === 'med' 
                  ? 'bg-gray-200 border border-gray-400' 
                  : 'bg-gray-100 border border-gray-300'}`}
                onClick={() => onSeverityChange && onSeverityChange('med')}
              >
                Med
              </button>
              <button 
                className={`rounded-full px-2 py-1 text-[10px] font-mono ${severity === 'maj' 
                  ? 'bg-red-100 border border-red-400' 
                  : 'bg-gray-100 border border-gray-300'}`}
                onClick={() => onSeverityChange && onSeverityChange('maj')}
              >
                Maj
              </button>
            </div>
          </div>
        )}
        
        {/* Through Paint Toggle - thu nhỏ */}
        {showThroughPaint && (
          <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-gray-800">THROUGH PAINT</span>
            <div 
              className={`w-8 h-4 rounded-full ${throughPaint ? 'bg-blue-600' : 'bg-gray-300'} relative cursor-pointer`}
              onClick={onThroughPaintToggle}
            >
              <div 
                className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transform transition-transform ${
                  throughPaint ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </div>
          </div>
        )}
        
        {/* Options list - thu nhỏ thêm */}
        <div className="max-h-[200px] overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={option.id}
              className={`w-full px-2 py-1.5 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                selectedOption === option.id || selectedItems.includes(option.id)
                  ? 'bg-gray-50'
                  : 'bg-white'
              }`}
              onClick={() => onSelect(option.id)}
            >
              <div className="flex items-center gap-1.5">
                {(selectedOption === option.id || selectedItems.includes(option.id)) && showCheckmarks && (
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
                <span className="font-mono text-[10px] font-semibold text-gray-900">{option.label}</span>
              </div>
              <span className="text-gray-500 font-mono text-[10px]">[{option.value || index + 1}]</span>
            </div>
          ))}
        </div>
        
        {/* Action buttons - thu nhỏ */}
        <div className="p-1.5 flex justify-between items-center border-t border-gray-200">
          <button
            className="px-2 py-1 border border-gray-300 rounded text-[10px] font-medium text-gray-700 bg-white hover:bg-gray-50 font-mono"
            onClick={onCancel}
          >
            Cancel <span className="text-gray-500">[ESC]</span>
          </button>
          <button
            className="px-2 py-1 bg-blue-600 rounded text-[10px] font-medium text-white hover:bg-blue-700 font-mono"
            onClick={onConfirm}
          >
            Confirm <span className="text-blue-300">[↵]</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Indicator tạm thời (không lưu vào Redux)
interface TempIndicator {
  x: number;
  y: number;
  damageType?: string;
  component?: string;
  color?: string;
}

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
  const [activeDamageType, setActiveDamageType] = useState(damageTypeOptions[0]);
  const [activeComponent, setActiveComponent] = useState(componentTypes[0]);
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>('annotations');
  
  // Popup state
  const [activePopup, setActivePopup] = useState<'damageType' | 'component' | null>(null);
  const [tempDamageType, setTempDamageType] = useState<string | null>(null);
  const [tempComponent, setTempComponent] = useState<string | null>(null);
  const [editingIndicatorId, setEditingIndicatorId] = useState<string | null>(null);
  const [severity, setSeverity] = useState<string>('maj');
  const [throughPaint, setThroughPaint] = useState<boolean>(false);
  const [pendingAnnotation, setPendingAnnotation] = useState<{x: number, y: number} | null>(null);
  const [selectedDamageTypes, setSelectedDamageTypes] = useState<string[]>([]);
  
  // Thêm state để theo dõi indicator tạm thời
  const [tempIndicator, setTempIndicator] = useState<TempIndicator | null>(null);
  
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
    
    // Hủy bất kỳ indicator tạm thời nào đang tồn tại
    if (tempIndicator) {
      setTempIndicator(null);
    }
    
    // Tạo indicator tạm thời
    const defaultDamageType = damageTypeOptions[0];
    setTempIndicator({
      x,
      y,
      damageType: defaultDamageType.id,
      color: defaultDamageType.color
    });
    
    // Lưu vị trí annotation để xử lý trong popup
    setPendingAnnotation({x, y});
    
    // Khởi tạo popup chọn loại thiệt hại
    setTempDamageType(defaultDamageType.id);
    setTempComponent(null);
    setSeverity('maj');
    setThroughPaint(false);
    setSelectedDamageTypes([defaultDamageType.id]);
    setActivePopup('damageType');
  };
  
  const handleIndicatorClick = (id: string) => {
    if (activeImageId) {
      dispatch(selectIndicator({ imageId: activeImageId, indicatorId: id }));
      
      // Find the indicator
      const indicator = indicators.find(ind => ind.id === id);
      if (indicator) {
        // Set up for editing
        setEditingIndicatorId(id);
        setTempDamageType(indicator.damageType || null);
        setTempComponent(indicator.component || null);
        
        // Show damage type popup first
        setActivePopup('damageType');
      }
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
    const damageType = damageTypeOptions.find(dt => dt.id === damageTypeId);
    if (damageType) {
      setActiveDamageType(damageType);
    }
  };
  
  const handleSelectComponent = (componentId: string) => {
    const component = componentTypes.find(c => c.id === componentId);
    if (component) {
      setActiveComponent(component);
    }
  };
  
  // Popup handlers
  const handlePopupDamageTypeSelect = (id: string) => {
    if (selectedDamageTypes.includes(id)) {
      // Multi-select mode for damage types
      setSelectedDamageTypes(prev => prev.filter(item => item !== id));
    } else {
      setSelectedDamageTypes(prev => [...prev, id]);
    }
    setTempDamageType(id);
  };
  
  const handlePopupComponentSelect = (id: string) => {
    setTempComponent(id);
  };
  
  const handlePopupCancel = () => {
    // Xóa indicator tạm thời khi hủy popup
    setTempIndicator(null);
    
    // Reset temp values and close popup
    setTempDamageType(null);
    setTempComponent(null);
    setActivePopup(null);
    setEditingIndicatorId(null);
    setPendingAnnotation(null);
  };
  
  const handlePopupDamageTypeConfirm = () => {
    // Move to component selection
    setActivePopup('component');
  };
  
  const handleSeverityChange = (newSeverity: string) => {
    setSeverity(newSeverity);
  };
  
  const handleThroughPaintToggle = () => {
    setThroughPaint(!throughPaint);
  };
  
  const handlePopupComponentConfirm = () => {
    if (editingIndicatorId) {
      // Đang chỉnh sửa một indicator đã tồn tại
      if (tempDamageType && tempComponent && activeImageId) {
        // Find the damage type object
        const damageType = damageTypeOptions.find(dt => dt.id === tempDamageType);
        
        if (damageType) {
          // Update the indicator
          dispatch(updateIndicator({
            imageId: activeImageId,
            indicatorId: editingIndicatorId,
            updates: {
              damageType: tempDamageType,
              component: tempComponent,
              color: damageType.color,
              confirmed: true,
              severity: severity,
              throughPaint: throughPaint
            }
          }));
          
          notification.success({
            message: 'Annotation Updated',
            description: `Updated to ${damageType.label} on ${componentTypes.find(c => c.id === tempComponent)?.label}`
          });
        }
      }
    } else if (pendingAnnotation && tempIndicator) {
      // Đang tạo một indicator mới
      if (tempDamageType && tempComponent && activeImageId) {
        const damageType = damageTypeOptions.find(dt => dt.id === tempDamageType);
        
        if (damageType) {
          // Tạo mới indicator chính thức trong Redux
          const newIndicator = { 
            imageId: activeImageId, 
            x: tempIndicator.x, 
            y: tempIndicator.y, 
            damageType: tempDamageType,
            component: tempComponent,
            color: damageType.color,
            confirmed: true,
            severity: severity,
            throughPaint: throughPaint
          };
          
          dispatch(addIndicator(newIndicator));
          
          notification.success({
            message: 'Annotation Added',
            description: `Added ${damageType.label} on ${componentTypes.find(c => c.id === tempComponent)?.label}`
          });
        }
      }
    }
    
    // Xóa indicator tạm thời
    setTempIndicator(null);
    
    // Reset and close popup
    setTempDamageType(null);
    setTempComponent(null);
    setActivePopup(null);
    setEditingIndicatorId(null);
    setPendingAnnotation(null);
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
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'mr-0' : 'mr-[350px]'}`}>
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
        <div className="flex flex-1 overflow-hidden pl-[12px] items-center relative">
          {/* Sidebar Left - Thumbnail List */}
          <div className="w-[84px] bg-white flex flex-col justify-center">
            <ThumbnailList
              thumbnails={mockVehicleData.images}
              activeId={activeImageId || ''}
              onSelect={handleThumbnailClick}
            />
          </div>

          {/* Main Viewer with annotation capability */}
          <div className="flex-1 overflow-auto flex items-center justify-center py-2 relative">
            <InteractiveImageViewer
              src={activeImage?.src || ''}
              alt={activeImage?.alt}
              indicators={indicators}
              isInteractionEnabled={isAnnotationMode}
              onImageClick={handleImageClick}
              onIndicatorClick={handleIndicatorClick}
            />
            
            {/* Hiển thị indicator tạm thời */}
            {tempIndicator && (
              <div 
                className="absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
                style={{
                  left: `${tempIndicator.x}%`,
                  top: `${tempIndicator.y}%`,
                  backgroundColor: tempIndicator.color || '#ef4444',
                  boxShadow: '0 0 0 2px rgba(0,0,0,0.2)'
                }}
              />
            )}
            
            {/* Damage Type Popup - Di chuyển vào trong main viewer */}
            {activePopup === 'damageType' && pendingAnnotation && (
              <EnhancedSelectorPopup
                title="DAMAGE TYPE"
                options={damageTypeOptions}
                selectedOption={tempDamageType}
                onSelect={handlePopupDamageTypeSelect}
                onCancel={handlePopupCancel}
                onConfirm={handlePopupDamageTypeConfirm}
                showSearch={true}
                showSeverity={true}
                showThroughPaint={true}
                severity={severity}
                throughPaint={throughPaint}
                onSeverityChange={handleSeverityChange}
                onThroughPaintToggle={handleThroughPaintToggle}
                position={pendingAnnotation}
                type="damageType"
                selectedItems={selectedDamageTypes}
              />
            )}
            
            {/* Component Popup - Di chuyển vào trong main viewer */}
            {activePopup === 'component' && pendingAnnotation && (
              <EnhancedSelectorPopup
                title="COMPONENT"
                options={componentTypes}
                selectedOption={tempComponent}
                onSelect={handlePopupComponentSelect}
                onCancel={handlePopupCancel}
                onConfirm={handlePopupComponentConfirm}
                showSearch={true}
                showSeverity={false}
                showThroughPaint={false}
                position={pendingAnnotation}
                type="component"
              />
            )}
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
      <div className={`absolute top-0 right-0 w-[350px] h-full flex flex-col border-l border-gray-200 bg-white transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'translate-x-full' : 'translate-x-0'}`}>
        <div className="flex-1 overflow-y-auto space-y-4 relative">
          {/* Title with view state */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">{getActiveViewDetail()}</h2>
            <div className="flex items-center">
              <button className="p-1" onClick={handleCollapseToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Damage Selection</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Damage Type</label>
              <div className="grid grid-cols-2 gap-2">
                {damageTypeOptions.slice(0, 8).map((damageType) => (
                  <button
                    key={damageType.id}
                    className={`py-2 px-3 text-sm rounded-md border transition-colors flex items-center ${
                      activeDamageType.id === damageType.id
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectDamageType(damageType.id)}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: damageType.color }}
                    ></div>
                    {damageType.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Component</label>
              <div className="space-y-2">
                {componentTypes.map((component) => (
                  <button
                    key={component.id}
                    className={`w-full py-2 px-3 text-sm text-left rounded-md border transition-colors ${
                      activeComponent.id === component.id
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectComponent(component.id)}
                  >
                    {component.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Annotation mode toggle */}
            <button
              className={`w-full py-3 px-4 rounded-md text-white text-sm font-medium transition-colors mb-6 ${
                isAnnotationMode ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={handleToggleAnnotationMode}
            >
              {isAnnotationMode ? 'Exit Annotation Mode' : 'Enter Annotation Mode'}
            </button>

            {/* Damage list from annotations */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Damage List</h3>

              {/* Show message when no annotations */}
              {indicators.length === 0 ? (
                <div className="text-center p-4 text-gray-500 bg-gray-50 rounded-md">
                  <p className="text-sm">No damage annotations yet</p>
                  <p className="text-xs mt-1">Click on the image in annotation mode to add damage</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {indicators.map((indicator, index) => (
                    <div 
                      key={indicator.id}
                      className={`rounded-md border overflow-hidden cursor-pointer ${
                        indicator.isHighlighted ? 'ring-2 ring-blue-300 border-blue-300' : 'border-gray-200'
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
                        <div className="flex-1 text-sm font-medium">
                          {indicator.damageType ? 
                            damageTypeOptions.find(dt => dt.id === indicator.damageType)?.label || 'DAMAGE' :
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
                      <div className="px-3 py-2 border-t border-gray-200">
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
                            <span className="text-sm text-gray-600">
                              {componentTypes.find(c => c.id === indicator.component)?.label || 'COMPONENT'}
                            </span>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          Position: ({indicator.x.toFixed(1)}%, {indicator.y.toFixed(1)}%)
                          {indicator.severity && <span className="ml-2">• Severity: {indicator.severity.toUpperCase()}</span>}
                          {indicator.throughPaint && <span className="ml-2">• Through Paint</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fixed footer with buttons */}
        <div className="flex-none p-4 border-t border-gray-200">
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition mb-2"
            onClick={indicators.length > 0 ? handleResetCurrentImage : undefined}
            disabled={indicators.length === 0}
          >
            Finish [F]
          </button>
          
          {indicators.length > 0 && (
            <button 
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm transition"
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