import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate()
    const [loginData, setLogInData] = useState({
        email:'',
        password:''
    })

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setLogInData({
            ...loginData,
            [name]: value
        })
    }

    const onSubmit =async (e) => {
        const { data } = await axios.post("http://localhost:4000/login", {
            ...loginData
        }, { withCredentials: true});
        
        const {status, message} = data;
        if(status){
            navigate("/")
        }else{ 
            alert(message)
        }
    }
  return (
    <div style={{padding:"20px"}}>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label >Email</label>
                  <input onChange={onHandleChange} name ='email' type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
              </div>
              <div class="form-group col-md-6">
                  <label >Password</label>
                  <input onChange={onHandleChange} name='password' type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
              </div>
              <div class="form-group col-md-6">
                  <button className='btn btn-info' onClick={onSubmit}>LogIn</button>
              </div>
          </div>
    </div>
  )
}

export default Login
