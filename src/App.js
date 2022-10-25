import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Home from './pages/Home';
import Logout from './pages/Auth/logout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/profile' element={<Home />} />
                    <Route path='/received-prs' element={<Blank />} />
                    <Route path='/items-catalogue' element={<Blank />} />
                    <Route path='/view-prs' element={<Blank />} />
                    <Route path='/site-details' element={<Blank />} />
                    <Route path='/suppliers' element={<Blank />} />
                    <Route path='/logout' element={<Logout />} />                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
