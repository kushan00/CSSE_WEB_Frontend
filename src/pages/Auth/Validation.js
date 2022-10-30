
export const ValidateUserUpdate=(formData) =>{

    const messages ={
       FULL_NAME_EMPTY :"The name should at least be 3 letters...",
       EMAIL_EMPTY : "Email must contain @ and atleast 3 letter before for the prefix...",
       MOBILE_NO_EMPTY : "Enter a valid mobile number...",

    };

    const output ={
            status : false,
            message : null
    };

    if(formData.fullName.length <= 2 )
    {
        output.message = messages.FULL_NAME_EMPTY;
        output.status = false;
        return output;
    
    }
    if(formData.email.length <= 2)
    {
        output.message = messages.EMAIL_EMPTY;
        output.status = false;
        return output;
    } 
    if((formData.mobileno.length < 10) || (formData.mobileno.length > 12))
    {
        output.message = messages.MOBILE_NO_EMPTY;
        output.status = false;
        return output;
    }
    else
    {
        output.status = true;
        return output;
    }
 
};