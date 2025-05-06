const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const app = express()
const cors = require('cors')
const path = require('path'); 

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
};

app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'../frontend/dist')))
}

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

module.exports = app