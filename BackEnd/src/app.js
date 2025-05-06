const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const app = express()
const cors = require('cors')
const path = require('path'); 


app.use(cors())
app.use(express.json())

const __dirname =path.resolve()


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