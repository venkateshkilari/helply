import { AxiosErrors } from "./axios_errors";
import axios from "axios";
import COMMON_CONSTANTS from "../constants/common_constants";
import jsonwebtoken from "jsonwebtoken";
const AXIOS_SERVICE = {
  getRequest: async (vueInstance,url, headers) => {
    try {
      return await axios({
        method: "get",
        baseURL: COMMON_CONSTANTS.APPLICATION_URL,
        url: url,
        headers: headers
      })
        .then(function(data) {
          return data;
        })
        .catch(function(error) {
          throw new AxiosErrors(error);
        });
    } catch (error) {
      throw new AxiosErrors(error);
    }
  },
  postRequest:async (vueInstance,url, headers, payload) => {
    try {
      headers["csrf-token"] = jsonwebtoken.sign(
        {
          data: "foobar"
        },
        COMMON_CONSTANTS.CSRF_TOKEN_KEY,
        {
          //algorithm: COMMON_CONSTANTS.CSRF_TOKEN_ALGORITHM,
          expiresIn: COMMON_CONSTANTS.CSRF_TOKEN_EXPIRATION,
          audience: window.location.origin,
          issuer: COMMON_CONSTANTS.CSRF_TOKEN_ISSUER
        }
      );
      if(vueInstance.GetUserDetails)
      {
      headers["token"]=vueInstance.GetUserDetails.Token;
      }
      return await axios({
        method: "post",
        baseURL: COMMON_CONSTANTS.APPLICATION_URL,
        url: url,
        headers: headers,
        data: payload
      })
        .then(function({data}) {
          return data;
        })
        .catch(function(error) {
          throw new AxiosErrors(error);
        });
    } catch (error) {
      throw new AxiosErrors(error);
    }
  }
};
export default AXIOS_SERVICE;
