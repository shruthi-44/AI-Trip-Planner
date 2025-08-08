import React, { useState } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/index.jsx'
import MyTrips from '@/mytrips';

const router =createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'/create-trip',
    element: <CreateTrip />
  },
  {
    path:'/view-trip/:tripId',
    element: <Viewtrip />
  }
  ,
  {
    path:'/my-trips',
    element: <MyTrips />
  }

])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GEMINI_AUTH_CLIENT_ID}>
   <Header />
   <Toaster/>
   
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
