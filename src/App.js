import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './context/Auth'

import Home from './pages/Home'

import VendorSignup    from './pages/vendor/Signup'
import VendorLogin     from './pages/vendor/Login'
import VendorDashboard from './pages/vendor/Dashboard'

import AdminLogin      from './pages/admin/Login'
import AdminDashboard  from './pages/admin/Dashboard'

import BuyerDashboard from './pages/buyer/Dashboard'

function App() {
  const { userAuth: { auth, role } } = useAuthContext()
  return (
    <Router>
      <Routes>
        {auth && role === 'vendor' && (
          <>
            <Route path='/vendor' element={<VendorDashboard />} />
            <Route path='*'       element={<VendorDashboard />} />
          </>
        )}

        {auth && role === 'admin' && (
          <>
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='*'      element={<AdminDashboard />} />
          </>
        )}

        {!auth && !role && (
          <>
            <Route path='/'              element={<Home            />} />
            <Route path='/buyer'         element={<BuyerDashboard  />} />
            <Route path='/vendor'        element={<VendorDashboard />} />
            <Route path='/vendor/signup' element={<VendorSignup    />} />
            <Route path='/vendor/login'  element={<VendorLogin     />} />
            <Route path='/admin/login'   element={<AdminLogin      />} />
            <Route path='*'              element={<Home            />} />
          </>
        )}

        
        
      </Routes>
    </Router>
  );
}

export default App;