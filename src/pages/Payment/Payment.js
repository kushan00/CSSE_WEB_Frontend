import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
import Swal from 'sweetalert2';
import card from "../../images/card.png";
import {
    Badge,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    Form
} from "reactstrap";

import { ValidateAddNewCard } from "../Payment/cardValidation";
import { createCard } from "../../services/cardServices";



const Payment = () => {

    const navigate = useNavigate();



    const [ctype, setType] = useState("");
    const [holder, setHolder] = useState("");
    const [cardNum, setCardNum] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [cvv, setCvv] = useState("");

    const handleType = ({ currentTarget: input }) => {
        setType({ ...ctype, [input.ctype]: input.value });
    };


    const handleHolder = (e) => {
        e.preventDefault();
        setHolder(e.target.value)
    }
    const handleCardNum = (e) => {
        e.preventDefault();
        setCardNum(e.target.value)
    }
    const handleYear = (e) => {
        e.preventDefault();
        setYear(e.target.value)
    }
    const handleMonth = (e) => {
        e.preventDefault();
        setMonth(e.target.value)
    }
    const handleCvv = (e) => {
        e.preventDefault();
        setCvv(e.target.value)
    }

    const addCard = async (e) => {

        e.preventDefault();

        const carddata = {
            ctype: ctype?.radio,
            holder: holder,
            cardNum: cardNum,
            year: year,
            month: month,
            cvv: cvv

        }

        console.log("card data ", carddata)
        let validate = ValidateAddNewCard(carddata);

        let msg = validate.message;

        console.log(msg);
        if (validate.status == false) {
            Swal.fire({
                toast: true,
                icon: 'warning',
                html: `<span>${msg}</span>`,
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
            });

        }
        else {
            let data = await createCard(carddata);
            if (data?.data?.status === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'Payment Done!',
                })
                navigate("/view-invoices");
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed!',
                })
            }
        }

    }

 

    return (
        <div class='container'
            style={{
                marginTop: "70px",
                marginBottom: "70px",
                width: '800px',
                float: 'none',
                backgroundColor: 'white',
                border: '1px solid black'
            }}>
            <div style={{ margin: "10px" }}>

                <center>
                    <CardTitle style={{ color: "black", fontSize: "40px" }}><h3><b>Procurement Construction Industry</b></h3></CardTitle>

                    <h4><b>Payment Page</b></h4>
                    <br></br>
                    <br></br>
                </center>

                <div className="container" style={{ width: '80%', }}>
                    <form className='form-group' onSubmit={createCard} >


                        <center>
                            <img src={card} style={{ width: 220 }}></img>
                        </center>
                        <br></br>
                        <br></br>

                        <label><b>Select Card Type</b></label>
                        <br></br>
                        <input type="radio" value="visa" name="ctype" onChange={handleType} /> VISA
                        &nbsp; &nbsp;
                        <input type="radio" value="master" name="ctype" onChange={handleType} /> Master
                        &nbsp; &nbsp;
                        <input type="radio" value="american" name="ctype" onChange={handleType} /> American Express
                        &nbsp; &nbsp;


                        <br></br>
                        <br></br>
                        <label><b>Card Holder Name</b></label>
                        <Input type="text" className="input" placeholder="Card Holder Name" value={holder} onChange={(e) => handleHolder(e)} />
                        <br />

                        <label><b>Card Number</b></label>
                        <Input maxLength={16} type="text" className="input" placeholder="Card number" value={cardNum} onChange={(e) => handleCardNum(e)} />
                        <br />
                        <table>
                            <tr>
                                <td>
                                    <label><b>Year</b></label>
                                    <Input maxLength={2} type="text" className="input" placeholder="year" value={year} onChange={(e) => handleYear(e)} />
                                    &nbsp; &nbsp;
                                </td>
                                <td>
                                    <label><b>Month</b></label>
                                    <Input maxLength={2} type="text" className="input" placeholder="month" value={month} onChange={(e) => handleMonth(e)} />
                                    &nbsp; &nbsp;
                                </td>
                                <td>
                                    <label><b>CVV</b></label>
                                    <Input maxLength={3} type="text" className="input" placeholder="cvv" value={cvv} onChange={(e) => handleCvv(e)} />
                                    &nbsp; &nbsp;
                                </td>
                            </tr>
                        </table>


                        <center>
                            <Button className="btn btn-dark" onClick={(e) => addCard(e)} style={{ marginTop: "20px" }}>Submit</Button>
                        </center>
                    </form>
                </div>
            </div>

        </div>

    );

};
export default Payment;
