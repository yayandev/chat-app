import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "../css/Home.css"
import Cookies from "js-cookie"
import { userLogout, userVerify } from '../api/User'
import useSWR,{useSWRConfig} from "swr"
import axios from 'axios'
import { createChat } from '../api/Chat'
import UserList from './UserList'
import Swal from "sweetalert2"
const Home = () => {
  const navigate = useNavigate()
  const AuthCookie = Cookies.get("auth");
  const [user,setUser] = useState([])
  const [inputText,setInputText] = useState("")
  const [token,setToken] = useState("")
  const {mutate} = useSWRConfig()
  const chat = useRef("")
  useEffect(()=> {
    if(AuthCookie)
    {
      const dataParse = JSON.parse(AuthCookie)
      userVerify(dataParse.id,dataParse.token).then((result) => {
        if(result.status === "success")
        {
        setUser(result.data)
        setToken(dataParse.token)
    chat.current.scrollTop = chat.current.scrollHeight
        }else{
          Cookies.remove('auth');
          navigate("/login")
        }
      })
    }else{
      navigate("/login")
    }
  },[])

  const dataChat = async () => {
    const response = await axios.get("http://localhost/chat-app/api/chat/getChat.php");
    return response.data
  }
  
  const { data } =  useSWR('chat',dataChat)  
  if(!data) return <div className="container-loading d-none">
  <div className="loading-spinner"></div>
  </div>

  const ShowChat = () => {
    return data.map((item,index) => {
      if(item.pengirim === user.username)
      {
       return (
        <div className='container-chat-me' key={index}>
        <div className="chat-me">
          <h5>{item.pengirim}</h5>
          <p>{item.chat}</p>
          <small><i>{item.createdAt}</i></small>
        </div>
      </div>
       )
      }else{
        return (
          <div className='container-chat-world' key={index}>
          <div className="chat-world">
            <h5>{item.pengirim}</h5>
            <p>{item.chat}</p>
            <small><i>{item.createdAt}</i></small>
          </div>
        </div>
        )
      }
    })
  }

  const sendMessage = (e) => {
    e.preventDefault()
    chat.current.scrollTop = chat.current.scrollHeight
    if(inputText.length > 0)
    {
      createChat(user.id,token,user.username,inputText).then((result) => {
        if(result.status === "success")
        {
          setInputText("")
          mutate('chat')
        }
      })
    }
  }

  const Logout = () => {
    userLogout(user.id,token).then((result) => {
      if(result.status === "success") {
        Cookies.remove('auth');
        Swal.fire(
          'Success!',
          `${result.message}`,
          'success'
        )
        navigate("/login")
      }
    })
  }
  return (
    <div className='container-home'>
      <div className="content">
        <div className="container-user">
          <h3>Users</h3>
          <hr />
            <UserList/>
        </div>
        <div className="container-chat">
          <div className="chat-header">
          <div>
          <h3>ChatGroup</h3>
          <span><i>user : {user.username}</i></span>
          </div>
          <button onClick={() => Logout()}>Logout</button>
          </div>
          <div className="chat" ref={chat}>
            <ShowChat/>
          </div>
          <form className='form-chat' onSubmit={sendMessage}>
            <input type="text" placeholder='Enter chat...' value={inputText} onChange={(e) => setInputText(e.target.value)}  />
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
