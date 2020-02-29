import app from './app';

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log('App is running at http://localhost:%d in %s mode', PORT, NODE_ENV);
  console.log('  Press CTRL-C to stop\n');
});
