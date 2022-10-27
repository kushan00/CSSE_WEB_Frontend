import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select"
import {
    CardTitle,
} from "reactstrap";
import { getAllUsers } from "../../services/UserServices";
import Swal from 'sweetalert2';


import { supplierShopValidation } from "../Staff_managment/SupplierShopValidation";
import { updateSupplierShop, getSupplierShopById } from "../../services/SupplierShopServices";


const UpdateSupplierShop = () => {
    const navigate = useNavigate();
    const id = useParams();

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

    const [data, setData] = useState({
        supplierShop_name: "",
        Location: "",
        supplier_Id: "",
        Mobile: "",
    });

  

    const handleChange = ({ currentTarget: input }) => {
        console.log(input);
        setData({ ...data, [input.name]: input.value });
    };
    
    const handelSelectorChange = (e) => {
        console.log(e);
        setData({ ...data, [e.name]: e });
    }

    const getById = async () => {
        try {
            let data = await getSupplierShopById(id?.id);
            console.log("data", data);
            setData({               
                supplierShop_name: data?.data?.data?.SupplierShops[0]?.supplierShop_name,
                Location: data?.data?.data?.SupplierShops[0]?.Location,
                supplier_Id: {
                              value:data?.data?.data?.SupplierShops[0]?.supplier_Id?._id,
                              label:data?.data?.data?.SupplierShops[0]?.supplier_Id?.fullName,
                              name:"supplier_Id"
                             },
                Mobile: data?.data?.data?.SupplierShops[0]?.Mobile,                
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getById();
    }, [])


    const updateSelectedSupplierShop = async (e) => {

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
            let newdata = await updateSupplierShop(id?.id, data);
            console.log(" Item data ", newdata);
            if (newdata?.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'supplier Shop Updated!',
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

                    <h4><b>Update Supplier Shop</b></h4>
                    <br></br>
                </center>

                <div className="container" style={{ width: '50%', }}>
                    <form className='form-group' onSubmit={updateSelectedSupplierShop} >


                       
                        <label style={{ marginTop: '15px' }}>Enter Supplier Shop Name</label>
                        <input
                            className='form-control'
                            name="supplierShop_name"
                            onChange={handleChange}
                            value={data.supplierShop_name}

                        />

                        <label style={{ marginTop: '15px' }}>Enter Location</label>
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

                        <label style={{ marginTop: '15px' }}>Mobile Number</label>
                        <input
                            className='form-control'
                            name="Mobile"
                            onChange={handleChange}
                            value={data.Mobile}
                            type='number'

                        />
                       

                        <center><button style={{ marginTop: '15px', marginBottom: '15px', width: '200px' }} type="submit" className="btn btn-dark" >
                            Update Supplier Shop
                        </button></center>
                    </form>
                </div>
            </div>

        </div>

    );

};

export default UpdateSupplierShop;
