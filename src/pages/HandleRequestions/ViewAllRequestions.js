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
//import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { getAllRequsitions } from '../../services/PRServices';
import { UpdateStatus } from "../../services/PRServices";



const ViewAllRequestions = () => {
    const navigate = useNavigate();

    const [PRDetails, setRequestionDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRequesions = async () => {
        try {
            setLoading(true);
            let data = await getAllRequsitions();
            console.log("all PR", data);

            let array = [];
            data?.data?.data?.Requsition?.map((item) => {
              if (item?.status == "pending") {
                array.push(item);
              }
            });

            let newData = array.map((pr) => {
                return {
                    company_name: pr?.Company_details,
                    Requsition_id: pr?.Requsition_id,
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
        getRequesions();
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
            name: (<Badge color="success" style={{ fontSize: "16px" }} >Requestion ID</Badge>),
            selector: "Requsition_id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.Requsition_id}</b><br /></Label>
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
                    <a href={`/accept-pr/${data?._id}`} className="btn btn-primary">View Order</a>                   
                </div>
            ),
        },

        // {
        //     name: (<Badge color="secondary"  ></Badge>),
        //     cell: (data) => (
        //         <div>
        //             <a onClick={() => rejectPr(data?._id)} className="btn btn-danger" >Reject PR</a>
        //         </div>
        //     ),
        // },
    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card >
                    <CardHeader >

                        <CardTitle style={{ color: "black", fontSize: "30px", float: "left" }}><b>Received Requesitons</b></CardTitle>


                        {/* &nbsp;&nbsp;&nbsp; */}

                        {/* <div style={{ fontSize: "15px", float: "right", marginLeft: "10px", marginRight: '20px' }}>&nbsp;&nbsp;&nbsp;
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button btn btn-success"
                                table="table-to-xls"
                                filename="Items Details"
                                sheet="tablexls"
                                buttonText={<i class="fa-solid fa-print"></i>}
                            />
                        </div> */}



                    </CardHeader>
                    <CardBody >

                        <DataTable

                            data={PRDetails}
                            columns={columns}
                            progressPending={loading}
                        />
                    </CardBody>
                </Card>

                {/* <table id="table-to-xls" style={{ display: "none" }}>
                    <tr>
                        <th></th>
                        <th>Item ID</th>
                        <th>Category</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>In stock</th>
                        <th>Expired Date</th>
                    </tr>
                    {PRDetails.map((Item, index) => (
                        <tr >
                            <th scope="row">{index + 1}</th>
                            <td><b>{Item?._id}</b></td>
                            <td><b>{Item.category}</b></td>
                            <td><b>{Item.ItemName}</b></td>
                            <td><b>LKR. {Item.ItemPrice}</b></td>
                            <td><b>{Item.quantity}</b></td>
                            <td><b>{moment(Item?.expireDate).format(" YYYY-MM-DD ")}</b></td>
                        </tr>
                    ))}
                    <tr></tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Total Items</th>
                        <td>{PRDetails.length}</td>
                    </tr>
                </table> */}
            </div>

        </div>

    );

};

export default ViewAllRequestions;
