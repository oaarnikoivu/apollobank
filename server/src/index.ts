import express, { Express, Response, Request } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();

const app: Express = express();

const PORT = process.env.PORT;

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
