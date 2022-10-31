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
import { getAllOrders } from '../../services/OrderService';
import { UpdateStatus } from "../../services/PRServices";



const ViewAllRequestions = () => {
    const navigate = useNavigate();

    const [PRDetails, setRequestionDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const getOrders = async () => {
        try {
            setLoading(true);
            let data = await getAllOrders();
            console.log("all orders", data);

            let array = [];
            data?.data?.data?.Requsition?.map((item) => {
              if (item?.status == "pending") {
                array.push(item);
              }
            });

            let newData =  data?.data?.data?.Orders?.map((pr) => {
                return {
                    company_name: pr?.Company_details,
                    order_id: pr?.order_Id,
                    suplier_name: pr?.Supplier_detils?.fullName,
                    delivery_details: pr?.delivery_details,
                    order_Items: pr?.order_Items,
                    required_date: pr?.required_date,
                    site_manager_name: pr?.site_manager_id.fullName,    
                    _id :pr?._id,
                }
            })
            setRequestionDetails(newData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])


    const routeToViewPage = (e) => {
        e.preventDefault();
        navigate("/add-item");
    }


    const columns = [

        {
            name: (<Badge color="success" style={{ fontSize: "16px" }} >Company Name</Badge>),
            selector: "company_name",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.company_name}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="success" style={{ fontSize: "16px" }} >Order ID</Badge>),
            selector: "order_id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.order_id}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="success" style={{ fontSize: "16px" }} >Supplier Name</Badge>),
            selector: "suplier_name",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.suplier_name}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="success" style={{ fontSize: "16px" }} >Delivery Details</Badge>),
            selector: "delivery_details",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.delivery_details}</b><br /></Label>
                </div>
            ),
        },
       
        {
            name: (<Badge color="success" style={{ fontSize: "16px" }} > Required Date</Badge>),
            selector: "required_date",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.required_date}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="success" style={{ fontSize: "16px" }} > Site Manager</Badge>),
            selector: "site_manager_name",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.site_manager_name}</b><br /></Label>
                </div>
            ),
        },
        
        {
            name: (<Badge color="secondary"  ></Badge>),
            cell: (data) => (
                <div>
                    <a href={`/view-order/${data?._id}`} className="btn btn-primary">View Order</a>                   
                </div>
            ),
        },

        {
            name: (<Badge color="secondary"  ></Badge>),
            cell: (data) => (
                <div>
                    <a href={`/edit-order/${data?._id}`} className="btn btn-success" >Edit Order</a>
                </div>
            ),
        },
    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card >
                    <CardHeader >
                        <CardTitle style={{ color: "black", fontSize: "30px", float: "left" }}><b>Received Orders</b></CardTitle>
                    </CardHeader>
                    <CardBody >
                        <DataTable
                            data={PRDetails}
                            columns={columns}
                            progressPending={loading}
                        />
                    </CardBody>
                </Card>
            </div>

        </div>

    );

};

export default ViewAllRequestions;
