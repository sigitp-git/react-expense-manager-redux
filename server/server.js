// lightweight dev server using expressjs for prod build
// node server/server.js

const path = require('path')
const express = require('express')
const app = express()
const publicPath = path.join(__dirname, '..', 'public')
// heroku port
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

// single page app to route to index.html
app.get('*', (req, resp) => {
    resp.sendFile(path.join(publicPath, 'index.html'))
})

// port used from heroku env variable or localhost:3000
app.listen(port, () => {
    console.log('Express server is up!')
})