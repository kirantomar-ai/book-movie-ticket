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