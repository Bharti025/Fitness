import React,{useState}from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
// import {ToastContainer} from 'react-toastify';
 const Login = () => {
 const navigate=useNavigate();
 const [loginInfo,setLoginInfo]=useState({
   email:'',
   password:''
  });

  const handleChange=(e)=>{
   const {name,value}=e.target;
   console.log(name,value);
   const copyLoginInfo={...loginInfo};
   copyLoginInfo[name]=value;
   setLoginInfo(copyLoginInfo);
  }
  
  console.log('loginInfo->',loginInfo);
  const  handleLogin=async (e)=>{
    e.preventDefault();
    const {email,password}=loginInfo;
    if(!email || !password){
      return handleError('name,email and password is required');
    }
    try{
     const url="https://e-fitness.onrender.com/auth/login"
     const response=await fetch(url,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(loginInfo)
     });

     const result=await response.json();
     const {success,message,jwtToken,name,error}=result;

     if(success){
      handleSuccess(message);
      localStorage.setItem('token',jwtToken);
      localStorage.setItem('loggedinUser',name);
      localStorage.setItem('userEmail',email);
      setTimeout(()=>{
        navigate('/',{state:{name}})
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
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
        <div>
       <label htmlFor="email">Email</label>
       <input onChange={handleChange} type="email" name="email"
        value={loginInfo.email} autoFocus placeholder ="Enter for Email"></input>
        </div>
        <div>
       <label htmlFor="password">Password</label>
       <input onChange={handleChange} type="password" value={loginInfo.password}
       name="password" autoFocus placeholder ="Enter for Password"></input>
        </div>
        <button>Login</button>
        <span>Don't have an account ? <Link to="/signup">Signup</Link></span>
        </form>
        {/* <ToastContainer/> */}
    </div>
    </section>
  )
}

export default Login