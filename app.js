const express = require('express')
const session = require('express-session')

const port = process.env.PORT || 3000
const app = express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 5000,
        secure: false }
  }))

app.use('/',(req,res) =>{
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
      } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
      }
})

app.listen(port, () =>{
    console.log(`Server is up on port ${port}!`)
})