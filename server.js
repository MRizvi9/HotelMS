const express =  require("express")

const app = express();

const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const userRoute = require('./routes/userRoute')
app.use(express.json())

app.use('/api/rooms',roomsRoute)
app.use('/api/user',userRoute)

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log('Node is started with nodemon'));