import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/payment/createPayment";
const UpdateStatusURL = StartUrl?.StartUrl + "/payment/getPaymentByStatus/";
const GetByInvoiceID = StartUrl?.StartUrl + "/invoice/getInvoiceById/";
const GetAllURL = StartUrl?.StartUrl + "/payment/getPayments";

export async function getPaymentById(id) {
  let result;
  await axios
    .get(GetByInvoiceID + id)
    .then(function (data) {
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


export async function createPayment(data, credit_notice) {
    const alldata = {
      invoice_Id: data?.invoice_Id,
      order_Id: data?.order_Id?._id,
      order_owner_site_manager_id: data?.order_owner_site_manager_id?._id,
      paidto_supplier_id: data?.paidto_supplier_id?._id,
      paidby_financial_manager_id: data?.paidby_financial_manager_id,
      total_amount: data?.total_amount,      
    };
  
    console.log("all data", alldata);
  
    let result;
    await axios
      .post(CreateURL, alldata)
      .then(function (data) {
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

  export async function UpdateStatus(id) {
    const alldata = {
      status: "accepted",
    };
    let result;
    await axios
      .put(UpdateStatusURL + id, alldata)
      .then(function (data) {
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

  export async function getPayments(){
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