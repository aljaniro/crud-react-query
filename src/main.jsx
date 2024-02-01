import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query' 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Contextperson } from './context/contextperson.jsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Contextperson>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools/>
    </QueryClientProvider>
    </Contextperson>
  </React.StrictMode>,
)
