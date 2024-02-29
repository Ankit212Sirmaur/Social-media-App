const express = require('express');
const {Port} = require('./src/config/serverConfig');
const connect = require('./src/config/databaseConfig')
const authRouter = require('./src/routes/authRouter')
const postRoutes = require('./src/routes/postRoutes');
const middleware = require('./src/middlewares/requireLogin')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/auth',authRouter);
app.use('/getAll',middleware, postRoutes);

app.listen(Port, async() =>{
    console.log(`Server started at ${Port}`);
    connect();
})
