import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.tsx'

import {  HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/theme-provider.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.ts'




createRoot(document.getElementById('root')!).render(

  <StrictMode>
    
<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
<Provider store={store}>

  <HelmetProvider>
<RouterProvider router={router}/>
</HelmetProvider>

</Provider>
</ThemeProvider>

  </StrictMode>,
)
