module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-react", "babel-preset-expo"],
  };
};
