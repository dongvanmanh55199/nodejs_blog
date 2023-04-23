import Course from '../models/Course.js'
import { multipleMongooseToObject } from '../../util/mongoose.js'
class MeController {
   // [GET] /search
   storedCourses(req, res, next) {
      let courseQuery = Course.find({})

      // res.json(res.locals._sort)
      if (req.query.hasOwnProperty('_sort')) {
         const isValidtype = ['asc', 'desc'].includes(req.query.type)
         courseQuery = courseQuery.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
         })
      }

      Promise.all([courseQuery, Course.countDocumentsDeleted()]).then(
         ([courses, deletedCount]) =>
            res.render('me/stored-courses', {
               deletedCount,
               courses: multipleMongooseToObject(courses),
            }),
      )

      // Course.countDocumentsDeleted()
      //    .then((deletedCount) => console.log(deletedCount))
      //    .catch(() => {})
      // Course.find({})
      //    .then((courses) =>
      //       res.render('me/stored-courses', {
      //          courses: multipleMongooseToObject(courses),
      //       }),
      //    )
      //    .catch(next)
   }
   trashCourses(req, res, next) {
      Course.findDeleted({})
         .then((courses) =>
            res.render('me/trash-courses', {
               courses: multipleMongooseToObject(courses),
            }),
         )
         .catch(next)
   }
}
export default new MeController()
