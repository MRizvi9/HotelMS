import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import './App.css';
import Register from './screens/Register';
import Login from './screens/Login';
import { Layout } from './layout/Layout';
import Reservations from './screens/Reservations';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path="home" element={<Homescreen />} />
               <Route path="book/:roomid/:fromdate/:todate" element={<Bookingscreen />} />
          </Route>
          <Route path='/register' element={<Register/>}/>
          <Route exect path='/login' element={<Login/>}/>
          <Route path="/reservations" element={<Reservations />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
