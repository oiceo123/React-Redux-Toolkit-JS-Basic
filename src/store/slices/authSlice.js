import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signin } from "../../data/users";

const initialState = {
  user: null,
  loading: false,
  error: "",
};

export const signinAsync = createAsyncThunk(
  "signin",
  async ({ email, password }, store) => {
    try {
      const user = await signin(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  }
);

// สถานะที่จะได้เมื่อ async function ของ thunk ทำงาน
// กำลังรอ (loading)
// signinAsync.pending

// ทำงานสำเร็จ (success)
// signinAsync.fulfilled

// ทำงานไม่สำเร็จ (failed)
// signinAsync.rejected

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = "";
    },
  },
  /* extraReducers: {
    [signinAsync.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [signinAsync.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    },
    [signinAsync.rejected]: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.error.message;
    },
  }, */
  extraReducers: (builder) => {
    builder.addCase(signinAsync.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signinAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(signinAsync.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { signout } = authSlice.actions;

export default authSlice.reducer;
