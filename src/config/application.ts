import { setupMongoose } from './mongo';
import { ExpressConfig } from './express';
import * as http from 'http';

export class Application {

    server: http.Server;
    express: ExpressConfig;

    constructor() {

        setupMongoose();

        this.express = new ExpressConfig();

        this.server = this.express.app.listen(this.express.port, () => {
            console.log(`
                ------------
                Server Started!

                Http: http://localhost:${this.express.port} in ${this.express.app.get('env')} mode
                Health: http://localhost:${this.express.port}/health
                API Docs: http://localhost:${this.express.port}/docs

                Press CTRL-C to stop
                ------------
            `);
        });

    }

}