const mongoose = require('mongoose');
const { Schema } = mongoose

const todoSchema = new Schema({
  task: String,
  description:String,
  completed: Boolean,
  user:{
    type:mongoose.ObjectId,
    ref:"User"
  }
})

const User = mongoose.model("Todo", todoSchema)

module.exports = User