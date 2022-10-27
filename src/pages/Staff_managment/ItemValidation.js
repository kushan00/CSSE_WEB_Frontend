
export const itemValidation =(data) =>{

    const messages ={
       ITEM_NAME :"required",
       

    };

    const output ={
            status : false,
            message : null
    };

    if(data.item_name.length <= 2 )
    {
        output.message = messages.ITEM_NAME;
        output.status = false;
        return output;
    
    }
    else{
        output.status = true;
        return output;
    }
    
 
};