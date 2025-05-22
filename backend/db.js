/**
 *      Todo{
 *          title:string,
 *          discription: string,
 *          completed: boolean
 *      }
 */

//import mongoose module
const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()
//connect to db with url
mongoose.connect(process.env.MONGO_URL)


//make db schme structure
const todoSchema= mongoose.Schema({
    title:String,
    description:String,
    completed: Boolean
})

//store its reference
const todo = mongoose.model('todos',todoSchema )


//export to use other files
module.exports={
    todo:todo
}

