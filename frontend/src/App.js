import './App.css';
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import  {CustomerRoutes}  from './routes/CustomerRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Dashboard from './components/AdminDashboard/Dashboard';
import AdminBookings from './components/AdminBookings/AdminBookings';
import Hotel from './components/Customer/pages/hotel/Hotel';
import Link from './components/Customer/pages/list/List';
import Home from './components/Customer/pages/home/Home';
import Login from './components/Login';
import Booking from './components/Customer/pages/booking/Booking';
import CustomerSignup from './components/CustomerSignup';
import EmployeeSignup from './components/EmployeeSignup';

//App Component
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/customer/home" element={<Home />}/>
          {/* <Route path="/customer" element={<CustomerRoutes/>}/> */}
          {/* <Route path="/" element={<AdminRoutes/>}/> */}
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/bookings" element={<AdminBookings/>}/>
          <Route path="/customer" element={<Home/>}/>
          <Route path="/hotels" element={<Link/>}/>
          <Route path="/hotels/:id" element={<Hotel/>}/>
          <Route path="/booking" element={<Booking/>}/>
          <Route path="/customer/signup" element={<CustomerSignup />}/>
          <Route path="/employee/signup" element={<EmployeeSignup />}/>
          {/* <Route path="/admin">
                <AdminRoutes />
          </Route>
          <Route path="/customer">
                <CustomerRoutes />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}