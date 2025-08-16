import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';



const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);


  const fetchUser = async () => {

    // if (userData) return;
    try{
    const res = await axios.get(BASE_URL+"/profile/view",{
      withCredentials:true,
    });
console.log('uerrrr===',res);

    dispatch(addUser(res.data.user));
  } catch (err){

    if(err.status == 401){
      navigate("/login");
    }
    console.error(err);
  }
  };


  useEffect(()=>{

    fetchUser();
    
  }, []);

  return (
    <div>
     <NavBar />
     <Outlet />
     <Footer /> 
    </div>
  )
}

export default Body;