import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import BMICalculator from './components/BMICalculator.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import "./App.css"
import Dietplan from './components/Dietplan.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import About from './components/About.jsx'
const App = () => {
  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Hero/>}/>
      
     <Route path="/BMICalculator" element={<BMICalculator/>}/>
      {/* <Route path="/" element={<BMICalculator />} /> */}
      <Route path="/about" element={<About/>}/>
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/diet" element={<Dietplan/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
     <Footer/>
     {/* { <ToastContainer theme="dark" position='top-center'/> } */}
    </Router>  
    </>
  )
}
export default App
