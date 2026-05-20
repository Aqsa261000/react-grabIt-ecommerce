import React from 'react'
import { OrderConfirm } from '../../../assets'
import { useNavigate } from 'react-router-dom'

const OrderConfirmDefault = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col md:flex-row items-center justify-center h-full py-3 md:py-0'>
      <img src={OrderConfirm} alt="order-confirm-image" className='w-full max-w-[300px] h-auto object-contain' />
      <div>
        <h1 className='md:text-3xl font-bold text-xl'>Order Confirmed!</h1>
        <p className='text-lg md:text-2xl'>Thank you.</p>
        <button type='button' onClick={()=>navigate("/products")} className='bg-[#ffae00] py-2 px-4 text-white rounded-lg md:text-lg text-[14px] mt-5 font-semibold cursor-pointer'>Back to Shopping</button>
      </div>
    </div>
  )
}

export default OrderConfirmDefault
