const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }, 
    baseUrl : "https://challenger.marval.co.uk/", 
  },
  video: false,
  trashAssetsBeforeRuns: true,
  screenshotOnRunFailure: false,
  ignore: (xhr) => bool   
});


