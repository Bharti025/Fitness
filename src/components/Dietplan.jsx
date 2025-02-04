import React from 'react'
import {useState,useEffect} from "react";
import {data} from '../restApi.json';
import {useLocation,useNavigate} from "react-router-dom";

const Dietplan = ({userEmail}) => {
   
  const [reminders, setReminders] = useState({
    breakfast: false,
    lunch: false,
    snack:false,
    dinner: false,
});

const mealTimes = {
    breakfast: '9:00',
    lunch: '13:00',
    snack:'17:00',
    dinner: '20:00',
};
   const [diet,setDiet]=useState({});
   const location = useLocation();
   const navigate = useNavigate();
  const { bmi, category, message } = location.state || {};
  
  useEffect(() => {
    console.log("Received state in Dietplan:", location.state);
    // if (!category) {
    //   console.warn("Category is missing. Redirecting to results page...");
    //   navigate("/results"); // Redirect if category is not provided
    // }
    // else{
        const filteredDiet = data[0].diet.find(plan => plan.category === category);
        setDiet(filteredDiet || {});
        console.log(filteredDiet);
        // const filteredExercise = data.exercise.filter(plan => plan.category === category);
        // setFilteredPlans({diet: filteredDiet,
        //         exercise: filteredExercise,
        //       });
              console.log(diet);
              if(!diet){
                console.log("Loading diet plans...");
              }   
            }
  , [category, navigate]);

  const setReminder = async (mealType) => {
    const loggedInUserEmail = localStorage.getItem("userEmail"); // Fetch from localStorage

    if (!loggedInUserEmail) {
        alert("User email not found! Please log in.");
        return;
    }
    else{
        console.log(loggedInUserEmail);
    }
    try {
        const response = await fetch('https://e-fitness.onrender.com/api/set-reminder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mealType, userEmail:loggedInUserEmail }),
        });

        if (response.ok) {
            setReminders((prev) => ({ ...prev, [mealType]: true }));
            alert(`Reminder set for ${mealType}!`);
        } else {
            alert('Failed to set reminder.');
        }
    } catch (error) {
        console.error('Error setting reminder:', error);
        alert('Error setting reminder.');
    }
};
  return (
    
      <section className="hero">
        <div >
            <h1 className="text-2xl font-bold mb-4">Diet Plan for {category}</h1>
            <br></br><br></br>
            <table >
                <thead>
                    <tr>
                        <th >Meal</th>
                        <th>Suggested Meal</th>
                        <th >Time</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(mealTimes).map(([mealType, time]) => (
                     
                        <tr key={mealType}>
                            <td >{mealType}</td>
                            <td>{diet[mealType] || 'No suggestion available'}</td>
                            <td >{time}</td>
                            <td >
                                <button
                                    onClick={() => setReminder(mealType)}
                                    disabled={reminders[mealType]}
                                    className={`px-4 py-2 rounded ${
                                        reminders[mealType]
                                            ? 'bg-gray-500 text-white'
                                            : 'bg-blue-500 text-white'
                                    }`}
                                >
                                    {reminders[mealType] ? 'Reminder Set' : 'Set Reminder'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
  ) 
}
export default Dietplan
