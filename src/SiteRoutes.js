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
                            <Route path='/profile' element={<Home />} />
                            <Route path='/received-prs' element={<Blank />} />
                            <Route path='/items-catalogue' element={<ViewItems />} />
                            <Route path='/view-prs' element={<Blank />} />
                            <Route path='/site-details' element={<Blank />} />
                            <Route path='/suppliers' element={<ViewSupplierShops />} />
                            <Route path='/logout' element={<Logout />} />

                            <Route path='/add-item' element={<AddItem />} />
                            <Route path='/update-item/:id' element={<UpdateItem />} />

                            <Route path='/add-suppliershop' element={<AddSupplierShop />} />
                            <Route path='/update-suppliershop/:id' element={<UpdateSupplierShop />} />
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