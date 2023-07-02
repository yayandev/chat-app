import React from 'react'
import axios from 'axios';
import useSWR from "swr"
const UserList = () => {
    const dataUsers = async () => {
        const response = await axios.get("http://localhost/chat-app/api/users.php");
        return response.data
      }

      const { data } =  useSWR('user',dataUsers)  
  if(!data) return <div className="container-loading d-none">
  <div className="loading-spinner"></div>
  </div>
  return (
    <div className='users'>
      {data.map((user,index) => (
              <button key={index}>
              <img src="https://via.placeholder.com/50x50" width="50" alt="" />
              <span>{user.username}</span>
            </button>
            ))}
    </div>
  )
}

export default UserList
