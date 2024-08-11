import { 
  Route, 
  BrowserRouter,
  Routes
} from 'react-router-dom'
import './App.css'
import './Page.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './layout/Layout'
import ProtectedRoute from './utils/ProtectedRoute'
import AdminDashboardPage from './pages/AdminDashboardPage'
import NotFound from './pages/NotFound'
import AdminAddEmployee from './pages/AdminAddEmployee'
import AdminRoute from './utils/AdminRoute'
import AdminListEmployee from './pages/AdminListEmployee'
import AdminEditEmployee from './pages/AdminEditEmployee'
import DeleteEmployee from './components/DeleteEmployee'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/*' element={<NotFound/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='' element={<ProtectedRoute/>}>
            <Route index element={<HomePage/>}/>
          </Route>
          <Route path='' element={<AdminRoute/>}>
            <Route path='admin/dashboard' element={<AdminDashboardPage/>}/>
            <Route path='admin/add-employee' element={<AdminAddEmployee/>}/>
            <Route path='admin/list-employee' element={<AdminListEmployee/>}/>
            <Route path='admin/list-employee/edit/:id' element={<AdminEditEmployee/>}/>
            <Route path='admin/list-employee/delete/:id' element={<DeleteEmployee/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
