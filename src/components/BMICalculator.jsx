import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBMI] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight || !gender) {
      setMessage("Please enter valid height, weight, and gender");
      return;
    }
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBMI(bmiValue);

    let messageToSend = "send message";
    if (bmiValue < 18.5) {
      messageToSend = "You are underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 24.5) {
      messageToSend = "You have a normal weight. Keep maintaining a healthy lifestyle!";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      messageToSend = "You are overweight. Consider seeking advice from a specialist.";
    } else {
      messageToSend = "You are in obesity.";
    }
    setMessage(messageToSend);
    navigate("/results", { state: { bmi: bmiValue, message: messageToSend } });
  };

  return (
    <section className="hero">
      
      <div className="bmi-container">
        <div className="card">
          <form onSubmit={calculateBMI}>
            <h1>BMI Calculator</h1>
            <div className="input-group">
              <label>Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Weight (Kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button type="submit" className="calculate-btn">Calculate BMI</button>
          </form>
        </div>
      </div>
     
    </section>
  );
};

export default BMICalculator;
