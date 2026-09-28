import test from "node:test";
import assert from "node:assert/strict";

import authSliceModule from "./authSlice.js";

const {
  authReducer,
  clearAuth,
  setAuthChecked,
  setAuthCredentials,
} = authSliceModule;

test("auth slice stores user and marks auth as checked", () => {
  const state = authReducer(undefined, setAuthCredentials({ userName: "Ada" }));

  assert.equal(state.user.userName, "Ada");
  assert.equal(state.isAuthenticated, true);
  assert.equal(state.isLoading, false);

  const nextState = authReducer(state, setAuthChecked(true));

  assert.equal(nextState.authChecked, true);
});

test("clearAuth resets the auth state", () => {
  const state = authReducer(undefined, clearAuth());

  assert.equal(state.user, null);
  assert.equal(state.isAuthenticated, false);
  assert.equal(state.authChecked, false);
});
