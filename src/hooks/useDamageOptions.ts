// Quản lý tất cả các options cho damage, component và material
export default function useDamageOptions() {
  // Sample data - Sử dụng từ hình mẫu
  const componentTypes = [
    { id: 'door_front_left', label: 'DOOR_FRONT_LEFT', value: 'DFL' },
    { id: 'door_rear_left', label: 'DOOR_REAR_LEFT', value: 'DRL' },
    { id: 'fender_front_left', label: 'FENDER_FRONT_LEFT', value: 'FFL' },
    { id: 'quarter_panel_left', label: 'QUARTER_PANEL_LEFT', value: 'QPL' },
    { id: 'bumper_front', label: 'BUMPER_FRONT', value: 'BF' },
    { id: 'hood', label: 'HOOD', value: 'HD' },
    { id: 'pillar_b_left', label: 'PILLAR_B_LEFT', value: 'PBL' },
    { id: 'roof_line_left', label: 'ROOF_LINE_LEFT', value: 'RLL' },
    { id: 'pillar_cover_rear_left', label: 'PILLAR_COVER_REAR_LEFT', value: 'PCL' },
    { id: 'rocker_panel_left', label: 'ROCKER_PANEL_LEFT', value: 'RPL' }
  ];

  // Sample data - Sử dụng từ hình mẫu
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

  // Custom toolbar items including Annotate
  const toolbarButtons = [
    { 
      id: 'move', 
      icon: '↕️', 
      label: 'Move',
      active: false
    },
    { 
      id: 'annotate', 
      icon: '📌', 
      label: 'Annotate',
      active: true
    },
    { id: 'zoom', icon: '🔍', label: 'Zoom' },
    { id: 'rotate', icon: '🔄', label: 'Rotate' },
    { id: 'reset', icon: '↩️', label: 'Reset View' },
  ];

  return {
    componentTypes,
    materialTypes,
    damageTypeOptions,
    toolbarButtons
  };
} 