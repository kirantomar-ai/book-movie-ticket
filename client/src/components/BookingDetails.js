import React from 'react'
const shortid = require('shortid')

function BookingDetails(props) {
  //this component shows the last booking details on the right side panel of the page.
  return (
    <div className='mt-5 mx-4 mb-5'>
      {props.lastBookingDetails.movie===''
      ?
      <h1>'No Previous Bookings found!!'</h1>
      :
      <div>
        <h1>Last Booking Details:</h1>
        <div className='mt-5 mx-5 booking-column'>
          <div>Movie:  {props.lastBookingDetails.movie}</div>
          <div>Slot:   {props.lastBookingDetails.slot}</div>
          <div>Seats:</div>
          {Object.keys(props.lastBookingDetails.seats).map((key)=> {
            return(
            <div key={shortid.generate()}>{key} : {props.lastBookingDetails.seats[key]}</div>
            )
          })}
            
        </div>
      </div>}
      
      
    </div>
  )
}

export default BookingDetails
