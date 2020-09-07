import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import cors from 'cors';
import routes from './routes.js';
import './config/database.js';
import swaggerUi from 'swagger-ui-express';
import apiDoc from './config/apiDoc';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Server internal error!' });
    });
  }
}

export default new App().server;
