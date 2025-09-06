import React from 'react'
import toast from 'react-hot-toast';
import {  useState, useEffect, useContext} from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { store } from '../context/Context';

const Login = () => {

    const {setShowLogin, axios, url, setToken} = useContext(store)

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)


    const submit = async (e) => {
    try {
        e.preventDefault();
        setLoading(true)
        

        const { data } = await axios.post(`${url}/user/${state}`, { 
            name, 
            email, 
            password 
        })
        if (data?.success) {
            setToken(data.token);
            localStorage.setItem('token', data.token)
            JSON.stringify(localStorage.setItem('user', data.user.name))
            toast.success(data.message);
            setShowLogin(false);
            setLoading(false)
            
        } else {
            throw new Error(data?.message || "Unknown server response");
        }

    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
        
    }
     
};


    return (<div onClick={()=>setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center bg-black/60'>
        <form onSubmit={submit} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-10 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
             <div className='flex items-center flex-col mx-auto w-60 pb-4'>
              <div className='font-semibold text-2xl uppercase text-blue-600'>User <span className='text-purple-700'>{state === 'login' ?  'Login': 'Register'}</span></div>
              <span className='w-26 h-0.5 bg-purple-600'></span>        
        </div> 
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-gray-400" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-gray-400" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-gray-400" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-[red] cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-[red] cursor-pointer">click here</span>
                </p>
            )}
            <button disabled={loading} className="bg-gradient-to-r from-purple-700 via-blue-500 to-purple-900 flex items-center justify-center text-white w-full py-2 rounded-md cursor-pointer">
                {loading ? (<AiOutlineLoading className='text-xl text-white font-bold flex items-center justify-center animate-spin'/>)  : ((state === "register") ? "Create Account" : "Login")}
            </button>
        </form></div>
    );
};

export default Login