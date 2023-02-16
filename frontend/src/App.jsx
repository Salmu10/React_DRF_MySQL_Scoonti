import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

// fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { StationContextProvider } from './context/StationsContext';
import { ScooterContextProvider } from './context/ScootersContext';
import { SlotContextProvider } from './context/SlotsContext';
import { AuthContextProvider } from './context/AuthContext';
import { IncidentsContextProvider } from './context/IncidentsContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SpinnerLoading from './components/SpinnerLoading/SpinnerLoading';

//Guards
import AuthGuard from './services/guards/AuthGuard';
import AdminGuard from './services/guards/AdminGuard';

const Home = React.lazy(() => import("./pages/Home/Home"));
const Rent = React.lazy(() => import( "./pages/Rent/Rent"));
const Dashboard = React.lazy(() => import( "./pages/Admin/Dashboard"));
const Login = React.lazy(() => import( "./pages/Login/Login"));
const Register = React.lazy(() => import( "./pages/Login/Register"));

const StationsList = React.lazy(() => import('./pages/Admin/Station/StationsList'));
const StationsAdd = React.lazy(() => import('./pages/Admin/Station/StationsAdd'));
const StationsUpdate = React.lazy(() => import('./pages/Admin/Station/StationsUpdate'));
const StationDetails = React.lazy(() => import('./pages/Client/StationDetails'));

const ScootersList = React.lazy(() => import('./pages/Admin/Scooter/ScootersList'));
const ScootersAdd = React.lazy(() => import('./pages/Admin/Scooter/ScootersAdd'));
const ScootersUpdate = React.lazy(() => import('./pages/Admin/Scooter/ScootersUpdate'));

const Profile = React.lazy(() => import('./pages/Client/Profile'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<SpinnerLoading/>}>
        <BrowserRouter>
          <AuthContextProvider>
            <StationContextProvider>
              <ScooterContextProvider>
                <SlotContextProvider>
                  <IncidentsContextProvider>
                    <Header/>
                    <ToastContainer 
                      position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop
                      closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover theme="dark"
                    />
                      <Routes>
                        <Route path="/" element={<Rent/>} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/rent" element={<Rent/>} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>

                        <Route element={<AdminGuard/>}>
                          <Route path="/dashboard" element={<Dashboard/>}/>
                          
                          <Route path="/dashboard/stations" element={<StationsList/>}/>
                          <Route path="/dashboard/stations/add" element={<StationsAdd/>}/>
                          <Route path="/dashboard/stations/update/:slug" element={<StationsUpdate/>}/>

                          <Route path="/dashboard/scooters" element={<ScootersList/>}/>
                          <Route path="/dashboard/scooters/add" element={<ScootersAdd/>}/>
                          <Route path="/dashboard/scooters/update/:slug" element={<ScootersUpdate/>}/>
                        </Route>

                        <Route element={<AuthGuard/>}>
                          <Route path="/profile/:id" element={<Profile/>}/>
                          <Route path="/stations/:slug" element={<StationDetails/>} />
                        </Route>
                      </Routes>
                    <Footer/>
                  </IncidentsContextProvider>
                </SlotContextProvider>
              </ScooterContextProvider>
            </StationContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;