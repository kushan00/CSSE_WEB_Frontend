import React from 'react'
import payimg from '../../images/pay.png';

function PaymentSuccess() {
  return (
    <div>
        <center>
        <img src={payimg} style={{ height: "200px", width: "200px",marginTop:'160px' }} />
        <br></br>
        <br></br>
        <h1 style={{color:'white'}}> PAYMENT SUCCESS</h1>
        </center>
    </div>
  )
}

export default PaymentSuccess