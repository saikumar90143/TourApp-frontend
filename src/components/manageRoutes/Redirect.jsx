import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {

    const [count,setCount]=useState(5)
const navigate=useNavigate()
    useEffect(()=>{
     const interval=setInterval(()=>{
        setCount((current)=>--current)
     },1000)
     count===0 && navigate('/signup')
     return ()=>clearInterval(interval)
    },[count,navigate])
  return (
    <div>Redirecting you to login page in {count} seconds.</div>
  )
}

export default Redirect