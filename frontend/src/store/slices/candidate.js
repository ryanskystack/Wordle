import { createSlice } from "@reduxjs/toolkit";

// Control the candidate state - used to update the state with the candidate list
const candidateSlice = createSlice({
  name: "candidate",
  initialState: [],
  reducers: {
    updateCandidate: (state, action) => action.payload,
    resetCandidate: (state) => [],
  },
});

export const { updateCandidate, resetCandidate } = candidateSlice.actions;

export default candidateSlice.reducer;
