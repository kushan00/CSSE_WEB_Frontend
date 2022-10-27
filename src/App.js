import { AuthContextProvider } from "./context/Auth.context.js";
import axios from "axios";
import './App.scss';
import 'boxicons/css/boxicons.min.css';
import SiteRoutes from './SiteRoutes';

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <SiteRoutes />
    </AuthContextProvider>
  );
};

export default App;