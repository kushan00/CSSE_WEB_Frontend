import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/order/createOrder";

export async function createOrder(data,credit_notice) {
    const alldata = {
        PR_Id:data?.PR_Id,
        Supplier_detils:data?.Supplier_detils?._id,
        site_manager_id:data?.site_manager_id?._id,
        Company_details:data?.Company_details,    
        delivery_details:data?.delivery_details,
        order_Items:data?.order_Items,
        total_price:data?.total_price,
        credit_notice:credit_notice,
        required_date:data?.required_date,
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
