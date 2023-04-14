export const getBookingDetailsApi =()=>{
    return fetch('/showbuzz/',{
        method: 'GET',
        headers: {'Content-type': 'application/json; charset=UTF-8',}
    })
    .then((response)=>{
        if(response.status===200){
            // console.log('get',response)
            return response.json()
        }
        else{
            return null
        }  
    })
}

export const sendBookingDetailsApi  = (data={})=>{
    return fetch('/showbuzz/booking', {
        method: 'POST',
        body: JSON.stringify({...data}),
        headers: {'Content-type': 'application/json; charset=UTF-8',}
    })
    .then((response)=> {
        if(response.status === 200){
            return response.json()
        }
        else{
            return null
        }  
    })
}