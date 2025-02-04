import React from 'react'
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const navigate = useNavigate();
    const gotoNewPage=()=>{
        // event.preventDefault(); 
        navigate("/BMICalculator");
    }

  return (
    <section className="hero">
        <div className="content">
            <div className="title">
                <h1>LET'S</h1>
                <h1>GET</h1>
                <h1>MOVING</h1>
            </div>
            <div className="sub-title">
                <p>Your Journey to Fitness Starts Here</p>
                <p>Unleash your potential</p>
            </div>
            <div className="buttons">
                <form onSubmit={gotoNewPage}>
                    <button type="submit" >Start your journey</button></form>
                
            </div>
        </div>
    </section>
  )
}

export default Hero
