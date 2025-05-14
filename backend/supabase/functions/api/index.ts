import express from 'express';
import { authRequiredMiddleware } from './middlewares/authRequired.ts'

const app = express();

app.use(express.json());

const port = 3000;

app.get('/api', authRequiredMiddleware, (req, res) => {
  res.send({ message: 'Hello World!', user: req.user });
});

app.post('/api', (req, res) => {
  const { name } = req.body;
  res.send(`Hello ${name}!`);
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
