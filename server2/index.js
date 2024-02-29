const express = require('express');
const {Port, Client} = require('./src/config/serverConfig');
const connect = require('./src/config/databaseConfig')
const authRouter = require('./src/routes/authRouter')
const postRoutes = require('./src/routes/postRoutes');
const middleware = require('./src/middlewares/requireLogin')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

app.use('/auth',authRouter);
app.use('/posts',middleware, postRoutes);

app.listen(Port, async() =>{
    console.log(`Server started at ${Port}`);
    connect();
})
