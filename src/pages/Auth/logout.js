import React from 'react'
import { useNavigate } from 'react-router-dom';

const  Logout = ()=>  {

    const navigate = useNavigate();

    const handleSubmit = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("user");
      localStorage.removeItem("userID");
      localStorage.removeItem("_id");
      window.location.reload();
      navigate("/");
    }


    const closeLogout = () => {
      navigate("/");
    }

  return (
    <div>
      <center>
        <div style={{fontWeight:"bold" , fontSize:"25px"}}>
          Are You Sure Want to Logout?
        </div>
        <br></br>
        <div>        
          <button 
                style={{width:"150px"}}
                type="submit" 
                className="btn btn-success" 
                onClick={()=>handleSubmit()}
          >
            Yes
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button 
                style={{width:"150px"}}
                type="submit" 
                className="btn btn-danger" 
                onClick={()=>closeLogout()}
          >
            No
          </button>
        </div>
      </center>
    </div>
    
  )
}

export default Logout