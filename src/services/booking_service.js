import AXIOS_SERVICE from "./axios_service"
import COMMON_CONSTANTS from "../constants/common_constants"


const BOOKING_SERVICE=
{
   saveBookingDetails:async function(vueInstance,viewModel){
       try{
       return await AXIOS_SERVICE.postRequest(vueInstance,"api/Booking/Book",COMMON_CONSTANTS.DEFAULT_CONTENT_TYPE_HEADER,viewModel).then((data)=>{
         return data;
       })
       }
       catch(error){
        throw error;
      }
   }
}

export default BOOKING_SERVICE;