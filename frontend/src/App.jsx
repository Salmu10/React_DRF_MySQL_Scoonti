import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SpinnerLoading from './components/SpinnerLoading/SpinnerLoading';

const Home = React.lazy(() => import("./pages/Home/Home"));
const Rent = React.lazy(() => import( "./pages/Rent/Rent"));
const Dashboard = React.lazy(() => import( "./pages/Admin/Dashboard"));

const StationsList = React.lazy(() => import('./pages/Admin/Station/StationsList'));
const StationsAdd = React.lazy(() => import('./pages/Admin/Station/StationsAdd'));

function App() {


  return (
    <div className="App">
      <Suspense fallback={<SpinnerLoading/>}>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path="/" element={<Rent/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/rent" element={<Rent/>} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/dashboard/stations" element={<StationsList/>}/>
              <Route path="/dashboard/stations/add" element={<StationsAdd/>} />
            </Routes>
          <Footer/>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;