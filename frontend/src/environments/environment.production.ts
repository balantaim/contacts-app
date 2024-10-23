import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    production: true,
    apiUrl: 'http://contacts-app.eu-north-1.elasticbeanstalk.com',
    logging: {
        level: NgxLoggerLevel.ERROR
    }
};
