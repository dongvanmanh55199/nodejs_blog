import mongoose from 'mongoose'

async function connect() {
   try {
      await mongoose
         .connect('mongodb://127.0.0.1:27017/f8_education_dev')
         .then(() => console.log('Connected successfully!'))
   } catch (error) {
      console.log('Connected failure!')
   }
}

export { connect }
