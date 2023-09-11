import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signup = () => {

    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        username : "",
        email:"",
        password:""
    })

    const onHandleChange = (e) => {
        const {name, value} = e.target
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    const onHandleSubmit =async (e) => {
        e.preventDefault()
        const { data } = await axios.post("http://localhost:4000/signup", {...signupData}, {
            withCredentials:true
        })
        const {status, message} = data;
        if(status){
            navigate("/login")
        }else{
            alert(message)
            return
        }
    }
  return (
    <div>
          <form onSubmit={onHandleSubmit}>
              <div class="form-group">
                  <label >Username</label>
                  <input onChange={onHandleChange} name='username' type="text"  placeholder="Enter name" />
                  
              </div>
              <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input onChange={onHandleChange} type="email" name='email'  placeholder="Enter email"/>
                     
              </div>
              <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input onChange={onHandleChange} name='password' type="password" c placeholder="Password"/>
              </div>
             
              <button type="submit" class="btn btn-primary">Submit</button>
          </form>
    </div>
  )
}

export default Signup
