const mongoose=require('mongoose')

const subscriberSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    subscribeAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports=mongoose.model('Subscriber',subscriberSchema)