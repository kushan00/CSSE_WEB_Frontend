import React, { useState, useEffect } from "react";
import { getReqByID } from "../../services/PRServices";
import { CardTitle } from "reactstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UpdateStatus } from "../../services/PRServices";
import { createOrder } from "../../services/OrderService";

const ViewPr = () => {
  const navigate = useNavigate();




  const [data, setData] = useState({
    PR_Id:"",
    credit_notice:"",
    Company_details: "",
    Supplier_detils: "",
    delivery_details: "",
    order_Items: [],
    site_manager_id: "",
    required_date: "",
    id: "",
    total_price:"",
  });

  const [credit_notice, setcredit_notice] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setcredit_notice(e.target.value);
  };

  const id = useParams();

  const getSelectedPR = async () => {
    const data = await getReqByID(id.id);
    console.log("selected req data", data);
    var total = 0;
    data?.data?.data?.Requsition[0]?.order_Items.map((item) => {
        total = total + parseInt(item?.price);
    });
    setData({     
      Company_details: data?.data?.data?.Requsition[0]?.Company_details,
      Supplier_detils:data?.data?.data?.Requsition[0]?.Supplier_detils,
      delivery_details: data?.data?.data?.Requsition[0]?.delivery_details,
      site_manager_id:data?.data?.data?.Requsition[0]?.site_manager_id,
      required_date: data?.data?.data?.Requsition[0]?.required_date,
      order_Items: data?.data?.data?.Requsition[0]?.order_Items,
      PR_Id: data?.data?.data?.Requsition[0]?._id,
      total_price:total
    });
 
  };

  useEffect(() => {
    getSelectedPR();
  }, []);



  const addOrder = async (e) => {
    e.preventDefault();
      let newdata = await createOrder(data,credit_notice);
      console.log(" Order data ", newdata);
      if (newdata?.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "New Order Added!",
        });
        let update = await UpdateStatus(id.id);
        
        navigate("/received-prs");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed!",
        });
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
              <CardTitle style={{ color: "black", fontSize: "40px" }}><h3><b>Procurement Construction Industry</b></h3>
                <h3>

                 <h4><b>Place Order</b></h4>

                 <h4><b>Make Order</b></h4>

                </h3>
              </CardTitle>
            </center>

            <div className="container" style={{ width: "50%" }}>
              <form className="form-group" onSubmit={addOrder}>
                <label style={{ marginTop: "15px" }}>Supplier Details</label>
                <input
                  className="form-control"
                  name="Supplier_detils"
                  value={data?.Supplier_detils?.fullName}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Site Manager</label>
                <input
                  className="form-control"
                  name="site_manager_id"
                  value={data?.site_manager_id?.fullName}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Company</label>
                <input
                  className="form-control"
                  name="Company_details"
                  value={data.Company_details}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Delivery Details</label>
                <input
                  className="form-control"
                  name="delivery_details"
                  value={data.delivery_details}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Required Date</label>
                <input
                  className="form-control"
                  name="required_date"
                  value={data.required_date}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Order Items</label>
                <table className="table">
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  {data?.order_Items?.map((item) => {
                      return(
                        <tr>
                          <td>{item?.name}</td>
                          <td>{item?.quantity}</td>
                          <td>{item?.price}</td>
                        </tr>
                      )
                    })}
                </table>

                <label style={{ marginTop: "15px" }}>Total Price</label>
                <input
                  className="form-control"
                  name="total_price"
                  value={data.total_price}
                  type="number"
                  readOnly
                />

                <div className="row">
                  <div className="col">
                    {/* <label style={{ marginTop: "15px" }}>Order Status</label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      options={statusList}
                      value={order_status.order_status}
                      onChange={(e) => handleCategory(e)}
                      name="order_status"
                    /> */}

                    <label style={{ marginTop: "15px" }}>Credit Notice</label>
                    <textarea
                      className="form-control"
                      name="credit_notice"
                      onChange={(e)=>handleChange(e)}
                      value={credit_notice}
                      type="text"
                    />
                  </div>
                </div>

                <center>
                  <br></br>
                  <center>
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
                        </div>
                  </center>
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
