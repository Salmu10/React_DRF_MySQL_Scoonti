import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpinnerLoading from './components/SpinnerLoading/SpinnerLoading';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
const Home = React.lazy(() => import("./pages/Home/Home"));
const Rent = React.lazy(() => import( "./pages/Rent/Rent"));

function App() {


  return (
    <div className="App">
      <Suspense fallback={<SpinnerLoading/>}>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path="/" element={<Rent/>} />
              <Route path="/home" element={<Home/>} />
            </Routes>
          <Footer/>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;