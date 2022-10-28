import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/supplierShop/createSupplierShop";
const GetAllURL = StartUrl?.StartUrl + "/supplierShop/getAllSupplierShops";
const GetByIDURL = StartUrl?.StartUrl + "/supplierShop/getSupplierShop/";
const UpdateURL = StartUrl?.StartUrl + "/supplierShop/updateSupplierShop/";
const DeleteURL = StartUrl?.StartUrl + "/supplierShop/deleteSupplierShop/";

 
export async function createSupplierShop(data) {
    const alldata = {      
        supplierShop_name:data?.supplierShop_name,
        Location:data?.Location,
        supplier_Id:data?.supplier_Id?.value,
        Mobile:data?.Mobile      
    } 
    console.log("alldata",alldata);
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


  
export async function getAllSupplierShops(){
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
  
export async function getSupplierShopById(id){
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
  
export async function updateSupplierShop(id,data) {
    const alldata = {
        
        supplierShop_name:data?.supplierShop_name,
        Location:data?.Location,
        supplier_Id:data?.supplier_Id?.value,
        Mobile:data?.Mobile
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
  
export async function deleteSupplierShop(id) {
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