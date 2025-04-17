const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const connectDB=require('./config/db.js')
const userRoutes=require('./routes/userRoutes.js')
const productRoutes=require('./routes/ProductRoutes.js')
const cartRoutes=require('./routes/cartRoutes.js')
const checkoutRoutes=require('./routes/checkoutRoutes.js')
const orderRoutes=require('./routes/orderRoutes.js')
const uploadRoutes=require('./routes/uploadRoutes.js')
dotenv.config()

const app=express()
app.use(express.json())
app.use(cors());

const PORT=process.env.PORT||3000
// Connect to MongoDB
connectDB()

app.get("/",(req,res)=>{
    res.send("Welcome to Rabbit api")
})
// API Routes
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/checkout',checkoutRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})