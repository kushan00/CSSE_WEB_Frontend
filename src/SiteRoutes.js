import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from "./context/Auth.context";
import { useContext  } from "react";
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Home from './pages/Home';
import Logout from './pages/Auth/logout';
import Login from './pages/Auth/Login';
import AddItem from './pages/Staff_managment/AddItem';
import ViewItems from './pages/Staff_managment/ViewItems';
import UpdateItem from './pages/Staff_managment/UpdateItem';
import AddSupplierShop from './pages/Staff_managment/AddSupplierShop';
import UpdateSupplierShop from './pages/Staff_managment/UpdateSupplierShop';
import ViewSupplierShops from './pages/Staff_managment/ViewSupplierShop';
import ViewAllRequestions from './pages/HandleRequestions/ViewAllRequestions'
import ViewPr from './pages/HandleRequestions/ViewPr'
import Profile from './pages/Auth/Profile';

import ViewPayment from './pages/Payment/ViewPayment';
import Payment from './pages/Payment/Payment';

import ViewAllOrders from './pages/Order_management/ViewAllOrders'
import ViewOrder from './pages/Order_management/ViewOrder'
import EditOrder from './pages/Order_management/EditOrder'
import PaymentSuccess from './pages/Payment/PaymentSuccess';


function SiteRoutes() {


    const { userLogged } = useContext(AuthContext);
    console.log(" userLogged ",userLogged);
    return (
        <div>
            <BrowserRouter>

                <Routes>
                {userLogged ? 
                    (
                    <>
                        <Route path='/' element={<AppLayout />}>
                            <Route index element={<Home />} />
                            <Route path='/profile' element={<Profile  />} />
                            <Route path='/received-prs' element={<ViewAllRequestions />} />
                            <Route path='/received-prs' element={<Blank />} />
                            <Route path='/items-catalogue' element={<ViewItems />} />
                            <Route path='/view-orders' element={<ViewAllOrders />} />
                            <Route path='/site-details' element={<Blank />} />
                            <Route path='/suppliers' element={<ViewSupplierShops />} />
                            <Route path='/logout' element={<Logout />} />

                            <Route path='/add-item' element={<AddItem />} />
                            <Route path='/update-item/:id' element={<UpdateItem />} />

                            <Route path='/add-suppliershop' element={<AddSupplierShop />} />
                            <Route path='/update-suppliershop/:id' element={<UpdateSupplierShop />} />

                            <Route path='/accept-pr/:id' element={<ViewPr />} />


                            <Route path='/view-invoices' element={<ViewPayment/>} />
                            <Route path='/card' element={<Payment/>} />
                            <Route path='/payment-success' element={<PaymentSuccess />} />


                            <Route path='/view-order/:id' element={<ViewOrder />} />
                            <Route path='/edit-order/:id' element={<EditOrder />} />

                        </Route>
                    </>
                    )
                    :
                    (
                    <>
                        <Route path='*' element={<Login />}/>
                        <Route path='/login' element={<Login />} />
                    </>
                    )}
                    
                    
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default SiteRoutes;

//nethmi