import React, { useEffect, useState,useRef } from 'react'
import "../css/Login.css"
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../api/User'
import Swal from "sweetalert2"
import Cookies from 'js-cookie'
const Login = () => {
  const navigate = useNavigate()
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("")
  const loading = useRef()

  const AuthToken = Cookies.get("auth");
    useEffect(() =>{
      if(AuthToken)
      {
        navigate("/")
      }
    },[])
    
  const Auth = (e) => {
    e.preventDefault()
    loading.current.classList.remove("d-none")

    if(username.length > 0 && password.length > 0)
    {
      userLogin(username,password).then((result) => {
        if(result.status === "success")
        {
          const addCookie = {
            "id": result.data.id,
            "token": result.data.token
          }
          Cookies.set("auth", JSON.stringify(addCookie))
          loading.current.classList.add("d-none")
          navigate("/")
        }else{
          loading.current.classList.add("d-none")
          Swal.fire(
            'Failed!',
            `${result.message}`,
            'error'
          )
        }
      })
    }
  }
  return (
    <div className='container-form'>
      <form onSubmit={Auth} className="form-login">
        <h4>Welcome to ChatGroup</h4>
        <p><i>Silahkan Login</i></p>
        <div className="container-loading d-none" ref={loading}>
        <div className="loading-spinner"></div>
        </div>
        <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <div className="btn">
          <button type='submit' className='btn-active'>Login</button>
          <button type='button' onClick={()=> navigate("/regis")}>Regis</button>
        </div>
      </form>
    </div>
  )
}

export default Login
