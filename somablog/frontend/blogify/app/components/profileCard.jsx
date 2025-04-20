'use client';
import Image from 'next/image';
import React from 'react'
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";
import EditProfileForm from './EditProfileForm';
import { useUserStore } from '@/context/useUserStore';
import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const ProfileCard = ({data}) => {
const {profileData, profile,user} = useUserStore()
    useEffect(() => {
      profile();
    }, [profile]);
  const [showForm, setShowForm] = useState(false);
  return (
  <div className='w-[100%] m-auto md:w-[80%]'> 
<div className=" bg-white h-[40vh] rounded-b-xl">
  <div className="relative bg-[url(/background1.jpg)] bg-cover bg-center h-[20vh]">
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/70 "></div>

    <button
        onClick={() => setShowForm(true)}
        className="absolute top-6 right-6 text-white hover:text-gray-900"
      >
        <Settings className="md:h-8 md:w-8 z-10" />
      </button>
    {/* Profile image */}
    <div className="absolute left-4 md:left-10 bottom-[-50px] transform  z-20">
      <Image
        src={data?.image}
        alt="Profile Image"
        width={160}
        height={160}
        className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] object-cover rounded-full border-4 border-white shadow-2xl"
      />
    </div>
  </div>
 <div className='mt-20 ml-4'>
 <h2 className={`${pacifico.className} text-xl uppercase font-semibold`}>
  {user.username}
</h2>
  <p className=" ">Bio: {data?.bio}</p>
  <p className=" ">Contact: {data?.contact}</p>
</div>
</div>
{/* Floating form */}
{showForm && ( 
          <div className="absolute inset-0 bg-white bg-opacity-50 p-4 z-20 rounded-lg shadow-lg flex flex-col gap-3 h-[50vh] w-[80%] m-auto">
          <button
            className="self-end text-gray-600 hover:text-gray-900"
            onClick={() => setShowForm(false)}
          >
            ✕
          </button>
          {profileData ? (
            <EditProfileForm
                 profileData={profileData}
                 onClose={() => setShowForm(false)}
               />
      ) : (
        <p>Loading profile...</p>
      )}

        </div>
)}
</div>
  )
}

export default ProfileCard
