import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    production: false,
    apiUrl: 'http://localhost:5000',
    logging: {
        level: NgxLoggerLevel.DEBUG
    }
};
