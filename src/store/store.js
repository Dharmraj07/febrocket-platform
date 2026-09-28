const { configureStore } = require("@reduxjs/toolkit");
const { authReducer } = require("../features/auth/authSlice");

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

module.exports = {
  store,
};
module.exports.default = store;
