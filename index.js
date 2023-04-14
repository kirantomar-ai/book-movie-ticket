import { getLastBookingDetails, saveBookingDetails } from "./requestHandlers";
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

app.listen(port, () => console.log(`App listening on port ${port}!`));
 