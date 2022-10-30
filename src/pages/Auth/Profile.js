import React ,{ useContext , useState , useEffect } from "react";
import { useNavigate} from "react-router-dom";
import AuthContext from "../../context/Auth.context";
import { Auth } from "../../services/AuthServices"
import {
    Card,
    CardBody,
    Form,
    Button,
} from "reactstrap";
import Swal from 'sweetalert2';
import "./responsive.css";
import { ValidateUserUpdate } from "./Validation";
import { UpdateUser } from "../../services/AuthServices"

const Profile = () => {

    const navigate = useNavigate();

    const { Token } = useContext(AuthContext);

    const [User, setUser] = useState({});
    const [UserData, setUserData] = useState({
        fullName: "",
        email: "",
        mobileno:"+94",
    });

    
    const { fullName, email , mobileno  } = UserData;

    const onChange = (e) => {
        setUserData({ ...UserData, [e.target.name]: e.target.value });
    }

    const getUser = async () => {
        const data = await Auth(Token);
        console.log(data?.data?.data?.user);
        setUser(data?.data?.data?.user);
        setUserData({
            fullName: data?.data?.data?.user?.fullName,
            email: data?.data?.data?.user?.email,
            mobileno:data?.data?.data?.user?.mobileno,
        });
    }

    useEffect(() => {
        getUser();
    }, [])

    const [updateChange, setUpdaetChange] = useState(false);
    const ChangetoUpdate = (e) => {
        e.preventDefault();
        setUpdaetChange(true);
    };

    const UpdateData = async (e) => {

		e.preventDefault();

		let validate = ValidateUserUpdate(UserData);
		let msg = validate?.message;
		if(validate.status == false)
		{
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

		else{
                var data = await UpdateUser(User._id,UserData);
                console.log("data",data)
                if(data?.data?.status == 1)
                {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats!',
                    text: 'Update successfull...!',
                    })
                navigate("/profile");
                window.location.reload();
                }
                else
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed..!',
                        text: `${data?.data?.message}`,
                    })
                }
			}
	};

    
  return (
    <div>
        <div>
        <center>
            <h1 style={{fontSize:"40px" , marginBottom: "30px" , color:"white" , width:"800px"}}><b>{User?.fullName}'s Profile</b></h1>
                <div>
                    <Card id="responsiveCard">
                    <CardBody>
                        <div style={{ width: "600px" }}>
                        <br/>
                        <div >
                            <table className="table table-stripe-light" style={{fontSize:"20px" , color:"#1591b0" , fontWeight:"bold"}}>
                                <tr>
                                    <th>User ID</th>
                                    <th>User Role</th>
                                    <th>User Status</th>
                                </tr>
                                <tr>
                                    <td>{ User?.user_Id}</td>
                                    <td>{ User?.userRole}</td>
                                    <td>{User?.Status == null ? "No special Status to Show" : User?.Status}</td>
                                </tr>
                            </table>
                        </div>
                        <br/>
                        <Form className="form">
				        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Name"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Mobile no"
                                name="mobileno"
                                value={mobileno}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                            <br />
                            <Button
                            color="danger"
                            onClick={(e) => ChangetoUpdate(e)}
                            style={{ display: updateChange ? "none" : "flex" }}
                            >
                            Click To Update
                            </Button>
                            <Button
                            className="btn btn-dark"
                            onClick={(e) => UpdateData(e)}
                            style={{ display: updateChange ? "flex" : "none" }}
                            >
                            Update
                            </Button>
                            <br/>
                        </Form>
                        </div>
                    </CardBody>
                    </Card>  

                </div>
        </center>
        </div>
    </div>
  )
}

export default Profile