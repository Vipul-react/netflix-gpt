import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)
  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm)
  }

  
  const email = useRef(null)
  const password = useRef(null)

  const handleButtonClick=()=>{
    setErrorMessage(checkValidData(email.current.value, password.current.value))
  }

  return (
    <div className=''>
      <Header />
      <img
        src='https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg'
        alt='bg-img' />
      <form onSubmit={(e)=> e.preventDefault() } className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/12 bg-black p-8 rounded-lg bg-opacity-80'>
        <h1 className='text-3xl font-bold mb-6 text-white'>{isSignInForm? "Sign In" : "Sign Up"}</h1>
        {(!isSignInForm) && <input
          type="text"
          className='block w-full p-3 mb-4 bg-gray-800 border border-gray-300 rounded'
          placeholder='Full Name' />}
        <input
          ref = {email}
          type="text"
          className='block w-full p-3 mb-4 bg-gray-800 border border-gray-300 rounded'
          placeholder='Email address' />
        <input
          ref = {password}
          type="password"
          className='block w-full p-3 mb-4  bg-gray-800 border border-gray-300 rounded '
          placeholder='Password' />cf
        <button onClick={handleButtonClick} type="submit" className='w-full bg-red-700 text-white py-3 rounded hover:bg-red-900' >
          {isSignInForm? "Sign In" : "Sign Up"}
        </button>
        errorMessage && <p className='text-white '>{errorMessage}</p>
        <p className='text-white cursor-pointer' onClick={toggleSignInForm} >{isSignInForm ? "New to Netflix? Sign Up Now": "Already Registered? Sign In Now"}</p>
      </form>
    </div>
  )
}
export default Login