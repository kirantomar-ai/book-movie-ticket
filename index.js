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

//this get request sends the main html file to render the frontend of the project.
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
    //this function creates a document in the collection based on the data send by the user in the post request//
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
  //this function finds the latest created document in the collection and send it to display in the frontend as last booking details//
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
 