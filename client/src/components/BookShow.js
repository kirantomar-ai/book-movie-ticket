import React ,{useState,useEffect}from 'react'
import {movies, slots ,seats} from './data'
import BookingDetails from './BookingDetails'
import { getBookingDetailsApi, sendBookingDetailsApi } from './api'
const shortid = require('shortid')

function BookShow() {
    
    let seatsData = {}
    seats.map((item,i)=>{
        seatsData[item] = 0
    })

    //set initial values to the selected values in the previous session, which are stored in the local storage.
    let initialSelectedSlotIndex = localStorage.getItem('selectedSlotIndex')
    if(initialSelectedSlotIndex!==null && initialSelectedSlotIndex!==""){
        initialSelectedSlotIndex = Number(initialSelectedSlotIndex) 
    }
     
    let initialSelectedMovieIndex =localStorage.getItem('selectedMovieIndex')
    if(initialSelectedMovieIndex!==null  && initialSelectedMovieIndex!==""){
        initialSelectedMovieIndex = Number(initialSelectedMovieIndex) 
    }
    
    let initialSelectedSeats =localStorage.getItem('selectedSeats')
    if(initialSelectedSeats!==null  ){
        initialSelectedSeats = JSON.parse(initialSelectedSeats)
    }
    else{
        initialSelectedSeats = seatsData
    }

    //this function is called each time when the user selects any of the value and stores those selected values in the local storage//
    const addToLocalStorage = (localStorageKey,newValue)=>{
        localStorage.setItem(localStorageKey,newValue)
    }

    const [selectedSeats, setSelectedSeats] = useState(initialSelectedSeats)
    const [selectedMovieIndex, setSelectedMovieIndex] = useState(initialSelectedMovieIndex);  
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(initialSelectedSlotIndex); 
    const [lastBookingDetails, setLastBookingDetails] = useState({movie:'',slot:'',seats:{}})
    
    const onMovieClick = (index,movie) => {
        setSelectedMovieIndex(index);
        addToLocalStorage('selectedMovieIndex',index)
    };
    const onSlotClick = (index,slot) => {
        setSelectedSlotIndex(index);
        addToLocalStorage('selectedSlotIndex',index)
    }

    const onSeatChange= (event, id) => {
        //this function checks that the max allowed seat limit is 20 and sets the selectedSeats as per user input//
        let numOfSeats = Number(event.target.value);
        if(numOfSeats>20){numOfSeats=20}
        let temp2 = {...selectedSeats}
        temp2[id] = numOfSeats
        setSelectedSeats(temp2)
        addToLocalStorage('selectedSeats',JSON.stringify(temp2))
    }
    
    
    const sendDataToServerFunc= (data)=>{
         //this function validates whether the user has selected all fields and then sends data to server//
        let isNumOfSeatsValid = false
        for(const key in data.seats){
           if(data.seats[key]===0) {
            isNumOfSeatsValid=false
           }else {
            isNumOfSeatsValid=true
            break
           }
        }
        let alertMessage = ''
        if( !data.movie || data.movie===''){
            alertMessage='Please! Select a Movie'
        }
        else if( !data.slot || data.slot===''){
            alertMessage='Please! Select a Time Slot'
        }
        else if(isNumOfSeatsValid===false){
            alertMessage='Please! Select the Seats.'
        }
        if(alertMessage === ''){
            //this function is called when the user clicks 'Book now' button and sends post request to server with the booking details,
            //along with that it also sets the last booking details received as a response to this post request//
            sendBookingDetailsApi({...data})
            .then((res )=>{
                if(res   &&  res.movie && res.slot && res.seats){
                    setLastBookingDetails(res)
                    setSelectedMovieIndex(null)
                    setSelectedSlotIndex(null)
                    setSelectedSeats(seatsData)
                    addToLocalStorage('selectedMovieIndex',"")
                    addToLocalStorage('selectedSlotIndex',"")
                    addToLocalStorage('selectedSeats',JSON.stringify(seatsData))  
                }
            })
            .catch(error => console.log('Error:', error)); 
        }
        else{
            alert(alertMessage)
        }
         
    }
   
    useEffect(() => {
        //this function is called when the page mounts and bring the last booking details from the server//
        getBookingDetailsApi()
        .then((res)=>{
            if(res  &&  res.movie && res.slot && res.seats){
                setLastBookingDetails(res)
            }
        }) 
        .catch(error => console.log('Error  :', error)); 
    },[] )
   
  return (
    <>
    <div className='container-fluid'>
        <div className='row' >
            <div className="d-flex justify-content-start p-2 navbar logo " > 
                <img className='mx-5' style={{width:"80px", height:"60px"}} src="https://media.istockphoto.com/id/1277789715/photo/movie-clapperboard-and-cinema-tickets-home-movie-night-party-invitation.jpg?b=1&s=170667a&w=0&k=20&c=brm2k8fRRNPKZO6wMyjwhg2VwQdP_LLsvsn6Wpx8WHM="/>
                <div className='mx-4 heading'>ShowBuzz</div>
            </div>
        </div>
        <div className='row mt-5' >
            <div className='col-9 p-0 mt-5 d-flex align-items-center'>
                <div className='w-100 '>
                    <div>
                        <h2 className="p-2 px-5 title">Book the Show now!!</h2>
                    </div>
                    <div className='m-5 movie-row'>
                        <h3 className='sub-heading'> Select A Movie</h3>
                        <div >
                            {movies.map((movie,index)=>{
                                return(
                                       <div className={selectedMovieIndex === index ?'movie-column-selected':'movie-column'}

                                            onClick={()=> {onMovieClick(index,movie)}}
                                            key ={shortid.generate()}
                                        >
                                            {movie}
                                        </div>                                    
                                )
                            })}
                        </div>
                    </div>
                    <div className=' m-5 slot-row'>
                        <h3 className='sub-heading' data-testid="titlebar">Select a Time slot</h3>
                        <div >
                            {slots.map((slot,index)=>{
                                return(
                                    <div className={selectedSlotIndex === index ? 'slot-column-selected':'slot-column'}
                                        onClick={()=>{onSlotClick(index,slot)}}  key ={shortid.generate()}
                                        
                                    >
                                        {slot}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className=' m-5 seat-row'>
                        <h3 className='sub-heading'>Select the seats</h3>
                        
                        <div >
                            {Object.keys(selectedSeats).map((seat,index)=>{
                                
                                return(
                                    <div className={selectedSeats[seat]>0 ? 'seat-column-selected':'seat-column'}
                                    key = {shortid.generate()}  
                                    >
                                        <div className='p-2'>Type {seat} :  </div>
                                        <div className='p-2'>
                                            <input  type="number"  min="0" max="20" value= {selectedSeats[seat]}
                                                onChange={(event)=>{onSeatChange(event,seat)}}                                                       
                                            />
                                        </div>
                                        
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div >
                        <button className='button-62  mx-5'
                                onClick={() => {
                                    sendDataToServerFunc({movie:movies[selectedMovieIndex],seats:selectedSeats,slot:slots[selectedSlotIndex]})
                                }}
                        >
                            Book Now
                        </button>
                    </div>
                </div>               
            </div>
            <div className='col-3 mt-5 booking-details-column'>
                <BookingDetails lastBookingDetails={lastBookingDetails}/>
            </div>
        </div>

    </div>  
  
    </>
  )
}

export default BookShow
