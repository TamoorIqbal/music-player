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
    forwardSong: (state, action) => {
      const currentIndex = initialState.audioList.findIndex(
        (song) => song === action.payload
      );

      // If the current song is not found in the audioList, return
      if (currentIndex === -1) {
        return;
      }

      // Calculate the next index in the list, wrapping around to the beginning if at the end
      const nextIndex = (currentIndex + 1) % initialState.audioList.length;

      state.currentSong = state.audioList[nextIndex];
    },

    // backwardSong: (state, action) => {
    //   //   console.log("action.payload:", action.payload);
    //   // console.log("audioList:", initialState.audioList);

    //   const currentIndex = initialState.audioList.findIndex(
    //     (song) => song === action.payload
    //   );
    //   if (
    //     currentIndex === -1 ||
    //     currentIndex === initialState.audioList.length - 1
    //   ) {
    //     return;
    //   }

    //   state.currentSong = initialState.audioList[currentIndex - 1];
    // },
    backwardSong: (state, action) => {
      const currentIndex = initialState.audioList.findIndex(
        (song) => song === action.payload
      );

      // If the current song is not found in the audioList, return
      if (currentIndex === -1) {
        return;
      }

      // Calculate the previous index in the list, wrapping around to the end if at the beginning
      const prevIndex =
        (currentIndex - 1 + initialState.audioList.length) %
        initialState.audioList.length;

      state.currentSong = initialState.audioList[prevIndex];
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
