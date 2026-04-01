export const timeService = {
    now() {
        return new Date().toISOString();
    },
    uptime() {
        return process.uptime();
    }
};