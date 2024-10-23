import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    production: false,
    apiUrl: 'http://localhost:5000',
    logging: {
        level: NgxLoggerLevel.DEBUG,
        //Configuration for sending logs to the server
        // serverLogLevel: NgxLoggerLevel.ERROR,
        // serverLoggingUrl: '/api/logs'
    }
};
