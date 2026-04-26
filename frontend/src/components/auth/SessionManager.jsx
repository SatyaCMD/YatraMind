'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

export default function SessionManager() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    let warningTimer;
    let logoutTimer;

    if (isAuthenticated) {
      // 28 minutes warning
      warningTimer = setTimeout(() => {
        toast('Your session will expire in 2 minutes due to inactivity.', { 
           icon: '⚠️', 
           duration: 10000,
           position: 'top-center'
        });
      }, 28 * 60 * 1000);

      // 30 minutes logout
      logoutTimer = setTimeout(() => {
        dispatch(logoutUser());
        toast.error('Session expired. You have been securely logged out.', {
           duration: 5000
        });
      }, 30 * 60 * 1000);
    }

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
    };
  }, [isAuthenticated, dispatch]);

  return null;
}
