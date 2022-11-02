
import React, { useState, useEffect } from "react";
import { getPaymentById } from "../../services/PaidDetailsSrvices";
import { CardTitle } from "reactstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UpdateStatus } from "../../services/PaidDetailsSrvices";
import { createPayment } from "../../services/PaidDetailsSrvices";

const PaidDetails = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        invoice_Id: "",
        order_Id: "",
        order_owner_site_manager_id: "",
        paidto_supplier_id: "",
        paidby_financial_manager_id: "",
        total_amount: "LKR",
    });


    const handleChange = (e) => {
        e.preventDefault();

    };

    const id = useParams();

    const [invoiceID, setinvoiceID] = useState("");

    const getSelectedPayments = async () => {
        const data = await getPaymentById(id.id);
        console.log("selected Invoice data", data);

        setData({
            invoice_Id: data?.data?.data?.Invoice[0]?._id,
            order_Id: data?.data?.data?.Invoice[0]?.order_Id,
            order_owner_site_manager_id: data?.data?.data?.Invoice[0]?.site_manager_id,
            paidto_supplier_id: data?.data?.data?.Invoice[0]?.created_supplier_id,
            paidby_financial_manager_id: localStorage.getItem("_id"),
            total_amount: data?.data?.data?.Invoice[0]?.total_price,
        });
        setinvoiceID(data?.data?.data?.Invoice[0]?.invoice_Id);

    };

    useEffect(() => {
        getSelectedPayments();
    }, []);


   

    const addPaymentDetails = async (e) => {
        e.preventDefault();
        let newdata = await createPayment(data);
        console.log(" Payment data ", newdata);
        if (newdata?.status == 200) {
            Swal.fire({
                icon: "success",
                title: "Successful!",
                text: "Payment Confirmed!",
            });
            

            navigate("/card");
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed!",
            });
        }
    };



    return (
        <div>


            <div class='container'
                style={{
                    marginTop: "70px",
                    marginBottom: "70px",
                    width: '600px',
                    float: 'none',
                    backgroundColor: 'white',
                    border: '3px solid black'
                }}>
                <div style={{ margin: "10px" }}>

                    <center>
                        <CardTitle style={{ color: "black", fontSize: "40px" }}><h3><b>Procurement Construction Industry</b></h3></CardTitle>

                        <h4><b>Payment Details</b></h4>
                        <br></br>
                    </center>

                    <div className="container" style={{ width: '70%' }}>
                        <form className='form-group' onSubmit={addPaymentDetails} >



                            <label style={{ marginTop: '15px' }}><b>Invoice ID</b></label>
                            <input
                                className='form-control'
                                name="supplierShop_name"
                                onChange={handleChange}
                                value={invoiceID}
                                readOnly
                                style={{ height: '40px' }}
                            />

                            <label style={{ marginTop: '15px' }}><b>Order ID</b></label>
                            <input
                                className='form-control'
                                name="Location"
                                onChange={handleChange}
                                value={data.order_Id?.order_Id}
                                readOnly
                                style={{ height: '40px' }}

                            />

                            <label style={{ marginTop: '15px' }}><b>Site Manager Name</b></label>
                            <input
                                className="form-control"
                                name="supplier_Id"
                                onChange={handleChange}
                                value={data.order_owner_site_manager_id?.fullName}
                                readOnly
                                style={{ height: '40px' }}

                            />

                            <label style={{ marginTop: '15px' }}><b>Supplier Name</b></label>
                            <input
                                className='form-control'
                                name="paidto_supplier_id"
                                onChange={handleChange}
                                value={data.paidto_supplier_id?.fullName}
                                readOnly
                                style={{ height: '40px' }}


                            />

                            <label style={{ marginTop: '15px' }}><b>Financial Manager Name</b></label>
                            <input
                                className='form-control'
                                name="paidby_financial_manager_id"
                                onChange={handleChange}
                                value={localStorage.getItem("user")}
                                readOnly
                                style={{ height: '40px' }}


                            />

                            <label style={{ marginTop: '15px' }}><b>Total Amount (LKR)</b></label>
                            <input
                                className='form-control'
                                name="total_amount"
                                onChange={handleChange}
                                value={data.total_amount}
                                readOnly
                                style={{ height: '40px' }}

                            />


                            <center>
                                <br></br>
                                <button style={{ marginTop: '15px', marginBottom: '15px', width: '200px' }} type="submit" className="btn btn-dark" >
                                   Continue to payment
                                </button></center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaidDetails;