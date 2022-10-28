import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import Select from "react-select"
import {
    CardTitle,
} from "reactstrap";

import Swal from 'sweetalert2';


import { itemValidation } from "../Staff_managment/ItemValidation";
import { updateItem, getItemById } from "../../services/ItemServices";
import { getAllSupplierShops } from "../../services/SupplierShopServices";


const UpdateItem = () => {
    const navigate = useNavigate();
    const id = useParams();

    const [shopList, setShopList] = useState([]);


    const getshopList = async () => {
        try {
            const res = await getAllSupplierShops();
            console.log("Supplier List", res);
            var supList = [];
            res?.data?.data?.SupplierShops?.map((item) => {
                supList.push({ value: item._id, label: item.supplierShop_name, name: "supplier_Id" })
            });
            setShopList(supList);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getshopList();
    }, []);

    const [data, setData] = useState({
        item_name: "",
        unit_price: "",
        type: "",
        supplier_Id: "",
        available_quantity: "",
    });

    let typeList = [
        { value: "Cube", label: "Cube", name: "type" },
        { value: "Kg", label: "Kg", name: "type" },
        { value: "Pillow", label: "Pillow", name: "type" },
        { value: "Bars", label: "Bars", name: "type" },
        { value: "Peices", label: "Peices", name: "type" },
    ];

    const handelSelectorChange = (e) => {
        console.log(e);
        setData({ ...data, [e.name]: e });
    }


    const handleChange = ({ currentTarget: input }) => {
        console.log(input);
        setData({ ...data, [input.name]: input.value });
    };

    const getById = async () => {
        try {
            let data = await getItemById(id?.id);
            console.log("data", data.data.data);
            setData({


                item_name: data?.data?.data?.Items[0]?.item_name,
                unit_price: data?.data?.data?.Items[0]?.unit_price,
                available_quantity: data?.data?.data?.Items[0]?.available_quantity,
                supplier_Id: {
                    value: data?.data?.data?.Items[0]?.supplier_Id?._id,
                    label: data?.data?.data?.Items[0]?.supplier_Id?.supplierShop_name,
                    name: "supplier_Id"
                },
                type: data?.data?.data?.Items[0]?.type,
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getById();
    }, [])

    const updateSelectedItem = async (e) => {

        e.preventDefault();

        let validate = itemValidation(data);
        let msg = validate?.message;
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
            let newdata = await updateItem(id?.id, data);
            console.log(" Item data ", newdata);
            if (newdata?.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'Item Updated!',
                })
                navigate("/items-catalogue");

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

                    <h4><b>Update Item</b></h4>
                    <br></br>
                </center>

                <div className="container" style={{ width: '50%', }}>
                    <form className='form-group' onSubmit={updateSelectedItem} >



                        <label style={{ marginTop: '15px' }}>Enter Item Name</label>
                        <input
                            className='form-control'
                            name="item_name"
                            onChange={handleChange}
                            value={data.item_name}

                        />

                        <label style={{ marginTop: '15px' }}>Enter Item Price</label>
                        <input
                            className='form-control'
                            name="unit_price"
                            onChange={handleChange}
                            value={data.unit_price}
                            type='number'

                        />
                        <label style={{ marginTop: '15px' }}>Select Supplier</label>
                        <Select
                            className="React"
                            classNamePrefix="select"
                            options={shopList}
                            value={data.supplier_Id}
                            onChange={(e) => handelSelectorChange(e)}
                            name="supplier_Id"
                        />

                        <label style={{ marginTop: '15px' }}>Enter Item Type</label>
                        <Select
                            className="React"
                            classNamePrefix="select"
                            name="type"
                            onChange={(e) => handelSelectorChange(e)}
                            value={data.type}
                            options={typeList}

                        />

                        <label style={{ marginTop: '15px' }}>Enter Item Quantity</label>
                        <input
                            className='form-control'
                            name="available_quantity"
                            onChange={handleChange}
                            value={data.available_quantity}
                            type='number'

                        />




                        <center><button style={{ marginTop: '15px', marginBottom: '15px', width: '200px' }} type="submit" className="btn btn-dark" >
                            Update Item
                        </button></center>
                    </form>
                </div>
            </div>

        </div>

    );

};

export default UpdateItem;
