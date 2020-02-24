import { Express, Response, Request } from 'express';
import express from 'express';

const app: Express = express();

const PORT = process.env.PORT || 8080;

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
