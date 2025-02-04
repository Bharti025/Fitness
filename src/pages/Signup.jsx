import React,{useState}from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
// import {ToastContainer} from 'react-toastify';
 const Signup = () => {
 const navigate=useNavigate();
 const [signupInfo,setSignupInfo]=useState({
   name:'',
   email:'',
   password:''
  });

  const handleChange=(e)=>{
   const {name,value}=e.target;
   console.log(name,value);
   const copySignupInfo={...signupInfo};
   copySignupInfo[name]=value;
   setSignupInfo(copySignupInfo);
  }
  
  console.log('signupInfo->',signupInfo);

  const  handleSignup=async (e)=>{
    e.preventDefault();
    const {name,email,password}=signupInfo;
    if(!name || !email || !password){
      return handleError('name,email and password is required');
    }
    try{
     const url="https://e-fitness.onrender.com/auth/signup"
     const response=await fetch(url,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(signupInfo)
     });
     const result=await response.json();
     const {success,message,error}=result;
     if(success){
      handleSuccess(message);
      setTimeout(()=>{
        navigate('/login');
      },1000);
     }
     else if(error){
      const details=error?.details[0].message;
      handleError(details);
     }
      else if(!success){
        handleError(message);
      }
     console.log(result);
    }
    catch(err){
    handleError(err);
    }
  }
  
  return (
    <section className="hero">
    <div className="signup">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
        <div>
       <label htmlFor="name">Name</label>
       <input  onChange={handleChange} type="text" name="name" autoFocus placeholder ="Enter for Name"></input>
        </div>
        <div>
       <label htmlFor="email">Email</label>
       <input onChange={handleChange} type="email" name="email" autoFocus placeholder ="Enter for Email"></input>
        </div>
        <div>
       <label htmlFor="password">Password</label>
       <input onChange={handleChange} type="password" name="password" autoFocus placeholder ="Enter for Password"></input>
        </div>
        <button>Signup</button>
        <span>Already have an account ? <Link to="/login">Login</Link></span>
        </form>
        {/* { <ToastContainer/>} */}
    </div>
    </section>
  )
}

export default Signup