import React, { useState } from 'react'
import './Admin.css'
import { useNavigate} from 'react-router-dom';
const Admin = () => {
  const navigate = useNavigate();
  const [user,setUser ] = useState("");
  const [password,setPassword] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const handleAdminLogin = async ()=>{
    console.log("user & password",user,password)
    let response = await fetch(`${BASE_URL}/admin`,{
      method:"POST",
      body:JSON.stringify({user,password}),
      headers:{'Content-Type':'application/json'}
    })
    const result = await response.json();
    if(result.message = 'Done'){
      alert('Admin logged in..');
        navigate("/askyourdoubt");
        localStorage.setItem('admin',user);
    }else{
      alert('admin not found');
    }
  }
  
  return (
    <div className='container'>
      <h1>Community login</h1>
      <div className='form-container'>
        <input placeholder='user' onChange={(e)=>setUser(e.target.value)}/>
        <input placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleAdminLogin}>login</button>
      </div>
    </div>
  )
}

export default Admin