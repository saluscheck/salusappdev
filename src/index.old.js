let express = require('express')
let app = express()
let personRoute = require('./routes/person')
let customerRoute = require('./routes/customer')
let sanctionsRoute = require('./routes/sanctions')
let sdnRoute = require('./routes/sdn')
let lxnxRoute = require('./routes/lxnx')
let path = require('path')
let bodyParser = require('body-parser')
var cors = require('cors')

const corsConfig = {
  origin: ["https://testapi.aml-check.com"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsConfig))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  next()
})
app.use(personRoute)
app.use(customerRoute)
app.use(sanctionsRoute)
app.use(sdnRoute)
app.use(lxnxRoute)
app.use(express.static('public'))

// Hander for 404 - Not found
app.use((req, res, next) => {
  res.status(404).send('The page you have requested does not exist!')
})

// Handler for Error 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))
