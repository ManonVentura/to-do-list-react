export const e2e = {
    setupNodeEvents(on, config) {
        require("cypress-localstorage-commands/plugin")(on, config);
        return config;
    },
};