import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/order/createOrder";

export async function createOrder(data) {
    const alldata = {
        order_Id:data?.item_name,
        PR_Id:data?.unit_price,
        Supplier_detils:data?.type,
        site_manager_id:data?.available_quantity,
        Company_details:data?.Company_details,    
        delivery_details:data?.delivery_details,
        order_Items:data?.order_Items,
        total_price:data?.total_price,
        credit_notice:data?.credit_notice,
        required_date:data?.required_date,
        order_status:data?.order_status,
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
