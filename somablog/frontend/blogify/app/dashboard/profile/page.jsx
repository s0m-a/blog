'use client'
import React from 'react'
import ProfileCard from '@/app/components/profileCard'
import { useUserStore } from '@/context/useUserStore'
import { useEffect } from 'react'
import EditProfileForm from '@/app/components/EditProfileForm'

const ProfilePage = () => {
  const {profileData, profile} = useUserStore()
  useEffect(() => {
    profile();
  }, [profile]);

  return (
    <div>
      {profileData ? (
        <ProfileCard data={profileData} />
      ) : (
        <p>Loading profile...</p>
      )}

    </div>
  )
}

export default ProfilePage
