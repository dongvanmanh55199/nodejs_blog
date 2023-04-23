import mongoose from 'mongoose'
const Schema = mongoose.Schema

const New = new Schema({
   name: { type: String, maxLength: 255 },
   description: { type: String, maxLength: 600 },
   image: { type: String },
   createAt: { type: Date, default: Date.now },
   updateAt: { type: Date, default: Date.now },
})

export default mongoose.model('New', New)
