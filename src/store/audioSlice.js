import { createSlice } from "@reduxjs/toolkit";

import { audioList } from "./Data";

const initialState = {
  audioList: audioList,
  currentSong: null,
};
// console.log("audioList:", initialState.audioList);

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },

    forwardSong: (state, action) => {
      //   console.log("action.payload:", action.payload);
      //   console.log("audioList:", state.audioList);

      const currentIndex = initialState.audioList.findIndex(
        (song) => song === action.payload
      );

      if (
        currentIndex === -1 ||
        currentIndex === initialState.audioList.length - 1
      ) {
        return;
      }

      state.currentSong = initialState.audioList[currentIndex + 1];
    },

    backwardSong: (state, action) => {
      //   console.log("action.payload:", action.payload);
      // console.log("audioList:", initialState.audioList);

      const currentIndex = initialState.audioList.findIndex(
        (song) => song === action.payload
      );
      if (
        currentIndex === -1 ||
        currentIndex === initialState.audioList.length - 1
      ) {
        return;
      }

      state.currentSong = initialState.audioList[currentIndex - 1];
    },
    randomSong: (state, action) => {
      console.log("state.audioList.length", state.audioList.length);
      const randomIndex = Math.floor(Math.random() * state.audioList.length);
      state.currentSong = state.audioList[randomIndex];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentSong, forwardSong, backwardSong, randomSong } =
  audioSlice.actions;

export default audioSlice.reducer;
