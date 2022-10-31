import axios from "axios";

import StartUrl from "../configs/Url.json";


const GetAllURL = StartUrl?.StartUrl + "/invoice/getAllInvoices";

  
export async function getAllInvoices(){
    let result;
    await axios.get(GetAllURL)
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
