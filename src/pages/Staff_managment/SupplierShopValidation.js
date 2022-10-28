
export const supplierShopValidation =(data) =>{

    const messages ={
        SUPPLIERSHOP_NAME :"required",
       

    };

    const output ={
            status : false,
            message : null
    };

    if(data.supplierShop_name.length <= 2 )
    {
        output.message = messages.SUPPLIERSHOP_NAME;
        output.status = false;
        return output;
    
    }
    else
    {
        output.status = true;
        return output;
    }
    
 
};