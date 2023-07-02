import React, { useRef, useState } from 'react'
import "../css/Login.css"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { userRegis } from '../api/User'
const Regis = () => {
  const navigate = useNavigate()
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [confrimPassword,setConfrimPassword] = useState("")
  const loading = useRef()
  const Regis = (e) => {
    e.preventDefault()
    loading.current.classList.remove("d-none")
    if(username.length > 5 && password.length > 5 && confrimPassword.length > 5)
    {
      if(password !== confrimPassword)
      {
    loading.current.classList.add("d-none")
        Swal.fire(
          'Failed!',
          'Konfrimasi password tidak cocok!',
          'error'
        )
      }else{
        userRegis(username,password.confrimPassword).then((result) => {
          if(result.status === "success")
          {
            loading.current.classList.add("d-none")
            navigate("/login")
            Swal.fire(
              'Success!',
              `${result.message}`,
              'success'
            )
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
    }else{
      loading.current.classList.add("d-none")
      Swal.fire(
        'Ops!',
        'Username dan Password minimal memiliki 6 karakter',
        'info'
      )
    }
  }
  return (
    <div>
    <div className='container-form'>
      <form onSubmit={Regis} className="form-login">
        <h4>Create Acount</h4>
        <p><i>Silahkan isi form berikut!</i></p>
        <div className="container-loading d-none" ref={loading}>
        <div className="loading-spinner"></div>
        </div>
        <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <input required type="password" value={confrimPassword} onChange={(e) => setConfrimPassword(e.target.value)} placeholder='Konfirmasi Password' />
        <div className="btn">
          <button type='submit' className='btn-active'>Regis</button>
          <button type='button' onClick={()=> navigate("/login")}>Login</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Regis
