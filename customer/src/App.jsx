
import './App.css'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Details from './pages/Details'
import Layout from './pages/Layout'
import Menu from './pages/Menu'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



function App() {

  return ( 
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route element={<Menu/>} index/>
            <Route path='details' element={<Details/>}/>
          </Route>
        </Routes>
      </Router>
       <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
      />
    </div>
  
  )
}

export default App

