import React from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const BackBtn = () => {
    const navigate = useNavigate()
  return (
    <button
  onClick={() => navigate(-1)}
  className="mt-4 w-full bg-gray-600 text-white font-semibold py-2 rounded-md shadow-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center gap-2"
>
<IoArrowBackCircleSharp className="text-xl" />
Go Back
</button>
  )
}

export default BackBtn
