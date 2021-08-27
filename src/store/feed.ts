import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupedLevel, ProductId } from "../lib/levelsFeed";

interface Levels {
  asks: GroupedLevel[];
  bids: GroupedLevel[];
}

export interface FeedState {
  activeProductId: ProductId;
  levels: Levels;
  tick: number;
}

const initialState: FeedState = {
  activeProductId: "PI_XBTUSD",
  tick: 0.5,
  levels: {
    asks: [],
    bids: [],
  },
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    updateLevels: (
      state,
      action: PayloadAction<{
        bids: GroupedLevel[];
        asks: GroupedLevel[];
        activeProductId: ProductId;
        tick: number;
      }>
    ) => {
      const { activeProductId, tick, ...levels } = action.payload;
      state.levels = levels;
      state.activeProductId = activeProductId;
      state.tick = tick;
    },
  },
});

export const { updateLevels } = feedSlice.actions;

export default feedSlice.reducer;
