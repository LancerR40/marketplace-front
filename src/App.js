import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VendorSignup    from './pages/vendor/Signup'
import VendorLogin     from './pages/vendor/Login'
import VendorDashboard from './pages/vendor/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/vendor'        element={<VendorDashboard />} />
        <Route path='/vendor/signup' element={<VendorSignup    />} />
        <Route path='/vendor/login'  element={<VendorLogin     />} />
      </Routes>
    </Router>
  );
}

export default App;