import { create } from "zustand";
import AxiosInstance from "@/lib/axios";
import {toast} from 'react-hot-toast';
let refreshPromise;

export const useUserStore = create( (set, get) => ({
    user: null,
    profileData:null,
    loading: false,
    checkingAuth: true,

    login: async(email, password, router) =>{
        set({ loading:true});
        try{
            const res = await AxiosInstance.post("/login/", {email, password},{
                withCredentials: true
            });
            set({user: res.data, loading: false});
            toast.success('login successful')
            router.push('/')

        }catch (err){
            set({loading: false})
            toast.error(err.response?.data?.non_field_errors || "An error occurred during login")
        }
    },

    register: async(username, email, password, first_name, last_name,router)=>{
        set( {loading:true});
        try{
            const res = await AxiosInstance.post("/register/", {username, email, password, first_name, last_name},{
                withCredentials: true
            });
            set( {user: res.data, loading:false})
            toast.success('signup successful')
            router.push('/')
        }catch(err){
            set({loading: false})
            const errors = err.response?.data;

            if (errors) {
              const errorList = Object.values(errors).flat(); // combines all error arrays into one
          
              errorList.forEach((msg) => {
                toast.error(msg || "An error occurred during signupss"); // show each message in a separate toast
              });
            }
        }
    },

    checkAuth: async (router) => {
        set({ loading: true }); 
        try {
            const res = await AxiosInstance.get('/check-auth/', { withCredentials: true });
            set({ user: res.data });  
        } catch (err) {
            set({ user: null }); 
            console.error("Not authenticated:", err);
            toast.error('Please log in first');
            return null;
        } finally {
            set({ loading: false });
        }
    },
    logout: async (router)=>{
        try{
            await AxiosInstance.post('/logout/', {
                withCredentials:true,
            })
            set( {user: null})
            toast.success('logged out successfully')
            router.push('/')
        }catch (err){
            toast.error(err.response?.data?.non_field_errors || "An error occurred during logout")
        }
    },

    profile: async()=>{
        try{
            const res = await AxiosInstance.get('/profile/', {
                withCredentials: true
            });
            set( {profileData: res.data})
        }catch (err){
            console.log(err.response?.data)
            toast.error(  "An error occurred while fetching profile")
        }
    },

    updateProfile: async(data)=>{
        try{
            const res = await AxiosInstance.put('/profile/',data, {
                withCredentials: true
            });
            set( {profileData: res.data})
        }catch (err){
            console.log(err.response?.data)
            toast.error(  "An error occurred while updating profile")
        }
    },

    refreshToken: async () => {
        if (refreshPromise) return refreshPromise; // wait for ongoing refresh if any
    
        refreshPromise = (async () => {
            set({ checkingAuth: true });
            try {
                const response = await AxiosInstance.post("/refresh/", null, {
                    withCredentials: true,
                });
                return response.data;
            } catch (error) {
                set({ user: null });
                throw error;
            } finally {
                refreshPromise = null;
                set({ checkingAuth: false });
            }
        })();
    
        return refreshPromise;
    }
    
}));

AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("AXIOS INTERCEPTOR HIT", error?.response?.status);
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          console.log("TRYING TO REFRESH TOKEN...");

          if (refreshPromise) {
            await refreshPromise;
            return AxiosInstance(originalRequest)
          } else {
            refreshPromise = useUserStore.getState().refreshToken();
            await refreshPromise;
            refreshPromise = null;
            return AxiosInstance(originalRequest)
          }
        } catch (err) {
          console.error("REFRESH FAILED", err);
          useUserStore.getState().logout(); // Handle logout if refresh fails
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    });