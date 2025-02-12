import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, onClick, variant = "primary" ,click}) => {
  const navigate=useNavigate()
    const baseStyles = "px-5 py-2 font-semibold rounded-lg shadow-md transition-all duration-300";
    
    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
    };
  
    return (
        <button 
            onClick={()=>navigate(click)} 
            className={`${baseStyles} ${variants[variant]} hover:scale-105 focus:ring-2 focus:ring-opacity-50`}
        >
            {text}
        </button>
    );
};

export default Button;
