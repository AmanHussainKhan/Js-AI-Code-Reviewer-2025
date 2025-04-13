require('dotenv').config()
const app = require('./src/app')

// console.log(process.env.GOOGLE_GEMINI_KEY)
app.get('/',async(req,res)=>{
    try {
        res.status(200).json({success:true,message:"Backend is working fine."})
        
    } catch (error) {
        res.status(500).json({success:false,message:"Backend error.",error:error})
        
    }
})
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})