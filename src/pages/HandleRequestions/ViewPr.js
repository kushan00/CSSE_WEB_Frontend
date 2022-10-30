import React, { useState, useEffect } from "react";
import { getReqByID } from "../../services/PRServices";
import { CardTitle } from "reactstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { OrderValidation } from "../HandleRequestions/OrderValidation";
import { UpdateStatus } from "../../services/PRServices";
import { createOrder } from "../../services/OrderService";

const ViewPr = () => {
  const navigate = useNavigate();

  let statusList = [
    { value: "accept", label: "Approved", name: "order_status" },
    { value: "reject", label: "Reject", name: "order_status" },
  ];

  const [order_status, setStatus] = useState({
    order_status: "",
  });

  const handleCategory = (e) => {
    console.log(e);
    setStatus({ ...order_status, [e.name]: e });
  };

  const [PRDetails, setRequestionDetails] = useState([]);

  const [data, setData] = useState({
    Company_details: "",
    Supplier_detils: "",
    delivery_details: "",
    order_Items: "",
    site_manager_name: "",
    required_date: "",
    id: "",
  });

  const id = useParams();

  const getSelectedPR = async () => {
    const data = await getReqByID(id.id);
    console.log("selected req data", data);

    setData({
      Company_details: data?.data?.data?.Requsition[0]?.Company_details,
      Supplier_detils:
        data?.data?.data?.Requsition[0]?.Supplier_detils.fullName,
      delivery_details: data?.data?.data?.Requsition[0]?.delivery_details,
      site_manager_name:
        data?.data?.data?.Requsition[0]?.site_manager_id.fullName,
      required_date: data?.data?.data?.Requsition[0]?.required_date,
      id: data?.data?.data?.Requsition[0]?._id,
    });
  };

  useEffect(() => {
    getSelectedPR();
  }, []);

  const rejectPr = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UpdateStatus(id);
        Swal.fire("Rejected!", "Item has been reject.", "success");

        navigate("/received-prs");
      }
    });
  };

  const addOrder = async (e) => {
    e.preventDefault();

    let validate = OrderValidation(data);
    let msg = validate?.message;
    if (validate.status == false) {
      Swal.fire({
        toast: true,
        icon: "warning",
        html: `<span>${msg}</span>`,
        animation: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
      });
    } else {
      let newdata = await createOrder(data);
      console.log(" Order data ", newdata);
      if (newdata?.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "New Order Added!",
        });
        navigate("/received-prs");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed!",
        });
      }
    }
  };

  return (
    <div>
      <div>
        <div
          class="container"
          style={{
            marginTop: "70px",
            marginBottom: "70px",
            width: "1100px",
            float: "none",
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          <div>
            <center>
              <CardTitle style={{ color: "black", fontSize: "40px" }}>
                <h3>
                  <b>Make Order</b>
                </h3>
              </CardTitle>
            </center>

            <div className="container" style={{ width: "50%" }}>
              <form className="form-group" onSubmit={addOrder}>
                <label style={{ marginTop: "15px" }}>Supplier Details</label>
                <input
                  className="form-control"
                  name="Supplier_detils"
                  //onChange={handleChange}
                  value={data.Supplier_detils}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Site Manager</label>
                <input
                  className="form-control"
                  name="site_manager_name"
                  //onChange={handleChange}
                  value={data.site_manager_name}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Company</label>
                <input
                  className="form-control"
                  name="Company_details"
                  // onChange={handleChange}
                  value={data.Company_details}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Delivery Details</label>
                <input
                  className="form-control"
                  name="delivery_details"
                  // onChange={handleChange}
                  value={data.delivery_details}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Required Date</label>
                <input
                  className="form-control"
                  name="required_date"
                  // onChange={handleChange}
                  value={data.required_date}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Order Items</label>
                <input
                  className="form-control"
                  name="order_Items"
                  // onChange={handleChange}
                  value={data.order_Items}
                  type="text"
                />

                <label style={{ marginTop: "15px" }}>Total Price</label>
                <input
                  className="form-control"
                  name="total_price"
                  // onChange={handleChange}
                  value={data.total_price}
                  type="number"
                />

                <div className="row">
                  <div className="col">
                    <label style={{ marginTop: "15px" }}>Order Status</label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      options={statusList}
                      value={order_status.order_status}
                      onChange={(e) => handleCategory(e)}
                      name="order_status"
                    />

                    <label style={{ marginTop: "15px" }}>Credit Notice</label>
                    <input
                      className="form-control"
                      name="credit_notice"
                      // onChange={handleChange}
                      value={data.credit_notice}
                      type="text"
                    />
                  </div>
                </div>

                <center>
                  <br></br>

                  <div className="row">
                    <div className="col">
                      <button
                        style={{
                          marginTop: "15px",
                          marginBottom: "15px",
                          width: "200px",
                        }}
                        type="submit"
                        className="btn btn-dark"
                      >
                        Place Order
                      </button>
                    </div>
                    <div className="col">
                      <button
                        style={{
                          marginTop: "15px",
                          marginBottom: "15px",
                          width: "200px",
                        }}
                        onClick={() => rejectPr(data.id)}
                        className="btn btn-danger"
                      >
                        Reject Order
                      </button>
                    </div>
                  </div>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPr;
