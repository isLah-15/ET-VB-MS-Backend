import express from 'express';
import user from './Auth/auth.router';

const app = express();

// middleware
app.use(express.json())

// routes
user(app)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});

export default app;