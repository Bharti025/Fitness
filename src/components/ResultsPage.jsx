import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";

const ResultsPage = () => {
  const userEmail = localStorage.getItem("loggedinUser");
    const navigate = useNavigate();
    const location=useLocation();
    const [category,setCategory]=useState("");
    const {bmi,message}=location.state||{};

    // let result="send Result";   
    const getCategoryFrombmi=(bmi)=>{
      if (bmi < 18.5) {
       return "Underweight";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal Weight";
      } else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight";
      } else {
        return "Obese";
      }
    };
    
    const navigateToDietPage = (e) => {
     e.preventDefault();
      const calculatedCategory = getCategoryFrombmi(bmi);
      setCategory(calculatedCategory);
      console.log(`Calculated BMI Category: ${bmi}`);
      if (calculatedCategory) {
        console.log(`${calculatedCategory}`);    
      }
      if(category){
        console.log(`Category is ${category}`);
      }
      // Navigate to the diet page with BMI, category, and message
      console.log("Navigating with:", { bmi, calculatedCategory, message }); 
      navigate("/diet", { state: {bmi,category:calculatedCategory,message} });
    };

  return (    
    <section className="hero">
    
        <div className="results"> 
         <h1>BMI results</h1>
          <h2>{message}</h2> 
          <h2>Your BMI: {bmi}</h2>      
          <form onSubmit={navigateToDietPage}>
          <h2>Diet and Exercise plans for you</h2>
          <button type="submit">View Diet Plans</button>
          </form>
          </div>

      
    </section>
  )
}

export default ResultsPage;

