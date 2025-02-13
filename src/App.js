import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Buyers from './pages/Buyers';
import Sellers from './pages/Sellers';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewProperty from './pages/NewProperty';
import PropertyMaintain from './pages/PropertyMaintain';
import Appointments from './pages/Appointments';
import PropertyAppointment from './pages/PropertyAppointment';
import SellerProps from './pages/SellerProps';
import BuyerProps from './pages/BuyerProps';
import PropertyDetails from './pages/PropertyDetails';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div> <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />

      {/* {/* FontAwesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      /> 

      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/buyers' element={<Buyers />} />
            <Route path='/sellers' element={<Sellers />} />
            <Route path='/properties/:sellerId' element={<SellerProps />} />
            <Route path='/appointments/:buyerId' element={<BuyerProps />} />
            <Route path='/propertyadmin' element={<NewProperty />} />
            <Route path='/update/:id' element={<PropertyMaintain />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/propertyappointment/:id' element={<PropertyAppointment />} />
            <Route path='/propertydetails/:id' element={<PropertyDetails />} />
          </Routes>


          <footer className="custom-footer bg-white text-center text-lg-start">
            <div className="container p-4 border-top-purple">
              <div className="row">
                <div className="col-lg-6 col-md-6 mb-4 mb-md-0 text-center">
                  <h5 className="text-uppercase text-purple">Contact Details</h5>
                  <p className="text-purple">
                    <b>Address:</b> 1 Two Street, Three, AB4 5CD<br />
                    <b>Phone:</b> 01234 567 891<br />
                    <b>Email:</b> info@wrongmove.co.uk<br />
                    <div className="social-icons">
                      <Link to="/" className="text-purple me-3">
                        <i className="fab fa-facebook fa-2x"></i>
                      </Link>
                      <Link to="/" className="text-purple me-3">
                        <i className="fab fa-instagram fa-2x"></i>
                      </Link>
                      <Link to="/" className="text-purple me-3">

                        <i className="fa-brands fa-x-twitter fa-2x"></i>

                      </Link>
                    </div>
                  </p>
                </div>
                <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-purple text-center">Links</h5>
                  <ul className="list-unstyled mb-0 text-center">
                    <li>
                      <Link to="/buyers" className="text-purple">Buyers</Link>
                    </li>
                    <li>
                      <Link to="/sellers" className="text-purple">Sellers</Link>
                    </li>
                    <li>
                      <Link to="/propertyadmin" className="text-purple">Manage Property</Link>
                    </li>
                    <li>
                      <Link to="/appointments" className="text-purple">Manage Appointments</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-center p-3 bg-darker-purple text-white">
              © 2024 Copyright: <Link className="text-white" to="/">WrongMove</Link>
            </div>
          </footer>
        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;