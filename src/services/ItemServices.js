import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/item/createItem";
const GetAllURL = StartUrl?.StartUrl + "/item/getAllItems";
const GetByIDURL = StartUrl?.StartUrl + "/item/getItem/";
const UpdateURL = StartUrl?.StartUrl + "/item/updateItem/";
const DeleteURL = StartUrl?.StartUrl + "/item/deleteItem/";

 
export async function createItem(data) {
    const alldata = {
        item_name:data?.item_name,
        unit_price:data?.unit_price,
        type:data?.type?.value,
        available_quantity:data?.available_quantity,
        supplier_Id:data?.supplier_Id?.value      
    } 

    console.log("all data",alldata);

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


  
export async function getAllItems(){
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
  
export async function getItemById(id){
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
  
export async function updateItem(id,data) {
    const alldata = {
        
        item_Id:data?.item_Id,
        item_name:data?.item_name,
        unit_price:data?.unit_price,
        supplier_Id:data?.supplier_Id?.value,
        type:data?.type.value,
        available_quantity:data?.available_quantity
       
    }  
    let result;
    await  axios.put(UpdateURL + id,alldata)
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
  
export async function deleteItem(id) {
    let result;
    await axios.delete(DeleteURL + id)
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