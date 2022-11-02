import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
    Badge,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    Form
} from "reactstrap";

import moment from 'moment';
import Swal from 'sweetalert2';
import { getAllInvoices } from '../../services/PaymentServices';




const ViewPayment = () => {
    const navigate = useNavigate();

    const [paymentDetails, setPaymentDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setopenModal] = useState(false);

    const getPayments = async () => {
        try {
            setLoading(true);

            let data = await getAllInvoices();


            console.log("all payments", data);
            let newData = data?.data?.data?.Invoices?.map((item) => {
                return {
                    order_Id: item?.order_Id?.order_Id,
                    created_supplier_id: item?.created_supplier_id?.fullName,
                    site_manager_id: item?.site_manager_id?.fullName,
                    order_Items: item?.order_Items,
                    total_price: item?.total_price,
                    discount: item?.discount,
                    final_price: item?.final_price,
                    _id: item?._id,
                }
            })
            setPaymentDetails(newData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getPayments();
    }, [])


    const routeToPaymentHistory = (e) => {
        e.preventDefault();
        navigate("/payment-history");
    }


    const columns = [

        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >Order ID</Badge>),
            selector: "order_Id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px" }}><b>{data?.order_Id}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >Supplier Name</Badge>),
            selector: "created_supplier_id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px" }}><b>{data?.created_supplier_id}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >SiteManager Name</Badge>),
            selector: "site_manager_id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px" }}><b>{data.site_manager_id}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "14px", width: '100px' }} >Order Items</Badge>),
            selector: "order_Items",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label ></Label>

                    <a className="btn btn-secondary" style={{ color: 'white', fontSize: '10px' }} onClick={() => setopenModal(true)}>View Items</a>
                    <div>
                        <Modal
                            isOpen={openModal}
                            className="modal-dialog-centered"
                            fade={true}
                            backdrop={true}>
                            <ModalHeader
                                toggle={() => {
                                    setopenModal(false);
                                }}>
                                <Label>ORDER ITEMS</Label>
                                <p></p>
                            </ModalHeader>
                            <ModalBody >
                                <div style={{ width: "470px"}}>
                                  
                                        <table className="table table-dark">
                                            <tr>
                                                <th style={{ fontSize: "16px" }}>Item Name</th>
                                                <th style={{ fontSize: "16px" }}>Quantity</th>
                                                <th style={{ fontSize: "16px" }}>Price</th>
                                            </tr>
                                            {data?.order_Items?.map((item) => {
                                                return (
                                                    <tr>
                                                        <td style={{ fontSize: "16px" }}>{item?.name}</td>
                                                        <td style={{ fontSize: "16px" }}>{item?.quantity}</td>
                                                        <td style={{ fontSize: "16px" }}>LKR. {item?.price}</td>
                                                    </tr>
                                                )
                                            })}
                                        </table>
 
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>

                </div>
            ),
        },

        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >Total Price</Badge>),
            selector: "total_price",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px" }}><b>LKR. {data.total_price}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >Discount</Badge>),
            selector: "discount",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px" }}><b>LKR. {data.discount}</b><br /></Label>
                </div>
            ),
        },

        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >Net Price</Badge>),
            selector: "final_price",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px", color:'red' }}><b>LKR. {data.final_price}</b><br /></Label>
                </div>
            ),
        },

        {
            name: (<Badge color="white"></Badge>),
            cell: (data) => (
                <div>
                    <a href={`/paid-details/${data?._id}`}className="btn btn-dark" style={{ color: 'white', fontSize: '14px' }} >Payment</a>
                </div>
            ),
        },


    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card >
                    <CardHeader >
                        <CardTitle style={{ color: "black", fontSize: "30px", float: "left" }}><b>View Received Invoices</b></CardTitle>

                        <Button className="btn btn-info" style={{ fontSize: "15px", float: "right", width: '200px' ,height:'40px'}} onClick={(e) => routeToPaymentHistory(e)}><b>  View Payment History</b></Button>
                    </CardHeader>
                    <CardBody >
                        <DataTable
                            data={paymentDetails}
                            columns={columns}
                            progressPending={loading}
                        />
                    </CardBody>
                </Card>
            </div>

        </div>

    );

};

export default ViewPayment;
