'use client'
import { Contact } from "lucide-react";
import { useState,useEffect } from "react"
import Button from "./button";
import {toast} from 'react-hot-toast';
import { useUserStore } from "@/context/useUserStore";

const EditProfileForm = ( {profileData}) =>{
    const [formData, setFormData] = useState({
        bio: profileData.bio || '',
        contact: profileData.contact || '',
        image: profileData.image || '', 
      });

      const {updateProfile} = useUserStore()
    // Handle form input changes
    const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formDataToSend = new FormData();
          formDataToSend.append('bio', formData.bio);
          formDataToSend.append('contact', formData.contact);
          if (formData.image) {
            formDataToSend.append('image', formData.image); 
          }
      // Send PUT request to update the profile
      await updateProfile(formDataToSend)
  

      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating the profile.');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          bio
        </label>
        <input
          type="text"
          name="bio"
          id="bio"
          value={formData.bio}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
          contact
        </label>
        <input
          type="text"
          name="contact"
          id="contact"
          value={formData.contact}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Profile Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <Button 
      label=' Update Profile'
      onClick={handleSubmit}

      />
    </form>
  );

}

export default EditProfileForm;