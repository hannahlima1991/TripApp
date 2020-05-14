const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const session = require('express-session')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.urlencoded())

tasks = []

app.get('/trips', (req,res) => {
    res.render('trips', {listOfTask: tasks})
})
app.post('/tripsDelete', (req, res) => {
    let deletedPost = req.body.delete
    
    let newArrayWithoutDeletedPost = tasks.filter((post) => {
        return post.destination != deletedPost
    })
    tasks = newArrayWithoutDeletedPost
    console.log(tasks)
    res.redirect('/trips')
})
app.post('/trips',(req,res) => {
    let destination = req.body.destination
    let image = req.body.image
    let arrival = req.body.arrival
    let departure = req.body.departure
    
   

    let task = { destination: destination, image: image, arrival: arrival, departure: departure }
    tasks.push(task)
    res.redirect('trips')
})

app.listen(5000,() => {
    console.log('Server is running...')
})