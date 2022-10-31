
export const ValidateAddNewCard=(formData) =>{

    const messages ={
     
       HOLDER :"Holder name is required with should at least be 3 letters",
       CARD_NUM :"Card number must contain 16 numbers",
       YEAR :"Expire year must contain 2 numbers",
       MONTH :"Expire month must contain 2 numbers",
       CVV :"CVV is must contain 3 numbers",
       

    };

    const regdata = {
        holder: formData.holder,
        cardNum: formData.cardNum,
        year: formData.year,
        month: formData.month,
        cvv: formData.cvv,
       

    }


    const output ={
            status : false,
            message : null
    };

   
    if(formData.holder.length <= 2 )
    {
        output.message = messages.HOLDER;
        output.status = false;
        return output;
    
    }

    if(formData.cardNum.length <= 15 )
    {
        output.message = messages.CARD_NUM;
        output.status = false;
        return output;
    
    }

    if(formData.year.length <= 1 )
    {
        output.message = messages.YEAR;
        output.status = false;
        return output;
    
    }

    if(formData.month.length <= 1 )
    {
        output.message = messages.MONTH;
        output.status = false;
        return output;
    
    }

    if(formData.cvv.length <= 2 )
    {
        output.message = messages.CVV;
        output.status = false;
        return output;
    
    }
    else
    {
        output.status = true;
        return output;
    }
 
};