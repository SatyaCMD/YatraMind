import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModule: 'flights', // flights, hotels, trains, buses, etc.
  isDarkMode: false,
  isAuthModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveModule: (state, action) => {
      state.activeModule = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setAuthModalOpen: (state, action) => {
      state.isAuthModalOpen = action.payload;
    }
  },
});

export const { setActiveModule, toggleDarkMode, setAuthModalOpen } = uiSlice.actions;
export default uiSlice.reducer;
