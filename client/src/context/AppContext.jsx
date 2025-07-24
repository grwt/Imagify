import axios from "axios";
// import { set } from "mongoose";
import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AppContext=createContext();

const AppContextProvider=(props)=>{
  const [user , setUser]= useState(null);
  const [showLogin,setShowLogin]=useState(false);
  const [ token,setToken]= useState(localStorage.getItem("token") || null);

  const [credit,setCredit]=useState(false);

  const backendUrl=import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  // const navigate=useNavigate();
  
  const loadCreditsData=async()=>{
    try {
      const { data } = await axios.get(backendUrl + '/api/user/credits', {
  headers: { Authorization: `Bearer ${token}` }
});

      if(data.success){
        setCredit(data.credits)
        setUser(data.user)
      }
      
    } catch (error) {
      console.error("Error loading credits data:", error);
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    if(token){
      loadCreditsData()
    }
  },[token])



  const generateImage = async (prompt) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/image/generate-image',
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (data.success) {
      loadCreditsData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadCreditsData();

      if (data.creditBalance === 0) {
        return { error: true, reason: 'no_credits' };
      }
      return { error: true, reason: 'failed' };
    }

  } catch (error) {
    toast.error(error.message);
    return { error: true, reason: 'exception' };
  }
};

  const logout=()=>{
    localStorage.removeItem("token")
    setToken('')
    setUser(null)
    
  }


  const value={
    user ,
    token,
    setUser,
    showLogin,
    setShowLogin,
    setToken,
    backendUrl,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage
  }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>

  )

}
export default AppContextProvider
