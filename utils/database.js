import mongoose from "mongoose";

let isConnected = false //track connection
const db = process.env.MONGODB_URI

export const connectToDB = async()=>
    {
        mongoose.set('strictQuery',true)

        if(isConnected)
            {
                console.log('mongoDB is already connected')
                return
            }
        
        try
        {
            await mongoose.connect(db,{
                dbName:'share_prompt',
                useNewUrlParser:true,
                useUnifiedTopology:true
            })

            isConnected = true

            console.log('mongoDB connected')
        } catch(error){console.log(error)}
    }