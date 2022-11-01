
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
        total_amount: "",

    });


    const handleChange = (e) => {
        e.preventDefault();

    };

    const id = useParams();

    const getSelectedPayments = async () => {
        const data = await getPaymentById(id.id);
        console.log("selected payments data", data);
        
        setData({
            invoice_Id: data?.data?.data?.Invoices[0]?.invoice_Id,
            order_Id: data?.data?.data?.Invoices[0]?.order_Id?._id,
            order_owner_site_manager_id: data?.data?.data?.Invoices[0]?.order_owner_site_manager_id?._id,
            paidto_supplier_id: data?.data?.data?.Invoices[0]?.paidto_supplier_id._id,
            paidby_financial_manager_id: data?.data?.data?.Invoices[0]?.paidby_financial_manager_id._id,
            total_amount: data?.data?.data?.Invoices[0]?.total_amount,
            payment_Id:data?.data?.data?.Invoices[0]?._id,

        });

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
                text: "Payment success",
            });
            let update = await UpdateStatus(id.id);

            navigate("/");
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
                    width: '800px',
                    float: 'none',
                    backgroundColor: 'white',
                    border: '1px solid black'
                }}>
                <div style={{ margin: "10px" }}>

                    <center>
                        <CardTitle style={{ color: "black", fontSize: "40px" }}><h3><b>Procurement Construction Industry</b></h3></CardTitle>

                        <h4><b>Payment details</b></h4>
                        <br></br>
                    </center>

                    <div className="container" style={{ width: '50%', }}>
                        <form className='form-group' onSubmit={addPaymentDetails} >



                            <label style={{ marginTop: '15px' }}>Invoice ID</label>
                            <input
                                className='form-control'
                                name="supplierShop_name"
                                onChange={handleChange}
                                value={data.invoice_Id}
                                readOnly

                            />

                            <label style={{ marginTop: '15px' }}>Order ID</label>
                            <input
                                className='form-control'
                                name="Location"
                                onChange={handleChange}
                                value={data.order_Id}
                                readOnly
                                

                            />

                            <label style={{ marginTop: '15px' }}>Site Manager</label>
                            <input
                                className="form-control"
                                name="supplier_Id"
                                onChange={handleChange}
                                value={data.order_owner_site_manager_id?.fullName}
                                readOnly

                            />

                            <label style={{ marginTop: '15px' }}>Supplier ID</label>
                            <input
                                className='form-control'
                                name="paidto_supplier_id"
                                onChange={handleChange}
                                value={data.paidto_supplier_id?.fullName}
                                readOnly
                               

                            />

                            <label style={{ marginTop: '15px' }}>Financial Manager</label>
                            <input
                                className='form-control'
                                name="paidby_financial_manager_id"
                                onChange={handleChange}
                                value={data.paidby_financial_manager_id?.fullName}
                                readOnly
                               

                            />

                            <label style={{ marginTop: '15px' }}>Total Amount</label>
                            <input
                                className='form-control'
                                name="total_amount"
                                onChange={handleChange}
                                value={data.total_amount}
                                readOnly
                              

                            />


                            <center>
                                <br></br>
                                <button style={{ marginTop: '15px', marginBottom: '15px', width: '200px' }} type="submit" className="btn btn-dark" >
                                    Checkout
                                </button></center>
                        </form>
                    </div>
                </div>
            </div> 
            </div>
        )
            }

    export default PaidDetails;