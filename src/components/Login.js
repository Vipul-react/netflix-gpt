import React, { useRef, useState } from 'react'
import Header from './Header'
import '../utils/firebase'; // make sure the path is correct
import { auth } from '../utils/firebase';
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, getAdditionalUserInfo, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  const handleButtonClick = () => {
    console.log("button clicked")
    const message = checkValidData(email.current.value, password.current.value);
    console.log(message)
    setErrorMessage(message);
    console.log("hii")
    if (message) return;

    if (isSignInForm) {
      // Sign In
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Signed In:", user);
          navigate("/browse");
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage(error.message);
        });
    } else {
      // Sign Up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile (auth.currentUser, {
            displayName: name.current.value, 
            photoURL: "https://t3.ftcdn.net/jpg/00/65/76/24/360_F_65762430_bLbrz7wDChm8kT8OEYUpUFMdiLB2AM4b.jpg"
          }).then(() => {
            const{uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(
              setUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoUrl: photoURL,
              })
            )
          }).catch((error) => {
            // An error occurred
            // ...
          });
          console.log("Signed Up:", user);
          navigate("/browse");
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className=''>
      <Header />
      <img
        src='https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg'
        alt='bg-img' />

      <form onSubmit={(e) => e.preventDefault()} className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/12 bg-black p-8 rounded-lg bg-opacity-80'>
        <h1 className='text-3xl font-bold mb-6 text-white'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {(!isSignInForm) && <input
          ref={name} 
          type="text"
          className='block w-full p-3 mb-4 bg-gray-800 border border-gray-300 rounded'
          placeholder='Full Name' />}
        <input
          ref={email}
          type="text"
          className='block w-full p-3 mb-4 bg-gray-800 border border-gray-300 rounded'
          placeholder='Email address'
          autoComplete="email"
        />


        <input
          ref={password}
          type="password"
          className='block w-full p-3 mb-4  bg-gray-800 border border-gray-300 rounded '
          placeholder='Password'
          autoComplete="password" />

        <button onClick={handleButtonClick}
          type="submit"
          className='w-full bg-red-700 text-white py-3 rounded hover:bg-red-900' >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {errorMessage && <p className='text-white '>{errorMessage}</p>}
        <p className='text-white cursor-pointer' onClick={toggleSignInForm} >{isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"}</p>
      </form>
    </div>
  )
}
export default Login