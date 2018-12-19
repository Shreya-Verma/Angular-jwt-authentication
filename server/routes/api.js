const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const User      = require('../models/user');
const jwt = require('jsonwebtoken');

const db        = 'mongodb://username:password@ds247357.mlab.com:47357/eventsdb';

// Connect to database at mLab through mangoose
mongoose.connect(db, (err)=>{
    if(err){
        console.error('Error!' + err);
    }else{
        console.log('Connected to MongoDB');
    }
});


// Verify token
function verifyToken(req, res, next){
    if (!req.headers.authorization) {
        return res.status(401).send('Unautorized Request');
    } 
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        return res.status(401).send('Unautorized Request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload){
        return res.status(401).send('Unautorized Request');
    }

    req.userId = payload.subject;
    next();
}




// Global API
 router.get('/', (req , resp) =>{
     resp.send('From API Route');
 });


// Register Users API
router.post('/register', (req, res)=>{
    let userData = req.body;
    let user = new User(userData);
    user.save((error , registeredUser) =>{
        if (error){
            console.log(error);
        }else{
            let payload = { subject:registeredUser._id };
            let token = jwt.sign(payload , 'secretKey');
            res.status(200).send({token});
        }
    })
});


// Login API
router.post('/login',(req, res)=>{
    let userData = req.body;
    User.findOne({email: userData.email}, (err,user) =>{
        if(err){
            console.log('Error' + err);
        }else{
            if(!user){
              res.status(401).send('Invalid Email');  
            }else{
                if(user.password !== userData.password) {
                    res.status(401).send('Invalid Password!');
                }else{
                    let payload = {
                        subject : user._id
                    };
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token});
                }
            }
        }
    })
});


// Get Events
router.get('/events' , (req,res)=>{
    let events = [ {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }];
    res.json(events);
});


//Special Events
router.get('/special', verifyToken , (req, res)=>{
    let specialEvents = [{
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }];
    res.json(specialEvents);
});


module.exports = router;