import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import Header from './Header';

const Browse = () => {
  const user = useSelector((store) => store.user);
  const handleClick = () => {
    signOut(auth).then(() => {
      // dispatch(clearUser());
    }).catch((error) => {
      // An error happened.
    });
    // navigate("/");
  }
  return (
    <div>
      <Header/>
      <button onClick={handleClick}
        className='bg-blue-600 text-white ml-80'
      >
        Sign Out
      </button>
      <img src={user?.photoUrl} alt=''/>
     </div>
  )
}

export default Browse