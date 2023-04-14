const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require('cors')
app.use(cors())

const bookTicketsRoutes = express.Router()
app.use(express.static(path.join(__dirname, 'client','build')))

app.get('/' , (req,res)=>{
  res.sendFile(path.join(__dirname,'client','build','index.html'))
  
})

app.use('/showbuzz',bookTicketsRoutes)

bookTicketsRoutes.route('/').get((req,res)=>{
  // console.log("get request received")
  getLastBookingDetails(res);

})

bookTicketsRoutes.route('/booking').post((req,res)=>{
  let dataReceived = {...req.body}
    // console.log('post  request received.', dataReceived)
    saveBookingDetails(dataReceived,res)
})
//adding to database
const saveBookingDetails =async(bookingDetails,res)=>{
 const mongoDbReply=  await connection.create(bookingDetails)
//  console.log('mongodbreply',mongoDbReply)
 if(!('createdAt' in mongoDbReply)){
  res.status(500).send()
 }
 else{
  res.status(200).send(bookingDetails)
 }
}
//bringing last booking details data from database
const getLastBookingDetails = (res) =>{
      connection.findOne().sort({createdAt: -1}).exec((err,post)=>{
        // console.log(err,'post',post)
        if(err){
          res.status(500).send()
        }
        else if(!post){
          res.status(404).send()
        }
        else{
          let lastBookingDetails={}
          lastBookingDetails['movie'] = post.movie;
          lastBookingDetails['slot'] = post.slot;
          lastBookingDetails['seats'] = post.seats;
          res.status(200).send(lastBookingDetails)
        }
        
    })
  
 
}
app.listen(port, () => console.log(`App listening on port ${port}!`));
 