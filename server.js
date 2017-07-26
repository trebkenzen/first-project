const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/my_database', {useMongoClient: true})
.then(() => console.log('successfully connected to DB'))
.catch(err => console.log('error connecting to DB', err));

const app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())


const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const UserSchema = new Schema({
    id    : ObjectId,
    firstName     : String,
    lastName      : String,
    email      : String,
    password    : String,
    balance: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', UserSchema);


app.use(express.static(__dirname + '/client/public'));

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname + '/client/public/index.html'))
});



// routes
app.get('/test', (req, res) => {
    res.send('I am testing')
});

app.get('/', (req, res) => {
    res.send('Im in a HomePage')
});


// create user
app.post('/create-user', (req, res) => {
    User.create(req.body)
    .then(user => res.send(user))
    .catch(err => res.send(errr))
});

// get a single user
app.get('/get-user/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err => res.send(errr))
});

// get all users
app.get('/get-users', (req, res) => {
    User.find()
    .then(users => res.send(users))
    .catch(err => res.send(errr))
});

// update a user info
app.put('/edit-user/:id', (req, res) => {
    User.update({_id: req.params.id}, req.body)
    .then(user => res.send('Successfully updated user'))
    .catch(err => res.send(errr))
});

// delete a user
app.delete('/delete-user/:id', (req, res) => {
    User.remove({_id: req.params.id})
    .then(user => res.send('Successfully deleted user'))
    .catch(err => res.send(errr))
});

// start express server
app.listen(4000, () => console.log('express server started on port 4000'));

