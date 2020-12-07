import AXIOS_SERVICE from "./axios_service";
import COMMON_CONSTANTS from "../constants/common_constants";

const register_service = {
    RegisterNewUser : async viewModel =>{
       debugger;
       return await AXIOS_SERVICE.postRequest(
           viewModel,
              "api/Login/RegisterNewUser",
              COMMON_CONSTANTS.DEFAULT_CONTENT_TYPE_HEADER,
              viewModel.registerData
            ).catch(error => {
              throw error;
            })
            .then(data =>{
                debugger;
                if(data){
                    alert("registered!!");
                }
            })  
    }

};

export default register_service;
