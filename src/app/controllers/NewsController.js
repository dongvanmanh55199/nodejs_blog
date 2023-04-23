import New from '../models/News.js'
class NewsController {
   // [GET] /news
   index(req, res) {
      res.render('news')
   }

   // [GET] /news/:slug
   show(req, res) {
      New.find({}).then((news) => {
         res.json(news)
      })
      // res.send('NEWS DETAIL');
   }
}
export default new NewsController()
