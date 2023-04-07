const express = require('express')
const app = express()
const port = 3333

app.get('/', (req, res) => {
    a=1;
    b=2;
  return res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})