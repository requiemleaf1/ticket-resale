//This file is loaded up automatically by next.js whenever our project starts up.
//Next is then going to attempt to read this thing in.
//It's going to take a look at this Webpack dev middleware function and it's going to call it with some
//middle pack configuration that it has created by default.
//We are changing a single option on there to tell Webpack that rather than trying to watch for file changes
//in some automated fashion, instead pull all the different files inside of our project directory automatically
//at once every 300 milliseconds.
module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
