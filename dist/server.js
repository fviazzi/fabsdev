const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

// Force https
app.enable('trust proxy')

app.use(function (request, response, next) {

  if (process.env.NODE_ENV !== 'development' && !request.secure) {
    return response.redirect('https://' + request.headers.host + request.url)
  }

  next()
})

// The __dirname is the current directory from where the script is running
app.use(express.static(__dirname))

// Send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port)
