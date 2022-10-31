import React, { useState, useEffect } from "react";
import { getReqByID } from "../../services/PRServices";
import { CardTitle } from "reactstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getOrderByID } from "../../services/OrderService";

const ViewPr = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    PR_Id: "",
    credit_notice: "",
    Company_details: "",
    Supplier_detils: "",
    delivery_details: "",
    order_Items: [],
    site_manager_id: "",
    required_date: "",
    id: "",
    total_price: "",
  });

  const [credit_notice, setcredit_notice] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setcredit_notice(e.target.value);
  };

  const id = useParams();

  const getSelectedPR = async () => {
    const data = await getOrderByID(id.id);
    console.log("selected Order data", data);
    var total = 0;
    data?.data?.data?.Orders[0]?.order_Items.map((item) => {
      total = total + parseInt(item?.price);
      
    });
    setData({
      Company_details: data?.data?.data?.Orders[0]?.Company_details,
      Supplier_detils: data?.data?.data?.Orders[0]?.Supplier_detils,
      delivery_details: data?.data?.data?.Orders[0]?.delivery_details,
      site_manager_id: data?.data?.data?.Orders[0]?.site_manager_id,
      required_date: data?.data?.data?.Orders[0]?.required_date,
      order_Items: data?.data?.data?.Orders[0]?.order_Items,
      PR_Id: data?.data?.data?.Orders[0]?._id,
      total_price: total,
      credit_notice: data?.data?.data?.Orders[0]?.credit_notice,
      
    });
  };

  useEffect(() => {
    getSelectedPR();
  }, []);

  return (
    <div>
      <div>
        <div
          class="container"
          style={{
            marginTop: "70px",
            marginBottom: "70px",
            width: "950px",
            float: "none",
            backgroundColor: "white",
            border: "2px solid black",
          }}
        >
          <div>
            <center>
              <CardTitle style={{ color: "black", fontSize: "40px", margin: '30px' }}>
                <h3>
                  <b>View Order Details</b>
                </h3>
              </CardTitle>
            </center>

            <dl className="row">

              <dt className="col-sm-3"><b>Supplier Name</b></dt>
              <dd className="col-sm-9">{data?.Supplier_detils?.fullName}</dd>

              <br></br><br></br>

              <dt className="col-sm-3"><b>Site Manager Name</b></dt>
              <dd className="col-sm-9">{data?.site_manager_id?.fullName}</dd>

              <br></br><br></br>

              <dt className="col-sm-3"><b>Company Name</b></dt>
              <dd className="col-sm-9">{data.Company_details}</dd>

              <br></br><br></br>

              <dt className="col-sm-3"><b>Delivery Details</b></dt>
              <dd className="col-sm-9">{data.delivery_details}</dd>

              <br></br><br></br>

              <dt className="col-sm-3"><b>Required Date</b></dt>
              <dd className="col-sm-9">{data.required_date}</dd>

              <br></br><br></br>

              <dt className="col-sm-3"><b>Ordrer Items</b></dt>
              <dd className="col-sm-9">
                <table className="table table-striped table-secondary">
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  {data?.order_Items?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.name}</td>
                        <td>{item?.quantity}</td>
                        <td>{item?.price}</td>
                      </tr>
                    );
                  })}
                </table>
              </dd>

              <br></br><br></br><br></br>

              <dt className="col-sm-3"><b>Total Price</b></dt>
              <dd className="col-sm-9">LKR. {data.total_price}</dd>

              <br></br><br></br>

              <dt className="col-sm-3"><b>Credit Notice</b></dt>
              <dd className="col-sm-9">{data.credit_notice}</dd>



            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPr;
