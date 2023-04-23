import mongoose from 'mongoose'
const Schema = mongoose.Schema
import slug from 'mongoose-slug-generator'
import mongooseDelete from 'mongoose-delete'

mongoose.plugin(slug)
const Course = new Schema(
   {
      name: { type: String, require: true },
      description: { type: String, maxLength: 600 },
      image: { type: String },
      videoId: { type: String, require: true },
      slug: { type: String, slug: 'name' },
   },
   {
      timestamps: true,
   },
)
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true })
export default mongoose.model('Course', Course)
