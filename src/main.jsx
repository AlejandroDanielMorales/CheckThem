import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './assets/context/UserContext.jsx'
import ChecksProvider from './assets/context/ChecksContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
<UserProvider>
  <ChecksProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </ChecksProvider>
  </UserProvider>
  </BrowserRouter>,
)
