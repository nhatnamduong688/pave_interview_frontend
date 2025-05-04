import { RootState } from '..';

// Selectors cơ bản
export const selectOptions = (state: RootState) => state.options;
export const selectComponentOptions = (state: RootState) => state.options.componentOptions;
export const selectMaterialOptions = (state: RootState) => state.options.materialOptions;
export const selectDamageTypeOptions = (state: RootState) => state.options.damageTypeOptions;
export const selectSeverityOptions = (state: RootState) => state.options.severityOptions;

// Selectors dựa trên code
export const selectComponentByCode = (state: RootState, code: string) => 
  state.options.componentOptions.find(option => option.code === code);

export const selectMaterialByCode = (state: RootState, code: string) => 
  state.options.materialOptions.find(option => option.code === code);

export const selectDamageTypeByCode = (state: RootState, code: string) => 
  state.options.damageTypeOptions.find(option => option.code === code);

export const selectSeverityByValue = (state: RootState, value: number) => 
  state.options.severityOptions.find(option => option.value === value); 