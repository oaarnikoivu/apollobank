import app from './app';
import { notFound, errorHandler } from './middleware';
import './lib/env';

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('App is running at http://localhost:%d in %s mode', PORT, NODE_ENV);
  console.log('  Press CTRL-C to stop\n');
});
