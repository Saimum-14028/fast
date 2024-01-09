import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myCreatedRoute from './Route.jsx'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={myCreatedRoute}></RouterProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)