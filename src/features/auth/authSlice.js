const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const {
  api,
  clearStoredUser,
  isUserPayloadValid,
  setStoredUser,
} = require("../../lib/api");

const initialState = {
  user: null,
  isAuthenticated: false,
  authChecked: false,
  isLoading: false,
  error: null,
};

const getUserFromPayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  return payload.user || payload.data?.user || payload;
};

const checkAuthSession = createAsyncThunk(
  "auth/checkAuthSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/auth/me", {
        withCredentials: true,
      });

      const user = getUserFromPayload(response?.data);

      if (!isUserPayloadValid(user)) {
        return rejectWithValue("Authenticated user was not returned.");
      }

      setStoredUser(user);
      return user;
    } catch (error) {
      clearStoredUser();
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Authentication check failed."
      );
    }
  }
);

const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      clearStoredUser();
      return true;
    } catch (error) {
      clearStoredUser();
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Logout failed."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthCredentials: (state, action) => {
      const user = action.payload ?? null;

      state.user = user;
      state.isAuthenticated = !!user && isUserPayloadValid(user);
      state.error = null;

      if (user) {
        setStoredUser(user);
      } else {
        clearStoredUser();
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.authChecked = false;
      state.isLoading = false;
      state.error = null;
      clearStoredUser();
    },
    setAuthChecked: (state, action) => {
      state.authChecked = Boolean(action.payload);
    },
    setAuthLoading: (state, action) => {
      state.isLoading = Boolean(action.payload);
    },
    setAuthError: (state, action) => {
      state.error = action.payload || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthSession.fulfilled, (state, action) => {
        const user = action.payload;

        state.user = user;
        state.isAuthenticated = !!user && isUserPayloadValid(user);
        state.authChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuthSession.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "Authentication failed.";
        clearStoredUser();
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.isLoading = false;
        state.error = null;
        clearStoredUser();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "Logout failed.";
        clearStoredUser();
      });
  },
});

const { reducer: authReducer, actions } = authSlice;

const selectAuth = (state) => state.auth || initialState;

module.exports = {
  authReducer,
  authSlice,
  checkAuthSession,
  clearAuth: actions.clearAuth,
  initialState,
  logoutUser,
  selectAuth,
  setAuthChecked: actions.setAuthChecked,
  setAuthCredentials: actions.setAuthCredentials,
  setAuthError: actions.setAuthError,
  setAuthLoading: actions.setAuthLoading,
};
