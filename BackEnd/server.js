require('dotenv').config()
const express = require('express');
const aiRoutes = require('../routes/ai.routes')
const app = express();
const cors = require('cors')



app.use(express.json())

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
};
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.use('/ai', aiRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:3000')
})