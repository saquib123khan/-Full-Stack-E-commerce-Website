import { useState } from "react"


const Login = () => {
  const[currentState, setCurrentState] = useState('Login')

  const onSubmitHandler = (e) => {
     e.preventDefault()
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-4 text-gray-800">
  <div className="flex flex-col items-center w-full mb-2 mt-10 gap-4">
    <p className="prata-regular text-3xl">{currentState}</p>
    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
    {currentState === 'Login' ? null : (
      <input type="text" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Name" required />
    )}
    <input type="email" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Email" required />
    <input type="password" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Password" required />
    
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