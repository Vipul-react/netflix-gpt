import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearUser, setUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, uid } = user;
        dispatch(setUser({ email: email, displayName: displayName, uid: uid }));
        navigate("/browse");
      } else {
        dispatch(clearUser());
        navigate("/");
      }
    })
    return() => {
      unsubscribe();
    }
  }, [])
  return (
    <div className='absolute px-10 py-2 bg-gradient-to-b from-black'>
      <img className='w-48' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='Logo' />
    </div>
  )
}

export default Header