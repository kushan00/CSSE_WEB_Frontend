import axios from "axios";

import StartUrl from "../configs/Url.json";

const LoginURL = StartUrl?.StartUrl + "/user/signin";
const AuthURL = StartUrl?.StartUrl + "/user/auth";
const UpdateUserURL = StartUrl?.StartUrl + "/user/update-user/";

export async function LoginUsers(data){
    const alldata = {
        email:data?.email,
        password:data?.password,
    };
    
    let result;
    await  axios.post(LoginURL,alldata)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}


export async function Auth(token){
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    let result;
    await  axios.get(AuthURL,config)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}

export async function UpdateUser(id,data) {
  const alldata = {
      fullName: data?.fullName,
      mobileno: data?.mobileno,
      email: data?.email,
  };

  return await axios.put(UpdateUserURL + id, alldata);

}