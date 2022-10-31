import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Select from "react-select"
import editIcon from "../../images/pencil.png"
import binIcon from "../../images/bin.png"
import "../../images/style.css"
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

import { getAllItems } from '../../services/ItemServices';
import { deleteItem } from "../../services/ItemServices";



const ViewItems = () => {
    const navigate = useNavigate();

    const [ItemDetails, setItemDetails] = useState([]);
    const [loading, setLoading] = useState(false);




    const getItems = async () => {
        try {
            setLoading(true);
            let data = await getAllItems();
            console.log("all Items", data);
            let newData = data?.data?.data?.Items?.map((item) => {
                return {
                    item_name: item?.item_name,
                    unit_price: item?.unit_price,
                    type: item?.type,
                    available_quantity: item?.available_quantity,
                    _id: item?._id,
                    supplier_Id:item?.supplier_Id?.supplierShop_name ? 
                                item?.supplier_Id?.supplierShop_name : "No Supplier",
                }
            })
            setItemDetails(newData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getItems();
    }, [])


    //Delete Item

    const removeItem = async (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let data = deleteItem(id);
                console.log("Delete ", data);
                Swal.fire(
                    'Deleted!',
                    'Item has been deleted.',
                    'info'
                )
                getItems();
            }
        })
    }



    const routeToAddPage = (e) => {
        e.preventDefault();
        navigate("/add-item");
    }


    const columns = [

        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Item Name</Badge>),
            selector: "item_name",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.item_name}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Unit Price(LKR)</Badge>),
            selector: "unit_price",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.unit_price}.00</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Supplier Name</Badge>),
            selector: "supplier_Id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.supplier_Id}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Item Type</Badge>),
            selector: "type",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.type}</b><br /></Label>
                </div>
            ),
        },
       
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} > Item Quantity</Badge>),
            selector: "available_quantity",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.available_quantity}</b><br /></Label>
                </div>
            ),
        },
        

        {
            name: (<Badge color="secondary"  ></Badge>),

            cell: (data) => (
                <div className="row">
                    <div className="col">
                        <a href={`/update-item/${data?._id}`}> <img src={editIcon} style={{ height: "25px", width: "25px" }} /></a>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="col">
                        <a onClick={() => removeItem(data?._id)} ><img src={binIcon} style={{ height: "25px", width: "25px", cursor: "pointer" }} /></a>
                    </div>
                </div>

            ),
        },





    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card >
                    <CardHeader >

                        <CardTitle style={{ color: "black", fontSize: "30px", float: "left" }}><b>Item Catelogue</b></CardTitle>

                        

                        <Button className="btn btn-dark" style={{ fontSize: "15px", float: "right", width: '200px' }} onClick={(e) => routeToAddPage(e)}><i class="fa-solid fa-circle-plus"></i><b>  Add New Item</b></Button>

                        {/* &nbsp;&nbsp;&nbsp; */}

                        {/* <div style={{ fontSize: "15px", float: "right", marginLeft: "10px", marginRight: '20px' }}>&nbsp;&nbsp;&nbsp;
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button btn btn-info"
                                table="table-to-xls"
                                filename="Items Details"
                                sheet="tablexls"
                                buttonText={<i class="fa-solid fa-print"></i>}
                            />
                        </div> */}



                    </CardHeader>
                    <CardBody >

                        <DataTable

                            data={ItemDetails}
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
                    {ItemDetails.map((Item, index) => (
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
                        <td>{ItemDetails.length}</td>
                    </tr>
                </table> */}
            </div>

        </div>

    );

};

export default ViewItems;
