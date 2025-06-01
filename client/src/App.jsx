
import './App.css'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Orders from './pages/Orders'
import Tables from './pages/Tables'
import Menu from './pages/Menu'
import Dashboard from './pages/Dashboard'

function App() {

  return ( 
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
              <Route element={<Dashboard/>} index/>
              <Route path='orders' element={<Orders/>}/>
              <Route path='tables' element={<Tables/>}/>
              <Route path='menu' element={<Menu/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  
  )
}

export default App
