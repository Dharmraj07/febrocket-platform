"use client";

const React = require("react");
const { Provider } = require("react-redux");
const { store } = require("./store");

function StoreProvider({ children }) {
  return React.createElement(Provider, { store }, children);
}

module.exports = {
  StoreProvider,
};
module.exports.default = StoreProvider;
