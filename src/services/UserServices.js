import axios from "axios";

import StartUrl from "../configs/Url.json";

const GetAllUsersURL = StartUrl?.StartUrl + "/user/all-users";
  
export async function getAllUsers(){
    let result;
    await axios.get(GetAllUsersURL)
     .then(function(data) {  
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
         
           result = error.response;
         } else if (error.request) {          
           result = error.request;
         } 
       });
  return result; 
   
}