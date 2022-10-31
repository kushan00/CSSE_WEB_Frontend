import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import editIcon from "../../images/pencil.png"
import binIcon from "../../images/bin.png"
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

import { getAllSupplierShops } from '../../services/SupplierShopServices';
import { deleteSupplierShop } from "../../services/SupplierShopServices";



const ViewSupplierShops = () => {
    const navigate = useNavigate();

    const [ItemDetails, setItemDetails] = useState([]);
    const [loading, setLoading] = useState(false);



    const getSupplierShops = async () => {
        try {
            setLoading(true);

            let data = await getAllSupplierShops();

            console.log("all SupplierShops", data);
            let newData = data?.data?.data?.SupplierShops?.map((item) => {
                return {
                    supplierShop_name: item?.supplierShop_name,
                    Location: item?.Location,
                    Mobile: item?.Mobile,
                    _id: item?._id,
                    supplier_Id:item?.supplier_Id?.fullName
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
        getSupplierShops();
    }, [])




    const removeSupplierShop = async (id) => {

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
                let data = deleteSupplierShop(id);
                console.log("Delete ", data);
                Swal.fire(
                    'Deleted!',
                    'Supplier Shop has been deleted.',
                    'info'
                )
                getSupplierShops();
            }
        })
    }



    const routeToAddPage = (e) => {
        e.preventDefault();
        navigate("/add-supplierShop");
    }


    const columns = [

        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Supplier Shop Name</Badge>),
            selector: "supplierShop_name",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.supplierShop_name}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Location</Badge>),
            selector: "Location",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.Location}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Supplier Shop Owner</Badge>),
            selector: "supplier_Id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.supplier_Id}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Mobile Number</Badge>),
            selector: "Mobile",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.Mobile}</b><br /></Label>
                </div>
            ),
        },
       
      

        {
            name: (<Badge color="secondary"  ></Badge>),

            cell: (data) => (
                <div className="row">
                    <div className="col">
                        <a href={`/update-suppliershop/${data?._id}`}> <img src={editIcon} style={{ height: "25px", width: "25px" }} /></a>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="col">
                        <a onClick={() => removeSupplierShop(data?._id)} ><img src={binIcon} style={{ height: "25px", width: "25px", cursor: "pointer" }} /></a>
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

                        <CardTitle style={{ color: "black", fontSize: "30px", float: "left" }}><b>Suppliers</b></CardTitle>

                        

                        <Button className="btn btn-dark" style={{ fontSize: "15px", float: "right", width: '200px' }} onClick={(e) => routeToAddPage(e)}><i class="fa-solid fa-circle-plus"></i><b>  Add New Supplier Shop</b></Button>

                        {/* &nbsp;&nbsp;&nbsp; */}

                        {/* <div style={{ fontSize: "15px", float: "right", marginLeft: "10px", marginRight: '20px' }}>&nbsp;&nbsp;&nbsp;
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button btn btn-dark"
                                table="table-to-xls"
                                filename="SupplierShops Details"
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
                        <th>Total SupplierShops</th>
                        <td>{ItemDetails.length}</td>
                    </tr>
                </table> */}
            </div>

        </div>

    );

};

export default ViewSupplierShops;
