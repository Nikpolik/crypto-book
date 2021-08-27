import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectionState } from "../lib/levelsFeed";

export interface Connection {
  readyState: ConnectionState;
  error: string;
}

const initialState: Connection = {
  readyState: ConnectionState.CLOSED,
  error: "",
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setConnectionState: (
      state,
      action: PayloadAction<{ connectionState: ConnectionState }>
    ) => {
      state.readyState = action.payload.connectionState;
    },
    setError: (state, action: PayloadAction<{ reason: string }>) => {
      state.error = action.payload.reason;
    },
  },
});

const { setConnectionState } = connectionSlice.actions;

export { connectionSlice, setConnectionState };
export default connectionSlice.reducer;
