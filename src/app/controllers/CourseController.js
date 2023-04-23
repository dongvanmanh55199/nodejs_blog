import Course from '../models/Course.js'
import { multipleMongooseToObject, mongooseToObject } from '../../util/mongoose.js'

class CourseController {
   show(req, res, next) {
      Course.findOne({ slug: req.params.slug })
         .then((course) =>
            res.render('courses/show', { course: mongooseToObject(course) }),
         )
         .catch(next)
   }
   create(req, res, next) {
      res.render('courses/create')
   }
   store(req, res, next) {
      // res.json(req.body)
      const formData = { ...req.body }
      formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
      const course = new Course(formData)
      course
         .save()
         .then(() => res.redirect(`/me/stored/courses`))
         .catch((error) => {
            res.send('Loi trung name')
         })
   }

   edit(req, res, next) {
      Course.findById(req.params.id)
         .then((course) =>
            res.render('courses/edit', { course: mongooseToObject(course) }),
         )
         .catch(next)
   }
   update(req, res, next) {
      Course.updateOne({ _id: req.params.id }, req.body)
         .then(() => res.redirect('/me/stored/courses'))
         .catch(next)
   }
   delete(req, res, next) {
      Course.delete({ _id: req.params.id })
         .then(() => res.redirect('back'))
         .catch(next)
   }
   forceDelete(req, res, next) {
      Course.deleteOne({ _id: req.params.id })
         .then(() => res.redirect('back'))
         .catch(next)
   }

   restore(req, res, next) {
      Course.restore({ _id: req.params.id })
         .then(() => res.redirect('back'))
         .catch(next)
   }
   handleFormActions(req, res, next) {
      switch (req.body.action) {
         case 'delete':
            Course.delete({ _id: { $in: req.body.courseIds } })
               .then(() => res.redirect('back'))
               .catch(next)
            break

         default:
            res.json({ message: 'Action is invalid' })
            break
      }
   }
}
export default new CourseController()
