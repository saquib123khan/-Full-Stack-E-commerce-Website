import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"


const Login = () => {
  const[currentState, setCurrentState] = useState('Sign Up')
  const {token,setToken,navigate,backendUrl} = useContext(ShopContext)

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmitHandler = async (e) => {
     e.preventDefault()

     try {
      if(currentState === 'Sign Up'){

        const response = await axios.post(backendUrl + '/api/user/register', {name,email,password})
        console.log(response.data)
        if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem('Token', response.data.token)
        toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backendUrl + '/api/user/login', {email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('Token', response.data.token)
          }else{
            toast.error(response.data.message)
          }
      }

     } catch (error) {
      toast.error(error.message)
     }
  }

  useEffect(()=>{
   if(token){
    navigate('/')
   }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-4 text-gray-800">
  <div className="flex flex-col items-center w-full mb-2 mt-10 gap-4">
    <p className="prata-regular text-3xl">{currentState}</p>
    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
    {currentState === 'Login' ? null : (
      <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Name" required />
    )}
    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Email" required />
    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Password" required />
    
    <div className="w-full flex justify-between text-sm mt-2">
      <p className="cursor-pointer hover:underline">Forgot Password?</p>
      {currentState === 'Login' ? (
        <p onClick={() => setCurrentState('Sign up')} className="cursor-pointer hover:underline">Create Account</p>
      ) : (
        <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:underline">Login here</p>
      )}
    </div>
    
    <button className="bg-black text-white font-light px-8 py-2 mt-4 rounded hover:bg-gray-700">
      {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
    </button>
  </div>
</form>


  )
}

export default Login