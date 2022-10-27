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


const UpdateItem = () => {
    const navigate = useNavigate();
    const id = useParams();

    const [data, setData] = useState({
        item_name: "",
        unit_price: "",
        type: "",
        supplier_Id: "",
        available_quantity: "",
    });

    let supplierList = [
        // value: "Supplements", label: "Supplements", name: "category" },
        
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
               
                item_name: data.data.data.item_name,
                unit_price: data.data.data.unit_price,
                 //category: { value: data.data.data.category, label: data.data.data.category, name: "category" },
                available_quantity: data.data.data.available_quantity,
                type: data.data.data.type,
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
                        options={supplierList}
                        value={data.supplier_Id}
                        onChange={(e) => handelSelectorChange(e)}
                        name="supplier_Id"
                    />

                    <label style={{ marginTop: '15px' }}>Enter type</label>
                    <input
                        className='form-control'
                        name="type"
                        type="text"
                        onChange={handleChange}
                        value={data.type}

                    />

                    <label style={{ marginTop: '15px' }}>Enter Quantity</label>
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
