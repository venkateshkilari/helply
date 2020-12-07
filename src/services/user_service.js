
import AXIOS_SERVICE from "../services/axios_service";
import USER_CONSTANTS from "../constants/user_constants";
import COMMON_CONSTANTS from "../constants/common_constants";
import HelplyModal from "../view_models/BookingModal.json";

const USER_SERVICE = {
  GetUserDetails: async vm => {

      return await AXIOS_SERVICE.postRequest(vm,
        USER_CONSTANTS.GET_USER_DETAILS_URL,
        COMMON_CONSTANTS.DEFAULT_CONTENT_TYPE_HEADER,   
        vm.datafromModel.User     
      )
        .then(data => {
          debugger;
          HelplyModal.User.FirstName=data.FirstName;
          HelplyModal.User.LastName=data.LastName;
          HelplyModal.User.PhoneNumber=data.PhoneNumber;
          HelplyModal.User.Email=data.Email;
          HelplyModal.User.Address=data.Address;
          return HelplyModal.User;
          });
         
       
    },
    UpdateUserDetails:async vm=>{
      return await AXIOS_SERVICE.postRequest(vm,
        USER_CONSTANTS.UPDATE_USER_DETAILS,
        COMMON_CONSTANTS.DEFAULT_CONTENT_TYPE_HEADER,   
        vm.datafromModel.User     
      )
    } 
};
export default USER_SERVICE;
