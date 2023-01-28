import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Api/AuthApi";

// sign in
export const SignIn = createAsyncThunk(
  "auth/signin",
  async (user, thunkAPI) => {
    try {
      return await authService.SignIn(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// googlesign in

export const GoogleSignIn = createAsyncThunk(
  "auth/googlesignin",
  async (user, thunkAPI) => {
    try {
      return await authService.GoogleSignin(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// signup
export const SignUp = createAsyncThunk(
  "auth,signup",
  async (user, thunkAPI) => {
    try {
      return await authService.SingUp(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const user = localStorage.getItem("user");

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    Logout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // signin
      .addCase(SignIn.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(SignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      .addCase(SignIn.rejected, (state, action) => {
        console.log("action: ", action);
        state.isLoading = false;
        state.isError = action.payload;
      })

      // google signin

      .addCase(GoogleSignIn.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(GoogleSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      .addCase(GoogleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // signup

      .addCase(SignUp.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(SignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      .addCase(SignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { Logout, setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
