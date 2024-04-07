import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import Routing from './Routes/Routing.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
)
