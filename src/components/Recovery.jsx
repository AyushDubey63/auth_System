import React, { useEffect, useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import toast, {Toaster} from 'react-hot-toast'
import { useAuthStore } from '../store/store'
import {useFormik} from 'formik'
import { passwordValidate } from '../helper/validate'
import { generateOTP , verifyOTP } from '../helper/helper'

function Recovery() {
  const navigate = useNavigate()
  const {username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();

  useEffect(()=>{
    generateOTP(username).then((OTP)=>{
      console.log(OTP)
      if(OTP) return toast.success('OTP has been sent to your email');
      return toast.error("Problem while generating OTP")  
    })
  },[username])

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status} = await verifyOTP({username,code: OTP})
      if(status===201){
        toast.success("Verify Successfully")
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wrong OTP! Check email again')
    }
  }

  function resendOTP(){
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise,{
      loading: "Sending...",
      success: <b>OTP has been sent to your email</b>,
      error : <b>Could not Send it</b>
    })

    sendPromise.then(OTP=>{
      console.log(OTP)
    })
  }
  
  const formik= useFormik({
    initialValues:{
      password:'admin@123'
    },
    validate: passwordValidate,
    validateOnBlur:false,
    validateOnChange: false,
    onSubmit: async values=>{
      console.log(values)
    }
  })
  return (
    <div className='container mx-auto'>
      <Toaster position="top-center" reverseOrder={false}>

      </Toaster>
  <div className="flex justify-center items-center h-screen">
    <div className={styles.glass}>
      <div className="title flex flex-col items-center">
        <h4 className='text-5xl'>Recovery</h4>
        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
          Enter OTP to recover the password
        </span>
      </div>


      <form className='pt-20' onSubmit={onSubmit}>
      
      <div className="textbox flex flex-col items-center py-4">

      <div className="input text-center ">
        <span className='py-4 text-sm text-gray-500 text-left'>
          Please enter 6 digit OTP sent to your email
        </span>
        <input onChange={(e)=>setOTP(e.target.value)} type="text" className={styles.textbox} placeholder='OTP'/>
      </div>

        <button className={styles.btn} type='submit'>Recover</button>
      </div>
      </form>
      <div className="text-center py-4">
        <span className='text-gray-500'>Can't get OTP <button onClick={resendOTP} className='text-red-500' >Resend OTP</button></span>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Recovery