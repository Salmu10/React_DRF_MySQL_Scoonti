import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
const Home = React.lazy(() => import('./pages/Home/Home'));

function App() {


  return (
    <div className="App">
      <Suspense fallback={<Loading/>}>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
            </Routes>
          <Footer/>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;