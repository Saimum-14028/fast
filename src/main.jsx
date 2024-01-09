import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myCreatedRoute from './Route.jsx'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './AuthProvider.jsx'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={myCreatedRoute}></RouterProvider>
      </AuthProvider>
    </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)