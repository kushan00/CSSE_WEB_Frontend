import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/card/createCard";
const GetAllURL = StartUrl?.StartUrl + "/card/getAllCards";
const GetByIDURL = StartUrl?.StartUrl + "/card/getCardById/";


 
export async function createCard(data) {
    const alldata = {
        
        type:data?.type,
        holder:data?.holder,
        cardNum:data?.cardNum,
        year:data?.year,
        month:data?.month,
        cvv:data?.cvv,


    } 
    let result;
    await axios.post(CreateURL,alldata)
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
  
export async function getAllCards(){
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
  
export async function getCardById(id){
    let result;
    await axios.get(GetByIDURL + id)
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
















