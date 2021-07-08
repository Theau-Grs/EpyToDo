require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const authRouter = require('./routes/auth/auth');
app.use('/', authRouter);

const userRouter = require('./routes/user/user');
app.use('/user', userRouter);

const todoRouter = require('./routes/todos/todos');
app.use('/todo', todoRouter);

app.listen(process.env.MYSQL_PORT, (error) => {
  console.log('Server listening on http://localhost:3000');
});


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });