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
import { getPayments } from '../../services/PaidDetailsSrvices';




const PaymentHistory = () => {
    const navigate = useNavigate();

    const [paymentDetails, setPaymentDetails] = useState([]);
    const [loading, setLoading] = useState(false);
   

    const gettingPayments = async () => {
        try {
            setLoading(true);

            let data = await getPayments();


            console.log("all payments", data);
            let newData = data?.data?.data?.payments?.map((item) => {
                return {
                    invoice_Id: item?.invoice_Id?.invoice_Id,
                    order_Id: item?.order_Id?.order_Id,
                    order_owner_site_manager_id: item?.order_owner_site_manager_id?.fullName,
                    paidto_supplier_id: item?.paidto_supplier_id?.fullName,
                    paidby_financial_manager_id: item?.paidby_financial_manager_id?.fullName,
                    total_amount: item?.total_amount,
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
        gettingPayments();
    }, [])


    // const routeToCardPage = (e) => {
    //     e.preventDefault();
    //     navigate("/card");
    // }


    const columns = [

        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >Invoice ID</Badge>),
            selector: "invoice_Id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px" }}><b>{data?.invoice_Id}</b><br /></Label>
                </div>
            ),
        },
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
            name: (<Badge color="info" style={{ fontSize: "14px" }} >SiteManager Name</Badge>),
            selector: "order_owner_site_manager_id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px" }}><b>{data.order_owner_site_manager_id}</b><br /></Label>
                </div>
            ),
        },
        

        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >Supplier Name</Badge>),
            selector: "paidto_supplier_id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px" }}><b>{data.paidto_supplier_id}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >Finance Manager Name</Badge>),
            selector: "paidby_financial_manager_id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px" }}><b>{data.paidby_financial_manager_id}</b><br /></Label>
                </div>
            ),
        },

        {
            name: (<Badge color="info" style={{ fontSize: "14px" }} >Total Amount(LKR)</Badge>),
            selector: "total_amount",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "14px", color:'red' }}><b>LKR. {data.total_amount}</b><br /></Label>
                </div>
            ),
        },

        {
            name: (<Badge color="white"></Badge>),
            cell: (data) => (
                <div>
                    <a className="btn btn-success" style={{ color: 'white', fontSize: '11px' ,width:'150x'}} ><i class="fa-solid fa-circle-check"></i>&nbsp;&nbsp;Payment successfull</a>
                </div>
            ),
        },


    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card >
                    <CardHeader >
                        <CardTitle style={{ color: "black", fontSize: "30px", float: "left" }}><b>Payment History</b></CardTitle>
                        
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

export default PaymentHistory;
