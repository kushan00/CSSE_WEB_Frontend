
export const OrderValidation =(data) =>{

    const messages ={
        status :"Status required",    
    };

    const output ={
            status : false,
            message : null
    };

    if(data.order_status.length <= 0 )
    {
        output.message = messages.status;
        output.status = false;
        return output;
    }
};