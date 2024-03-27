import React from 'react'
import Notify from './components/notify.mjs'
import FileSelector from './components/fileselector.mjs'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoIcon from './images/logo.png';


const App = () => {
  return (
    <div> 
        <div className="app-container">
          <img src={logoIcon} alt="Logo" className="logo" width={300} height={120} />
        </div>
        <hr/>
        <ToastContainer></ToastContainer>
        <div className='buttonContainer'>
            {/* <Notify></Notify> */}
            <FileSelector></FileSelector>
        </div>
    </div>
  )
}

export default App