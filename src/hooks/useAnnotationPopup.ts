import { useState } from 'react';
import { TempIndicator } from './useVehicleAnnotation';

interface UseAnnotationPopupProps {
  damageTypeOptions: {
    id: string;
    label: string;
    value: string;
    color: string;
  }[];
  componentTypes: {
    id: string;
    label: string;
    value: string;
  }[];
}

export const useAnnotationPopup = ({ damageTypeOptions, componentTypes }: UseAnnotationPopupProps) => {
  // Popup state
  const [activePopup, setActivePopup] = useState<'damageType' | 'component' | null>(null);
  const [tempDamageType, setTempDamageType] = useState<string | null>(null);
  const [tempComponent, setTempComponent] = useState<string | null>(null);
  const [tempMaterial, setTempMaterial] = useState<string | null>(null);
  const [editingIndicatorId, setEditingIndicatorId] = useState<string | null>(null);
  const [severity, setSeverity] = useState<string>('maj');
  const [throughPaint, setThroughPaint] = useState<boolean>(false);
  const [pendingAnnotation, setPendingAnnotation] = useState<{x: number, y: number} | null>(null);
  const [selectedDamageTypes, setSelectedDamageTypes] = useState<string[]>([]);
  const [activeDamageType, setActiveDamageType] = useState(damageTypeOptions[0]);
  const [activeComponent, setActiveComponent] = useState(componentTypes[0]);
  
  // Material options - dùng tạm một phần của component types
  const materialOptions = componentTypes.slice(0, 3);
  const [activeMaterial, setActiveMaterial] = useState(materialOptions[0]);

  // Handler for selecting damage type
  const handleSelectDamageType = (damageTypeId: string) => {
    const damageType = damageTypeOptions.find(dt => dt.id === damageTypeId);
    if (damageType) {
      setActiveDamageType(damageType);
    }
  };
  
  // Handler for selecting component
  const handleSelectComponent = (componentId: string) => {
    const component = componentTypes.find(c => c.id === componentId);
    if (component) {
      setActiveComponent(component);
    }
  };
  
  // Handler for selecting material
  const handleSelectMaterial = (materialId: string) => {
    const material = materialOptions.find(m => m.id === materialId);
    if (material) {
      setActiveMaterial(material);
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
  
  const handlePopupMaterialSelect = (id: string) => {
    setTempMaterial(id);
  };
  
  const handlePopupCancel = (resetTempIndicator: () => void) => {
    // Reset temp values and close popup
    setTempDamageType(null);
    setTempComponent(null);
    setTempMaterial(null);
    setActivePopup(null);
    setEditingIndicatorId(null);
    setPendingAnnotation(null);
    resetTempIndicator();
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
  
  const startNewAnnotation = (position: { x: number, y: number }, defaultDamageType: { id: string }) => {
    // Save position for popup placement
    setPendingAnnotation(position);
    
    // Initialize popup values
    setTempDamageType(defaultDamageType.id);
    setTempComponent(null);
    setTempMaterial(null);
    setSeverity('maj');
    setThroughPaint(false);
    setSelectedDamageTypes([defaultDamageType.id]);
    setEditingIndicatorId(null);
  };

  const startEditingAnnotation = (indicator: any) => {
    if (indicator) {
      // Set up for editing
      setEditingIndicatorId(indicator.id);
      setTempDamageType(indicator.damageType || null);
      setTempComponent(indicator.component || null);
      setTempMaterial(null);
      setSeverity(indicator.severity || 'maj');
      setThroughPaint(indicator.throughPaint || false);
      
      // For multi-select in the future
      setSelectedDamageTypes(indicator.damageType ? [indicator.damageType] : []);
      
      // Set position for popup using the indicator's coordinates
      setPendingAnnotation({ x: indicator.x, y: indicator.y });
    }
  };

  const prepareAnnotationData = (tempIndicator: TempIndicator | null) => {
    if (!tempDamageType || !tempComponent || !pendingAnnotation) return null;
    
    const damageType = damageTypeOptions.find(dt => dt.id === tempDamageType);
    const component = componentTypes.find(c => c.id === tempComponent);
    
    if (!damageType || !component) return null;
    
    return {
      damageType: tempDamageType,
      component: tempComponent,
      material: tempMaterial || undefined,
      color: damageType.color,
      severity,
      throughPaint,
      x: tempIndicator?.x || pendingAnnotation.x,
      y: tempIndicator?.y || pendingAnnotation.y,
      indicatorId: editingIndicatorId || undefined,
      damageTypeLabel: damageType.label,
      componentLabel: component.label
    };
  };

  const resetPopupState = () => {
    setTempDamageType(null);
    setTempComponent(null);
    setTempMaterial(null);
    setActivePopup(null);
    setEditingIndicatorId(null);
    setPendingAnnotation(null);
    setSelectedDamageTypes([]);
  };

  return {
    // State
    activePopup,
    tempDamageType,
    tempComponent,
    tempMaterial,
    editingIndicatorId,
    severity,
    throughPaint,
    pendingAnnotation,
    selectedDamageTypes,
    activeDamageType,
    activeComponent,
    activeMaterial,
    
    // Actions
    setActivePopup,
    handleSelectDamageType,
    handleSelectComponent,
    handleSelectMaterial,
    handlePopupDamageTypeSelect,
    handlePopupComponentSelect,
    handlePopupMaterialSelect,
    handlePopupCancel,
    handlePopupDamageTypeConfirm,
    handleSeverityChange,
    handleThroughPaintToggle,
    startNewAnnotation,
    startEditingAnnotation,
    prepareAnnotationData,
    resetPopupState
  };
}; 