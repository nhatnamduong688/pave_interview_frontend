// Route paths for navigation
export const ROUTES = {
  HOME: '/',
  THEME_SELECTION: '/theme-selection',
  DASHBOARD: '/dashboard',
  VEHICLE_DAMAGE_ANNOTATION: '/vehicle-damage-annotation',
  VEHICLE_DAMAGE_ANNOTATION_V2: '/vehicle-damage-annotation-v2',
  VEHICLE_DAMAGE_COMPLETE: '/vehicle-damage-complete',
  SETTINGS: '/settings',
  REPORTS: '/reports',
  HELP: '/help',
};

// Navigation menu items
export const NAV_ITEMS = [
  {
    path: ROUTES.DASHBOARD,
    label: 'Dashboard',
    icon: 'dashboard',
  },
  {
    path: ROUTES.VEHICLE_DAMAGE_ANNOTATION_V2,
    label: 'Annotation',
    icon: 'edit',
  },
  {
    path: ROUTES.REPORTS,
    label: 'Reports',
    icon: 'file',
  },
  {
    path: ROUTES.SETTINGS,
    label: 'Settings',
    icon: 'setting',
  },
]; 