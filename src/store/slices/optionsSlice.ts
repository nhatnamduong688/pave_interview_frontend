import { createSlice } from '@reduxjs/toolkit';
import { initialData, OptionsState } from '../../data/initialData';

const optionsSlice = createSlice({
  name: 'options',
  initialState: initialData.options as OptionsState,
  reducers: {
    // Không cần reducers vì options là dữ liệu tĩnh
  },
});

export default optionsSlice.reducer; 