const mongoose =  require("mongoose")

var mongoURL='mongodb+srv://admin:admin@cluster0.g6jarfc.mongodb.net/HMS'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })


var connection= mongoose.connection
connection.on('error',()=>{
    console.log('MongoDB connection failure')
})

connection.on('connected', () => {
    console.log('MongoDB connection Successful');
});