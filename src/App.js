import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VendorSignup from './pages/vendor/Signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/vendor/signup' element={<VendorSignup />} />
      </Routes>
    </Router>
  );
}

export default App;