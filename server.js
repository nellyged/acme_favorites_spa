const { syncAndSeed } = require('./db');
const app = require('./app');
const port = process.env.PORT || 3000;
syncAndSeed().then(() => {
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
});
