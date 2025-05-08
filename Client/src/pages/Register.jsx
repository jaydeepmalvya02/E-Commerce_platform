import React, { useState } from 'react'
import register from '../assets/register.webp'
import { Link } from 'react-router-dom'
import { registerUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch=useDispatch()

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(registerUser({email,name,password}))

        // console.log("Registering user",{name,email,password})
    }
  return (
    <div className='flex '>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
            <div className="flex justify-center mb-6">
                <h2 className="text-xl font-medium">Rabbit</h2>
               
            </div>
            <h2 className="text-2xl font-bold text-center ">Hey There!</h2>
            <p className="text-center mb-6">Enter your credentials</p>
            
        <div className="mb-4">
            <label 
            className="mb-6 block text-sm font-semibold ">Name</label>
            <input 
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder='Enter your Name' 
            className="w-full bg-slate-300 p-2 rounded border" />
        </div>
        <div className="mb-4">
            <label 
             className="mb-6 block  text-sm font-semibold">Email</label>
             <input type="email" 
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             placeholder='Enter your Email'
             className="w-full bg-slate-300 p-2 rounded border " />

        </div>
        <div className="mb-4">
            <label  
            className="mb-6 text-sm font-semibold  block">Password</label>
            <input type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter your Password'
            className="w-full bg-slate-300 p-2 rounded border" />
        </div>

        <button 
            type='submit'
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition ">
            Sign Up
            </button>
            <p className="mt-6 text-center text-sm ">
                have an account?{" "}
                <Link to='/login'
                className='text-blue-500'
                >Login</Link>
            </p>

        </form>
        </div>

        <div className="hidden md:block w-1/2 bg-gray-800">
            <div className="h-full flex flex-col justify-center items-center">
                <img src={register} alt="" className="h-[750px] w-full object-cover" />
            </div>
        </div>
    </div>
  )
}

export default Register