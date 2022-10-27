import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select"
import { CardTitle } from "reactstrap";
import { getAllUsers } from "../../services/UserServices";
import Swal from 'sweetalert2';
import { supplierShopValidation } from "../Staff_managment/SupplierShopValidation";
import { createSupplierShop } from "../../services/SupplierShopServices";

const AddSupplierShop = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({

        supplierShop_name: "",
        Location: "",
        supplier_Id: "",
        Mobile: "",
    });

    const [supplierList,setSupplierList] = useState([]);

    const getsupplierList = async () => {
        try {
            const res = await getAllUsers();
            console.log("Supplier List", res);
            var supList = [];
            res?.data?.data?.users?.map((item) =>{
                if(item?.userRole == "supplier")
                {
                    supList.push({value:item._id,label:item.fullName,name:"supplier_Id"})
                }

            });
            setSupplierList(supList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getsupplierList();
    },[]);

    const handelSelectorChange = (e) => {
        console.log(e);
        setData({ ...data, [e.name]: e });
    };
   
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const addSupplierShop = async (e) => {

        e.preventDefault();

        let validate = supplierShopValidation(data);
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
            let newdata = await createSupplierShop(data);
            console.log(" SupplierShop data ", newdata);
            if (newdata?.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'New Supplier Shop added!',
                })
                navigate("/suppliers");

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

                    <h4><b>Add New Supplier Shop</b></h4>
                    <br></br>
                </center>

                <div className="container" style={{ width: '50%', }}>
                    <form className='form-group' onSubmit={addSupplierShop} >


                       
                        <label style={{ marginTop: '15px' }}>Enter Supplier Shop Name</label>
                        <input
                            className='form-control'
                            name="supplierShop_name"
                            onChange={handleChange}
                            value={data.supplierShop_name}

                        />

                        <label style={{ marginTop: '15px' }}>Enater Location</label>
                        <input
                            className='form-control'
                            name="Location"
                            onChange={handleChange}
                            value={data.Location}
                            type='text'

                        />
                      
                        <label style={{ marginTop: '15px' }}>Enter Supplier Owner</label>
                        <Select
                            className="React"
                            classNamePrefix="select"
                            options={supplierList}
                            name="supplier_Id"
                            onChange={(e) => handelSelectorChange(e)}
                            value={data.supplier_Id}

                        />

                        <label style={{ marginTop: '15px' }}>Enter Mobile Number</label>
                        <input
                            className='form-control'
                            name="Mobile"
                            onChange={handleChange}
                            value={data.Mobile}
                            type='number'

                        />


                        <center>
                            <br></br>
                            <button style={{ marginTop: '15px', marginBottom: '15px', width: '200px' }} type="submit" className="btn btn-dark" >
                                Add Supplier Shop
                            </button></center>
                    </form>
                </div>
            </div>

        </div>

    );

};

export default AddSupplierShop;