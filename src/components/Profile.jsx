import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast, {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import useFetch from '../hooks/fetch.hook'
import { useAuthStore } from '../store/store'
import { updateUser } from '../helper/helper'
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert'
import styles from '../styles/Username.module.css'
import extend from '../styles/Profile.module.css'

function Profile() {
  const [file,setFile] = useState()
  const [{isLoading, apiData , serverError}] = useFetch()
  const navigate = useNavigate();

  const formik= useFormik({
    initialValues:{
      firstName: apiData?.firstName||'',
      lastName: apiData?.lastName || '',
      mobile: apiData?.mobile||'',
      email: apiData?.email||'',
      address: apiData?.address||''
    },
    enableReinitialize:  true,
    validate: profileValidation,
    validateOnBlur:false,
    validateOnChange: false,
    onSubmit: async values=>{
      values = await Object.assign(values,{profile: file || apiData?.profile || ''})
      let updatePromise = updateUser(values);
      toast.promise(updatePromise,{
        loading : "Updating...",
        success : <b>Update Successfull</b>,
        error : <b>Could not Upload</b>
      })

      // console.log(values)
    }
  })

  /** formik doesn't support file upload so we neeed to create this handler */
  const onUpload= async(e)=>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64)
  }


  // logout handler function 
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  } 

  if(isLoading) return <h1 className='text-2xl font-bold'>IsLoading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  
  return (
    <div className='container mx-auto'>
      <Toaster position="top-center" reverseOrder={false}>

      </Toaster>
  <div className="flex justify-center items-center h-screen">
    <div className={`${styles.glass} ${extend.glass}`} style={{width:'45%'}}>
      <div className="title flex flex-col items-center">
        <h4 className='text-5xl'>Your profile </h4>
        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
          You can update the details
        </span>
      </div>


      <form className='py-1' onSubmit={formik.handleSubmit}>
      <div className='profile flex justify-center py-4'>
        <label htmlFor="profile">
            <img src={apiData?.profile || file || avatar} alt="avatar" className={`${styles.profile_img} ${extend.profile_img}`} />
        </label>
        <input onChange={onUpload} type="file" name="profile" id="profile" />
      </div>
      <div className="textbox flex flex-col items-center gap-6">
        <div className="name flex w-3/4 gap-10">
          <input {...formik.getFieldProps('firstName')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='firstName'/>
          <input {...formik.getFieldProps('lastName')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='lastName'/>
        </div>

        <div className="name flex w-3/4 gap-10">
          <input {...formik.getFieldProps('mobile')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='Mobile No.'/>
          <input {...formik.getFieldProps('email')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='Email*'/>
        </div>

          <input {...formik.getFieldProps('address')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='Address'/>
          <button className={styles.btn} type='submit'>Update</button>

      </div>
      <div className="text-center py-4">
        <span className='text-gray-500'>come back later <Link onClick={userLogout} className='text-red-500' to="/">Logout</Link></span>
      </div>
      </form>
    </div>
  </div>
    </div>
  )
}

export default Profile